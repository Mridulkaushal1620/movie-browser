import React from "react";

const MovieCard = ({ movie, toggleFavorite, isFavorite }) => {
  const IMG_BASE = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="card my-3 position-relative">
      <img
        src={movie.poster_path ? IMG_BASE + movie.poster_path : "https://via.placeholder.com/500x750?text=No+Image"}
        className="card-img-top"
        alt={movie.title}
      />
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <span
          className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
          style={{ left: "90%", zIndex: "1" }}
        >
          TMDB
          <span className="visually-hidden">movie source</span>
        </span>
        <p className="card-text">{movie.overview?.slice(0, 100)}...</p>
        <a
          href={`https://www.themoviedb.org/movie/${movie.id}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-dark"
        >
          Read more
        </a>
      </div>
      <div className="card-footer">
        <small className="text-body-secondary">
          Released: {movie.release_date ? new Date(movie.release_date).toDateString() : "N/A"}
        </small>
        <br />
        <button
          className={`btn btn-sm mt-2 ${isFavorite ? "btn-danger" : "btn-outline-primary"}`}
          onClick={() => toggleFavorite(movie)}
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
