import React, { useState, useEffect, useContext, useCallback } from "react";
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
import {CredentialsContext} from "../components/CredentialsContext"

export default function useGetuserDetail(id) {
  const [feeds, setFeeds] = useState([]);
const [follow, setFollow]= useState([])
const [following, setFollowing]= useState([])

const getUserDataDetails = useCallback(()=>{
const feedRef = query(collection(db, "feeds"), where("uid" ,"==" ,id))
const followRef = query(collection(db, "users", id, "followers"),orderBy("timestamp", "desc"))
const followingRef = query(collection(db, "users", id, "followingF"),orderBy("timestamp", "desc"))

onSnapshot(feedRef, (querySnap)=> {
  const thefeeds = []
  const sortedfeeds = []
  querySnap.forEach((doc)=> {
    thefeeds.push({
      ...doc.data(),
      key: doc.id
    })
     //sortedfeeds = thefeeds.sort((a,b)=> (b.timestamp - a.timestamp))
  setFeeds(thefeeds)
  })
 
    // setFeeds(querySnap.docs.map((doc)=> {
    //     return {
    //         id: doc.id,
    //         data: doc.data()
    //       };
    // }))
})
onSnapshot(followRef, (querySnap)=> {
    setFollow(querySnap.docs.map((doc)=> {
        return {
            id: doc.id,
            data: doc.data()
          };
    }))
})
onSnapshot(followingRef, (querySnap)=> {
    setFollowing(querySnap.docs.map((doc)=> {
        return {
            id: doc.id,
            data: doc.data()
          };
    }))
})

},[id])

useEffect(()=>{
    getUserDataDetails()
},[])

  return {feeds, follow, following}
}
