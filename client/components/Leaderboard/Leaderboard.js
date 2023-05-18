import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLeaderboard } from "../../redux/actions/leaderboardActions";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const leaderboard = useSelector((state) => state.leaderboard.leaderboard);
  const loading = useSelector((state) => state.leaderboard.loading);
  const error = useSelector((state) => state.leaderboard.error);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  if (loading) {
    return <div>Loading leaderboard...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const limitedLeaderboard = leaderboard.slice(0, 20); // Limit the leaderboard array to 20 items

  return (
    <div>
      <div className="leader">
        <Link to="/home/leaderboard">
          <button>LEADERBOARD</button>
        </Link>
        <Link to="/home/feed">
          <button>FEED</button>
        </Link>
      </div>
      <div className="leaderboard">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Restaurant Visits</th>
            </tr>
          </thead>
          <tbody>
            {limitedLeaderboard.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                {/* <td>
                  <Link to={`/users/${user.username}`}>{user.name}</Link>
                </td> */}
                <td>{user.restaurantVisitCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
