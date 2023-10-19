const Loader = () => {
  return (
    <div className="flex justify-center items-center flex-1">
      <div className="flex justify-center items-end h-[25px]">
        <div className="w-4 bg-gray mx-1 animate-dance animation-delay-250"></div>
        <div className="w-4 bg-gray mx-1 animate-dance animation-delay-600"></div>
        <div className="w-4 bg-gray mx-1 animate-dance animation-delay-300"></div>
        <div className="w-4 bg-gray mx-1 animate-dance animation-delay-75"></div>
        <div className="w-4 bg-gray mx-1 animate-dance animation-delay-200"></div>
      </div>
    </div>
  );
};

export default Loader;