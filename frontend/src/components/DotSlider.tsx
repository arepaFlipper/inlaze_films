import { useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

const DotSlider = () => {
  const [selectedPage, setSelectedPage] = useState("0");


  const selectedStyles = `bg-yellow-500 w-9 rounded before:w-6
          before:h-6 before:rounded-full 
          before:left-[-50%] before:top-[-50%]`;
  return (
    <div className="flex items-center gap-2 top-[60%] right-7 w-1/4">
      {[1, 2, 3, 4, 5, 6, 7].map((dot, index) => {
        return (
          <AnchorLink
            className={`${(selectedPage === `${index}`) ? selectedStyles : "bg-gray-500 aspect-square rounded-full"} w-3 h-3 `}
            href="#home"
            onClick={() => setSelectedPage('1')}
          />
        )
      })}
    </div>
  )
};

export default DotSlider;

