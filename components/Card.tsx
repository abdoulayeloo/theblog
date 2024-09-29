import { client } from "@/sanity/lib/client";
import { getPosts } from "@/sanity/lib/queries";
import { Post as PostType } from "@/typings";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const PostCard = async () => {
  const posts: PostType[] = await getPosts();
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {posts.map((post) => {
        return (
          <Link href={`posts/${post.slug.current}`}>
            <Card
              className="h-full place-content-between overflow-hidden"
              key={post._id}
            >
              <Image
                src={urlFor(post.mainImage).auto("format").url()}
                alt={post.title}
                width={800}
                height={400}
                objectFit="cover"
              />
              <CardHeader>
                <h2>{post.title}</h2>
              </CardHeader>
              <CardFooter className="space-x-3">
                <p>
                  {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default PostCard;
