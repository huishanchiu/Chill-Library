import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import { Link, useParams } from "react-router-dom";

const Div = styled.div`
  display: flex;
  background-color: #e5e5e3;
`;
const PersonTag = styled.div`
  width: 100%;
  padding: 20px;
  margin: 20px;
  background-color: #eeeda7;
  display: flex;
`;
const PersonName = styled.h3`
  color: black;
  margin: 20px;
`;
const PersonImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 20rem;
`;
const FollowBtn = styled.div`
  background-color: #0d6663;
  margin: 20px;
  width: 80px;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
`;

function Follow() {
  const [uid, setUid] = useState("");
  const [followId, setFollowId] = useState("");
  let userId = useParams();
  const [followed, setFollowed] = useState([]);
  console.log(userId);
  useEffect(() => {
    setUid(firebase.auth().currentUser?.uid);
  }, []);
  useEffect(() => {
    const db = firebase.firestore();
    db.collection("users")
      .where("followBy", "array-contains", userId.userid)
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          console.log(id);
          setFollowId(id);
          return { ...docSnapshot.data(), id };
        });
      });
  }, []);
  console.log(followId);

  useEffect(() => {
    followId &&
      firebase
        .firestore()
        .collection("users")
        .doc(followId)
        .onSnapshot((docSnapshot) => {
          console.log(docSnapshot.data());
          setFollowed(docSnapshot.data());
        });
  }, [followId]);
  console.log(followed);
  console.log(uid);
  function toggleFollowed() {
    uid.length > 0 &&
      firebase
        .firestore()
        .collection("users")
        .doc(followId)
        .update({
          followBy: firebase.firestore.FieldValue.arrayRemove(uid),
        });
  }

  const isFollowed = followed.followBy?.includes(
    firebase.auth().currentUser.uid
  );

  // console.log(followed[0].followBy);
  console.log(isFollowed);
  return (
    <Div>
      <PersonTag>
        {isFollowed ? (
          <div>
            <Link to={`/mybooks/${followed.uid}/collection`}>
              <PersonImg src={followed.URL} alt="" />
            </Link>

            <PersonName>{followed.userName}</PersonName>
            <FollowBtn onClick={toggleFollowed}>取消追蹤</FollowBtn>
          </div>
        ) : (
          ""
        )}
      </PersonTag>
      ;
    </Div>
  );
}

export default Follow;
