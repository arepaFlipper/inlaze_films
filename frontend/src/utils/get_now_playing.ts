import axios from 'axios';
import { PopularMoviesApiResponse, DetailedMovie } from '../types'; 

const BEARER_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const API_KEY_AUTH = import.meta.env.VITE_API_KEY_AUTH;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchPopularMovies = async (): Promise<PopularMoviesApiResponse> => {
  const response = await axios.get<PopularMoviesApiResponse>(`${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, {
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

const getPopularMoviesWithDetails = async () => {
  try {
    const popularMoviesResponse = await fetchPopularMovies();
    const popularMovies = popularMoviesResponse.results;

    const detailedMoviesPromises = popularMovies.map(movie => fetchMovieDetails(movie.id));
    const detailedMovies = await Promise.all(detailedMoviesPromises);

    return {
      status: 200,
      data: detailedMovies,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Server error making request",
    };
  }
};

export default getPopularMoviesWithDetails;

