import { Route, BrowserRouter, Switch } from "react-router-dom";
import styled from "styled-components";
import Landing from "./Components/Landing/Landing";
import EachTheme from "./Components/Allthemes/EachTheme";
import Mybooks from "./Components/Mybooks/Mybooks";
import NewsWall from "./Components/NewsWall/NewsWall";
import Themes from "./Components/Allthemes/Themes";
import EachBook from "./Components/EachBook/EachBook";
import Header from "./Components/common/Header";
import SideMenu from "./Components/common/SideMenu";
import SideBooks from "./Components/common/SideBooks";
import Searching from "./Components/common/Searching";
import EachSearchBook from "./Components/EachBook/EachSearchBook";
import bk from "./images/bk.png";
import SideAuthors from "./Components/common/SideAuthors";
import { useState, useEffect } from "react";
import firebase from "./utils/firebase";
import { getCurrentUser } from "./redux/action";
import { useDispatch } from "react-redux";
import Loading from "./Components/common/Loading";
import Nomatch from "./Components/common/Nomatch";

const Main = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: space-between;
  color: white;
  background-position: top;
  background-size: cover;
  background-image: url(${(props) => props.backgroundImg});
`;

const SideRight = styled.div`
  width: 20%;
  box-shadow: 0 2px 6px 0 hsl(0deg 0% 0% / 20%);
  padding: 10px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  @media (max-width: 1250px) {
    display: none;
  }
`;
const Div = styled.div`
  margin: 0 auto;
  width: 100vw;
  min-height: 100vh;
`;

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [source, setSource] = useState("preload.jpg");
  useEffect(() => {
    const img = new Image();
    img.src = bk;
    img.onload = () => setSource(bk);
  }, [bk]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      dispatch(getCurrentUser(currentUser));
    });
  }, []);

  return (
    <>
      {user === undefined ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Div>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/themes">
                <Main backgroundImg={bk}>
                  <SideMenu />
                  <Themes />
                </Main>
              </Route>
              <Route exact path="/news">
                <Main backgroundImg={bk}>
                  <SideMenu />
                  <NewsWall />
                  <SideRight>
                    <Header />
                    <SideBooks />
                  </SideRight>
                </Main>
              </Route>
              <Route path="/mybooks/:userId">
                <Main backgroundImg={bk}>
                  <SideMenu />
                  <Mybooks />
                  <SideRight>
                    <Header />
                    <SideAuthors />
                  </SideRight>
                </Main>
              </Route>
              <Route path="/theme/:theme">
                <Main backgroundImg={bk}>
                  <SideMenu />
                  <EachTheme />
                  <SideRight>
                    <Header />
                    <SideBooks />
                  </SideRight>
                </Main>
              </Route>
              <Route exact path="/book/search/:search">
                <Main backgroundImg={bk}>
                  <SideMenu />
                  <Searching />
                  <SideRight>
                    <Header />
                    <SideBooks />
                  </SideRight>
                </Main>
              </Route>
              <Route exact path="/book/:bookName">
                <Main backgroundImg={bk}>
                  <SideMenu />
                  <EachBook />
                  <SideRight>
                    <Header />
                    <SideAuthors />
                  </SideRight>
                </Main>
              </Route>
              <Route exact path="/book/searching/:isbn">
                <Main backgroundImg={bk}>
                  <SideMenu />
                  <EachSearchBook />
                  <SideRight>
                    <Header />
                    <SideAuthors />
                  </SideRight>
                </Main>
              </Route>
              <Route path="">
                <Main backgroundImg={bk}>
                  <Nomatch />
                </Main>
              </Route>
            </Switch>
          </Div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
