"user client";
import Header from "@/Components/Header/Header";
import BlogList from "@/Components/BlogList/BlogList";
import Footer from "@/Components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <div>
      <ToastContainer theme="dark" />

      <Header />
      <BlogList />
      <Footer />
    </div>
  );
}
