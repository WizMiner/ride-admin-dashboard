const Spinner = ({ size = 12, color = "blue-500", text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-t-4 border-b-4 border-${color} mb-4`}
      ></div>
      <p className="text-gray-500 text-lg">{text}</p>
    </div>
  );
};

export default Spinner;
