import React, { useEffect, useState } from 'react';
import '../../../public/styles/now.css';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPostsAsync } from '../../redux/actions/postActions';

const Now = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.allPosts);
  console.log(posts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;

  useEffect(() => {
    dispatch(fetchAllPostsAsync());
  }, []);

  // pagination
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleNavigate = () => {
    navigate('/yerrr/chat');
  };

  return (
    <div className='user-post-list'>
      {posts && (
        <>
          <div className='user-post'>
            {currentPosts.map((post) => (
              <div key={`${post.id}`} className='user-post'>
                {post.user && post.user.firstName ? (
                  <p>User: {post.user.firstName}</p>
                ) : (
                  <p>No name</p>
                )}

                <p>Preference: {post.preference}</p>
                {post.isActive ? <p>Active</p> : <p>No Longer Active</p>}
                <button onClick={handleNavigate}>👍🏽</button>
                <span>
                  <button>👎🏽</button>
                </span>
              </div>
            ))}
          </div>
          <div className='pagination'>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Now;
