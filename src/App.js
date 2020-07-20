import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const App = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();

  //prettier-ignore
  // eslint-disable-next-line
  useEffect(() => { getNews();}, []);

  const getNews = () => {
    setLoading(true);
    axios
      .get(`https://hn.algolia.com/api/v1/search?query=${query}`)
      .then((res) => {
        console.log(res.data.hits);
        setNews(res.data.hits);
        setLoading(false);
      })
      .catch((err) => setError(err));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getNews();
  };

  const handleClearSearch = (e) => {
    setQuery('');
    searchInputRef.current.focus();
  };

  return (
    <div className="container mt-5 mx-auto p-4 bg-blue-lightest  shadow-lg rounded">
      <h1 className="text-grey-darkest font-bold text-center mb-2">
        Latest News
      </h1>
      <form onSubmit={handleSearch} className="mb-5 text-center content-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={searchInputRef}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-green rounded m-1 p-2">
          Search news
        </button>
        <button
          type="button"
          onClick={handleClearSearch}
          className="bg-teal p-2 rounded"
        >
          Clear search
        </button>
      </form>
      {!loading ? (
        <ul className="list-reset leading-normal">
          {news.map((n) => (
            <li key={n.objectID}>
              <a
                href={n.url}
                className="no-underline text-indigo-dark hover:text-indigo-darkest"
              >
                {n.title}
              </a>{' '}
              - {n.num_comments} comments
            </li>
          ))}
        </ul>
      ) : (
        <div className="font-bold text-orange-dark">Loading news...</div>
      )}
      {error ? <div className="text-red font-bold">{error.message}</div> : ''}
    </div>
  );
};

export default App;
