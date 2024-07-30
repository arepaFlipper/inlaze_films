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
    console.log(`🥭%cMovie.tsx:18 - movie`, 'font-weight:bold; background:#53ac00;color:#fff;'); //DELETEME:
    console.log(movie); // DELETEME:
  }, [movie])
  useEffect(() => {
    console.log(`❤️%cMovie.tsx:21 - details`, 'font-weight:bold; background:#5ca300;color:#fff;'); //DELETEME:
    console.log(details); // DELETEME:
  }, [details])

  return (
    <div key={movie.id} className="w-full flex flex-col md:w-[120px] md:items-start items-center">
      <img className="w-full md:h-[180px] object-cover" src={`http://image.tmdb.org/t/p/w200/${movie.backdrop_path}`} alt="placeholder" />
      <h3 className="font-bold text-xs text-wrap">{movie.title}</h3>
      {(details) && <h6 className="text-[0.5rem]">{details.genres.map(({ name }) => name).join(", ")}</h6>}
    </div>
  );
}

export default Movie;
