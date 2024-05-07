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