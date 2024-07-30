import axios from 'axios';


const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2JkYWM3NTQ3OGM4MjAyYjY0NzYyNTNjNDQ0MzMwMyIsInN1YiI6IjY2MjJmYzM2YWM2Yzc5MDE0YWFhMmM1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X9T299u4fNe-xNGLqOtTS0WI7KC2ONN_u7s5a_MaqfA";

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
