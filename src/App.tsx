import React, { SetStateAction, createContext, useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Article from "./pages/Article";
import ArticleList from "./pages/ArticleList";
import Editor from "./pages/Editor";
import Login from "pages/Login";
import Register from "pages/Register";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { User } from "types";

type UserContextType = {
  user: User | undefined;
  setUser: React.Dispatch<SetStateAction<User | undefined>>;
};

export const UserContext = createContext(null as unknown as UserContextType);

function App() {
  const getUserState = () => {
    const user = sessionStorage.getItem("user");
    if (!user) return;
    return JSON.parse(user);
  };
  const [user, setUser] = useState<User | undefined>(getUserState());
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
      }}
    >
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
    </UserContext.Provider>
  );
}

export default App;
