import axios from 'axios';
import type { TPopular } from "../types"

const BEARER_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const API_KEY_AUTH = import.meta.env.VITE_API_KEY_AUTH;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovies = async () => {
  try {
    const moviesRes = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`);
    const popularRes = await axios.get(`${BASE_URL}/person/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const nowPlayingRes = await axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
    const upcomingRes = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
    const topRatedRes = await axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);

    const movies = moviesRes.data.results;
    const popular: TPopular[] = popularRes.data.results;
    // const nowPlaying = nowPlayingRes.data.results;
    const nowPlaying = []
    // const upcoming = upcomingRes.data.results;
    const upcoming = []
    // const topRated = topRatedRes.data.results;
    const topRated = []

    return {
      status: 200,
      data: {
        movies,
        popular,
        nowPlaying,
        upcoming,
        topRated,
        favorites: [], 
      }
    };
  } catch (error: unknown) {
    return {
      status: 500,
      message: "Server Error",
    };
  }
};

export default fetchMovies;

