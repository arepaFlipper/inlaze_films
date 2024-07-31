import axios from 'axios';
import { UpcomingMoviesApiResponse, DetailedMovie } from '../types'; 

const BEARER_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchUpcomingMovies = async (): Promise<UpcomingMoviesApiResponse> => {
  const response = await axios.get<UpcomingMoviesApiResponse>(`${BASE_URL}/movie/upcoming?language=en-US&page=1`, {
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

const getUpcomingMoviesWithDetails = async () => {
  try {
    const upcomingMoviesResponse = await fetchUpcomingMovies();
    const upcomingMovies = upcomingMoviesResponse.results;

    const detailedMoviesPromises = upcomingMovies.map(movie => fetchMovieDetails(movie.id));
    const detailedMovies = await Promise.all(detailedMoviesPromises);

    return {
      status: 200,
      data: detailedMovies,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error getting the upcoming Movies"
    };
  }
};

export default getUpcomingMoviesWithDetails;

