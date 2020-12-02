/*!

=========================================================
* BLK Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";
import "assets/demo/demo.css";

import Index from "views/Home Page/index";
import LandingPage from "views/Discover/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import ShowSecteur from "./views/Secteurs/Afficher/showSecteur";
import ShowDomaine from "./views/Domaines/Afficher/showDomaine";
import ShowStartup from "./views/Startups/Afficher/showStartup";
import ShowChallenge from "./views/Challenges/Afficher/showChallenge";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={props => <Index {...props} />} />
      <Route
        path="/discover"
        render={props => <LandingPage {...props} />}
      />
      <Route
        path="/profile-page"
        render={props => <ProfilePage {...props} />}
      />

      <Route
        path="/secteurs/:id"
        render={props => <ShowSecteur {...props} />} />

      <Route
          path="/domaines/:id"
          render={props => <ShowDomaine {...props} />} />

      <Route
          path="/challenges/:id"
          render={props => <ShowChallenge {...props} />} />

      <Route
          path="/startups/:id"
          render={props => <ShowStartup {...props} />} />



      <Redirect from="/" to="/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
