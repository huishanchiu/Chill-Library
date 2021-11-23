import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading";
import { useSelector } from "react-redux";

const Div = styled.div`
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 240, 221, 0.8);
  font-size: 22px;
  width: 100%;
  padding: 20px;
  background-color: rgba(213, 219, 219, 0.1);
`;
const FollowsTag = styled.div`
  background-color: rgba(213, 219, 219, 0.1);
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 240, 221, 0.8);
`;
const PersonTag = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin: 20px;
  border-bottom: rgba(254, 174, 32, 0.3) 1px solid;
`;
const PersonName = styled.h3`
  color: rgba(213, 219, 219, 1);
  margin: 20px;
`;
const PersonImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 20rem;
`;
const FollowBtn = styled.div`
  background-color: #0d6663;
  margin-left: auto;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
`;

function Follow({ setActiveItem, userIdOnly }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [follows, setFollows] = useState([]);
  let userId = useParams();

  console.log(userId.userid);
  console.log(userIdOnly);
  useEffect(() => {
    setIsLoading(true);
    if (Object.keys(currentUser).length !== 0) {
      const unsubscribe = firebase
        .firestore()
        .collection("users")
        .where("followBy", "array-contains", userIdOnly)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => {
            const id = doc.id;
            return { ...doc.data(), id };
          });
          setFollows(data);
          setIsLoading(false);
          setActiveItem("follow");
        });
      return () => {
        unsubscribe();
      };
    }
  }, [userIdOnly]);

  function toggleFollowed(followId) {
    currentUser &&
      firebase
        .firestore()
        .collection("users")
        .doc(followId)
        .update({
          followBy: firebase.firestore.FieldValue.arrayRemove(currentUser.uid),
        });
  }
  console.log(currentUser.uid);

  return (
    <>
      {follows.length > 0 ? (
        <FollowsTag>
          {isLoading ? <Loading /> : ""}
          {follows.map((item) => {
            console.log(item);
            console.log(userIdOnly);
            return (
              <PersonTag key={item.id}>
                <>
                  <a href={`/mybooks/${item.uid}/collection`}>
                    <PersonImg src={item.URL} alt="" />
                  </a>
                  <PersonName>{item.userName}</PersonName>
                  {currentUser.uid === userIdOnly ? (
                    <FollowBtn
                      onClick={() => {
                        toggleFollowed(item.uid);
                      }}
                    >
                      取消追蹤
                    </FollowBtn>
                  ) : (
                    ""
                  )}
                </>
              </PersonTag>
            );
          })}
        </FollowsTag>
      ) : (
        <Div>目前還沒追蹤任何人唷</Div>
      )}
    </>
  );
}

export default Follow;
