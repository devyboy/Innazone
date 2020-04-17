import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { firebaseConfig } from "../config.js";
import firebase from "firebase/app";
import "firebase/auth";
import "../css/App.css";

import HomePage from "../pages/HomePage";
import CreatePage from "../pages/CreatePage";
import ViewPage from "../pages/ViewPage";
import SettingsPage from "../pages/SettingsPage";
import ChallengePage from "../pages/ChallengePage";
import FourOhFour from "../pages/FourOhFour";
import ReportPage from "../pages/ReportPage";
import StashPage from "../pages/StashPage";

// Lazy load the pages for better performance

// const HomePage = lazy(() => import("./HomePage"));
// const CreatePage = lazy(() => import('./CreatePage'));
// const ViewPage = lazy(() => import('./ViewPage'));
// const SettingsPage = lazy(() => import('./SettingsPage'));
// const ChallengePage = lazy(() => import('./ChallengePage'));
// const FourOhFour = lazy(() => import('./FourOhFour'));

// Firebase Credentials

var config = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId
};

// initialize the firebase portion of the app

firebase.initializeApp(config);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // userObject: false,
    };

    // When the user logs in, set userObject to them
    // firebase.auth().onAuthStateChanged((user) => {
    //   this.setState({ userObject: user });
    // });
  }

  render() {
    // this.applyTheme();

    return (
      // !this.state.userObject
      //   ?
      //   <LoginPage user={this.state.userObject} />
      //   :
      <BrowserRouter>
        {/* // runs when lazily loading pages */}
        {/* <Suspense
            fallback={
              <div className="App">
                <Menu />
                <Spinner />
              </div>
            } 
            // fallback is an element to show while loading like a spinner or something
          > */}
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/create">
            <CreatePage />
          </Route>
          <Route exact path="/view">
            <ViewPage />
          </Route>
          <Route exact path="/settings">
            <SettingsPage />
          </Route>
          <Route path="/challenge">
            <ChallengePage />
          </Route>
          <Route path="/report/:rid">
            <ReportPage />
          </Route>
          <Route path="/stash/:sid">
            <StashPage />
          </Route>
          <Route>
            <FourOhFour />
          </Route>
          {/* the last route in the switch is the 404 since nothing else matched */}
        </Switch>
        {/* </Suspense> */}
      </BrowserRouter>
    );
  }
}

export default App;
