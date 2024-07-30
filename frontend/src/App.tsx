// import Instructions from "./Intructions";
import { useEffect, useState } from "react";
import fetch_movies from "./utils/get_movies";
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";


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
      <Navbar />
      <div className="flex">
      <SideBar />
        <main className="w-3/4 p-4">
        </main>
      </div>
    </div>
  )
}
