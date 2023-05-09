import React, { useEffect, useState } from 'react';
import '../../../public/styles/now.css';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  deletePostAsync,
  fetchAllPostsAsync,
} from '../../redux/actions/postActions';
import { createUserInteractionAsync } from '../../redux/actions/userInteractionActions';
import { useSocket } from '../../contexts/SocketContext';

const Now = ({ onChatEnabledChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxPosts = useSelector((state) => state.post.allPosts);
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;
  const [posts, setPosts] = useState(reduxPosts);
  const socket = useSocket();

  useEffect(() => {
    dispatch(fetchAllPostsAsync());
  }, [dispatch]);

  useEffect(() => {
    setPosts(reduxPosts);
    if (socket) {
      socket.on('newPost', (post) => {
        setPosts((prevPosts) => [...prevPosts, post]);
      });
      socket.on('updatePost', (updatedPost) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          )
        );
      });
      socket.on('deletePost', (deletedPostId) => {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== deletedPostId)
        );
      });
      return () => {
        socket.off('newPost');
        socket.off('updatePost');
        socket.off('deletePost');
      };
    }
  }, [reduxPosts, socket]);

  // pagination
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleUserInteraction = async ({ postId, postAuthorId }) => {
    await dispatch(
      createUserInteractionAsync({ postId, postAuthorId, loggedInUserId })
    );
    onChatEnabledChange(true);
    navigate('/yerrr/chat');
  };

  const handleDeletePost = (id) => {
    dispatch(deletePostAsync({ id, loggedInUserId }));
  };

  return (
    <div className='user-post-list'>
      {posts && (
        <>
          <div>
            {currentPosts.map((post) => (
              <div key={`${post.id}`} className='user-post'>
                {post.user && post.user.firstName ? (
                  <p>User: {post.user.firstName}</p>
                ) : (
                  <p>No name</p>
                )}

                <p>Preference: {post.preference}</p>
                {post.isActive ? <p>Active</p> : <p>No Longer Active</p>}
                <button
                  onClick={() =>
                    handleUserInteraction({
                      postId: post?.id,
                      postAuthorId: post?.user?.id,
                    })
                  }>
                  👍🏽
                </button>
                <span>
                  <button>👎🏽</button>
                </span>
                {post.userId === loggedInUserId && (
                  <span>
                    <button onClick={() => handleDeletePost(post.id)}>
                      ❌
                    </button>
                  </span>
                )}
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
