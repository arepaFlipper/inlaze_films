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
    <div
      key={movie.id}
      className="flex-shrink-0 flex flex-col w-[200px] h-[335px] md:items-start items-center"
    >
      <img className="h-[223px] w-full object-cover" src={`http://image.tmdb.org/t/p/w200/${movie.backdrop_path}`} alt="placeholder" />
      <h3 className="font-bold text-xs text-wrap text-center mt-2">{movie.title}</h3>
      {details && (
        <h6 className="text-[0.5rem] text-center">
          {details.genres.map(({ name }) => name).join(", ")}
        </h6>
      )}
    </div>
  );
}

export default Movie;
