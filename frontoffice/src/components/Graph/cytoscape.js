import React,{Component } from 'react';

class Cytoscape extends Component {

  render(){
    return <div id="cy" />
  }

  componentDidMount(){
    const { cy, controller } = this.props;
    const container = document.getElementById('cy');

    cy.mount(container);
    cy.on('ready',this.onTabStart = e =>{
      e.target._private.elements.forEach(x=>{
        if(x._private.data.id===this.props.id)
        {
          controller.highlight(x);
          cy.maxZoom(5)
          cy.userZoomingEnabled(false)

        }
      })

    })

    cy.on('tap', this.onTap = e => {
      if(e.target._private.data.NodeType)
      {
        this.props.history.replace({ pathname: `/${e.target._private.data.NodeType}s/${e.target._private.data.id}`})
      }
    });
  }

}

export default Cytoscape;
export { Cytoscape };