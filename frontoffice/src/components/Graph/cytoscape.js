import React,{Component } from 'react';
import memoize from "lodash.memoize";

class Cytoscape extends Component {

  render(){
    return <div id="cy"/>
  }

  componentDidMount(){
    const { cy, controller } = this.props;
    const container = document.getElementById('cy');

    cy.mount(container);
    cy.fit(3);

    cy.on('ready',this.onTabStart = e =>{
      e.target._private.elements.forEach(x=>{
        if(x._private.data.id===this.props.id)
        {
          controller.highlight(x);
          cy.userZoomingEnabled(false)

        }
      })
    })

    cy.on('tap', this.onTap = e => {
      if(e.target._private.data.NodeType)
      {
        this.props.history.replace({ pathname: `/${e.target._private.data.NodeType}s/${e.target._private.data.id}`})
      }
      if( e.target === cy ){
        controller.unhighlight();
        controller.hideInfo();
        controller.closeMenu();
      } else {

        controller.highlight(e.target);
        cy.userZoomingEnabled(false)
      }

    });
  }

}

export default Cytoscape;
export { Cytoscape };