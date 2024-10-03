import { Posts } from "../interfaces/posts";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

export const getPosts = async (): Promise<Posts[] & { error?: any }> => {
  try {
    const res = await fetch(baseUrl + "api/posts/");
    return await res.json();
  } catch (error: any) {
    return error;
  }
};

export const getPostsDetail = async (
  slug?: string
): Promise<Posts & { error?: any }> => {
  try {
    const res = await fetch(`${baseUrl}api/posts/${slug}`, {
      next: {
        revalidate: 1,
      },
    });
    return await res.json();
  } catch (error: any) {
    return error;
  }
};
