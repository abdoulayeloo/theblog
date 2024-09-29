import { client } from "@/sanity/lib/client";
import { getPost } from "@/sanity/lib/queries";
import { Post as PostType } from "@/typings";
import React from "react";
import BodyComponent from "./PortableTextComponent";
import { urlFor } from "@/sanity/lib/image";

type Props = {
  slug: string;
};

async function Post({ slug }: Props) {
  const post: PostType = await getPost(slug);
  return (
    <div className="flex flex-col space-y-3">
      <h1 className="text-lg font-bold">{post.title}</h1>
      <span className="text-sm font-light">
        {new Date(post.publishedAt).toLocaleString("fr-SN", {
          day: "2-digit",
          month: "short",
          year: "2-digit",
        })}
      </span>
      <img
        src={urlFor(post.mainImage).width(800).height(400).fit("max").url()}
        alt={post.title}
      />
      <BodyComponent value={post.body} />
    </div>
  );
}

export default Post;
