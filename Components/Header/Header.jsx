"use client";
import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/Assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

function Header() {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/Api/Email", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="px-5 py-5 md:px-12 lg:px-28">
      <div className="flex items-center justify-between">
        <Image src={assets.logo} width={120} className="w-[120px] sm:w-auto" />
        <button className="flex items-center font-medium py-1 px-3 sm:py-2 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000] ">
          Get Started <Image src={assets.arrow} className="mx-3 " width={12} />
        </button>
      </div>
      <div className="text-center mb-8 mt-16">
        <h1 className="text-3xl sm:text-5xl font-medium ">Latest Blogs</h1>
        <p className="mt-8 text-xsm sm:text-base m-auto max-w-[740px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
          necessitatibus cumque esse corrupti, expedita voluptates!
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between items-center max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000] "
        >
          <input
            type="text"
            placeholder="Enter Your Email Address"
            className="pl-4 outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button
            type="submit"
            className="border-l border-black  py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default Header;
