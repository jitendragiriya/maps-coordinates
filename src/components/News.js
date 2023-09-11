import React, { useEffect, useState } from "react";
import Aritcle from "./Aritcle";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const apiKey = `${process.env.REACT_APP_NEWS_API_KEY}`; // Replace with your actual News API key

 

  const fetchNewsData = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setNewsData(data.articles);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  return (
    <main className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {newsData && typeof newsData === "object" && newsData?.length
        ? newsData?.map((article, index) => (
            <Aritcle article={article} key={index} />
          ))
        : null}
    </main>
  );
};

export default News;
