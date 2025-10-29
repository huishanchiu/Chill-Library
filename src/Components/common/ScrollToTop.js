import { useEffect } from "react";
import { withRouter } from "react-router-dom";

const ScrollToTop = ({ children, location }) => {
  const pathname = location?.pathname;

  useEffect(() => {
    if (!pathname) {
      return;
    }
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [pathname]);

  return children || null;
};

export default withRouter(ScrollToTop);
