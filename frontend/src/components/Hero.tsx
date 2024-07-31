import { TMovie, DetailedMovie } from "../types";
import Actions from "./Actions";
import DotSlider from "./DotSlider";
import CircularProgress from '@mui/joy/CircularProgress';

type Props = {
  collection: DetailedMovie[];
}

const Hero = ({ collection }: Props) => {
  const movie_sample = collection[0];
  const details: string[] = ["Trama", "Cast", "Gallery", "Info"];

  return (
    <div className="relative mb-4 w-full h-[500px]">
      <img
        src={`http://image.tmdb.org/t/p/w1280/${movie_sample.backdrop_path}`}
        alt={movie_sample.title}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0  bg-gradient-to-t from-black via-transparent to-transparent">
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-8 pb-16">
          <h1 className="text-5xl font-bold mb-4">{movie_sample.title}</h1>
          <div className="flex justify-between w-full">
            <p className="text-lg max-w-2xl mb-4">{movie_sample.overview}</p>
            <CircularProgress color="success" size="lg" determinate value={(movie_sample.vote_average * 10) as number}>
              <h2 className="text-white">{(movie_sample.vote_average * 10).toFixed(1)}%</h2>
            </CircularProgress>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4 flex justify-between items-center">
            <div className="flex space-x-4 w-1/2 justify-around">
              {details.map((detail) => (
                <h2 key={detail} className="text-lg font-semibold">{detail}</h2>
              ))}
            </div>

            <div className="inline-flex justify-between w-1/2">
              <DotSlider />
              <Actions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

