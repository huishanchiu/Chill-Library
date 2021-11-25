import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import firebase from "../utils/firebase";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

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
const OtherUser = styled.div`
  cursor: pointer;
`;

function SideAuthors() {
  const currentUser = useSelector((state) => state.currentUser);
  const history = useHistory();
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

    db.collection("users")
      .orderBy("reviewCount", "desc")
      .limit(5)
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          return { ...docSnapshot.data() };
        });
        setAllUsers(data);
      });
  }, []);

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
  function goOtherShelf(userUid) {
    currentUser
      ? history.push(`/mybooks/${userUid}/collection`)
      : Swal.fire({
          text: "請先登入",
          confirmButtonColor: "rgba(15, 101, 98, 0.8)",
        });
  }
  return (
    <div>
      <Div>值得關注</Div>
      {allUsers.map((item) => {
        return (
          <div key={item.uid}>
            <UserInfo>
              <OtherUser
                onClick={() => {
                  goOtherShelf(item.uid);
                }}
              >
                <Img src={item.URL} alt="" />
              </OtherUser>
              <User>
                <Info>{item.userName}</Info>
              </User>
            </UserInfo>
            <div>
              <SelfInfo>{item.selfInfo}</SelfInfo>
              <Count>發表了#{item.reviewCount}篇去憂</Count>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SideAuthors;
