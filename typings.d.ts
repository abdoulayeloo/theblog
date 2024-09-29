import { SanityClient } from "sanity";

interface SanityBody {
    _id: string;
    _rev: string;
    _createdAt: string;
    _updatedAt: string;
}

interface Image {
    _type: "image";
    alt: string;
    asset: {
        _ref: string;
        _type: "reference";
    }
    publishedAt: string;
}

interface Slug {
    _type: "slug";
    current: any;
}

export interface Author {
    _type: "author";
    name: string;
    image: Image;
    bio: any;

}

export interface Category extends SanityBody {
    _type: "category";
    title: string;
    description: string;
    slug: Slug;
}

export interface Post extends SanityBody {
    _type: "post";
    title: string;
    slug: Slug
    publishedAt: string;
    body: any;
    categories: Category[];
    mainImage: Image;
    author: any;
}