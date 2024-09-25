import { assets, blog_data } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const BlogTableItem = ({
  authorImg,
  title,
  author,
  date,
  deleteBlog,
  mongoId,
}) => {
  const blogDate = new Date(date);
  const handleDelete = () => {
    // Call the deleteBlog function passed via props, and pass mongoId to it
    deleteBlog(mongoId);
  };
  return (
    <tr className="bg-white border-b flex justify-between">
      <th
        scope="row"
        className="items-center w-full flex justify-between gap-3  sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <td>
          <Image
            src={authorImg ? authorImg : assets.profile_icon}
            alt="Author Image"
            width={50}
            height={50}
          />
          {author ? author : "No Author"}
        </td>
        <td className="px-6 py-4">{title ? title : "Not Available"}</td>
        <td className="px-6 py-4">{blogDate.toDateString()}</td>
        <td className="px-6 py-4 cursor-pointer">
          <button onClick={handleDelete} className="text-red-600">
            Delete
          </button>
        </td>
      </th>
    </tr>
  );
};

export default BlogTableItem;
