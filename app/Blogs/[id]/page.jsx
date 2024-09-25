"use client";
import { blog_data } from "@/Assets/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { assets } from "@/Assets/assets";
import Footer from "@/Components/Footer/Footer";
import Link from "next/link";
import axios from "axios";

const page = ({ params }) => {
  const [data, setData] = useState([]);

  const fetchBlogData = async () => {
    const response = await axios.get("/Api/blog", {
      params: {
        id: params.id,
      },
    });

    setData(response.data.blog);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);
  return data ? (
    <>
      <div className="px-5 py-5 bg-gray-200 md:px-12  lg:px-28">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src={assets.logo}
              width={120}
              className="w-[120px] sm:w-auto"
            />
          </Link>

          <button className="flex items-center font-medium py-1 px-3 sm:py-2 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000] ">
            Get Started <Image src={data.arrow} className="mx-3 " width={12} />
          </button>
        </div>
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-medium max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            className="mx-auto mt-6 rounded-full"
            src={data.authorImg}
            width={60}
            height={60}
            alt=""
          />
          <p className="mt-5 mb-4 text-lg">{data.author}</p>
        </div>
      </div>
      <div className="border-8 border-white mx-5 max-w-[800px] md:mx-auto mb-10 mt-[-90px] rounded-8">
        <Image src={data.image} width={1280} height={720} alt="" className="" />

        <div
          className="blog-content mt-9"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        <div className="my-24 flex justify-between">
          <p className="my-4 text-black font-semibold">
            Share This Article On :
          </p>
          <div className="flex">
            <Image src={assets.facebook_icon} width={50} alt="" />
            <Image src={assets.twitter_icon} width={50} alt="" />
            <Image src={assets.googleplus_icon} width={50} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default page;
