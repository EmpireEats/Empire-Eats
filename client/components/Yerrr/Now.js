import React, { useEffect, useState } from 'react';
import '../../../public/styles/now.css';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllPostsAsync,
  fetchHiddenPosts,
  hidePostAsync,
} from '../../redux/actions/postActions';
import { useSocket } from '../../contexts/SocketContext';
import Modal from 'react-modal';
import NeedToLogIn from './NeedToLogIn';
import Post from './Post';
import Filter from './Filter';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Now = ({ nowEnabled, yerrrEnabled, onChatEnabledChange }) => {
  const reduxPosts = useSelector((state) => state.post.allPosts);
  const hiddenPosts = useSelector((state) => state.post.hiddenPosts);
  const loading = useSelector((state) => state.post.loading);
  const loggedInUserId = useSelector(
    (state) => state.auth.user && state.auth.user.id
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState(reduxPosts);
  const [selectedOption, setSelectedOption] = useState('all');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editablePost, setEditablePost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();
  const postsPerPage = 2;

  useEffect(() => {
    if (loggedInUserId) dispatch(fetchHiddenPosts(loggedInUserId));
    dispatch(fetchAllPostsAsync());
  }, [dispatch, loggedInUserId]);

  useEffect(() => {
    const visiblePosts = reduxPosts.filter(
      (post) => !hiddenPosts.includes(post.id)
    );
    setPosts(visiblePosts);
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
        onChatEnabledChange(false);
      });
      socket.on('updatePost', (updatedPost) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === updatedPost.id ? { ...post, ...updatedPost } : post
          )
        );
        onChatEnabledChange(true);
      });

      socket.on('postError', (error) => {
        alert(`Post error: ${error}`);
      });
      socket.on('userInteractionError', (error) => {
        onChatEnabledChange(false);
        alert(`User interaction error: ${error}`);
      });
      socket.on('userInteractionDeleted', () => {
        onChatEnabledChange(false);
        yerrrEnabled(true);
        nowEnabled(true);
      });
      socket.on('userInteractionCreated', (newUi) => {
        const postId = newUi.postId;
        nowEnabled(false);
        yerrrEnabled(false);
        onChatEnabledChange(true);
        navigate('/yerrr/chat', { state: { postId } });
      });

      return () => {
        socket.off('newPost');
        socket.off('updatePost');
        socket.off('deletePost');
        socket.off('postError');
        socket.off('userInteractionError');
        socket.off('userInteractionDeleted');
        socket.off('userInteractionCreated');
      };
    }
  }, [reduxPosts, socket, hiddenPosts]);

  const filteredPosts = posts.filter((post) => {
    if (!loggedInUserId) {
      if (selectedOption === 'all') {
        return true;
      }
      return post.preference === selectedOption;
    }

    if (selectedOption === 'all') {
      return true;
    }

    return post.preference === selectedOption;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSort = (event) => {
    setSelectedOption(event.target.value);
    setCurrentPage(1);
  };

  const handleUserInteraction = async ({ postId, postAuthorId }) => {
    if (loggedInUserId) {
      if (socket) {
        socket.emit('createUserInteraction', {
          postId,
          postAuthorId,
          loggedInUserId,
        });
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const handleDeletePost = (id) => {
    if (socket) socket.emit('deletePost', id);
  };

  const handleEditPost = (id) => {
    const postToEdit = currentPosts.find((post) => post.id === id);
    setEditablePost(postToEdit);
    setIsEditMode(true);
  };

  const handleHidePost = async (postId) => {
    if (loggedInUserId) {
      await dispatch(hidePostAsync({ postId, userId: loggedInUserId }));
      await dispatch(fetchHiddenPosts(loggedInUserId));
      setPosts(posts.filter((post) => post.id !== postId));
    } else {
      setIsModalOpen(true);
    }
  };

  if (loading) return <div className='spinner'></div>;

  return (
    <div className='user-post-list'>
      {filteredPosts && (
        <>
          <Filter selectedOption={selectedOption} handleSort={handleSort} />
          <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}>
            {filteredPosts.map((post, index) => (
              <Post
                key={post.id}
                index={index}
                post={post}
                handleUserInteraction={handleUserInteraction}
                handleHidePost={handleHidePost}
                handleDeletePost={handleDeletePost}
                handleEditPost={handleEditPost}
                isEditMode={isEditMode}
                editablePost={editablePost}
                loggedInUserId={loggedInUserId}
                setIsEditMode={setIsEditMode}
                onChatEnabledChange={onChatEnabledChange}
              />
            ))}
          </div>
          <Modal
            className='weOutside-modal'
            overlayClassName='weOutside-modal-overlay'
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel='Need to Log In'>
            <NeedToLogIn />
          </Modal>
        </>
      )}
    </div>
  );
};

export default Now;
