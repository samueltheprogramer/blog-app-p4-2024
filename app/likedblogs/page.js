"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { FaDeleteLeft } from "react-icons/fa6";
import Image from "next/image";
import { auth, db } from "../config/firebase";

export default function LikedBlogs() {
  const [likedBlogsLists, setLikedBlogsList] = useState([]);
  const likedBlogsRef = collection(db, "likedBlogs");

  useEffect(() => {
    const querydata = query(
      likedBlogsRef,
      where("userId", "==", auth.currentUser.uid)
    );
    const unsuscribe = onSnapshot(querydata, (snapshot) => {
      let likedBlogs = [];
      snapshot.forEach((doc) => {
        likedBlogs.push({ ...doc.data(), id: doc.id });
      });
      setLikedBlogsList(likedBlogs);
    });
    return () => unsuscribe;
  }, []);

  const deletePost = async (id, userId) => {
    const postDoc = doc(db, "likedBlogs", id);
    await deleteDoc(postDoc);
  };
  return (
    <div className="homePage bg-blue-950 h-full">
      <div className="bg-blue-800 text-xl font-extrabold text-center text-white w-full">
        <h1>Blog App</h1>
      </div>
      <Navbar />
      {likedBlogsLists.map((post) => {
        return (
          <div key={post.id} className="post">
            <div className="postHeader">
              <div className="title">
                <h1 className="font-serif text-lg font-extrabold">
                  {post.blogTitel}
                </h1>
              </div>

              <div className="deletePost">
                <button
                  className="border-black border-1 "
                  onClick={() => {
                    deletePost(post.id, post.userId);
                  }}
                >
                  <FaDeleteLeft />
                </button>
              </div>
            </div>
            <div className="postTextContainer text-white font-extrabold text-lg  mt-2 bg-blue-300 p-2 rounded-xl">
              {post?.blogText}
            </div>
            <Image
              src={post?.autherImg}
              width={25}
              height={25}
              alt="pic"
              className="rounded-full mt-2"
            />
            <h3 className="text-xs">@{post?.auther}</h3>
          </div>
        );
      })}
    </div>
  );
}
