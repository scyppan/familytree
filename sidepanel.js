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

function populateForm(d) {
    document.getElementById('nodeName').value = d.id;
    document.getElementById('nodeName').dataset.nodeId = d.id;
    document.getElementById('birthingParent').textContent = d.birthingparent || 'None';
    document.getElementById('secondParent').textContent = d.parent2 || 'None';
    document.getElementById('birthdate').value = d.birthdate || '';
    document.getElementById('notes').value = d.notes || '';
}

function linkParent(parentType) {
    const nodeId = document.getElementById('nodeName').dataset.nodeId;
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    if (parentType === 'birthingParent') {
        console.log("Linking birthing parent for", node.id);
        // Implement logic to link birthing parent
    } else if (parentType === 'secondParent') {
        console.log("Linking second parent for", node.id);
        // Implement logic to link second parent
    }
}

function setupAutoSave() {
    document.getElementById('nodeName').addEventListener('change', updateNodeDetails);
    document.getElementById('birthdate').addEventListener('change', updateNodeDetails);
    document.getElementById('notes').addEventListener('change', updateNodeDetails);

    // Since the parent fields are now non-editable text, they are handled differently if needed
}

function updateNodeDetails() {
    const nodeId = document.getElementById('nodeName').dataset.nodeId;
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
        node.id = document.getElementById('nodeName').value;
        node.birthdate = document.getElementById('birthdate').value;
        node.notes = document.getElementById('notes').value;

        // Assuming you need to update the graph or UI
        loadgraph();  // Re-render the graph with updated data
    }
}