let isInLinkMode=false;

function newnode(type, source){

    if(type == "child"){
        let child = "new child";
        if(child != null){
            nodes.push({id: child, level: source.level + 1});
            links.push({source: source.id, target: child});
        }
    } else if(type == "parent"){
        let parent = "new parent";
        if(parent != null){
            nodes.push({id: parent, level: source.level - 1});
            links.push({source: parent, target: source.id});
        }
    }

    loadgraph();
}

function enterlinkmode(svg, source) {
    let isInLinkMode = true;
    svg.attr("class", "fade");

    const circleElements = svg.selectAll("circle");
    console.log("Number of circles found:", circleElements.size());

    circleElements.on("click", function() {
        const clickedCircle = d3.select(this);
        let nodeid = this.parentElement.childNodes[1].textContent;
        
        console.log("Clicked on circle with id:", nodeid);
        
    });
}


