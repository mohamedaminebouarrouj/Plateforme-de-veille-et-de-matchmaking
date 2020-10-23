import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Tables

import AffichageTable from "./Afficher";
import FormElementsControls from "./Ajouter";

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import FormElementsControlsUpdate from "./Modifier";

const Secteurs = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}/afficher`} component={AffichageTable}/>
                    <Route path={`${match.url}/ajouter`} component={FormElementsControls}/>
                    <Route path={`${match.url}/update/:id`} component={FormElementsControlsUpdate}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Secteurs;