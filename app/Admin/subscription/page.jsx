"use client";
import SubscriptionItem from "@/Components/Admin/SubscriptionItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmail = async () => {
    try {
      const response = await axios.get("/Api/Email");
      if (response.data.success && Array.isArray(response.data.emails)) {
        setEmails(response.data.emails); // Assuming "emails" is an array in the response
      } else {
        setEmails([]); // Fallback if no emails are returned
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
      setEmails([]); // Fallback in case of an error
    }
  };

  const deleteEmails = async (mongoId) => {
    console.log("Deleting Email with ID:", mongoId); // Add this for debugging
    const response = await axios.delete("/Api/Email/", {
      params: {
        id: mongoId,
      },
    });
    toast.success(response.data.msg);
    fetchEmail();
  };

  useEffect(() => {
    fetchEmail();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-xl mb-5">All Subscriptions</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(emails) && emails.length > 0 ? (
              emails.map((item) => (
                <SubscriptionItem
                  key={item._id}
                  id={item._id}
                  email={item.email}
                  date={item.date}
                  deleteEmails={deleteEmails}
                />
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No subscriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
