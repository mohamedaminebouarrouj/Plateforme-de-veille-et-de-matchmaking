import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Tables

import AffichageTable from "./Afficher";
import FormElementsControls from "./Ajouter";
import FormElementsControlsUpdateStartup from "./Modifier";

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import FormElementsControlsUpdate from "../Challenges/Modifier";

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
                    <Route path={`${match.url}/update/:id`} component={FormElementsControlsUpdateStartup}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Domaines;