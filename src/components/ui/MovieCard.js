import React from "react";
import { Button } from "./ui/button";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow-sm">
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
          <small className="text-muted d-block mb-2">
            Released: {new Date(movie.release_date).toDateString()}
          </small>
          <Button
            onClick={() => onToggleFavorite(movie)}
            className={`btn btn-sm w-100 ${isFavorite ? 'btn-danger text-white' : 'btn-outline-dark text-black'}`}
          >
            {isFavorite ? "Unfavorite ❤️" : "Favorite"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
