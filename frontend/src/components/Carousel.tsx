import { TMovie } from "../types";
import Movie from "./Movie";

type Props = {
  label: string;
  collection: TMovie[];
}

const Carousel = ({ collection, label }: Props) => {
  return (
    <div className="mb-4">
      <h2 className="text-2xl mb-2">{label}</h2>
      <div className="flex overflow-x-auto space-x-2 scrollbar-hide">
        {collection.length > 0 && collection.map((movie: TMovie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Carousel;

