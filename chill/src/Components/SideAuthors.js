import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import { Link } from "react-router-dom";

const Img = styled.img`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50px;
  margin-right: 10px;
`;

const Count = styled.div`
  font-size: 14px;
  color: #a8abac;
`;
const UserInfo = styled.div`
  margin-top: 20px;
  display: flex;

  align-items: center;
`;
const User = styled.div`
  font-size: 16px;
  font-weight: 400;
`;
const Div = styled.h3`
  margin-top: 50px;
`;
const Info = styled.div``;
const SelfInfo = styled.div`
  color: #a8abac;
`;

function SideAuthors() {
  const [user, setUser] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    let isUnmount = false;
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (!isUnmount) {
        setUser(currentUser);
      }
    });
    return () => {
      isUnmount = true;
    };
  }, []);

  useEffect(() => {
    const db = firebase.firestore();
    user &&
      db
        .collection("users")
        .orderBy("reviewCount", "desc")
        .limit(5)
        .onSnapshot((collectionSnapshot) => {
          const data = collectionSnapshot.docs.map((docSnapshot) => {
            return { ...docSnapshot.data() };
          });
          setAllUsers(data);
        });
  }, [user]);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("reviews").onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((docSnapshot) => {
        const id = docSnapshot.id;
        return { ...docSnapshot.data(), id };
      });
      setAllReviews(data);
    });
  }, []);
  console.log(allUsers);
  return (
    <div>
      <Div>值得關注</Div>
      {allUsers.map((item) => {
        return (
          <>
            <UserInfo key={item.uid}>
              <Link to={`/mybooks/${item.uid}/collection`}>
                <Img src={item.URL} alt="" />
              </Link>
              <User>
                <Info>{item.userName}</Info>
              </User>
            </UserInfo>
            <div>
              <SelfInfo>{item.selfInfo}</SelfInfo>
              <Count>發表了#{item.reviewCount}篇去憂</Count>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default SideAuthors;
