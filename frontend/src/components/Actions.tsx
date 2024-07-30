import { FaHeart, FaBookmark } from 'react-icons/fa';
import { IoMdShare } from 'react-icons/io';

const Actions = () => {
  return (
    <div className="flex space-x-4 w-1/4">
      <button className="p-2 bg-black rounded-full hover:bg-gray-700">
        <FaHeart className="text-white" />
      </button>
      <button className="p-2 bg-black rounded-full hover:bg-gray-700">
        <FaBookmark className="text-white" />
      </button>
      <button className="p-2 bg-black rounded-full hover:bg-gray-700">
        <IoMdShare className="text-white" />
      </button>
    </div>
  );
};

export default Actions;

