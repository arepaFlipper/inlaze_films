import welcome from '../../public/Welcome.png'
import { IoChevronBackCircleOutline } from "react-icons/io5";


type PopupProps = {
  show: boolean;
  onClose: () => void;
};

const Popup = ({ show, onClose }: PopupProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-transparent flex justify-center items-center z-50">
      <div className="inline-flex items-center bg-white border-solid border-white border-2 text-black bg-opacity-30 backdrop-filter backdrop-blur-sm p-6 rounded-lg shadow-lg relative">

        <button onClick={onClose} className="absolute inline-flex justify-center items-center top-2 left-2 text-gray-600 hover:text-gray-900" >
          <IoChevronBackCircleOutline />
          Back
        </button>

        <div className="flex flex-col items-center">
          <div className="rounded-md self-center flex justify-center bg-black w-[223px] h-[46px] overflow-hidden">
            <button className="w-1/2 flex items-center justify-center">
              <h1>Sign Up</h1>
            </button>
            <button className="w-1/2 flex items-center justify-center bg-yellow-400">
              <h1>Sign Up</h1>
            </button>
          </div>
          <h1>We love having you back</h1>
          <form className="space-y-4">
            <div>
              <input type="email" id="email" placeholder='Email' className="mt-1 block w-full px-3 py-2 rounded-t-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div>
              <input type="password" id="password" placeholder='Password' className="mt-1 block w-full px-3 py-2 rounded-t-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700" >
              Log In
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-500">
            For any questions, reach out to support@inlazemovies.com
          </p>
        </div>

        <div>
          <img src={welcome} alt="welcome" />
        </div>


      </div>
    </div>
  );
}

export default Popup;
