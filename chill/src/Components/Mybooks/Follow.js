import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Loading from "../common/Loading";
import { useSelector } from "react-redux";
import { getFollows, UnFollowOthers } from "../../utils/firebaseFunction";

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

function Follow({ setActiveItem }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [follows, setFollows] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    getFollows(userId, setFollows, setActiveItem, setIsLoading);
  }, [userId, setActiveItem, currentUser]);

  function toggleFollowed(followId) {
    UnFollowOthers(followId, currentUser.uid);
  }

  return (
    <>
      {follows.length > 0 ? (
        <FollowsTag>
          {isLoading ? <Loading /> : ""}
          {follows.map((item) => {
            return (
              <PersonTag key={item.id}>
                <>
                  <a href={`/mybooks/${item.uid}/collection`}>
                    <PersonImg src={item.URL} alt="" />
                  </a>
                  <PersonName>{item.userName}</PersonName>
                  {currentUser.uid === userId ? (
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
