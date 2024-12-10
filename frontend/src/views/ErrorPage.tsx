import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex font-light h-screen w-screen justify-center items-center p-4">
      <div className="flex sm:pt-[80px] justify-center items-center flex-col max-w-[62rem] w-full relative text-center">
        <div className="text-2xl text-red-900 md:text-6xl">
          {" "}
          Ooops, Something Went Wrong {":("}
        </div>
        <div className="text-xl pt-10 md:text-4xl">
          {" "}
          We could not find the route!
        </div>
        <div className="flex justify-center gap-5 mt-6">
          <Link
            className="p-3 flex justify-center items-center w-full h-[4rem] mt-[2rem] bg-blue-200 hover:bg-blue-300 rounded-3xl text-center md:text-xl" // Mobil uyumlu genişlik ayarlandı
            to="/"
          >
            {"< "}Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
