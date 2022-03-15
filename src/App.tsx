import React from "react";
import "./App.css";
import Layout from "./shared/layout/Layout";
import Home from "./pages/Home";
import {
   BrowserRouter as Router,
   Route,
   Switch,
   Redirect,
} from "react-router-dom";
import Profile from "./pages/Profile";
import Casting from "./pages/Casting";
import Board from "./pages/Board";
import Notifications from "./pages/Notifications";
import Sign from "./pages/Sign";
import { useRecoilState } from "recoil";
import { isLoggedInAtom } from "./shared/store/store";

function App() {
   const [isLoggedIn] = useRecoilState(isLoggedInAtom);
   return (
      <Router>
         <Layout>
            {isLoggedIn ? (
               <Switch>
                  <Route path="/" component={Home} exact />
                  <Route path="/castings" component={Home} exact />
                  <Route path="/board" component={Board} exact />
                  <Route
                     path={`/notifications`}
                     component={Notifications}
                     exact
                  />
                  <Route path="/profile" component={Profile} exact />
                  <Route path={`/casting/:cid`} component={Casting} exact />
                  <Redirect to="/" />
               </Switch>
            ) : (
               <Switch>
                  <Route path="/" component={Home} exact />
                  <Route path="/castings" component={Home} exact />
                  <Route path={`/casting/:cid`} component={Casting} exact />
                  <Route path="/sign" component={Sign} exact />
                  <Redirect to="/sign" />
               </Switch>
            )}
         </Layout>
      </Router>
   );
}

export default App;
