import { Route, BrowserRouter } from "react-router-dom";
import Landing from "./Components/Landing";

import Mybooks from "./Components/Mybooks";
import NewsReview from "./Components/NewsReview";
import Themes from "./Components/Themes";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Landing} />
      <Route exact path="/themes" component={Themes} />
      <Route exact path="/news" component={NewsReview} />
      <Route exact path="/mybooks" component={Mybooks} />
    </BrowserRouter>
  );
}

export default App;
