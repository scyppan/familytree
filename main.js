let simulation = null;

function loadgraph() {
    
    d3.select("svg").selectAll("*").remove();

    let svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

        const levelScale = d3.scaleLinear()
        .domain([1, 3]) // Levels as defined in your nodes
        .range([50, height-50]); // Adjust these values as needed

        simulation=null;
        simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(15))
        .force("charge", d3.forceManyBody().strength(-2000))
        .force("center", d3.forceCenter(width / 2, height / 2))
    .force("y", d3.forceY(d => levelScale(d.level)).strength(.1))
    .on("tick", () => {
        const link = svg.selectAll(".link");
            const node = svg.selectAll(".node");
            link.attr("d", d => `M${d.source.x},${d.source.y}L${d.target.x},${d.target.y}`);
            node.attr("transform", d => `translate(${d.x},${d.y})`);
    })
    .on("end", () => {
        document.getElementById("addNodeButton").disabled = false;
    });

    console.log("Node levels and projected y-positions:");
nodes.forEach(node => {
    console.log(`${node.id}: Level ${node.level}, Y ${levelScale(node.level)}`);
});

    // Create links as paths
    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("path")
        .data(links)
        .enter().append("path")
        .attr("class", "link");

    // Create nodes as groups of circles and texts
    const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node")
    .call(d3.drag()  // Initialize drag if needed; ensures nodes are interactive
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
    .on("click", function(event, d) {
        event.stopPropagation();
        populateForm(d);
    });

    // Append circles to node groups
    node.append("circle")
        .attr("r", 5);

    // Append text to node groups
    const label = node.append("text")
    .text(d => d.id)
    .attr("x", 8)
    .attr("y", 3)
    .attr("cursor", "pointer")
    .on("click", function(event, d) {
        event.stopPropagation();  // Stop propagation to prevent conflicts
        populateForm(d);  // Replace this with your function to populate the form

        const thisNode = d3.select(this.parentNode);

        node.on("click", function(event, d) {
            event.stopPropagation();  // Prevent the click from bubbling up to the document level
        
            // Populate the side panel
            document.getElementById('nodeName').value = d.id;
            document.getElementById('nodeName').dataset.nodeId = d.id;
            document.getElementById('birthingParent').value = d.birthingparent || '';
            document.getElementById('secondParent').value = d.parent2 || '';
            document.getElementById('birthdate').value = d.birthdate || '';
            document.getElementById('notes').value = d.notes || '';
        });
    });

// Clicking outside the editable area will remove editing elements
d3.select("body").on("click", function() {
    d3.selectAll('.editing').remove();
});

// To handle clicks outside the editable elements to close them
d3.select("body").on("click", function() {
    d3.selectAll('.editing').remove();  // Remove editing elements when clicking outside
});

document.addEventListener('click', function(event) {
    let gs = document.getElementsByClassName("node");
    Array.from(gs).forEach(x => {
        if (x.children.length > 2) {
            x.children[2].remove();
        }
    });
});

simulation.on("tick", () => {
    link.attr("d", d => `M${d.source.x},${d.source.y}L${d.target.x},${d.target.y}`);
    node.attr("transform", d => `translate(${d.x},${d.y})`);
}); 
}

function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

document.addEventListener('DOMContentLoaded', function() {
    loadgraph(); 
    setupAutoSave(); // Set up auto-save functionality when the page has loaded
});

