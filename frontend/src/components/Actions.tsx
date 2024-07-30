import { FaHeart, FaSave, FaShare } from 'react-icons/fa';

const Actions = () => {
  return (
    <div className="flex space-x-4">
      <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
        <FaHeart className="text-white" />
      </button>
      <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
        <FaSave className="text-white" />
      </button>
      <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
        <FaShare className="text-white" />
      </button>
    </div>
  );
};

export default Actions;

