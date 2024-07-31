import axios from 'axios';


const API_KEY = import.meta.env.VITE_ACCESS_TOKEN;

const movie_details = async (id: number) => {
  // const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    }
  };
  try {
    if (id) {
      const response = await axios.get(url, options);
      return response.data;
    }
    return null;
  } catch (error) {
    return null;

  }
}

export default movie_details;
