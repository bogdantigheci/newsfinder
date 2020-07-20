import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const App = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();

  //prettier-ignore
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getNews();}, []);

  const getNews = () => {
    setLoading(true);
    axios
      .get(`http://hn.algolia.com/api/v1/search?query=${query}`)
      .then((res) => {
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
    <div className="container-fluid mx-auto p-4 bg-blue-lightest  shadow-lg rounded">
      <h1 className="text-grey-darkest font-thin text-center ">News search</h1>
      <form onSubmit={handleSearch} className="mb-2 text-center content-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button type="submit" className="bg-green rounded m-1 p-1">
          Search news
        </button>
        <button
          type="button"
          onClick={handleClearSearch}
          className="bg-teal p-1 rounded"
        >
          Clear search
        </button>
      </form>
      {!loading ? (
        <ul className="list-reset leading-normal">
          {news.map((n) => (
            <li
              key={n.objectID}
              className="text-indigo-dark hover:text-indigo-darkest"
            >
              <a href={n.url} className="no-underline">
                {n.title}
              </a>
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
