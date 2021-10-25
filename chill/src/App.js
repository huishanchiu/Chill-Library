import { Route, BrowserRouter } from "react-router-dom";
import Landing from "./Components/Landing";
import EachTheme from "./Components/EachTheme";
import Mybooks from "./Components/Mybooks";
import NewsReview from "./Components/NewsReview";
import Themes from "./Components/Themes";
import EachBook from "./Components/EachBook";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Landing} />
      <Route exact path="/themes" component={Themes} />
      <Route exact path="/news" component={NewsReview} />
      <Route exact path="/mybooks" component={Mybooks} />
      <Route path="/:tag/:id" component={EachTheme} />
      <Route path="/bookid" component={EachBook} />
    </BrowserRouter>
  );
}

export default App;
