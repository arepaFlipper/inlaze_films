import type { TMovie, TMovieDetails } from "../types.d";
import { useEffect, useState } from "react";
import getDetails from "../utils/get_genre";

type Props = {
  movie: TMovie;
}

const Movie = ({ movie }: Props) => {
  const [details, setDetails] = useState<TMovieDetails | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await getDetails(movie.id);
      setDetails(res);
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
        <h3 className="font-bold text-sm text-white mb-1">{movie.title}</h3>
        <p className="text-xs text-gray-400 mb-2">
          {new Date(movie.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-white">{movie.vote_average.toFixed(0)}%</span>
          <div>
            <button className="text-xl mr-2">❤️</button>
            <button className="text-xl">🔖</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
