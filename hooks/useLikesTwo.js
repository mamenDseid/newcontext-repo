import React, { useState, useEffect, useCallback } from "react";
import {
  collection,
  where,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  setDoc,
  getDoc
} from "@firebase/firestore";
import { db, auth } from '../firebase-config';

import { useAuthUser } from "@react-query-firebase/auth";
export default function useLikesTwo(id) {
  const user = useAuthUser(["user"], auth);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [isliked, setisLiked] = useState(false);
  const [sposts, setsposts] = useState([]);
  const [comments, setComments] = useState([]);

  const savePost = useCallback(async () => {
    if (hasSaved) {
      await deleteDoc(doc(db, "users", user.data.uid, "savedposts", id));
    } else {
      const theDoc = await getDoc(doc(db, "feeds", id));

      await setDoc(doc(db, "users", user.data.uid, "savedposts", id), {
        id: id,
        username: theDoc.data().username,
        profilePic: theDoc.data().profilePic,
        postPic: theDoc.data().image,
        caption: theDoc.data().caption,
        timestamp: theDoc.data().timestamp,
        uid: theDoc.data().uid
      });
    }
  }, [hasSaved, user.data.uid, id]);

  const likeDoble = useCallback(async () => {
    if (hasLiked) return;
    else {
      await setDoc(doc(db, "feeds", id, "likes", user.data.uid), {
        username: user.data.displayName
      });
    }
  }, [user.data.uid, user.data.displayName, id, hasLiked]);
  const handleLikedDoble = () => {
    setisLiked(true);
    setTimeout(() => {
      setisLiked(false);
    }, 1200);
    likeDoble();
  };
  const likePost = useCallback(async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "feeds", id, "likes", user.data.uid));
    } else {
      await setDoc(doc(db, "feeds", id, "likes", user.data.uid), {
        username: user.data.displayName
      });
    }
  }, [id, hasLiked, user.data.uid, user.data.displayName]);
  const getPostDetails = useCallback(() => {
    const commentsRef = query(
      collection(db, "feeds", id, "comments"),
      orderBy("timestamp", "desc")
    );
    const likesRef = query(collection(db, "feeds", id, "likes"));

    onSnapshot(likesRef, (querySnapshot) => {
      setLikes(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data()
          };
        })
      );
    });

    onSnapshot(commentsRef, (querySnap) => {
      setComments(
        querySnap.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data()
          };
        })
      );
    });
  }, [id]);
  useEffect(() => {
    const q = query(collection(db, "users", user.data.uid, "savedposts"));

    const unsubscribe = onSnapshot(q, (qSnapshot) => {
      setsposts(
        qSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data()
          };
        })
      );
    });
    return () => {
      unsubscribe();
    };
  }, [user.data.uid]);
  useEffect(
    () => setHasSaved(sposts.findIndex((post) => post.data.id === id) !== -1),
    [sposts, id]
  );
  useEffect(
    () =>
      setHasLiked(likes.findIndex((like) => like.id === user.data.uid) !== -1),
    [likes, user.data.uid]
  );
  useEffect(() => {
    getPostDetails();
  }, [getPostDetails]);

  return {
    likes,
    hasLiked,
    hasSaved,
    comments,
    likePost,
    isliked,
    handleLikedDoble,
    savePost
  };
}
