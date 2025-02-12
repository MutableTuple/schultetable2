"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatNumber } from "../utils/formatNumber";
import { supabase } from "../_lib/supabase";
import ReactMarkdown from "react-markdown";

export default function Blogs({ blogs }) {
  const router = useRouter();
  const [likes, setLikes] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("likedBlogs") || "{}");
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem("likedBlogs", JSON.stringify(likes));
  }, [likes]);

  const updateLikesInDB = async (blogId, isLiked) => {
    const { data: blog, error: fetchError } = await supabase
      .from("Blogs")
      .select("likes")
      .eq("id", blogId)
      .single();

    if (fetchError) {
      console.error("Error fetching likes:", fetchError);
      return;
    }

    const { error } = await supabase
      .from("Blogs")
      .update({ likes: isLiked ? blog.likes + 1 : blog.likes - 1 })
      .eq("id", blogId);

    if (error) console.error("Error updating likes:", error);
  };

  const handleLike = (blogId) => {
    setLikes((prevLikes) => {
      const updatedLikes = { ...prevLikes };
      const isLiked = !updatedLikes[blogId];
      updatedLikes[blogId] = isLiked;
      updateLikesInDB(blogId, isLiked);
      return updatedLikes;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          &larr; Back
        </button>

        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
          Latest Blog Posts
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer"
            >
              <Link href={`/blog/${blog.slug}`}>
                <h2 className="text-xl font-semibold line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">By {blog.author}</p>
                <div className="text-gray-700 mb-4 line-clamp-3">
                  <ReactMarkdown>
                    {blog.content.length > 150
                      ? blog.content.slice(0, 150) + "..."
                      : blog.content}
                  </ReactMarkdown>
                </div>
              </Link>

              <div className="flex items-center justify-between text-gray-600 text-sm mt-4">
                <div className="flex items-center space-x-2">
                  <AiOutlineEye className="w-5 h-5" />
                  <span>{formatNumber(blog.views)}</span>
                </div>
                <button
                  onClick={() => handleLike(blog.id)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <AiOutlineHeart
                    className={`w-5 h-5 ${
                      likes[blog.id] ? "text-red-500" : "text-gray-500"
                    }`}
                  />
                  <span>
                    {formatNumber(blog.likes + (likes[blog.id] ? 1 : 0))}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
