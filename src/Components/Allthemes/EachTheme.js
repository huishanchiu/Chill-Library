import React from "react";
import styled from "styled-components";
import AllBooks from "./AllBooks";
import { useParams } from "react-router-dom";
import AllThemes from "./AllThemes";
import Banner from "./Banner";

const Div = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  @media (max-width: 1250px) {
    width: 70%;
  }
  @media (max-width: 875px) {
    width: 90%;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Themes = styled.div`
  display: flex;
`;

const EachTheme = () => {
  let { theme } = useParams();

  return (
    <Div>
      <Content>
        <Themes>
          <Banner />
        </Themes>
        <AllThemes theme={theme} />
        <AllBooks theme={theme} />
      </Content>
    </Div>
  );
};

export default EachTheme;
