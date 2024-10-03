"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { queryKeys } from "../../../../queries";
import { dateConverter } from "../../../../utils/date-time";

const Post = ({ slug }: { slug: string }) => {
  const data = useQuery(queryKeys.posts.detail(slug));

  if (data.data?.error) {
    return notFound();
  }

  return (
    <div className="max-lg:px-5 py-8 px-4 mx-auto max-w-screen-lg lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center lg:mb-16 my-8">
        <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          <Link href={"/"} className="hover:underline">
            بلاگ
          </Link>
        </h2>
        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
          صفحه جزییات پست
        </p>
      </div>
      <article className="mb-32">
        <h1 className="mx-auto text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center">
          {data.data?.title.rendered}
        </h1>
        <div className="mx-auto mb-4">
          <div className="mb-6">
            <Image
              src={data.data?.featuredMedia.sourceUrl || ""}
              className={
                "shadow-sm w-full rounded-md hover:shadow-lg transition-shadow duration-200 aspect-video"
              }
              height={data.data?.featuredMedia.height}
              width={data.data?.featuredMedia.width}
              alt={data.data?.featuredMedia.title || ""}
              placeholder="blur"
              blurDataURL={
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC"
              }
            />
          </div>
          <div>
            دسته بندی: <strong>{data.data?.categories.name}</strong>
          </div>
        </div>
        <div className="mx-auto space-y-4">
          <div
            dangerouslySetInnerHTML={{
              __html: data.data?.content.rendered || "<div></div>",
            }}
          />
          <div className="mb-6 text-sm flex items-center justify-between gap-4 pt-4">
            <time dateTime={data.data?.date}>
              تاریخ انتشار: {dateConverter.toDate(data.data?.date)}
            </time>
            <time dateTime={data.data?.modified}>
              آخرین ویرایش: {dateConverter.toDate(data.data?.modified)}
            </time>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Post;
