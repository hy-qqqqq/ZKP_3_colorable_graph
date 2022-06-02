// Interactive ZKP 3-colorable graph demonstration
// 2022 project @ NCTU Cryptography Engineering lecture
// Implemented with d3.v7.js

// flags
var g_auto = false;
    g_reveal =  false;
    g_trick = false;

// permutation
var g_perm_choices = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
    g_perm = g_perm_choices[0];

// graph contents
// ["#ffc408", "#fb9966", "#6a4c9c"];
var g_colors = ["#81c7d4", "#ffc408", "#6a4c9c"];
    g_graph = graph_0;
    g_cmap = g_graph.cmap[0]
    g_step = 1 / g_graph.links.length * 100;
    g_conf = 0;

// d3 force graph handlers
var g_node;
var g_link;

// d3 drawing params
const width = 800, // svg width
    height = 400, // svg height
    radius = 15, // node radius
    lwidth = 5, // links linewidth
    lcolor = "#000000"; // links color

// force graph func
function d3ForceGraph(nodes, links, posx, posy) {
    // append svg object to the container 
    var svg = d3.select("#d3_container").append("svg")
        .attr("width", width)
        .attr("height", height)
        .on("click", clear);

    // force simulation list
    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink()) // add force to the links
        .force("collide", d3.forceCollide(radius+10)) // similar to margin
        .force("charge", d3.forceManyBody().strength(-1000)) // force between objects
        .force("center", d3.forceCenter(width / 2, height / 2).strength(1)); // initial position

    // line objects
    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke-width", lwidth) // line width
        .attr("stroke", lcolor) // line color
        .attr("stroke-opacity", 0.6) // alpha
        .on("mouseover", mouseover)
        .on("click", clicked)
        .on("mouseout", mouseout);
    
    // circle objects
    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", radius) // radius
        .attr("fill-opacity", 1.0) // alpha
        .call(drag(simulation))
    
    // text objects
    var text = svg.selectAll("text")
        .data(nodes)
        .enter().append("text")
        .style("fill", "black")
        .attr("dx", 20)
        .attr("dy", 5)
        .text(function(d){return d.name;});
    
    // bind simulation
    simulation
        .nodes(nodes)
        .on("tick", ticked);  
    simulation
        .force("link",  d3.forceLink(links))
        .force('x', d3.forceX().x(function(d, i) {return posx[i];}))
        .force('x', d3.forceY().y(function(d, i) {return posy[i];}))

    // add source target attributes
    link
        .attr("source", function(d){return d.source.id})
        .attr("target", function(d){return d.target.id})

    // tick function, updates in each iteration
    function ticked() {
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });
        node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });
        text
            .attr("x", function(d) { return d.x;})
            .attr("y", function(d) { return d.y;});
    };
    
    // click interaction
    function mouseover(d) {
        d3.select(this)
            .transition()
            .duration(5)
            .attr("stroke", "red")
            .attr("stroke-width", lwidth+5);
    }
    function clicked(d) {
        // stop turbo
        stop_turbo();
        // clean
        clean_colors(false);
        // check if not selected
        if (!d3.select(this).classed("selected") ){
            // disselect all
            link.classed("selected", false);
            // select the link
            d3.select(this).classed("selected", true);
            // reveal
            reveal_line(this)
        }else{
            // disselect
            d3.select(this).classed("selected", false);
        }
    }
    function mouseout(d) {
        if(!d3.select(this).classed("selected") ){
            d3.select(this)
                .transition()
                .duration(500)
                .attr("stroke", lcolor)
                .attr("stroke-width", lwidth);
        }
    }

    // drag simulation functions
    function drag(simulation) {    
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }      
        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }     
        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }        
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
        }
    
    // return handlers
    return [node, link];
}

// clean colors of links and nodes
function clean_colors(disselcct) {
    // clean conf val
    document.getElementById("conf_val").style.color = "#000000";
    // clean link
    g_link
        .transition()
        .duration(0)
        .attr("stroke", lcolor)
        .attr("stroke-width", lwidth);
    // clean nodes
    g_node
        .attr("fill", "#000000");
    // disselect
    if (disselcct) {
        g_link.classed("selected", false);
    }
}

// when clicked on background
function clear(event) {
    // flag true when then target is not nodes and links
    var outside = d3.selectAll("circle, line")
        .filter(function() {return this == event.target;})
        .empty();
    // clean and disselected all
    if (outside) {
        clean_colors(true);
    }
}

// utility funcs
// random selecction in arr
function random_pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
// round given number
function round(num, pt) {
    return Math.round((num + Number.EPSILON) * (10**pt)) / 100
}
// randomly choose permutations of coloring assignment
function random_permutation() {
	perm = random_pick(g_perm_choices);
    return perm.map(i => g_colors[i]);
}

// reveal colors of all node
function reveal_all() {
    // check if currently auto
    var permute = true;
    if (document.getElementById("conf_val").style.color == "red") permute = false;
    stop_turbo();
    g_reveal = !g_reveal;
    //
    var btn_handler = document.getElementById("rev_btn");
    if (g_reveal) {
        btn_handler.innerHTML = "reset";
        btn_handler.style.backgroundColor = "#adb5bd";
        // each reveal operation would randomly assign colors again
        if (permute) {
            g_cmap = random_pick(g_graph.cmap);
            g_perm = random_permutation();
        }
        g_node.attr("fill", function(d) {return g_perm[g_cmap[d.id]];});
    }
    else {
        btn_handler.innerHTML = "reveal";
        btn_handler.style.backgroundColor = "#495057";
        clean_colors(true);
        // reset confidence
        g_conf = 0;
        update_conf();
    }
}

// reveal colors of the connected nodes to the selected line
function reveal_line(target_link) {
    // update g_conf value
    g_conf += g_step;
    update_conf();
    // cover all
    clean_colors(false);
    // mark the link
    d3.select(target_link)
        .transition()
        .duration(0)
        .attr("stroke","red")
        .attr("stroke-width", lwidth+5);
    // mark the connected nodes with random color assignment
    g_cmap = random_pick(g_graph.cmap);
    g_perm = random_permutation();
    var source = d3.select(target_link).attr("source");
    var target = d3.select(target_link).attr("target");
    g_node
        .filter(function(e){return e.id == source || e.id == target;})
        .attr("fill", function(d) {return g_perm[g_cmap[d.id]];});
    // trick check
    if (g_trick) {
        // caught
        if (g_cmap[source] == g_cmap[target]) {
            document.getElementById("conf_val").style.color = "red";
            return false
        }
    }
    return true
}

// sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function graph_ch(idx) {
    // reset
    reset();
    // clean svg
    d3.selectAll("svg").selectAll("*").exit().remove();
    // choose graph and get node handler
    if (idx == 0) {
        g_trick = false;
        g_graph = graph_0;
    }
    else if (idx == 1) {
        g_trick = true;
        g_graph = graph_1;
    }
    else return;
    // create new graph
    g_cmap = random_pick(g_graph.cmap);
    g_step = 1 / g_graph.links.length * 100;
    [g_node, g_link] = d3ForceGraph(g_graph.nodes, g_graph.links, g_graph.x, g_graph.y);
}

// auto run
function stop_turbo() {
    g_auto = false;
    update_conf();
    // reset button
    document.getElementById("auto_btn").style.backgroundColor = "#495057";
}

function auto_run() {
    g_auto = !g_auto;
    if (g_auto) {
        // focus button
        document.getElementById("auto_btn").style.backgroundColor = "#adb5bd";
        // run turbo loop
        turbo();
    }
    else {
        stop_turbo();
    }
}

function update_conf() {
    g_conf = round(g_conf, 2);
    if (g_conf > 100) g_conf = 100;
    document.getElementById("conf_val").innerHTML = g_conf + "%";
}

// async turbo loop
async function turbo() {
    // iteration
    while (g_conf < 100) {
        // randomly reveal a line
        var target_link = random_pick(g_link.nodes());
        var flag = reveal_line(target_link);
        d3.select(target_link).classed("selected", true);
        if (!flag) return;
        await sleep(1000);
        // reset
        clean_colors(true);
        await sleep(500);
        // break when press the button again
        if (!g_auto) return;
    }
    stop_turbo();
}

function reset() {
    // reset conf val
    g_conf = 0;
    update_conf();
    // clean contents
    document.getElementById("conf_val").style.color = "#000000";
    document.getElementById("d3_container").innerHTML = "";
    // dis auto
    // dis reveal
}