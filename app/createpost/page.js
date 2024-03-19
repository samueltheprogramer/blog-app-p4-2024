"use client";

import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

import { auth, db } from "../config/firebase";
import Navbar from "../components/Navbar";
import Image from "next/image";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [partner1, setPartner1] = useState("");
  const [partner2, setPartner2] = useState("");

  const postsCollectionRef = collection(db, "posts");

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author1: {
        name: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
        photoURL: auth.currentUser.photoURL,
      },
      partner1Name: partner1,
      partner2Name: partner2,
    });
  };

  return (
    <div className="createPostPage  bg-blue-300">
      <div className="bg-blue-800 text-xl font-extrabold text-center text-white w-full">
        <h1>Blog App</h1>
        <div>
          <Image
            src={auth.currentUser.photoURL}
            width={25}
            height={25}
            alt="pic"
            className="rounded-full mt-2"
          />
        </div>
      </div>
      <Navbar />
      <div className="cpContainer mt-6 mb-12">
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
        <div className="inputGp">
          <label> Partner1:</label>
          <input
            type="text"
            className="text-black"
            placeholder="unChangeabel"
            value={partner1}
            onChange={(e) => setPartner1(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label> Partner2:</label>
          <input
            type="text"
            className="text-black"
            placeholder="unChangeabel"
            value={partner2}
            onChange={(e) => setPartner2(e.target.value)}
          />
        </div>
        <button onClick={createPost}> Submit Post</button>
      </div>
    </div>
  );
}
