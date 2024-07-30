const Instructions = () => (
  <div className="App">
    <h1>The Movie DB</h1>
    <p>Here is the information you will need:</p>
    <ul>
      <li>
        The Movie DB documentation:
        <br />
        <a href="https://developers.themoviedb.org/3">
          https://developers.themoviedb.org/3
        </a>
      </li>
      <li>
        Use this provided API Key:
        <br />
        <strong>a9b856b302ef45f0fc28033e35b71d6a</strong>
      </li>
      <li>
        Use the Discover endpoint to get a list of movies:
        <br />
        <code>https://api.themoviedb.org/3/discover/movie?api_key=api_key</code>
      </li>
      <li>
        To get the images, you will need a separate url
        <br />
        <code>http://image.tmdb.org/t/p/w500/your_poster_path</code>
      </li>
    </ul>
    <p>When ready, remove me from App.jsx to get started</p>
  </div>
);

export default Instructions;
