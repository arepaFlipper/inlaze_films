import axios from 'axios';
import { TopRatedMoviesApiResponse, DetailedMovie } from '../types'; 

const BEARER_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchTopRatedMovies = async (): Promise<TopRatedMoviesApiResponse> => {
  const response = await axios.get<TopRatedMoviesApiResponse>(`${BASE_URL}/movie/top_rated?language=en-US&page=1`, {
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

const getTopRatedMoviesWithDetails = async () => {
  try {
    const topRatedMoviesResponse = await fetchTopRatedMovies();
    const topRatedMovies = topRatedMoviesResponse.results;

    const detailedMoviesPromises = topRatedMovies.map(movie => fetchMovieDetails(movie.id));
    const detailedMovies = await Promise.all(detailedMoviesPromises);

    return {
      status: 200,
      data: detailedMovies,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error getting the top rated movies"
    };
  }
};

export default getTopRatedMoviesWithDetails;

