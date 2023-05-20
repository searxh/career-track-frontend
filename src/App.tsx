import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Article from "./pages/Article";
import ArticleList from "./pages/ArticleList";
import Editor from "./pages/Editor";
import Login from "pages/Login";
import Register from "pages/Register";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/editor" exact component={Editor} />
        <Route path="/editor/:slug" exact component={Editor} />
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/profile/:username" exact component={Profile} />
        <Route path="/profile/:username/favorites" exact component={Profile} />
        <Route path="/register" exact component={Register} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/:slug" exact component={Article} />
        <Route path="/" component={ArticleList} />
      </Switch>
    </Router>
  );
}

export default App;
