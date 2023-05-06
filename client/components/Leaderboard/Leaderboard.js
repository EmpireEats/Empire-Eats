
//! Placeholder code - will update as we get more data/design

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLeaderboard } from '../redux/actions/getLeaderboard';

const Leaderboard = () => {
  const dispatch = useDispatch();
  const leaderboardData = useSelector((state) => state.leaderboard.leaderboardData);

  useEffect(() => {
    dispatch(getLeaderboard());
  }, [dispatch]);

  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Restaurant Visits</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.restaurantVisitCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
