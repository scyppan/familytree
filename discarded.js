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

}