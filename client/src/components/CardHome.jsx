import { Link, useParams } from "react-router-dom";
export default function CardHome({ venue }) {
  return (
    <>
      {/* Replace this with your grid items */}
      <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md my-5">
        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
          <img src={venue.imageUrl} alt="img-blur-shadow" layout="fill" />
        </div>
        <div className="p-6">
          <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">{venue.name}</h5>
          <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">{venue.description}</p>
        </div>
        <div className="p-6 pt-0">
          <Link
            to={`/venues/detail/${venue.id}`}
            className="select-none rounded-lg bg-blue-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-light="true"
          >
            BOOK NOW
          </Link>
        </div>
      </div>
      {/* Repeat the structure for each grid item */}
    </>
  );
}
