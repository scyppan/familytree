function loadgraph() {

    d3.select("svg").selectAll("*").remove();

    const svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

        const levelScale = d3.scaleOrdinal()
        .domain([1, 2, 3]) // Levels as defined in your nodes
        .range([height * 0.2, height * 0.5, height * 0.8]); // Adjust these values as needed
    

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(75))
        .force("charge", d3.forceManyBody().strength(-400))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("y", d3.forceY(d => levelScale(d.level || 1)).strength(0.05));  // Apply vertical alignment force

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
        .attr("class", "node");

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
        event.preventDefault();
        event.stopPropagation();

        const thisNode = d3.select(this.parentNode);

        if (d3.select(".editing").empty()) {
            d3.selectAll('.editing').remove();

            // Calculate width based on the length of the text
            const inputWidth = Math.max(100, d.id.length * 8 + 17.5); // Estimate width based on character count

            // Input for editing text
            const textInput = thisNode.append("foreignObject")
                .attr("x", 10)
                .attr("y", -15)
                .attr("width", inputWidth) // Use dynamic width
                .attr("height", 30)
                .append("xhtml:body")
                .style("margin", "0px")
                .append("xhtml:input")
                .attr("value", d.id)
                .attr("style", `width: ${inputWidth - 2}px;`) // Ensure the input fits within the foreignObject
                .classed("editing", true)
                .on("keydown", function(e) {
                    if (e.keyCode === 13) {  // Enter key
                        d.id = this.value;
                        thisNode.select("text").text(d.id);
                        d3.selectAll('.editing').remove();
                        simulation.alpha(1).restart();
                    }
                });

            textInput.node().focus();
            textInput.node().select();

            // Append child and parent addition options
            const childButton = thisNode.append("text")
                .attr("x", inputWidth - 140) // Position next to the input field
                .attr("y", 25)
                .text("⊕ Child")
                .attr("fill", "green")
                .attr("cursor", "pointer")
                .classed("editing", true)
                .on("click", function() {
                    newnode("child", d);
                });

            const parentButton = thisNode.append("text")
                .attr("x", inputWidth - 90) // Position next to the child button
                .attr("y", 25)
                .text("⊕ Parent")
                .attr("fill", "green")
                .attr("cursor", "pointer")
                .classed("editing", true)
                .on("click", function() {
                    newnode("parent", d);
                });
        }
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

    // Handle the positioning of nodes and links on simulation tick
    simulation.on("tick", () => {
        link.attr("d", d => `M${d.source.x},${d.source.y}L${d.target.x},${d.target.y}`); // Update link path

        node.attr("transform", d => `translate(${d.x},${d.y})`); // Position nodes
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadgraph(); 
});