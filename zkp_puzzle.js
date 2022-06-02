var graph_0 = {
    "nodes": [
        {"id": 0, "name": "A"},
        {"id": 1, "name": "B"},
        {"id": 2, "name": "C"},
        {"id": 3, "name": "D"},
        {"id": 4, "name": "E"},
        {"id": 5, "name": "F"}
    ],
    "links": [
        {"source": 0, "target": 1},
        {"source": 0, "target": 2},
        {"source": 0, "target": 3},
        {"source": 0, "target": 4},
        {"source": 1, "target": 2},
        {"source": 1, "target": 3},
        {"source": 1, "target": 5},
        {"source": 2, "target": 4},
        {"source": 2, "target": 5},
        {"source": 3, "target": 4},
        {"source": 3, "target": 5},
        {"source": 4, "target": 5}
    ],
    "cmap": [
        [0, 1, 2, 2, 1, 0]
    ],
    "x": [300, 400, 200, 600, 300, 400],
    "y": [100, 100, 200, 200, 300, 300]
};

var graph_1 = {
    "nodes": [
        {"id": 0, "name": "A"},
        {"id": 1, "name": "B"},
        {"id": 2, "name": "C"},
        {"id": 3, "name": "D"},
        {"id": 4, "name": "E"},
        {"id": 5, "name": "F"},
        {"id": 6, "name": "G"},
        {"id": 7, "name": "H"},
        {"id": 8, "name": "I"},
        {"id": 9, "name": "J"}
    ],
    "links": [
        {"source": 0, "target": 1},
        {"source": 0, "target": 2},
        {"source": 0, "target": 5},
        {"source": 1, "target": 3},
        {"source": 1, "target": 6},
        {"source": 2, "target": 4},
        {"source": 2, "target": 7},
        {"source": 3, "target": 4},
        {"source": 3, "target": 8},
        {"source": 4, "target": 9},
        {"source": 5, "target": 8},
        {"source": 5, "target": 9},
        {"source": 6, "target": 7},
        {"source": 6, "target": 9},
        {"source": 7, "target": 8}
    ],
    "cmap": [
        [2, 1, 2, 0, 1, 1, 0, 1, 2, 2],
        [0, 1, 2, 0, 2, 1, 0, 1, 2, 2],
        [0, 1, 2, 0, 1, 1, 0, 1, 2, 1],
        [0, 1, 2, 0, 1, 1, 0, 1, 1, 2]
        //[0, 1, 2, 0, 1, 1, 0, 1, 2, 2] (solution)
    ],
    "x": [200, 0, 400, 50, 350, 200, 80, 320, 100, 300],
    "y": [0, 80, 80, 200, 200, 20, 100, 100, 160, 160]
};
