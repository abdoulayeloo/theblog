import { client } from "./client"

export async function getPosts() {
    const query = `*[_type == "post"]`;
    return await client.fetch(query);
}

export async function getPost(slug: string) {
    const query = `*[_type in ["post"] && slug.current == $slug][0]{
    _id, title, mainImage, body, author, publishedAt
    }`;
    return await client.fetch(query, { slug, });
}

export async function getCategories() {
    const query = `*[_type == "category"][0...16]{title, slug}`;
    return await client.fetch(query);
}

export async function getPostsByCategory(categorySlug: string) {
    const query = `
  *[_type in ["post"] && "${categorySlug}" in categories[]->slug.current]{
      _id,
      title,
      slug,
      mainImage,
      "author": author->name,
      "publishedAt": publishedAt,
      "categories": categories[]->title,
      body
    }`;
    const posts = await client.fetch(query);
    return posts;
}