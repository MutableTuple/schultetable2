"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { supabase } from "../_lib/supabase";
import { formatNumber } from "../utils/formatNumber";

export default function BlogPost({ singleBlog }) {
  const router = useRouter();
  const blog = singleBlog[0];

  const [views, setViews] = useState(blog.views);
  const [likes, setLikes] = useState(blog.likes || 0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const updateViewsInDB = async () => {
      const { error } = await supabase
        .from("Blogs")
        .update({ views: views + 1 })
        .eq("id", blog.id);

      if (!error) {
        setViews((prev) => prev + 1);
      } else {
        console.error("Error updating views:", error);
      }
    };

    updateViewsInDB();
  }, [blog.id]);

  const handleLike = async () => {
    if (liked) return;

    const newLikes = likes + 1;
    setLikes(newLikes);
    setLiked(true);

    const { error } = await supabase
      .from("Blogs")
      .update({ likes: newLikes })
      .eq("id", blog.id);

    if (error) {
      console.error("Error updating likes:", error);
      setLikes(likes);
      setLiked(false);
    }
  };

  return (
    <div className="min-h-screen  md:p-10 ">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 space-y-6">
        <button
          onClick={() => router.back()}
          className="mb-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          &larr; Back
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-relaxed mb-6">
          {blog.title}
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          By {blog.author}
        </p>

        {/* Markdown Content with Proper Styling & Image Support */}
        <div className="prose prose-lg max-w-full text-gray-700 leading-relaxed space-y-6">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              img: ({ src, alt }) => (
                <img src={src} alt={alt} className="w-full h-auto  my-6" />
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>

        {/* Views & Likes Section */}
        <div className="flex items-center justify-between text-gray-600 text-sm mt-8">
          <div className="flex items-center space-x-2">
            <AiOutlineEye className="w-5 h-5" />
            <span>{formatNumber(views)}</span>
          </div>

          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 ${
              liked ? "text-red-500" : "text-gray-600"
            }`}
          >
            <AiOutlineHeart className="w-5 h-5" />
            <span>{formatNumber(likes)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
