import { useEffect, useState } from "react";
import fetch_movies from "./utils/get_movies";
import Hero from "./components/Hero";
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import Popup from './components/Popup';
import { TMovie } from "./types";


export default function App() {
  const [movies, setMovies] = useState<TMovie[]>([])
  const [popularMovies, setPopularMovies] = useState([])
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [favoriteMovies, setFavoriteMovies] = useState([])

  const [showPopup, setShowPopup] = useState(true);


  useEffect(() => {

    const fetchMovies = async () => {
      const response = await fetch_movies();
      if (response.status === 200) {
        setMovies(response.data.popular);
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
    <div className="w-full bg-[#454545] text-white">
      <Navbar labels={carousels} />
      {(movies.length > 0) && (
        <Hero collection={movies} />
      )}
      <div className="flex">
        <SideBar />
        <main className="w-4/5 p-4">
          {carousels.map(({ label, collection }) => {
            return (
              <Carousel label={label} collection={collection} />
            );
          })}
        </main>
      </div>
      <Popup show={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  )
}
