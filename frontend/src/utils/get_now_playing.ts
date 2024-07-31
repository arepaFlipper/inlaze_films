import axios from 'axios';
import { NowPlayingMoviesApiResponse, DetailedMovie } from '../types'; 

const BEARER_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchNowPlayingMovies = async (): Promise<NowPlayingMoviesApiResponse> => {
  const response = await axios.get<NowPlayingMoviesApiResponse>(`${BASE_URL}/movie/now_playing?language=en-US&page=1`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
      Accept: 'application/json',
    },
  });
  return response.data;
};

const fetchMovieDetails = async (id: number): Promise<DetailedMovie> => {
  const response = await axios.get<DetailedMovie>(`${BASE_URL}/movie/${id}?language=en-US`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
      Accept: 'application/json',
    },
  });
  return response.data;
};

const getNowPlayingMoviesWithDetails = async () => {
  try {
    const nowPlayingMoviesResponse = await fetchNowPlayingMovies();
    const nowPlayingMovies = nowPlayingMoviesResponse.results;

    const detailedMoviesPromises = nowPlayingMovies.map(movie => fetchMovieDetails(movie.id));
    const detailedMovies = await Promise.all(detailedMoviesPromises);

    return {
      status: 200,
      data: detailedMovies,
    };
  } catch (error) {
    return {
      status: 500,
      message: "error getting now playing",
    };
  }
};

export default getNowPlayingMoviesWithDetails;

