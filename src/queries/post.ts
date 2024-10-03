import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getPosts, getPostsDetail } from "../api/posts";

export const postsKeys = createQueryKeys("posts", {
  list: () => ({
    queryKey: ["list"],
    queryFn: getPosts,
  }),
  detail: (slug?: string) => ({
    queryKey: ["detail", slug],
    queryFn: () => getPostsDetail(slug),
  }),
});
