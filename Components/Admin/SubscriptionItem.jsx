import React from "react";

const SubscriptionItem = ({ email, date, deleteEmails, id }) => {
  const mongoId = id;
  const handleDelete = () => {
    // Call the deleteBlog function passed via props, and pass mongoId to it
    deleteEmails(mongoId);
  };
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4 cursor-pointer">
        {email ? email : "Not Found"}
      </td>
      <td className="px-6 py-4 cursor-pointer">{date ? date : "Not Found"}</td>
      <td className="px-6 py-4 cursor-pointer">
        <button onClick={handleDelete} className="text-red-600">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SubscriptionItem;
