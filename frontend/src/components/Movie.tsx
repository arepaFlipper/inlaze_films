import type { TMovie, TMovieDetails } from "../types.d";
import { useEffect, useState } from "react";
import { FaHeart, FaBookmark, FaShare } from 'react-icons/fa';
import CircularProgress from '@mui/joy/CircularProgress';

type Props = {
  movie: TMovieDetails;
}

const Movie = ({ movie }: Props) => {

  useEffect(() => {
    const fetchDetails = async () => {
    }
    fetchDetails();
  }, [movie]);

  return (
    <div key={movie.id} className="flex-shrink-0 flex flex-col w-[200px] bg-[#262626] rounded-lg overflow-hidden shadow-md">
      <img
        className="w-full h-[260px] object-cover"
        src={`http://image.tmdb.org/t/p/w200/${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="p-3 flex flex-col">
        <h3 className="font-bold text-sm text-white mb-1">{movie.title.slice(0, 22)}</h3>
        <p className="text-xs text-gray-400 mb-2">
          {new Date(movie.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        <div className="flex justify-between items-center">

          <div className="text-[9px] flex flex-col items-center">
            <h4 className="mb-2">Rating</h4>
            <CircularProgress color="success" size="sm" determinate value={movie.vote_average as number}>
              <h2 className="text-white">{(movie.vote_average * 10).toFixed(1)}%</h2>
            </CircularProgress>
          </div>
          <button className="text-xl flex flex-col items-center">
            <h4 className="text-[9px] mb-1">Favorites</h4>
            <FaHeart />
          </button>
          <button className="text-xl flex flex-col items-center">
            <h4 className="text-[9px] mb-1">Save</h4>
            <FaBookmark />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Movie;
