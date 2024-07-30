const DotSlider = () => {
  const dots = [1, 2, 3, 4, 5];
  return (
    <div className="flex space-x-2 w-full h-20px">
      {dots.map((_, index) => (
        <span
          key={index}
          className="h-2 w-2 bg-yellow rounded-full opacity-50 hover:opacity-100 transition-opacity duration-300"
        ></span>
      ))}
    </div>
  );
};

export default DotSlider;

