import { connectDB } from "@/Lib/Config/db";
import EmailModel from "@/Lib/Models/EmailModel";
import axios from "axios";
import { NextResponse } from "next/server";

const loadDB = async () => {
  await connectDB();
};

loadDB();

// Endpoint to Add Email

export async function POST(request) {
  const formData = await request.formData();
  const emailData = {
    email: `${formData.get("email")}`,
  };
  await EmailModel.create(emailData);
  return NextResponse.json({ success: true, msg: "Email Subscribed" });
}

// Endpoint to Get All Emails

export async function GET(request) {
  const emails = await EmailModel.find({});
  return NextResponse.json({ success: true, msg: "Emails Found", emails });
}

// Endpoint to Delete emails

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const email = await EmailModel.findById(id);
  // fs.unlink(`./public${blog.image}`, () => {});
  await EmailModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Email Deleted" });
}
