"use client";

import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";

import { auth, db } from "../config/firebase";
import Navbar from "../components/Navbar";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postsCollectionRef = collection(db, "posts");

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author1: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
  };

  return (
    <div className="createPostPage">
      <Navbar />
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            type="text"
            className="text-black"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            className="text-black"
            type="text"
            placeholder="Post..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        <button onClick={createPost}> Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;
