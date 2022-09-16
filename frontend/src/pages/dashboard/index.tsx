import Leaderboard from "./leaderboard/Leaderboard";
import DropIn from "./TutorLayout/DropIn";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Leaderboard />
      <DropIn/> 
      <h2>Hi</h2>
    </div>
  );
};

export default Dashboard;
