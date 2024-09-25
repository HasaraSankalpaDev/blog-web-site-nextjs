"use client";
import BlogTableItem from "@/Components/Admin/BlogTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get("/Api/blog");
    setBlogs(response.data.blogs);
  };

  const deleteBlog = async (mongoId) => {
    console.log("Deleting blog with ID:", mongoId); // Add this for debugging
    const response = await axios.delete("/Api/blog/", {
      params: {
        id: mongoId,
      },
    });
    toast.success(response.data.msg);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] owerflow-x-auto mt-4 border border-gray scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
            <tr className="flex justify-between">
              <th scope="col" className="hidden sm:block px-6 py-3">
                Author Name
              </th>
              <th scope="col" className="sm:block px-6 py-3">
                Blog Title
              </th>
              <th scope="col" className="sm:block px-6 py-3">
                Date
              </th>
              <th scope="col" className="sm:block px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item) => {
              return (
                <BlogTableItem
                  key={item._id}
                  mongoId={item._id}
                  title={item.title}
                  author={item.author}
                  authorImg={item.authorImg}
                  date={item.date}
                  deleteBlog={deleteBlog} // Pass deleteBlog prop to the child component
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
