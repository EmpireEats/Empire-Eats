import React, { useEffect, useState } from 'react';
import '../../../public/styles/now.css';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  deletePostAsync,
  fetchAllPostsAsync,
} from '../../redux/actions/postActions';
import { createUserInteractionAsync } from '../../redux/actions/userInteractionActions';
import { io } from 'socket.io-client';

const socket = io();

const Now = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxPosts = useSelector((state) => state.post.allPosts);
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  // const posts = useSelector((state) => state.post.allPosts);
  // console.log(posts);
  const posts = useSelector((state) => state.post.allPosts);
  console.log(posts);
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;

  const [posts, setPosts] = useState(reduxPosts);

  useEffect(() => {
    dispatch(fetchAllPostsAsync());
  }, []);

  useEffect(() => {
    setPosts(reduxPosts);

    // Subscribe to new post events from the server
    socket.on('newPost', (post) => {
      // Add the new post to the current list of posts
      // Replace the existing array to force a re-render
      setPosts((prevPosts) => [...prevPosts, post]);
    });

    // Subscribe to post update events from the server
    socket.on('updatePost', (updatedPost) => {
      // Update the post in the current list of posts
      // Replace the existing array to force a re-render
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
    });

    // Subscribe to post delete events from the server
    socket.on('deletePost', (deletedPostId) => {
      // Remove the post from the current list of posts
      // Replace the existing array to force a re-render
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== deletedPostId));
    });

    // Clean up the listeners when the component unmounts
    return () => {
      socket.off('newPost');
      socket.off('updatePost');
      socket.off('deletePost');
    };
  }, [reduxPosts]);


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
    navigate('/yerrr/chat');
  };

  const handleDeletePost = (id) => {
    dispatch(deletePostAsync({ id, loggedInUserId }));
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
                <button
                  onClick={() =>
                    handleUserInteraction({
                      postId: post.id,
                      postAuthorId: post.user.id,
                    })
                  }>
                  👍🏽
                </button>
                <span>
                  <button>👎🏽</button>
                </span>
                {post.userId === loggedInUserId && (
                  <span>
<<<<<<< HEAD
                    <button onClick={() => handleDeletePost(post.id)}>
                      ❌
                    </button>
=======
                    <button>❌</button>
>>>>>>> 73126dd (added del-btn only to posts created by user)
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

