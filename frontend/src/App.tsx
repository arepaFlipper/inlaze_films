import { useEffect, useState } from "react";
import fetch_movies from "./utils/get_movies";
import Hero from "./components/Hero";
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";


export default function App() {
  const [popularMovies, setPopularMovies] = useState([])
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [favoriteMovies, setFavoriteMovies] = useState([])


  useEffect(() => {

    const fetchMovies = async () => {
      const response = await fetch_movies();
      console.log(`🍔%cApp.tsx:25 - response`, 'font-weight:bold; background:#679800;color:#fff;'); //DELETEME:
      console.log(response.data); // DELETEME:
      if (response.status === 200) {
        setPopularMovies(response.data.popular);
        setNowPlayingMovies(response.data.now_playing);
        setUpcomingMovies(response.data.upcoming);
        setTopRatedMovies(response.data.top_rated);
        setFavoriteMovies(response.data.favorites);
      }
    }
    fetchMovies();
  }, [])

  const carousels = [
    { label: "Popular", collection: popularMovies },
    { label: "Now Playing", collection: nowPlayingMovies },
    { label: "Upcoming", collection: upcomingMovies },
    { label: "Top Rated", collection: topRatedMovies },
    { label: "Favorites", collection: favoriteMovies },
  ];

  return (
    <div className="w-full h-full bg-[#292929] text-white">
      <Navbar labels={carousels} />
      <div className="flex">
        <SideBar />
        <main className="w-4/5 p-4">
          <Hero src="" description="" title="" alt="" />
          {carousels.map(({ label, collection }) => {
            return (
              <Carousel label={label} collection={collection} />
            );
          })}
        </main>
      </div>
    </div>
  )
}
