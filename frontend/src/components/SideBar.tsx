import Dropdown from "./Dropdown";
import SlideBar from "./SlideBar";

const SideBar = () => {
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science",
    "Thriller",
    "War",
    "Western"
  ];
  const sorter = [
    "Title A-Z",
    "Popularity Ascending",
    "Popularity Descending",
    "Rating Ascending",
    "Rating Descending",
    "Release Date Ascending",
    "Release Date Descending",
  ];
  return (
    <aside className="w-1/5 p-4 bg-[#333333]">
      <h2 className="text-xl mb-2">Search</h2>
      <input type="text" placeholder="Keywords" className="w-full p-2 mb-2 bg-[#1C1C1C] text-zinc-50" />
      <hr />
      <Dropdown options={genres} />
      <hr />
      <Dropdown options={sorter} />
      <hr />
      <SlideBar />
    </aside>
  )
}

export default SideBar
