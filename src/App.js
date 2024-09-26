import React, { useEffect, useState, useCallback } from "react";
import './Components/style.css';
import { AnimeList } from "./Components/AnimeList";
import { AnimeInfo } from "./Components/AnimeInfo";
import { AddToList } from "./Components/AddToList";
import { RemoveFromList } from "./Components/RemoveFromList";

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function App() {
  const [search, setSearch] = useState('Naruto');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [animeData, setAnimeData] = useState([]);
  const [animeInfo, setAnimeInfo] = useState();
  const [myAnimeList, setMyAnimeList] = useState([]);
  const [recommendedAnime, setRecommendedAnime] = useState([]);
  const [userChoiceRecommendations, setUserChoiceRecommendations] = useState([]);
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Theme state

  const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Adventure' },
    { id: 3, name: 'Fantasy' },
    { id: 4, name: 'Romance' },
  ];

  const addTo = (anime) => {
    const index = myAnimeList.findIndex((myanime) => myanime.mal_id === anime.mal_id);
    if (index < 0) {
      setMyAnimeList([...myAnimeList, anime]);
      updateUserChoiceRecommendations(anime.genres);
    }
  };

  const removeFrom = (anime) => {
    const newArray = myAnimeList.filter((myanime) => myanime.mal_id !== anime.mal_id);
    setMyAnimeList(newArray);
    setUserChoiceRecommendations([]);
  };

  const updateUserChoiceRecommendations = async (genres) => {
    const genreIds = genres.map(genre => genre.mal_id).join(',');
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?genres=${genreIds}&limit=6`);
      const data = await res.json();
      setUserChoiceRecommendations(data.data);
    } catch (error) {
      console.error("Error fetching user choice recommendations:", error);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const genreQuery = selectedGenres.length ? `&genres=${selectedGenres.join(',')}` : '';
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}${genreQuery}&limit=6`);
      const resData = await res.json();
      setAnimeData(resData.data);
    } catch (error) {
      console.error("Error fetching anime data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRecommendedData = async () => {
    try {
      const recommendedRes = await fetch(`https://api.jikan.moe/v4/anime?order_by=score&sort=desc&limit=6`);
      const recommendedData = await recommendedRes.json();
      setRecommendedAnime(recommendedData.data);
    } catch (error) {
      console.error("Error fetching recommended anime:", error);
    }
  };

  const getAnimeByGenre = async (genreId) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?genres=${genreId}&limit=6`);
      const resData = await res.json();
      setFilteredAnime(resData.data);
    } catch (error) {
      console.error("Error fetching anime by genre:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(debounce(getData, 500), [search, selectedGenres]);

  useEffect(() => {
    debouncedFetch();
  }, [search, debouncedFetch, selectedGenres]);

  useEffect(() => {
    getRecommendedData();
  }, []);

  const handleGenreClick = (genreId) => {
    setSelectedGenres((prev) => 
      prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId]
    );
    getAnimeByGenre(genreId);
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <div className="header" data-bs-theme="light">
        <h1>MyAnimeList</h1>
        <button onClick={toggleTheme}>
          Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
        <div className="search-box">
          <input
            type="search"
            placeholder="Search your anime"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="genres">
          <h2 className="text-heading">Genres</h2>
          <ul style={{ overflowY: 'auto', maxHeight: '100px' }}>
            {genres.map((genre) => (
              <li 
                key={genre.id} 
                onClick={() => handleGenreClick(genre.id)}
                style={{ cursor: 'pointer', color: selectedGenres.includes(genre.id) ? 'blue' : 'aqua' }}
              >
                {genre.name}
              </li>
            ))}
          </ul>
          
        </div>
      </div>
      
      <div className="container" >
        {loading && <p>Loading...</p>}
        <div className="animeInfo">
          {animeInfo && <AnimeInfo animeInfo={animeInfo} />}
        </div>
        <div className="anime-row">
          <h2 className="text-heading">Anime</h2>
          <div className="row">
            <AnimeList
              animelist={animeData}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={addTo}
            />
          </div>

          <h2 className="text-heading">My List</h2>
          <div className="row">
            <AnimeList
              animelist={myAnimeList}
              setAnimeInfo={setAnimeInfo}
              animeComponent={RemoveFromList}
              handleList={removeFrom}
            />
          </div>

          <h2 className="text-heading">Recommended Anime</h2>
          <div className="row">
            <AnimeList
              animelist={recommendedAnime}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={addTo}
            />
          </div>

          <h2 className="text-heading">Your Choice Recommendations</h2>
          <div className="row">
            <AnimeList
              animelist={userChoiceRecommendations}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={addTo}
            />
          </div>

          <h2 className="text-heading">Filtered Anime by Genre</h2>
          <div className="row">
            <AnimeList
              animelist={filteredAnime}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={addTo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
