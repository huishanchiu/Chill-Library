import {
  Route,
  BrowserRouter,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
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
import Collection from "./Components/Mybooks/Collection";
import Searching from "./Components/Searching";
import EachSearchBook from "./Components/EachSearchBook";

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
            <Header />
          </Main>
        </Route>

        <Route path="/mybooks">
          <Main>
            <SideMenu />
            <Mybooks />
            <Header />
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

        <Route exact path="/book/:id" component={EachBook} />
        <Route exact path="/book/searching/:id" component={EachSearchBook} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
