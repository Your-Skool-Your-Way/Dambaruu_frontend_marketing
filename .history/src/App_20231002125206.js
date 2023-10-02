import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Content,
  Dashboard,
  Login,
  SubjectList,
  Video,
  Activities,
  PrivateRoute,
} from "./Components";
import Language from './Components/Language/Language';
import Contentod from './Components/ContentPage/Contentod';
import VideoOd from './Components/Video/VideoOd';
import Tracingalphabet from "./Components/Tracingalphabet/Tracingalphabet";
import Tracing from "./Components/Tracing/Tracing";
import Number from "./Components/Number/Number";
import NumberGame from "./Components/NumberGame/NumberGame";
import Thumbnails from "./Components/Thumbnails/Thumbnails";
import MissingNumbers from "./Components/MissingNumbers/MissingNumbers";
import MatchingLetters from "./Components/MatchingLetters/";
import Odia from './Components/Dashboard/Odia';
import { appRoute } from "./utils/constants";
import 'bootstrap/dist/css/bootstrap.min.css';
import SubjectListOdia from "./Components/SubjecPage/SubjectListOdia";
const { login, language, odia, dashboard, subjectod, subject, contentod, content, videood, video, activity
  ,tracing,thumbnails,tracingalphabet,number,numbergame,missingnumbers,matchingletters } = appRoute;
console.log( appRoute );
const App = () => {
  // Disable KeyBoard Shortcut Key for Application

  document.onkeydown = function ( e ) {

    // disable F12 key
    // if(e.keyCode === 123) {
    //     return false;
    // }

    // disable I key
    // if(e.ctrlKey && e.shiftKey && e.keyCode === 73){
    //     return false;
    // }

    // disable J key
    if ( e.ctrlKey && e.shiftKey && e.keyCode === 74 ) {
      return false;
    }

    // disable U key
    if ( e.ctrlKey && e.keyCode === 85 ) {
      return false;
    }
    // disable c key
    if ( e.ctrlKey && e.keyCode === 67 ) {
      return false;
    }
    // disable p key
    if ( e.ctrlKey && e.keyCode === 80 ) {
      return false;
    }
  }
  // Add

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path={login} component={Login} />
          <Route exact path={language} component={Language} />
          <Route exact path={odia} component={Odia} />
          <PrivateRoute exact path={dashboard} component={Dashboard} />
          <Route path={subjectod} component={SubjectListOdia} />
          <Route path={subject} component={SubjectList} />
          <Route path={number} component={Number} />
          <Route path={numbergame} component={NumberGame} />
          <PrivateRoute path={contentod} component={Contentod} />
          <PrivateRoute path={content} component={Content} />
          <PrivateRoute path={videood} component={VideoOd} />
          <PrivateRoute path={video} component={Video} />
          <Route path={tracing} component={Tracing} />
          <Route path={thumbnails} component={Thumbnails} />  
          <Route path={missingnumbers} component={MissingNumbers} /> 
          <Route path={matchingletters} component={MatchingLetters} /> 
         <Route path={tracingalphabet} component={Tracingalphabet} /> 
          <PrivateRoute path={activity} component={Activities} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;


