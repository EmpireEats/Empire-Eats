import React from 'react';
import EditYerrr from './EditYerrr';
import { useNavigate } from 'react-router';

const Post = ({
  post,
  handleUserInteraction,
  handleHidePost,
  handleDeletePost,
  handleEditPost,
  isEditMode,
  editablePost,
  loggedInUserId,
  setIsEditMode,
  onChatEnabledChange,
}) => {
  const navigate = useNavigate();

  const backToChat = (postId) => {
    onChatEnabledChange(true);
    navigate('/yerrr/chat', { state: { postId: postId } });
  };

  return (
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
            <div>
              <p>
                {/* <span>(img) </span> */}
                {post.user.firstName}
              </p>
            </div>
          ) : (
            <p>No name</p>
          )}
          <p>"{post.message}"</p>
          {post.preference === 'one on one' && <p>Looking For: 👤 </p>}
          {post.preference === 'group' && <p>Looking for: 👥 </p>}
          <p key={post.id}>
            location: {post.latitude}
            {post.longitude}
          </p>
          {post.userId === loggedInUserId ? (
            <>
              <span>
                <button onClick={() => handleDeletePost(post.id)}>❌</button>
              </span>
              <span>
                <button id='edit' onClick={() => handleEditPost(post.id)}>
                  📝
                </button>
              </span>
              <button onClick={() => backToChat(post.id)}>💬</button>
            </>
          ) : (
            <>
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
                <button onClick={() => handleHidePost(post.id)}>👎🏽</button>
              </span>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Post;
