import { TMovie, TMovieDetails } from "../types";
import Movie from "./Movie";

type Props = {
  label: string;
  collection: TMovieDetails[];
}

const Carousel = ({ collection, label }: Props) => {
  console.log(`🍢%cCarousel.tsx:10 - collection`,'font-weight:bold; background:#34cb00;color:#fff;'); //DELETEME:
  console.log(collection); // DELETEME:
  return (
    <div className="mb-4 w-full">
      <h2 className="text-2xl mb-2">{label}</h2>
      <div className="flex overflow-x-auto space-x-2 scrollbar-hide w-full">
        {collection.length > 0 && collection.map((movie: TMovieDetails) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
