import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Content,
  Dashboard,
  Login,
  SubjectList,
  Video,
  Activities,
  PrivateRoute,
} from "./Components";
import Tracing from "./Components/Tracing/Tracing";
import Number from "./Components/Number/Number";
import { appRoute } from "./utils/constants";
import "bootstrap/dist/css/bootstrap.min.css";
const { login, dashboard, subject, content, video, activity ,tracing,number} = appRoute;
//console.log(appRoute);
const App = () => {
  // Disable KeyBoard Shortcut Key for Application

  document.onkeydown = function (e) {
    // disable F12 key
    if (e.keyCode === 123) {
      return false;
    }

    // disable I key
    /*if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      return false;
    }*/

    // disable J key
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      return false;
    }

    // disable U key
    if (e.ctrlKey && e.keyCode === 85) {
      return false;
    }
    // disable c key
    if (e.ctrlKey && e.keyCode === 67) {
      return false;
    }
    // disable p key
    if (e.ctrlKey && e.keyCode === 80) {
      return false;
    }
  };
  // Add

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path={login} component={Login} />
          <PrivateRoute exact path={dashboard} component={Dashboard} />
          <Route path= {activity} component={ Activities}/>
          <Route path={tracing} component={Tracing} />
          <Route path={number} component={Number} />
          <Route path={subject} component={SubjectList} />
          <PrivateRoute path={content} component={Content} />
          <PrivateRoute path={video} component={Video} />
          {/* <PrivateRoute path={activity} component={Activities} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
