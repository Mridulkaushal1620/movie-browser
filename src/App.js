import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Select } from "./components/ui/select";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const API_KEY = "4acae783d678db46a2dc153881a5895b";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });
  const [filters, setFilters] = useState({ genre: "", year: "", rating: "" });
  const [genres, setGenres] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        setGenres(res.data.genres);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };
    fetchGenres();
  }, []);

  const fetchMovies = async (reset = false) => {
    try {
      const url = query
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${reset ? 1 : page}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${reset ? 1 : page}`;
      const res = await axios.get(url);
      setMovies(reset ? res.data.results : (prev) => [...prev, ...res.data.results]);
      if (reset) setPage(1);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    fetchMovies(true);
  }, [query]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (page > 1) fetchMovies();
  }, [page]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const toggleFavorite = (movie) => {
    const exists = favorites.find((m) => m.id === movie.id);
    const updated = exists
      ? favorites.filter((m) => m.id !== movie.id)
      : [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const applyFilters = (movie) => {
    const { genre, year, rating } = filters;
    if (year && new Date(movie.release_date).getFullYear() !== parseInt(year)) return false;
    if (rating && movie.vote_average < parseFloat(rating)) return false;
    if (genre && (!movie.genre_ids || !movie.genre_ids.includes(parseInt(genre)))) return false;
    return true;
  };

  const displayedMovies = showFavorites ? favorites : movies.filter(applyFilters);

  return (
    <div className="container py-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container-fluid px-4 py-2">
          <a className="navbar-brand fw-bold fs-3 " href="/" style={{ color : "black" }}>
            🎬 MovieBrowser
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="ms-auto d-flex flex-wrap align-items-center gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search movies..."
                value={query}
                onChange={handleSearch}
                style={{ maxWidth: "250px" }}
              />
              <button
                className="btn btn-outline-dark"
                onClick={() => setShowFavorites(false)}
                disabled={!showFavorites}
              >
                All Movies
              </button>
              <button
                className="btn btn-outline-dark"
                onClick={() => setShowFavorites(true)}
                disabled={showFavorites}
              >
                Favorites
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="row my-4">
        <div className="col-md-4 mb-2">
          <Select onChange={(e) => setFilters({ ...filters, genre: e.target.value })}>
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </Select>
        </div>
        <div className="col-md-4 mb-2">
          <Input
            type="number"
            placeholder="Release Year"
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          />
        </div>
        <div className="col-md-4 mb-2">
          <Input
            type="number"
            placeholder="Min Rating"
            onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
          />
        </div>
      </div>

      <div className="row">
        {displayedMovies.map((movie) => (
          <div className="col-md-3 mb-4" key={movie.id}>
            <div className="card h-100 shadow-sm movie-card">
              <img
                src={IMG_BASE + movie.poster_path}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">
                  {movie.overview?.slice(0, 100)}...
                </p>
                <span className="badge bg-info text-dark mb-2">⭐ {movie.vote_average}</span>
                <a
                  href={`https://www.themoviedb.org/movie/${movie.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm w-100"
                >
                  Read More
                </a>
              </div>
              <div className="card-footer">
                <small className="text-muted d-block mb-2">Released: {new Date(movie.release_date).toDateString()}</small>
                <Button
                  className={`btn btn-sm w-100 ${favorites.find((m) => m.id === movie.id) ? 'btn-danger' : 'btn-outline-dark'}`}
                  onClick={() => toggleFavorite(movie)}
                >
                  {favorites.find((m) => m.id === movie.id) ? "Unfavorite ❤️" : "Favorite"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
