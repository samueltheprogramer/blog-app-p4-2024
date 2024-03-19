"use client";

import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { FaDeleteLeft } from "react-icons/fa6";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const [updatedText, setUpdatedText] = useState("");
  const router = useRouter();

  const deletePost = async (id, userId, partner1Name, partner2Name) => {
    if (auth.currentUser.uid === userId || partner1Name || partner2Name) {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
    }
  };
  const handelUpdateText = async (id, userId, partner1Name, partner2Name) => {
    if (auth.currentUser.uid === userId || partner1Name || partner2Name) {
      const postDoc = doc(db, "posts", id);
      await updateDoc(postDoc, { postText: updatedText });
    }
  };
  const handleSignout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, [deletePost]);

  return (
    <div className="homePage bg-blue-950 h-full">
      <div className="bg-blue-800 text-xl font-extrabold flex-col text-white w-full ">
        <h1 className="text-center ">Blog App</h1>
        <div className="flex justify-around items-center">
          <div className="flex flex-col justify-center items-center">
            <Image
              src={auth.currentUser.photoURL}
              width={25}
              height={25}
              alt="pic"
              className="rounded-full mt-2"
            />
            <h1 className="text-white">{auth.currentUser.displayName}</h1>
          </div>
          <div>
            <button onClick={handleSignout} className="text-sm">
              Sign-Out
            </button>
          </div>
        </div>
      </div>
      <Navbar />
      {postLists.map((post) => {
        return (
          <div key={post.id} className="post">
            <div className="postHeader">
              <div className="title">
                <h1 className="font-serif text-lg font-extrabold">
                  {post.title}
                </h1>
              </div>

              <div className="deletePost">
                <button
                  className="border-black border-1 "
                  onClick={() => {
                    deletePost(
                      post.id,
                      post.author1.userId,
                      post.partner1Name,
                      post.partner2Name
                    );
                  }}
                >
                  <FaDeleteLeft />
                </button>
              </div>
            </div>
            <div className="postTextContainer text-white font-extrabold text-lg  mt-2 bg-blue-300 p-2 rounded-xl">
              {post.postText}
            </div>
            <Image
              src={post?.author1?.photoURL}
              width={25}
              height={25}
              alt="pic"
              className="rounded-full mt-2"
            />
            <h3 className="text-xs">
              @{post?.author1?.name} <span>@{post.partner1Name}</span>{" "}
              <span>@{post.partner2Name}</span>
            </h3>
            <div>
              <input
                placeholder="new text ..."
                onChange={(e) => setUpdatedText(e.target.value)}
                type="text"
                name=""
                id=""
                className="ring-2 ring-black bg-white rounded-md"
              />
              <button
                type="submit"
                onClick={() =>
                  handelUpdateText(
                    post.id,
                    post.author1.userId,
                    post.partner1Name,
                    post.partner2Name
                  )
                }
                className="bg-blue-200 rounded-xl mt-2 p-1 hover:bg-blue-600 hover:text-white"
              >
                Update Blog
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
