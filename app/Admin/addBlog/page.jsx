"use client";
import { assets } from "@/Assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Page = () => {
  // State management
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Hasara",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);

    const response = await axios.post("../Api/blog", formData); // It's should be set for the root directory

    if (response.data.success) {
      toast.success(response.data.msg);
      setImage(false);
      setData({
        title: "",
        description: "",
        category: "Startup",
        author: "Hasara",
        authorImg: "/author_img.png",
      });
    } else {
      toast.error("Error");
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl">Upload Thumbnail</p>
        <label htmlFor="image">
          <Image
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            width={140}
            height={70}
            alt="Upload thumbnail"
            className="mt-4"
          />
        </label>
        <input
          onChange={onFileChange}
          type="file"
          name="image"
          id="image"
          hidden
          required
        />
        <p className="text-xl mt-4">Blog Title</p>
        <label htmlFor="title">
          <input
            className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
            type="text"
            onChange={onChangeHandler}
            value={data.title}
            name="title"
            id="title"
            placeholder="Enter Blog Title"
            required
          />
        </label>
        <p className="text-xl mt-4">Blog Description</p>
        <label htmlFor="description">
          <textarea
            rows={6}
            className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
            onChange={onChangeHandler}
            name="description"
            value={data.description}
            id="description"
            placeholder="Enter Blog Content"
            required
          />
        </label>
        <p className="text-xl mt-4">Blog Category</p>
        <select
          onChange={onChangeHandler}
          value={data.category}
          name="category"
          id="category"
          className="w-40 mt-4 px-4 py-3 border"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-1/2 h-12 bg-black text-white">
          Create Blog
        </button>
      </form>
    </>
  );
};

export default Page;
