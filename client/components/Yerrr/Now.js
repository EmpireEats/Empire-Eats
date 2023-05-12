import React, { useEffect, useState } from 'react';
import '../../../public/styles/now.css';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPostsAsync } from '../../redux/actions/postActions';
import { useSocket } from '../../contexts/SocketContext';
import EditYerrr from './EditYerrr';

const Now = ({ onChatEnabledChange }) => {
  const reduxPosts = useSelector((state) => state.post.allPosts);
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState(reduxPosts);
  const [hasActiveInteraction, setHasActiveInteraction] = useState(false);
  const [selectedOption, setSelectedOption] = useState('all');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editablePost, setEditablePost] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();
  const postsPerPage = 2;

  useEffect(() => {
    dispatch(fetchAllPostsAsync());
  }, [dispatch]);

  useEffect(() => {
    setPosts(reduxPosts);
    if (socket) {
      socket.on('newPost', (post) => {
        setPosts((prevPosts) => [post, ...prevPosts]);
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
      socket.on('updatePost', (updatedPost) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === updatedPost.id ? { ...post, ...updatedPost } : post
          )
        );
      });

      socket.on('postError', (error) => {
        alert(error);
      });
      socket.on('userInteractionError', (error) => {
        alert(error);
      });
      socket.on('userInteractionDeleted', (deletedInteraction) => {
        onChatEnabledChange(false);
        setHasActiveInteraction(false);
      });

      return () => {
        socket.off('newPost');
        socket.off('updatePost');
        socket.off('deletePost');
        socket.off('postError');
        socket.off('userInteractionError');
        socket.off('userInteractionDeleted');
      };
    }
  }, [reduxPosts, socket]);

  // filter by preference
  const filteredPosts = posts.filter((post) =>
    selectedOption === 'all' ? true : post.preference === selectedOption
  );

  // pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSort = (event) => {
    setSelectedOption(event.target.value);
    setCurrentPage(1);
  };

  const handleUserInteraction = async ({ postId, postAuthorId }) => {
    if (socket) {
      socket.emit('createUserInteraction', {
        postId,
        postAuthorId,
        loggedInUserId,
      });
    }
    onChatEnabledChange(true);
    setHasActiveInteraction(true);
    navigate('/yerrr/chat', { state: { postId } });
  };

  const handleDeletePost = (id) => {
    if (socket) {
      socket.emit('deletePost', id);
    }
  };

  const handleEditPost = (id) => {
    const postToEdit = currentPosts.find((post) => post.id === id);
    setEditablePost(postToEdit);
    setIsEditMode(true);
  };

  return (
    <div className='user-post-list'>
      {filteredPosts && (
        <>
          <div>
            {currentPosts.map((post) => (
              <div key={`${post.id}`} className='user-post'>
                {isEditMode && editablePost?.id === post.id ? (
                  <EditYerrr
                    post={editablePost}
                    onSave={() => setIsEditMode(false)}
                    onCancel={() => setIsEditMode(false)}
                  />
                ) : (
                  <>
                    {post.user && post.user.firstName ? (
                      <p>User: {post.user.firstName}</p>
                    ) : (
                      <p>No name</p>
                    )}
                    <p>{post.message}</p>
                    <p>Preference: {post.preference}</p>
                    {post.isActive ? <p>Active</p> : <p>No Longer Active</p>}
                    <button
                      onClick={() =>
                        handleUserInteraction({
                          postId: post?.id,
                          postAuthorId: post?.user?.id,
                        })
                      }
                      disabled={hasActiveInteraction}>
                      👍🏽
                    </button>
                    <span>
                      <button>👎🏽</button>
                    </span>
                    {post.userId === loggedInUserId && (
                      <>
                        <span>
                          <button onClick={() => handleDeletePost(post.id)}>
                            ❌
                          </button>
                        </span>
                        <span>
                          <button onClick={() => handleEditPost(post.id)}>
                            Edit Yerrr
                          </button>
                        </span>
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className='filter'>
            <span>Filter By Preference: </span>
            <select value={selectedOption} onChange={handleSort}>
              <option value='all'>All</option>
              <option value='no preference'>No Preference</option>
              <option value='group'>Group</option>
              <option value='one on one'>1 on 1</option>
            </select>
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
