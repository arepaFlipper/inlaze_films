import { useEffect, useState } from "react";
import fetch_movies from "./utils/get_movies";
import fetch_popular from "./utils/get_popular";
import fetch_now_playing from "./utils/get_now_playing";
import Hero from "./components/Hero";
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import Popup from './components/Popup';
import { TMovie } from "./types";
import type { TPopular, TMovieDetails, DetailedMovie } from "./types";


export default function App() {
  const [movies, setMovies] = useState<TMovie[]>([])
  const [popularMovies, setPopularMovies] = useState<DetailedMovie[]>([])
  const [nowPlayingMovies, setNowPlayingMovies] = useState<DetailedMovie[]>([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [favoriteMovies, setFavoriteMovies] = useState([])

  const [showPopup, setShowPopup] = useState(true);


  useEffect(() => {

    const fetchMovies = async () => {
      const response = await fetch_movies();
      const popular_response = await fetch_popular();
      const now_playing_response = await fetch_now_playing();
      console.log(`🔛%cApp.tsx:31 - now_playing_response`,'font-weight:bold; background:#768900;color:#fff;'); //DELETEME:
      console.log(now_playing_response); // DELETEME:
      if (response.status === 200) {
        setPopularMovies(popular_response?.data || []);
        setNowPlayingMovies(now_playing_response?.data || []);
        setUpcomingMovies([]);
        setTopRatedMovies([]);
        setFavoriteMovies([]);
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
  console.log(`✊%cApp.tsx:50 - carousels`,'font-weight:bold; background:#966900;color:#fff;'); //DELETEME:
  console.log(carousels); // DELETEME:

  return (
    <div className="w-full bg-[#454545] text-white">
      <Navbar labels={carousels} />
      {(popularMovies.length > 0) && (
        <>
          <Hero collection={popularMovies} />
          <div className="flex">
            <SideBar />
            <main className="w-4/5 p-4">
              {carousels.map(({ label, collection }) => {
                return (
                  <Carousel key={label} label={label} collection={collection} />
                );
              })}
            </main>
          </div>
        </>
      )}
      <Popup show={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  )
}
