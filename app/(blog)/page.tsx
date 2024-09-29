import PostCard from "@/components/Card";
import CategoryPosts from "@/components/CategoryPosts";

async function Home() {
  return (
    <div className="container mx-auto my-20">
      <CategoryPosts />
      <div className="flex flex-col items-start gap-5 md:flex-row">
        <div className="w-full md:w-3/4"></div>
        <div className="w-full md:w-full"></div>
      </div>
    </div>
  );
}
export default Home;