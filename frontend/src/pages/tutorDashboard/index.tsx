import Leaderboard from "./Leaderboard";
import DropIn from './TutorDropIn'

const Dashboard: React.FC = () => {
  return (
    <div>
      {/* <TutorNavBar/> */}
      <Leaderboard />
      <DropIn />
    </div>
  );
};

export default Dashboard;
