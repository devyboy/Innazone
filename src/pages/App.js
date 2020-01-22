import React, { Suspense, lazy } from "react";
import { firebaseConfig } from "../config.js";
import firebase from "firebase/app";
import "firebase/auth";
import BrowserRouter from "react-router-dom/BrowserRouter";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";
import '../css/App.css';

// Lazy load the pages for better performance

const HomePage = lazy(() => import("./HomePage"));
// const CreatePage = lazy(() => import('./CreatePage'));
// const ViewPage = lazy(() => import('./ViewEditPage'));
// const SettingsPage = lazy(() => import('./SettingsPage'));
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
          <Suspense
            fallback={null} // fallback is an element to show while loading like a spinner or something
          >
            <Switch>
              <Route exact path="/" render={(props) => <HomePage {...props} user={this.state.userObject} />} />
              {/* <Route exact path="/create" render={(props) => <CreatePage {...props} user={this.state.userObject} />} />
              <Route exact path="/view" render={(props) => <ViewPage {...props} user={this.state.userObject} />} />
              <Route exact path="/settings" render={(props) => <SettingsPage {...props} user={this.state.userObject} update={this.update} />} />
              <Route render={(props) => <FourOhFour {...props} user={this.state.userObject} />} /> */}
              {/* the last route in the switch is the 404 since nothing else matched */}
            </Switch>
          </Suspense>
        </BrowserRouter >
    );
  }
}

export default App;