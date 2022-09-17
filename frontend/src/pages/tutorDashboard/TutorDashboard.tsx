import React from 'react'
import Leaderboard from './Leaderboard';
import TutorDropIn from './TutorDropIn';
import TutorNavBar from './TutorNavBar';
export const TutorDashboard = () => {
  return (
    <>
    <div><TutorNavBar /></div>
    <div><Leaderboard /></div>
    <div><TutorDropIn /></div>
    </>
  )
}
