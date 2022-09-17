import Leaderboard from "./leaderboard/Leaderboard";
import DropIn from "../../components/DropIn";
const Dashboard: React.FC = () => {
  return (
    <div>
      {/* <TutorNavBar/> */}
      <Leaderboard />
      <DropIn/> 
    </div>
  );
};

export default Dashboard;
