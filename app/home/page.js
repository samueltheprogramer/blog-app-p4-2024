"use client";

import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Home() {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [deletePost]);

  return (
    <div className="homePage">
      <Navbar />
      {postLists.map((post) => {
        return (
          <div key={post.id} className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>

              <div className="deletePost">
                <button
                  className="border-black border-1 "
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  &#128465;
                </button>
              </div>
            </div>
            <div className="postTextContainer w-[350px]"> {post.postText} </div>
            <Image
              src={auth.currentUser.photoURL}
              width={50}
              height={50}
              alt="pic"
              className="rounded-full"
            />
            <h3>@{post?.author1?.name}</h3>
          </div>
        );
      })}
    </div>
  );
}
