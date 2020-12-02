export default `
core {
	active-bg-color: #fff;
	active-bg-opacity: 0.333;
}

edge {
	curve-style: haystack;
	haystack-radius: 0;
	opacity: 0.333;
	width: 0.1;
	z-index: 0;
	overlay-opacity: 0;
  events: no;
}

node {
	width: 32;
	height: 32;
	font-size: 5;
	font-family: "Poppins", sans-serif;
	min-zoomed-font-size: 3;
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

edge[interaction = "sc"] {
	line-color: #FFDB00;
	opacity: 0.666;
	z-index: 0;
	width: 0.5;
}

node[NodeType = "secteur"],
node[NodeType = "secteur"] {
    
    shape:round-rectangle;
    width: 35;
	height: 25;
	font-size: 3;
    color: #333333;
	background-color: #FFDB00;
	text-outline-color: #FFDB00;
}


node[NodeType = "challenge"] {
    color: #333333;
    font-size:3.5;
	background-color: #fff;
	text-outline-color: #fff;
}

node.highlighted {
	min-zoomed-font-size: 0;
}

edge.highlighted {
	opacity: 0.8;
	width: 0.2;
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
