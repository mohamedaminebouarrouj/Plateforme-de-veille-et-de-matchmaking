import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React, {Suspense, lazy, Fragment} from 'react';

import {
    ToastContainer,
} from 'react-toastify';
import Domaines from "../../Pages/Domaines";
import Secteurs from "../../Pages/Secteurs";
import Challenges from "../../Pages/Challenges";
import Startups from "../../Pages/Startups";
import Tendances from "../../Pages/Tendances";
import Utilisateurs from "../../Pages/Utilisateurs";
import Revendications from '../../Pages/Revendications';
import Login from '../../Pages/Login';

const Dashboards = lazy(() => import('../../Pages/Dashboards'));




const Widgets = lazy(() => import('../../Pages/Widgets'));
const Elements = lazy(() => import('../../Pages/Elements'));
const Components = lazy(() => import('../../Pages/Components'));
const Charts = lazy(() => import('../../Pages/Charts'));
const Forms = lazy(() => import('../../Pages/Forms'));
const Tables = lazy(() => import('../../Pages/Tables'));


const AppMain = () => {

    return (
        <Fragment>

            {/* Components */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">

                    </div>
                </div>
            }>
                <Route path="/components" component={Components}/>
            </Suspense>

            {/* Forms */}

            <Suspense fallback={
                <div className="loader-container">

                </div>
            }>
                <Route path="/forms" component={Forms}/>
            </Suspense>

            {/* Charts */}

            <Suspense fallback={
                <div className="loader-container">

                </div>
            }>
                <Route path="/charts" component={Charts}/>
            </Suspense>

            {/* Tables */}

            <Suspense fallback={
                <div className="loader-container">

                </div>
            }>
                <Route path="/tables" component={Tables}/>
            </Suspense>

            {/* Secteurs */}
            <Suspense fallback={
                <div className="loader-container">

                </div>
            }>
                <Route path="/secteurs" component={Secteurs}/>
            </Suspense>

            {/* Domaines */}
            <Suspense fallback={
                <div className="loader-container">

                </div>
            }>
                <Route path="/domaines" component={Domaines}/>
            </Suspense>

            {/* Challenges */}
            <Suspense fallback={
                <div className="loader-container">

                </div>
            }>
                <Route path="/challenges" component={Challenges}/>
            </Suspense>

            {/* Startups */}
            <Suspense fallback={
                <div className="loader-container">

                </div>
            }>
                <Route path="/startups" component={Startups}/>
            </Suspense>

            {/* Tendances */}
            <Suspense fallback={
                <div className="loader-container">

                </div>
            }>
                <Route path="/tendances" component={Tendances}/>
            </Suspense>

            {/* Utilisateurs */}
            <Suspense fallback={
                <div className="loader-container">

                </div>
            }>
                <Route path="/utilisateurs" component={Utilisateurs}/>
            </Suspense>

            {/* Login */}
            <Suspense fallback={
                <div className="loader-container">

                </div>
            }>
                <Route path="/login" component={Login}/>
            </Suspense>

            {/* Revendications */}
            <Suspense fallback={
                <div className="loader-container">

                </div>
            }>
                <Route path="/revendications" component={Revendications}/>
            </Suspense>
            {/* Elements */}

            <Suspense fallback={
                <div className="loader-container">

                </div>
            }>
                <Route path="/elements" component={Elements}/>
            </Suspense>

            {/* Dashboard Widgets */}

            <Suspense fallback={
                <div className="loader-container">

                </div>
            }>
                <Route path="/widgets" component={Widgets}/>
            </Suspense>

            {/* Dashboards */}

            <Suspense fallback={
                <div className="loader-container">

                </div>
            }>
                <Route path="/dashboards" component={Dashboards}/>
            </Suspense>

            <Route exact path="/" render={() => (
                <Redirect to="/dashboards/basic"/>
            )}/>
            <ToastContainer/>
        </Fragment>
    )
};

export default AppMain;