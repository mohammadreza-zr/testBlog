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
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center">
          {data.data?.title.rendered}
        </h1>
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Image
              src={data.data?.featuredMedia.sourceUrl || ""}
              className={
                "shadow-sm w-full hover:shadow-lg transition-shadow duration-200"
              }
              height={data.data?.featuredMedia.height}
              width={data.data?.featuredMedia.width}
              alt={data.data?.featuredMedia.title || ""}
              loading="lazy"
            />
          </div>
          <div className="mb-6 text-lg">
            <time dateTime={dateConverter.toDate(data.data?.date)}>
              {dateConverter.toDate(data.data?.date)}
            </time>
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          {
            <div
              className={""}
              dangerouslySetInnerHTML={{
                __html: data.data?.content.rendered || "<div></div>",
              }}
            />
          }
        </div>
      </article>
    </div>
  );
};

export default Post;
