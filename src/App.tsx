import React from "react";
import "./App.css";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./pages/Profile";
import Casting from "./pages/Casting";
import Board from "./pages/Board";

function App() {
   return (
      <>
         <Router>
            <Layout>
               <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/account" exact component={Board} />
                  <Route path="/profile" exact component={Profile} />
                  <Route path={`/casting/`} component={Casting} />
               </Switch>
            </Layout>
         </Router>
      </>
   );
}

export default App;
