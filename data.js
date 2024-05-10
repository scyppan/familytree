let nodes = [
    { id: 'Unknown Parentage', level: 1, birthdate: '', notes: '' },
    { id: 'Lily Potter', birthingparent: 'Unknown Parentage', parent2: 'Unknown Parentage', level: 2, birthdate: '1960-01-30', notes: 'Member of the Order of the Phoenix' },
    { id: 'James Potter I', birthingparent: 'Unknown Parentage', parent2: 'Unknown Parentage', level: 2, birthdate: '1960-03-27', notes: 'Prongs of the Marauders' },
    { id: 'Harry Potter', birthingparent: 'Lily Potter', parent2: 'James Potter I', level: 3, birthdate: '1980-07-31', notes: 'The boy who lived' }
];

let links=[];

function addNewNode() {
    document.getElementById("addNodeButton").disabled=true;
    const newNodeId = 'NewNode' + (nodes.length + 1);
    const newNode = {
        id: newNodeId,
        birthingparent: 'Unknown Parentage',
        parent2: 'Unknown Parentage',
        level: 1, // Assuming level is always set like this
        birthdate: '',
        notes: '',
        x: 100, // Default X position
        y: 100  // Default Y position
    };
    nodes.push(newNode);

    links = generateLinks();
    loadgraph();
}

function generateLinks() {
    let newLinks = [];
    nodes.forEach(node => {
        if (node.birthingparent) {
            newLinks.push({ source: node.birthingparent, target: node.id });
        }
        if (node.parent2) {
            newLinks.push({ source: node.parent2, target: node.id });
        }
    });
    links = newLinks; // Make sure this updates the global links array
    return links;
}
