import React from 'react';
import EditYerrr from './EditYerrr';

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
}) => {
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
                <span>(img) </span>
                {post.user.firstName}
              </p>
            </div>
          ) : (
            <p>No name</p>
          )}
          <p>"{post.message}"</p>
          <p>Party Size: {post.preference}</p>
          {post.isActive ? <p>Active</p> : <p>No Longer Active</p>}
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
