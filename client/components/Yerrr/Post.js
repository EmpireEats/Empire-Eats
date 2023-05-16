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
            }>
            👍🏽
          </button>
          <span>
            <button onClick={() => handleHidePost(post.id)}>👎🏽</button>
          </span>
          {post.userId === loggedInUserId && (
            <>
              <span>
                <button onClick={() => handleDeletePost(post.id)}>❌</button>
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
  );
};

export default Post;
