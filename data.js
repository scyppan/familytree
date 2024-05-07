let nodes = [
    { id: 'Unknown Parentage', level: 1},
    { id: 'Lily Potter', level: 2},
    { id: 'James Potter I', level: 2 },
    { id: 'Harry Potter', level: 3 }
];

let links = [
    { source: 'Lily Potter', target: 'Harry Potter' },
    { source: 'James Potter I', target: 'Harry Potter' },
    { source: 'Unknown Parentage', target: 'Lily Potter' },
    { source: 'Unknown Parentage', target: 'James Potter I' },
];