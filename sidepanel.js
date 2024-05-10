function saveNodeDetails() {
    const selectedNodeId = document.getElementById('nodeName').dataset.nodeId;
    const node = nodes.find(n => n.id === selectedNodeId);
    if (node) {
        node.id = document.getElementById('nodeName').value;
        node.birthingparent = document.getElementById('birthingParent').value;
        node.parent2 = document.getElementById('secondParent').value;
        node.birthdate = document.getElementById('birthdate').value;
        node.notes = document.getElementById('notes').value;
        loadgraph(); // Refresh the graph with updated data
    }
}

function populateForm(node) {
    document.getElementById("placeholder-sidepanel").classList.add("hidden");
    document.getElementById("sidepanel-form-container").classList.remove("hidden");
    document.getElementById('nodeName').value = node.id;
    document.getElementById('nodeName').dataset.nodeId = node.id;
    document.getElementById('birthingParent').textContent = node.birthingparent || '';
    document.getElementById('secondParent').textContent = node.parent2 || '';
    document.getElementById('birthdate').value = node.birthdate || '';
    document.getElementById('level').value = node.level || 1; // Assuming default level is 1
    document.getElementById('notes').value = node.notes || '';
}

function setupAutoSave() {
    document.getElementById('nodeName').addEventListener('change', updateNodeDetails);
    document.getElementById('birthdate').addEventListener('change', updateNodeDetails);
    document.getElementById('notes').addEventListener('change', updateNodeDetails);

    // Since the parent fields are now non-editable text, they are handled differently if needed
}

function updateNodeDetails() {
    const nodeId = document.getElementById('nodeName').dataset.nodeId;
    const newNodeId = document.getElementById('nodeName').value;

    nodes.forEach(node => {
        if (node.birthingparent === nodeId) {
            node.birthingparent = newNodeId;  
        }
        if (node.parent2 === nodeId) {
            node.parent2 = newNodeId;  
        }
        if(node.id===nodeId){
            node.id=newNodeId;
            node.birthdate = document.getElementById('birthdate').value;
            node.notes = document.getElementById('notes').value;
        }
    });

        loadgraph();
    }

document.getElementById('level').addEventListener('change', function() {
    document.getElementById("addNodeButton").disabled = true;
    const nodeId = document.getElementById('nodeName').dataset.nodeId;
    const newLevel = +this.value;
    
    // Find the node and update its level
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
        node.level = newLevel;

        // Re-run the simulation to reflect the new level positioning
        simulation.nodes(nodes).alpha(1).restart();
    }
});