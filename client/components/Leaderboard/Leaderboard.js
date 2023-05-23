import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLeaderboard } from "../../redux/actions/leaderboardActions";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;

  &:hover {
    color: blue;
    cursor: pointer;
  }
`;

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
    <Box>
      <Box className="leader">
        <Link to="/home/leaderboard">
          <button className="leader-button">LEADERBOARD</button>
        </Link>
        <Link to="/home/feed">
          <button className="leader-button">FEED</button>
        </Link>
      </Box>
      <Box className="leaderboard">
        <table>
          <thead>
            <tr>
              <th>RANK</th>
              <th>USER</th>
              <th>RESTAURANT<br/>VISITS</th>
            </tr>
          </thead>
          <tbody>
            {limitedLeaderboard.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <StyledLink to={`/users/profile/${user.name}`}>
                    <Avatar src={user.image} sx={{ width: 32, height: 32, marginRight: 1 }} />
                    <Typography variant="body2">{user.name}</Typography>
                  </StyledLink>
                </td>
                <td>{user.restaurantVisitCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default Leaderboard;