import React,{ Component } from 'react';
import Cytoscape from 'cytoscape';
import Controller from "./controller";
import CytoscapeComponent from "./cytoscape";
import style from './style';
import './dist/bundle.css';
import elements from './elements'

class AppComponent extends Component {
    constructor(props){
        super(props);
        this.getNodeSelected=this.getNodeSelected.bind(this)


        const cy = new Cytoscape({
            elements,
            style,
            layout: { name: 'preset' },
            selectionType: 'single',
            boxSelectionEnabled: true
        });


        var j = cy.nodes('node[id="'+this.props.secteurId+'"]');
        console.log("j",j)

        cy.center(j)

        const controller = new Controller({ cy });
        const bus = controller.bus;

        this.state = { controller, cy };


    bus.on('showInfo', this.onShowInfo = (node => {
        this.setState({ infoNode: node });
    }));

    bus.on('hideInfo', this.onHideInfo = (() => {
        this.setState({ infoNode: null });
    }));
    }

    getNodeSelected() {

        this.state.cy.nodes().forEach(el => {
            console.log(el)
            if( el.data.id === this.props.secteurId){
                    return el
            }
        })
    }
componentWillUnmount(){
    const bus = this.state.controller.bus;

    bus.removeListener('showInfo', this.onShowInfo);
    bus.removeListener('hideInfo', this.onHideInfo);
}

    render(){
        return (
            <div className='app'>
                <script type="text/javascript" src="dist/polyfills.js"/>
                <script type="text/javascript" src="dist/bundle.js"/>
                <CytoscapeComponent id={this.props.id} history={this.props.history} cy={this.state.cy} controller={this.state.controller}/>
            </div>
        )
    }
}

export default AppComponent;
export { AppComponent };