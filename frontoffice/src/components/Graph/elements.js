
const axios = require('axios');



async function getData() {
    let data = {
        nodes: [],
        edges: []
    }
    let axis_x = 4491.9853515625
    let axis_y = 4520.1904296875
    let edge_id = 1700
    let p = await axios.get('http://localhost:5000/secteurs/');
    p.data.forEach(element => {

        //axis_x += 25
        //axis_y += 25
        const el = { data: {
                id: element._id,
                selected: false,
                SUID: element._id,
                NodeType: "secteur",
                name: element.nom,
                shared_name: element.nom
            },position: {
                x: axis_x,
                y: axis_y
            }

        }

        data.nodes.push(el)



        if (element.domainesId.length > 0) {
            element.domainesId.forEach(item => {
                edge_id += 1
                axis_x += 20
                axis_y += 20
                let found = false
                const eld = { data: {
                        id: item._id,
                        selected: false,
                        SUID: item._id,
                        NodeType: "domaine",
                        name: item.nom,
                        shared_name: item.nom
                    },position: {
                        x: axis_x,
                        y: axis_y
                    }

                }
                const edg = {
                    data: {
                        id: edge_id,
                        source: element._id,
                        target: item._id,
                        selected: false,
                        canonicalName: element.nom + "(sd)" + item.nom,
                        SUID: edge_id,
                        name: element.nom + "(sd)" + item.nom,
                        interaction: "sd",
                        shared_interaction: "sd",
                        shared_name: element.nom + "(sd)" + item.nom
                    }, selected: false
                }

                data.nodes.forEach(n =>{
                    if((n.data.id === eld.data.id))
                    {
                        found = true
                    }
                })
                if (!found){
                    data.nodes.push(eld)

                }
                data.edges.push(edg)
            })
        }



    })
    data.nodes.forEach((n) => {
        const data = n.data;

        data.NodeTypeFormatted = data.NodeType;

        // the source data for types isn't formatted well for reading
        if( data.NodeTypeFormatted === 'domaine' ){
            data.NodeTypeFormatted = 'domaine';
        } else if( data.NodeTypeFormatted === 'WhiteWine' ){
            data.NodeTypeFormatted = 'White Wine';
        } else if( data.NodeTypeFormatted === 'secteur' ){
            data.NodeTypeFormatted = 'secteur';
        }

        // save original position for use in animated layouts
        n.data.orgPos = {
            x: n.position.x,
            y: n.position.y
        };

        // zero width space after dashes to allow for line breaking
        data.name = data.name.replace(/[-]/g, '-\u200B');
    });
    return data
}


export default getData()