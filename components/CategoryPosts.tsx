"use client";
import { getCategories, getPostsByCategory } from "@/sanity/lib/queries";
import { Category, Post } from "@/typings";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

// type Category = {
//   title: string;
//   slug: { current: string };
// };

// type Post = {
//   _id: string;
//   title: string;
//   slug: { current: string };
// };

const CategoryPosts = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Fetch categories on load
  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategories();
      setCategories(categories);
    }
    fetchCategories();
  }, []);

  // Fetch posts by category when category is selected
  const handleCategoryClick = async (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    const posts = await getPostsByCategory(categorySlug);
    setPosts(posts);
  };

  return (
    <div className="container">
      {/* Categories Menu */}
      <div className="mb-6">
        <ul className="flex items-center justify-center space-x-4 overflow-x-scroll scrollbar-hide">
          {categories.length > 0
            ? categories.map((category) => (
                <li key={category.slug.current}>
                  <Button
                    onClick={() => handleCategoryClick(category.slug.current)}
                    className={`${
                      selectedCategory === category.slug.current
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {category.title}
                  </Button>
                </li>
              ))
            : ""}
        </ul>
      </div>
      {/* Display Posts */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                width={500}
                height={300}
                className="h-[200px] w-full object-cover"
              />
              <CardHeader>
                <h2 className="text-lg font-semibold">{post.title}</h2>
              </CardHeader>
              <CardFooter className="">
                <Link
                  href={`/posts/${post.slug.current}`}
                  className="hover:bg-primary-dark flex items-center justify-center rounded-md bg-primary p-2 text-white"
                >
                  Lire la suite
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Pas de posts disponible pour cette catgorie
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPosts;
