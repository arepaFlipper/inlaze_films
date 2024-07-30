// import Instructions from "./Intructions";
import "./styles.css";
import { useEffect, useState } from "react";
import axios from 'axios';

const API_KEY = "a9b856b302ef45f0fc28033e35b71d6a";

export default function App() {
  const [movies, setMovies] = useState([])


  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
      console.log(`💊%cApp.tsx:10 - response`, 'font-weight:bold; background:#34cb00;color:#fff;'); //DELETEME:
      console.log(response); // DELETEME:
      if (response.status === 200) {
        await setMovies(response.data.results);
      }
      return response.data;
    }

    fetchMovies();

  }, [])

  useEffect(() => {
    console.log(`🖍️%cApp.tsx:21 - movies`, 'font-weight:bold; background:#5ca300;color:#fff;'); //DELETEME:
    console.log(movies); // DELETEME:
  }, [movies])

  return (
    <div className="w-screen h-min-full bg-[#292929] text-white">
      <div id="title" className="flex flex-col align-start">
        <div id="title" className="flex justify-center bg-[#333] text-3xl ">The Movie DB </div>
        <div id="" className="flex justify-center bg-[#333] text-2xl">Latest Releases</div>
      </div>
      <div id="grid" className="grid grid-cols-7 gap-3">
        {(movies?.length > 0) && movies.map((movie: TMovie) => {
          return (
            <div>
              <img className="w-[200px] h-[140px]" src={`http://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="placeholder" />
              <div className="text-[1]">{movie.original_title}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
