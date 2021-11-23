import React from "react";
import styled from "styled-components";
import loadingBook from "../images/bookLoadingw.gif";

const Mask = styled.div`
  z-index: 3;
  color: #1abea7;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100p;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  z-index: 4;
  width: 170px;
  height: 170px;
`;

function Loading() {
  return (
    <Mask>
      <Img src={loadingBook} alt="" />
    </Mask>
  );
}

export default Loading;
