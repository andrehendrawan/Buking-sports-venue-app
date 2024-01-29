export default function News({ article }) {
  return (
    <>
      <div className="p-4 flex flex-col justify-between border rounded-lg shadow-md">
        <a className="block mb-2 text-xl font-semibold text-blue-600 hover:underline" href={article.url}>
          {article.title}
        </a>

        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          <span className="px-2 py-0.5 font-semibold mb-2">source: {article.source.name}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          <span className="px-2 py-0.5 rounded-full bg-gray-100">Sports</span>
        </div>

        <p className="mt-2 text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sapiente iure quae minima sit hic id officia vitae accusamus earum!</p>

        <div className="flex items-center justify-between mt-4 text-sm">
          <button className="text-gray-500">2 min read</button>

          <a href={article.url} className="text-blue-600 hover:underline">
            Read more
          </a>
        </div>
      </div>

      {/* Repeat the structure for the remaining articles */}
    </>
  );
}
