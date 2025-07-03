import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main className="background font-roboto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
