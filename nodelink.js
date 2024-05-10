let linkMode = false;
let linkSource = null; //which node asked to enter link mode
let linkType = null; //birthingParent or secondParent

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

function enterLinkMode() {

    document.getElementById("graph").classList.add("fade");
    document.getElementById("linkmodelabel").classList.remove("hidden");
    document.getElementById("addNodeButton").classList.add("hidden");
    document.getElementById("nodeName").disabled=true;
    document.getElementById("linkBirthingParentButton").disabled=true;
    document.getElementById("linkSecondParentButton").disabled=true;
    document.getElementById("birthdate").disabled=true;
    document.getElementById("level").disabled=true;
    document.getElementById("notes").disabled=true;
}

function exitLinkMode(){
    document.getElementById("graph").classList.remove("fade");
    document.getElementById("linkmodelabel").classList.add("hidden");
    document.getElementById("addNodeButton").classList.remove("hidden");
    document.getElementById("nodeName").disabled=false;
    document.getElementById("linkBirthingParentButton").disabled=false;
    document.getElementById("linkSecondParentButton").disabled=false;
    document.getElementById("birthdate").disabled=false;
    document.getElementById("level").disabled=false;
    document.getElementById("notes").disabled=false;

    linkMode=false;
    linkSource=null;
    linkType=null;
}

