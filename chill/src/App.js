import { Route, BrowserRouter, Switch } from "react-router-dom";
import Landing from "./Components/Landing";
import EachTheme from "./Components/EachTheme";
import Mybooks from "./Components/Mybooks";
import NewsReview from "./Components/NewsReview";
import Themes from "./Components/Themes";
import EachBook from "./Components/EachBook";
import Collection from "./Components/Mybooks/Collection";
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/themes" component={Themes} />
        <Route exact path="/news" component={NewsReview} />
        <Route exact path="/mybooks" component={Mybooks} />
        <Route exact path="/themes/:theme" component={EachTheme} />
        <Route path="/bookid" component={EachBook} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
