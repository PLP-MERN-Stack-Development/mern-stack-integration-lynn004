import React, { createContext, useState } from "react";

export const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [postsState, setPostsState] = useState({ posts: [], meta: {} });
  return <PostsContext.Provider value={{ postsState, setPostsState }}>{children}</PostsContext.Provider>;
}
