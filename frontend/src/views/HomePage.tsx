import CarList from "@/containers/CarList";

const HomePage = () => {
  return (
    <div className="flex justify-center items-center mt-[2rem]">
      <div className="flex justify-center items-center px-[2rem] flex-col max-w-[62rem] w-full relative">
        <CarList />
      </div>
    </div>
  );
};

export default HomePage;
