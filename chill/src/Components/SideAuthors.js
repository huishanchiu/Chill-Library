import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
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
const Side = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-top: 50px;
`;

const SideBookTag = styled(Link)`
  margin: 20px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(241, 250, 247, 0.5);
  width: 250px;
`;
const SideBookImg = styled.img`
  margin-top: 30px;
  width: 100px;
`;
const SideBookName = styled.div`
  background-color: #f1faf7;
  font-size: 20px;
  font-weight: 500;
  color: #0d6663;
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
const Div = styled.h2`
  margin-top: 50px;
`;
const Info = styled.div``;
const SelfInfo = styled.div`
  color: #a8abac;
`;

function SideAuthors() {
  const [user, setUser] = useState("");
  const [reviews, setReviews] = useState([]);
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
        .where("uid", "!=", user.uid)
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

  return (
    <div>
      {allUsers.map((item) => {
        return (
          <Div>
            值得關注
            <UserInfo>
              <Link to={`/mybooks/${item.uid}/collection`}>
                <Img src={item.URL} alt="" />
              </Link>
              <User>
                <Info>{item.userName}</Info>
                <SelfInfo>{item.selfInfo}</SelfInfo>
              </User>
            </UserInfo>
          </Div>
        );
      })}
    </div>
  );
}

export default SideAuthors;
