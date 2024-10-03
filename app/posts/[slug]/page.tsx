import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { getPostsDetail } from "../../../api/posts";
import { queryKeys } from "../../../queries";
import Post from "./_components/post";

export const revalidate = 1;

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getPostsDetail(params.slug);

  return {
    title: data?.title?.rendered,
    description: data?.excerpt?.rendered,
    openGraph: {
      title: data?.title?.rendered,
      description: data?.excerpt?.rendered,
      url: `https://test-blog-gamma-livid.vercel.app/posts/${params.slug}`,
      type: "website",
      siteName: "vercel",
      images: data?.featuredMedia?.sourceUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: data?.title?.rendered,
      description: data?.excerpt?.rendered,
      images: [],
      site: "@Twitter",
      creator: "@Twitter",
    },
  };
}

const PostDetail = async (props: { params: { slug: string } }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(queryKeys.posts.detail(props.params.slug));
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Post slug={props.params.slug} />
      </HydrationBoundary>
    </>
  );
};

export default PostDetail;
