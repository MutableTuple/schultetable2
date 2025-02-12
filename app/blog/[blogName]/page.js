import BlogPost from "@/app/_components/BlogPost";
import { getBlogBySlugName } from "@/app/_lib/data-service";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export async function generateMetadata({ params }) {
  const { blogName } = params;
  const singleBlog = await getBlogBySlugName(blogName);

  if (!singleBlog || singleBlog.length === 0) {
    return {
      title: "Blog Not Found | SchulteTable.com",
      description: "This blog post could not be found.",
    };
  }

  const blog = singleBlog[0];
  const siteUrl = `https://schultetable.com/blog/${blog.slug}`;

  return {
    title: `${blog.title} | SchulteTable.com`,
    description: blog.excerpt || blog.content.substring(0, 150) + "...",
    alternates: { canonical: siteUrl },
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.content.substring(0, 150) + "...",
      url: siteUrl,
      siteName: "SchulteTable",
      images: [
        {
          url: blog.image || "/default-blog-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
      publishedTime: blog.published_at,
      authors: [blog.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt || blog.content.substring(0, 150) + "...",
      images: [blog.image || "/default-blog-image.jpg"],
    },
  };
}

export default async function Page({ params }) {
  const { blogName } = params;
  const singleBlog = await getBlogBySlugName(blogName);

  if (!singleBlog || singleBlog.length === 0) {
    return <p className="text-center text-red-500">Blog not found.</p>;
  }

  return (
    <div className={`${poppins.className} `}>
      <BlogPost singleBlog={singleBlog} />
    </div>
  );
}
