import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { db } from ".";
import { insertUserSchema } from "../../app/(auth)/login/_schema/login-schema";
import { blogPosts } from "./../../data/blog";
import {
  categories,
  contents,
  excerpts,
  featuredMedia,
  postsTable,
  titles,
  usersTable,
} from "./schema";

export const seed = async () => {
  try {
    const { password, username } = insertUserSchema.parse({
      username: "demo",
      password: "demo",
    });

    const existingUser = await db.query.usersTable.findFirst({
      where: (column) => eq(column.username, username),
    });

    if (existingUser) {
      console.log({
        status: false,
        error: {
          message: "user already exists",
          type: "INVALID_DATA_ERROR",
          code: 400,
        },
      });
    }

    const hashedPassword = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    if (!hashedPassword) {
      return {
        status: false,
        error: {
          message: "username or password is invalid!",
          type: "INVALID_DATA_ERROR",
          code: 400,
        },
      };
    }

    const createdUser = await db
      .insert(usersTable)
      .values({ id: userId, username, password: hashedPassword });
    console.log(createdUser);
  } catch (error) {
    console.log({
      status: false,
      error: {
        message: (error as Error).message,
        type: "INTERNAL_SERVER_ERROR",
        code: 500,
      },
    });
  }
  try {
    const categoryIds = new Set<number>();

    for (const post of blogPosts) {
      let titleId: number | null = null;
      let contentId: number | null = null;
      let excerptId: number | null = null;
      let categoryId: number | null = null;
      let featuredMediaId: number | null = null;

      // Insert title
      if (post.title) {
        const createdTitle = await db.insert(titles).values(post.title);
        titleId = Number(createdTitle.lastInsertRowid) || null;
      }

      // Insert content
      if (post.content) {
        const createdContent = await db
          .insert(contents)
          .values(post.content as never);
        contentId = Number(createdContent.lastInsertRowid) || null;
      }

      // Insert excerpt
      if (post.excerpt) {
        const createdExcerpt = await db
          .insert(excerpts)
          .values(post.excerpt as never);
        excerptId = Number(createdExcerpt.lastInsertRowid) || null;
      }

      // Insert categories
      if (post.categories) {
        for (const category of post.categories) {
          if (!categoryIds.has(category.id)) {
            await db.insert(categories).values(category);
            categoryIds.add(category.id);
          }
        }
        categoryId =
          Array.from(categoryIds).find((id) => id === post.categories[0].id) ||
          null;
      }

      // Insert featured media
      if (post.featured_media_object) {
        const mediaData = {
          title: post.featured_media_object.title,
          caption: post.featured_media_object.caption,
          description: post.featured_media_object.description,
          width: post.featured_media_object.media_details.width,
          height: post.featured_media_object.media_details.height,
          fileSize: post.featured_media_object.media_details.filesize,
          sourceUrl: post.featured_media_object.source_url,
        };
        const createdFeaturedMedia = await db
          .insert(featuredMedia)
          .values(mediaData);
        featuredMediaId = Number(createdFeaturedMedia.lastInsertRowid) || null;
      }

      // Insert post
      const createdPost = await db.insert(postsTable).values({
        date: post.date,
        dateGmt: post.date_gmt,
        modified: post.modified,
        modifiedGmt: post.modified_gmt,
        slug: post.slug,
        status: post.status,
        type: post.type,
        titleId,
        contentId,
        excerptId,
        categoryId,
        featuredMediaId,
        id: post.id,
      });

      console.log(createdPost);
    }
  } catch (error) {
    console.error({
      status: false,
      error: {
        message: (error as Error).message,
        type: "INTERNAL_SERVER_ERROR",
        code: 500,
      },
    });
  }
};

seed();
