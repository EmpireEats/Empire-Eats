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

  const postStyle = {
    backgroundColor: '#2b343438',
    padding: '20px',
    borderRadius: '10px',
    margin: '10px 0',
    color: '#2B3434',
  };

  return (
    <div key={`${post.id}`} className='user-post' style={postStyle}>
      {isEditMode && editablePost?.id === post.id ? (
        <EditYerrr
          post={editablePost}
          onSave={() => setIsEditMode(false)}
          onCancel={() => setIsEditMode(false)}
        />
      ) : (
        <>
          {post.user && post.user.firstName ? (
            <div className='name-image-post'>
              {post.user.image && (
                <img
                  src={post.user.image}
                  width={80}
                  style={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginRight: '15px',
                  }}
                />
              )}
              <p id='name-post'> {post.user.firstName}</p>
            </div>
          ) : (
            <p>No name</p>
          )}
          <p>"{post.message}"</p>
          <div className='preference-container'>
            {post.preference === 'one on one' && (
              <p className='preference'>👤 </p>
            )}
            {post.preference === 'group' && <p className='preference'>👥 </p>}
            {post.preference === 'no preference' && (
              <p className='preference'>👤 / 👥</p>
            )}
          </div>
          {post.userId === loggedInUserId ? (
            <div className='yerr-buttons'>
              <span>
                <button onClick={() => handleDeletePost(post.id)}>❌</button>
              </span>
              <span>
                <button id='edit' onClick={() => handleEditPost(post.id)}>
                  📝
                </button>
              </span>
              <button onClick={() => backToChat(post.id)}>💬</button>
            </div>
          ) : (
            <>
              <div className='yerr-buttons'>
                <button
                  onClick={() =>
                    handleUserInteraction({
                      postId: post?.id,
                      postAuthorId: post?.user?.id,
                    })
                  }>
                  👍🏽
                </button>

                <button onClick={() => handleHidePost(post.id)}>👎🏽</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Post;
