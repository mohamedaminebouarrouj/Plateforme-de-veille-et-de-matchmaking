export default `
core {
	active-bg-color: #fff;
	active-bg-opacity: 0.333;
}

edge {
	curve-style: haystack;
	haystack-radius: 0;
	opacity: 0.333;
	width: 0.01;
	z-index: 0;
	overlay-opacity: 0;
  events: no;
}

node {
	width: 30;
	height: 20;
	font-size: 4;
	shape:round-rectangle;
	min-zoomed-font-size: 0;
	label: data(name);
	text-wrap: wrap;
	text-max-width: 20;
	text-valign: center;
	text-halign: center;
	text-events: yes;
	color: #222a42;
	text-outline-width: 0.1;
	text-outline-color: #fff;
	text-outline-opacity: 1;
	overlay-color: #fff;
}

edge[interaction = "sd"] {
	line-color: #FACD37;
	opacity: 0.666;
	z-index: 9;
	width: 1;
}

node[NodeType = "secteur"],
node[NodeType = "secteur"] {
	background-color: #ffe600;
	text-outline-color: #ffe600;
}

node[NodeType = "Cheese"][Quality],
node[NodeType = "CheeseType"][Quality] {
	width: mapData(Quality, 70, 100, 20, 50);
	height: mapData(Quality, 70, 100, 20, 50);
}

node[NodeType = "WhiteWine"] {
	background-color: white;
	text-outline-color: white;
}

edge[interaction = "cw"] {
	line-color: white;
}

node[NodeType = "domaine"] {
    color: #fff;
	background-opacity:1;
	background-color: #222a42;
	text-outline-color: #222a42;
}

edge[interaction = "cr"] {
	line-color: #DE3128;
}

node[NodeType = "Cider"] {
	background-color: #A4EB34;
	text-outline-color: #A4EB34;
}

node.highlighted {
	min-zoomed-font-size: 0;
  z-index: 9999;
}

edge.highlighted {
	opacity: 1;
	width: 0.5;
	z-index: 9999;
}

.faded {
  events: no;
}

node.faded {
  opacity: 0;
}

edge.faded {
  opacity: 0;
}

.hidden {
	display: none;
}

`;
