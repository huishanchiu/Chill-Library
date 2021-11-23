import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AllBooks from "./AllBooks";
import { useRouteMatch, useParams } from "react-router-dom";
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
    /* width: 100%; */
    width: 90%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  /* width: 800px; */
`;
const Themes = styled(Link)`
  display: flex;
`;

const Img = styled.img`
  margin: 20px auto;
  border-radius: 15px;
  width: 600px;
`;

const EachTheme = () => {
  let { path, url } = useRouteMatch();
  let theme = useParams();

  return (
    <Div>
      <Content>
        <Themes>
          <Banner />
        </Themes>
        <AllThemes theme={theme.theme} />
        <AllBooks theme={theme.theme} />
      </Content>
    </Div>
  );
};

export default EachTheme;
