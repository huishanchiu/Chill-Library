import { Route, BrowserRouter, Switch } from "react-router-dom";
import styled from "styled-components";
import Landing from "./Components/Landing";
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

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  background-image: linear-gradient(to right, #2c213b, #4f3a6c);
`;
const SideRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/themes" component={Themes} />
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
              <SideBooks />
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
