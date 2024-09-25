"use client";
import React, { useEffect, useState } from "react";
import BlogItem from "../BlogItem/BlogItem";
import { blog_data } from "@/Assets/assets"; // Ensure this path is correct
import axios from "axios";

const BlogList = () => {
  const [menu, setMenu] = useState("All");

  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    const response = await axios.get("/Api/blog");
    setBlogs(response.data.blogs);
    console.log(response.data.blogs);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu("All")}
          className={
            menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          {" "}
          All
        </button>
        <button
          onClick={() => setMenu("Technology")}
          className={
            menu === "Technology"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          {" "}
          Technology
        </button>
        <button
          onClick={() => setMenu("Lifestyle")}
          className={
            menu === "Lifestyle"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          {" "}
          LifeStyle
        </button>
        <button
          onClick={() => setMenu("Startup")}
          className={
            menu === "Startup" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          {" "}
          Startup
        </button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blogs
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item) => (
            <BlogItem
              key={item._id}
              id={item._id}
              image={item.image}
              description={item.description}
              category={item.category}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
