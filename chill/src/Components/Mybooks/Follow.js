import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

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
const Button = styled.div`
  padding: 10px;
  background-color: #1aae9f;
`;

function Follow() {
  const [followed, setFollowed] = useState(["CC"]);
  const [followedImg, setFollowedImg] = useState(
    "https://miro.medium.com/max/1400/1*XGw9zUEZGYPNmeKGmyeX1g.jpeg"
  );
  return (
    <Div>
      <PersonTag>
        <PersonImg src={followedImg} alt="" />
        <PersonName>{followed}</PersonName>
        <Button>追蹤</Button>
      </PersonTag>
    </Div>
  );
}

export default Follow;
