import React from "react";
import styled from "styled-components";

const Side = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-top: 50px;
`;

const SideBookTag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 250px;
  height: 280px;
`;
const SideBookImg = styled.img`
  outline: grey solid 1px;
  margin-top: 30px;
  height: 150px;
  width: 100px;
`;
const SideBookName = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: grey;
`;

function SideBooks() {
  return (
    <div>
      <Side>
        #來看看其他去憂
        <SideBookTag>
          <SideBookImg />
          <SideBookName>第一次當工程師就上手！</SideBookName>
        </SideBookTag>
      </Side>
    </div>
  );
}

export default SideBooks;
