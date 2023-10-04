import AddTask from "../components/AddTask";
import DisplayTask from "../components/DisplayTask";

const Home = () => {
  return (
    <div className="home">
      <AddTask />
      <DisplayTask />
    </div>
  );
};

export default Home;
