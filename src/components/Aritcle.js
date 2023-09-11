import React from "react";

const Aritcle = ({ article }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-500 rounded-lg overflow-hidden dark:bg-[#3f3f3f] bg-white">
      <img
        src={article.urlToImage || "/placeholder-image.jpg"}
        alt={article.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {article.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {article.description}
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default Aritcle;
