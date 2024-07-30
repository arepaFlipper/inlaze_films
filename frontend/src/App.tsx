// import Instructions from "./Intructions";
import { useEffect, useState } from "react";
import type { TMovie } from "./types.d";
import Movie from "./components/Movie";
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
      <div id="grid" className="px-5 grid md:grid-cols-7 gap-x-2 gap-y-5 grid-cols-1">
        {(movies?.length > 0) && movies.map((movie: TMovie) => {
          return (
            <Movie movie={movie} />
          )
        })}
      </div>
    </div>
  )
}
