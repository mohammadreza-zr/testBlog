"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { queryKeys } from "../../queries";
import { dateConverter } from "../../utils/date-time";

const Posts = () => {
  const posts = useQuery(queryKeys.posts.list());

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            <Link href={"/"} className="hover:underline">
              بلاگ
            </Link>
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            این یک وبسایت تست می باشد.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {posts.data?.map((post) => {
            return (
              <article
                key={post.id}
                className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
              >
                <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">{post.title.rendered}</a>
                </h2>
                <div
                  className="mb-5 font-light text-gray-500 dark:text-gray-400"
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.rendered,
                  }}
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Image
                      width={28}
                      height={28}
                      className="w-7 h-7 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                      alt="Jese Leos avatar"
                    />
                    <span className="font-medium dark:text-white mx-3">
                      نام کاربری
                    </span>

                    <span className="text-sm">
                      {dateConverter.toDate(post.date)}
                    </span>
                  </div>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                  >
                    ادامه
                    <svg
                      className="ml-2 w-4 h-4 rotate-180 ms-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Posts;
