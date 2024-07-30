// import Instructions from "./Intructions";
import { useEffect, useState } from "react";
import type { TMovie } from "./types.d";
import fetch_movies from "./utils/get_movies";


export default function App() {
  const [movies, setMovies] = useState([])


  useEffect(() => {

    const fetchMovies = async () => {
      const response = await fetch_movies();
      if (response.status === 200) {
        setMovies(response.data.results);
      }
    }
    fetchMovies();

  }, [])

  useEffect(() => {
    console.log(`🖍️%cApp.tsx:21 - movies`, 'font-weight:bold; background:#5ca300;color:#fff;'); //DELETEME:
    console.log(movies); // DELETEME:
  }, [movies])

  return (
    <div className="w-screen h-full bg-[#292929] text-white">
      <div id="title" className="flex flex-col ">
        <div id="title" className="flex justify-center my-2 text-3xl ">The Movie DB </div>
        <div id="" className="flex justify-center my-2 bg-[#333333] text-2xl">Latest Releases</div>
      </div>
      <div id="grid" className="grid md:grid-cols-7 gap-3 grid-cols-1">
        {(movies?.length > 0) && movies.map((movie: TMovie) => {
          return (
            <div key={movie.id} className="w-full flex flex-col items-center">
              <img className="md:w-[200px] md:h-[140px]" src={`http://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="placeholder" />
              <div className="text-[1]">{movie.original_title}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
