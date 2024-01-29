import { useEffect, useState } from "react";
import CardHome from "../components/CardHome";
import axios from "axios";
import Testimony from "../components/Testimony";
import News from "../components/News";
import { fetchNews, fetchVenues } from "../store/appSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { venues, news } = useSelector((state) => state.appReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(venues);
    dispatch(fetchVenues());
  }, []);

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 lg:py-36 bg-white">
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">
            <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-sky-600 blur-xl opacity-60 lg:opacity-95 lg:block hidden"></span>
            <span className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-blue-400 blur-xl opacity-80"></span>
          </div>
          <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-rose-500 to-sky-600 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
          <div className="relative flex flex-col items-center text-center lg:text-left lg:py-7 xl:py-8 lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
            <h1 className="text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900">
              Find, Create, Have Fun in<span className="text-transparent bg-clip-text bg-gradient-to-br from-rose-500 from-20% via-sky-600 via-30% to-blue-400"> Sports</span> With Us Now.
            </h1>
            <p className="mt-8 text-gray-700">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores repellat perspiciatis aspernatur quis voluptatum porro incidunt, libero sequi quos eos velit</p>
            <div className="mt-5 w-full flex max-w-md mx-auto lg:mx-0">
              <div className="flex sm:flex-row flex-col gap-5 w-full">
                <a
                  href="#venue"
                  className="flex text-white justify-center items-center w-max min-w-max sm:w-max px-6 h-12 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-[#172554] hover:after:opacity-100 hover:after:scale-[2.5] bg-blue-600 border-transparent hover:border-[#172554]"
                >
                  <span className="hidden sm:flex relative z-[5]">Book Now</span>
                  <span className="flex sm:hidden relative z-[5]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-1 lg:w-1/2 lg:h-auto relative lg:max-w-none lg:mx-0 mx-auto max-w-3xl">
            <img
              src="https://images.unsplash.com/photo-1680762377870-9ff8865f2b20?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hero image"
              width="2350"
              height="2359"
              className="lg:absolute lg:w-full lg:h-full rounded-3xl object-cover lg:max-h-none max-h-96"
            />
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-bl from-blue-50 to-violet-50 flex justify-center lg:h-100">
        <div className="container mx-auto px-4 py-10" id="venue">
          <h1 className="text-3xl leading-tight text-center sm:text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900">Venues</h1>
          <p className="text-sm leading-tight text-center sm:text-md md:text-lg xl:text-xl font-bold text-gray-900 py-12">Find venue that suites you</p>
          <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 gap-20 md:grid-cols-2 gap-10 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {venues &&
              venues.map((venue) => {
                return <CardHome key={venue.id} venue={venue} />;
              })}
          </div>
        </div>
      </div>

      <Testimony />
      <section className="flex flex-col justify-center max-w-7xl px-4 py-10 mx-auto sm:px-6" id="news">
        <h2 className="my-6 text-2xl font-semibold text-gray-900 md:text-3xl">Sports News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-1 my-4">
          {news &&
            news.articles?.map((article) => {
              return <News key={article.publishedAt} article={article} />;
            })}
        </div>
      </section>
    </>
  );
}
