from graph_puzzle import puzzles

class Node:
    def __init__(self):
        self.color = -1
        self.edges = set()

    def add_edge(self, node_id):
        self.edges.add(node_id)

class Graph:
    def __init__(self, n_color=3, puzzle_id=0):
        self.n_color = n_color
        self.n_node = puzzles[puzzle_id]['n_node']
        self.puzzle = puzzles[puzzle_id]['edges']

    def _create_nodes_from_adj(self):
        self.nodes = []
        for _ in range(self.n_node):
            self.nodes.append(Node())
        
        for i, j in self.puzzle:
            self.nodes[i].add_edge(i)
            self.nodes[j].add_edge(i)

        return
    
    def _is_safe(self, cur, c):
        for nbr in self.nodes[cur].edges:
            if self.nodes[nbr].color == c:
                return False
        
        return True
         
    def _backtracking_recur(self, idx):
        if idx == self.n_node:
            return True
 
        for c in range(self.n_color):
            if self._is_safe(idx, c) == True:
                self.nodes[idx].color = c
                if self._backtracking_recur(idx+1) == True:
                    return True
                self.nodes[idx].color = 0
    
    def _backtracking(self):
        if self._backtracking_recur(0) == None:
            return False
        
        return True
    
    def graph_coloring(self):
        self._create_nodes_from_adj()
        return self._backtracking()

    def get_colors(self):
        self.colors = []
        for node in self.nodes:
            self.colors.append(node.color)
        return self.colors

    def dump_json(self):
        cmap = self.get_colors()
        nodes = [{'id': id, 'name': chr(id+65) } for id in range(self.n_node)]
        links = [{'souorce': s, 'target': t} for s, t in self.puzzle]
        comb_dict = {'nodes': nodes, 'links': links, 'cmap': cmap}
        return comb_dict
