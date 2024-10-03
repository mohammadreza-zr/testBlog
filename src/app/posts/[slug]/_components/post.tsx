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
    <div className="container mx-auto px-5">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 flex items-center">
        <Link href="/" className="hover:underline">
          بلاگ
        </Link>
      </h2>
      <article className="mb-32">
        <h1 className="max-w-3xl mx-auto text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center">
          {data.data?.title.rendered}
        </h1>
        <div className="max-w-3xl mx-auto mb-4">
          <div className="mb-6">
            <Image
              src={data.data?.featuredMedia.sourceUrl || ""}
              className={
                "shadow-sm w-full rounded-md hover:shadow-lg transition-shadow duration-200"
              }
              height={data.data?.featuredMedia.height}
              width={data.data?.featuredMedia.width}
              alt={data.data?.featuredMedia.title || ""}
              loading="lazy"
            />
          </div>
          <div>
            دسته بندی: <strong>{data.data?.categories.name}</strong>
          </div>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
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
