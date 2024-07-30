import { TMovie } from "../types";
import Actions from "./Actions";
import DotSlider from "./DotSlider";

type Props = {
  collection: TMovie[];
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
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start p-8">
          <h1 className="text-5xl font-bold mb-4">{movie_sample.title}</h1>
          <p className="text-lg max-w-2xl mb-4">{movie_sample.overview}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          {details.map((detail) => (
            <h2 key={detail} className="text-lg font-semibold">{detail}</h2>
          ))}
        </div>
        <DotSlider />
        <Actions />
      </div>
    </div>
  );
};

export default Hero;

