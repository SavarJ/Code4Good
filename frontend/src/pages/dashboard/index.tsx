import Leaderboard from "./leaderboard/Leaderboard";
import DropIn from "./TutorLayout/DropIn";
import Tutor_Feed from "../StudentLayout/Tutor_Feed";
import TutorNavBar from "./TutorLayout/Tutor_NavBar"; 


const Dashboard: React.FC = () => {
  return (
    <div>
      {/* <TutorNavBar/> */}
      <Tutor_Feed></Tutor_Feed>
      {/* <Leaderboard /> */}
      <DropIn/> 
    </div>
  );
};

export default Dashboard;
