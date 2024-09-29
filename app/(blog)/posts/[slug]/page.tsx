import Post from "@/components/Post";

type Props = {
  params: {
    slug: string;
  };
};
async function Page({ params }: Props) {
  const slug = params.slug;

  return (
    <div className="container mx-auto my-10">
      <div className="mx-auto max-w-2xl">
        <Post slug={slug} />
      </div>
    </div>
  );
}

export default Page;

// import BodyComponent from "@/components/PortableTextComponent";
// import { client } from "@/sanity/lib/client";

// export async function getPost(slug: string) {
//   const query = `*[_type == "post" && slug.current == $slug][0]{
//     _id,
//     title,
//     body
//   }`;
//   const post = await client.fetch(query, { slug });
//   return post;
// }

// export default async function PostPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const post = await getPost(params.slug);

//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <BodyComponent value={post.body} />
//     </div>
//   );
// }
