function manageclick(clicktype, event, d){

    console.log("clicktype", clicktype);

    switch(clicktype){
        case "startlinkmode":
            console.log("link mode started");
            linkSource =d;
            linkType=event;
            linkMode=true;
            enterLinkMode();
        break;
        case "assignparent":
            
        console.log("link parent", d);
            let sourceNode=nodes.find(x=>x.id==linkSource)
            let newParent=d.id

            if(linkType=="birthingParent"){
                sourceNode.birthingparent=newParent;
            }else{
                sourceNode.parent2=newParent;
            }
            
            populateForm(sourceNode);
            exitLinkMode();
            generateLinks();
            loadgraph();
            
        break;
        case "regularnodeclick":
            console.log("node clicked", d);
            event.stopPropagation();
            populateForm(d);
        break;
        case "exitlinkmode":
            console.log("exitlinkmode");
            exitLinkMode();
        break;
    }
}