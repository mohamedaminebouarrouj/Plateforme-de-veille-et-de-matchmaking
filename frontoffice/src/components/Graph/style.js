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
    line-style:dotted;

}

node {
	width: 50;
	height: 50;
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
	line-color: #FFF;
	opacity: 0.1;
	z-index: 0;
	width: 0.01;
}

node[NodeType = "secteur"] {
    color: #333333;
    font-size:5;
	background-color: #fff;
	text-outline-color: #fff;
}


node[NodeType = "challenge"] {
    color: #333333;
    font-size:5;
	background-color: #fff;
	text-outline-color: #fff;
	
}

node.highlighted {
	min-zoomed-font-size: 0;
}

:selected {
    background-image: data(img);
    background-image-opacity:0.4;
    background-fit:cover;
	color:#2E2E38;
	background-color: #FFDB00;
	text-outline-color: #2E2E38;
}

:unselected {
    background-image: data(img);
    background-image-opacity:0.4;
    background-fit:cover;
	color:#F6F6FA;
	background-color: #747480;
	text-outline-color: #F6F6FA;
}

edge.highlighted {
	opacity: 0.3;
	width: 0.4;
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
