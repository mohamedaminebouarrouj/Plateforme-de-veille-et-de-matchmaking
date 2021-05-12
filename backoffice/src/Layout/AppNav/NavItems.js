import React, {Component} from "react";
import axios from "axios";
import {apiConfig} from "../../config/config";


export class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            revendication: null,
            notif:0,
        }
    }


    componentDidMount() {
        axios.get(apiConfig.baseUrl+'/revendications/')
            .then(response => {
                this.setState({
                    revendication:response.data
                })
                this.state.revendication.map(r=>{
                    if (r.traited===false)
                    {
                        this.setState({
                            notif:this.state.notif+1
                        });
                    }

                })
            })

    }

    render() {
        return(
                <a>
                    {this.props.sel} {this.state.notif>0?<div className="ml-auto badge badge-pill badge-info">{this.state.notif}</div>:<div></div>}
                </a>
        )}
}

export const MainNav = [
    {
        icon: 'pe-7s-home',
        label: 'Accueil',
        to: '#/dashboards/basic',
    },
    {
        icon: 'pe-7s-helm',
        label: 'Secteurs',
        content: [
            {
                label: 'Afficher les Secteurs',
                to:'#/secteurs/afficher'
            },
            {
                label: 'Ajouter un nouveau Secteur',
                to:'#/secteurs/ajouter'
            },

        ],
    },
    {
        icon: 'pe-7s-target',
        label: 'Challenges',
        content: [
            {
                label: 'Afficher les Challenges',
                to:'#/challenges/afficher'
            },
            {
                label: 'Ajouter un nouveau Challenge',
                to:'#/challenges/ajouter'
            },

        ],
    },
    {
        icon: 'pe-7s-star',
        label: 'Startups',
        content: [
            {
                label: 'Afficher les Startups',
                to:'#/startups/afficher'
            },
            {
                label: 'Ajouter une Startup',
                to:'#/startups/ajouter'
            },

        ],
    },
    {
        icon: 'pe-7s-box2',
        label: "Domaines des startups",
        content: [
            {
                label: 'Afficher les Domaines',
                to:'#/domaines/afficher'
            },
            {
                label: 'Ajouter un nouveau Domaine',
                to:'#/domaines/ajouter'
            },

        ],
    },

    {
        icon: 'pe-7s-news-paper',
        label: 'Tendances',
        to:'#/tendances/afficher',

    },
    {
        icon: 'pe-7s-users',
        label: <Notification sel="Utilisateurs"/>,
        content: [
            {
                label: 'Afficher les Utilisateurs',
                to:'#/utilisateurs/afficher'
            },
            {
                label: <Notification sel="Revendications"/>,
                to:'#/revendications/afficher'
            },

        ],
    },
];

export const ComponentsNav = [
    {
        icon: 'pe-7s-diamond',
        label: 'Elements',
        content: [
            {
                label: 'Standard Buttons',
                to: '#/elements/buttons-standard',
            },
            {
                label: 'Dropdowns',
                to: '#/elements/dropdowns',

            },
            {
                label: 'Icons',
                to: '#/elements/icons',
            },
            {
                label: 'Badges',
                to: '#/elements/badges-labels',
            },
            {
                label: 'Cards',
                to: '#/elements/cards',
            },
            {
                label: 'List Groups',
                to: '#/elements/list-group',
            },
            {
                label: 'Navigation Menus',
                to: '#/elements/navigation',
            },
            {
                label: 'Utilities',
                to: '#/elements/utilities',
            },
        ],
    },
    {
        icon: 'pe-7s-car',
        label: 'Components',
        content: [
            {
                label: 'Tabs',
                to: '#/components/tabs',
            },
            {
                label: 'Notifications',
                to: '#/components/notifications',
            },
            {
                label: 'Modals',
                to: '#/components/modals',
            },
            {
                label: 'Progress Bar',
                to: '#/components/progress-bar',
            },
            {
                label: 'Tooltips & Popovers',
                to: '#/components/tooltips-popovers',
            },
            {
                label: 'Carousel',
                to: '#/components/carousel',
            },
            {
                label: 'Maps',
                to: '#/components/maps',
            },
        ],
    },
    {
        icon: 'pe-7s-display2',
        label: 'Regular Tables',
        to: '#/tables/regular-tables',
    },
];
export const FormsNav = [
    {
        icon: 'pe-7s-light',
        label: 'Controls',
        to: '#/forms/controls',
    },
    {
        icon: 'pe-7s-eyedropper',
        label: 'Layouts',
        to: '#/forms/layouts',
    },
    {
        icon: 'pe-7s-pendrive',
        label: 'Validation',
        to: '#/forms/validation',
    },
];
export const WidgetsNav = [
    {
        icon: 'pe-7s-graph2',
        label: 'Dashboard Boxes',
        to: '#/widgets/dashboard-boxes',
    },
];
export const ChartsNav = [
    {
        icon: 'pe-7s-graph2',
        label: 'ChartJS',
        to: '#/charts/chartjs',
    },
];