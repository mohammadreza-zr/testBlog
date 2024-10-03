import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Posts from "../../components/sections/posts";
import { validateRequest } from "../../lib/lucia-auth";
import { queryKeys } from "../../queries";

export const metadata: Metadata = {
  title: "posts",
};

export const revalidate = 1;

const Page = async () => {
  const { session } = await validateRequest();

  if (!session) redirect("/login");

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(queryKeys.posts.list());

  return (
    <div className="w-full h-full min-h-svh">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts />
      </HydrationBoundary>
    </div>
  );
};

export default Page;
