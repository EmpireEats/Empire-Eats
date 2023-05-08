import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../redux/actions/postActions";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch, posts]);
  

  let content;

  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    content = (
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            {post.text} - {post.sortingOptions}
          </li>
        ))}
      </ul>
    );
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h2>Posts</h2>
      {content}
    </div>
  );
};

export default PostsList;

