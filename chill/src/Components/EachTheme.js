import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AllBooks from "./AllBooks";
import { useRouteMatch, useParams } from "react-router-dom";
import AllThemes from "./AllThemes";
import Banner from "./Banner";

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 800px;
  @media (max-width: 1200px) {
    max-width: 650px;
  }
  @media (max-width: 900px) {
  }
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
  let { theme } = useParams();

  console.log(theme);

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
