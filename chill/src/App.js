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
import BookState from "./Components/Mybooks/BookState";
import bk from "./images/bk.png";
import SideAuthors from "./Components/SideAuthors";

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  /* background-image: url(${bk}); */
  /* background-repeat: no-repeat; */
  background-position: top;
  background-size: cover;
  /* background-image: linear-gradient(to right, #2c213b, #4f3a6c); */
  background-image: 
  /* linear-gradient(
      rgba(211, 211, 211, 0.1),
      rgba(255, 255, 255, 0.1)
    ), */ url(${bk});
`;

const SideRight = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0px 6px 0 hsla(0, 0%, 0%, 0.3);
`;
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/themes">
          <Main>
            <SideMenu />
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
              <SideBooks />
            </SideRight>
          </Main>
        </Route>

        <Route exact path="/:theme">
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
              {/* <SideBooks /> */}
            </SideRight>
          </Main>
        </Route>
        <Route exact path="/book/searching/:id">
          <Main>
            <SideMenu />
            <EachSearchBook />
            <SideRight>
              <Header />
              <SideBooks />
            </SideRight>
          </Main>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
