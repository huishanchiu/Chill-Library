import { Route, BrowserRouter, Switch } from "react-router-dom";
import styled from "styled-components";
import Landing from "./Components/Landing3";
import EachTheme from "./Components/EachTheme";
import Mybooks from "./Components/Mybooks";
import NewsWall from "./Components/NewsWall";
import Themes from "./Components/Themes";
import EachBook from "./Components/EachBook";
import Header from "./Components/Header";
import SideMenu from "./Components/SideMenu";
import SideBooks from "./Components/SideBooks";
import Searching from "./Components/Searching";
import EachSearchBook from "./Components/EachSearchBook";
import bk from "./images/bk.png";
import SideAuthors from "./Components/SideAuthors";
import SideMenuThemes from "./Components/SideMenuThemes";
import { useState, useEffect } from "react";
import firebase from "./utils/firebase";
import { getCurrentUser } from "./redux/action";
import { useDispatch } from "react-redux";
import Loading from "./Components/Loading";
import Nomatch from "./Components/Nomatch";

const Main = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: space-between;
  color: white;
  background-position: top;
  background-size: cover;
  background-image: url(${bk});
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
                <Main>
                  <SideMenu />
                  {/* <SideMenuThemes /> */}
                  <Themes />
                </Main>
              </Route>
              <Route exact path="/news">
                <Main>
                  <SideMenu />
                  <NewsWall />
                  <SideRight>
                    <Header />
                    <SideBooks />
                  </SideRight>
                </Main>
              </Route>
              <Route path="/mybooks/:userid">
                <Main>
                  <SideMenu />
                  <Mybooks />
                  <SideRight>
                    <Header />
                    <SideAuthors />
                  </SideRight>
                </Main>
              </Route>

              <Route path="/theme/:theme">
                <Main>
                  <SideMenu />
                  <EachTheme />
                  <SideRight>
                    <Header />
                    <SideBooks />
                  </SideRight>
                </Main>
              </Route>
              <Route exact path="/book/search/:search">
                <Main>
                  <SideMenu />
                  <Searching />
                  <SideRight>
                    <Header />
                    <SideBooks />
                  </SideRight>
                </Main>
              </Route>
              <Route exact path="/book/:id">
                <Main>
                  <SideMenu />
                  <EachBook />
                  <SideRight>
                    <Header />
                    <SideAuthors />
                  </SideRight>
                </Main>
              </Route>
              <Route exact path="/book/searching/:id">
                <Main>
                  <SideMenu />
                  <EachSearchBook />
                  <SideRight>
                    <Header />
                    <SideAuthors />
                  </SideRight>
                </Main>
              </Route>
              <Route path="">
                <Main>
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
