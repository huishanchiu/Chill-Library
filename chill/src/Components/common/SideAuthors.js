import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getOtherShelf } from "../../utils/utils";
import { getAuthorByReviewsCount } from "../../utils/firebaseFunction";

const Img = styled.img`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 30px;
  margin-right: 10px;
  &:hover {
    border-radius: 20px;
  }
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
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAuthorByReviewsCount(setAllUsers);
  }, []);

  return (
    <div>
      <Div>值得關注</Div>
      {allUsers.map((item) => {
        return (
          <div key={item.uid}>
            <UserInfo>
              <OtherUser
                onClick={() => {
                  getOtherShelf(item.uid, currentUser, "請先登入");
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
