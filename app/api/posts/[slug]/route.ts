import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "../../../../server/database/index";
import {
  categories,
  contents,
  excerpts,
  featuredMedia,
  postsTable,
  titles,
} from "../../../../server/database/schema";

export const revalidate = 1;

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  try {
    const post = await db
      .select({
        id: postsTable.id,
        date: postsTable.date,
        modified: postsTable.modified,
        slug: postsTable.slug,
        status: postsTable.status,
        title: titles,
        content: contents,
        excerpt: excerpts,
        categories: categories,
        featuredMedia: featuredMedia,
      })
      .from(postsTable)
      .where((col) => eq(col.slug, slug))
      .leftJoin(titles, eq(titles.id, postsTable.titleId))
      .leftJoin(contents, eq(contents.id, postsTable.contentId))
      .leftJoin(excerpts, eq(excerpts.id, postsTable.excerptId))
      .leftJoin(categories, eq(categories.id, postsTable.categoryId))
      .leftJoin(
        featuredMedia,
        eq(featuredMedia.id, postsTable.featuredMediaId)
      );

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post[0], {
      status: 200,
    });
  } catch {
    return NextResponse.json(
      { error: "internal server error" },
      {
        status: 500,
      }
    );
  }
}
