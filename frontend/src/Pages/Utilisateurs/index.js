import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Tables

import AffichageTable from "./Afficher";
import FormElementsControls from "./Ajouter";

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

const Domaines = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">

                    {/* Tables */}

                    <Route path={`${match.url}/afficher`} component={AffichageTable}/>
                    <Route path={`${match.url}/ajouter`} component={FormElementsControls}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Domaines;