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
        icon: 'pe-7s-eyedropper',
        label: 'Domaines',
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
        icon: 'pe-7s-news-paper',
        label: 'Tendances',
        content: [
            {
                label: 'Afficher les Tendances',
                to:'#/tendances/afficher'
            },
            {
                label: 'Ajouter une nouvelle Tendance',
                to:'#/tendances/ajouter'
            },

        ],
    },
    {
        icon: 'pe-7s-users',
        label: 'Utilisateurs',
        content: [
            {
                label: 'Afficher les Utilisateurs',
                to:'#/utilisateurs/afficher'
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