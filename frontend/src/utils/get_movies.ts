import axios from 'axios';


const API_KEY = "a9b856b302ef45f0fc28033e35b71d6a";

const fetchMovies = async () => {
  const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
  return response;
}

export default fetchMovies;
