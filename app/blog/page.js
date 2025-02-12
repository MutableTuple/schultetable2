import React from "react";
import Blogs from "../_components/Blogs";
import { getAllBlogs } from "../_lib/data-service";
import Head from "next/head";
import { Poppins } from "next/font/google";

// Import Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default async function Page() {
  const blogs = await getAllBlogs();

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>Latest Blogs | Stay Updated with Insights</title>
        <meta
          name="description"
          content="Read the latest blogs and insights on various topics. Stay informed with fresh, engaging articles."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="Latest Blogs | Stay Updated with Insights"
        />
        <meta
          property="og:description"
          content="Discover engaging blog posts on various topics and trends. Get the latest updates here!"
        />
        <meta property="og:type" content="website" />
      </Head>

      <main className={`${poppins.className} min-h-screen `}>
        <Blogs blogs={blogs} />
      </main>
    </>
  );
}
