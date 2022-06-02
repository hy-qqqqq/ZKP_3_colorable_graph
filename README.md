<h1> Zero knowledge protocol demo with 3-colorable graph </h1>

> 2022 project @ NCTU Cryptography Engineering lecture  
> Implemented with d3.v7.js

<h1> Information </h1>

- `graph_coloring.py` graph coloring algorithm
- `graph_puzzle.py` puzzle info
- `solution_gen.py` generate correct data structure as input to d3.js
- `zkp_d3.js` dynamic network graph with d3
- `zkp_puzzle.js` puzzle info in d3 format
- `zkp.html` main page

<h1> Introduction </h1>

<h2> Zero knowledge protocol </h2>

Zero-knowledge proof
- Have the additional property of yielding nothing beyond the validity of the interactive proof protocol.
- Interactive/ Non-interactive

Zero knowledge protocol
- Interactive method for prover to prove to verifier that a statement is true, without revealing anything other than the veracity.

<h2> 3-colorable graph </h2>

A graph G is 3-colorable if the vertices of a given graph can be colored with only three colors, such that no two vertices of the same color are connected by an edge. 


<h1> Implementation </h1>

<h2> Backtracking algorithm </h2>

<h3> Concept </h3>

Assign colors one by one to different nodes, starting from the first node. For each assignment
1. check for safety by considering already assigned colors to the adjacent nodes.
2. If there is any safe assignment, mark the color assignment as part of the solution.
3. If no safe assignment exists then backtrack and return false.

![backtracking structure](/images/backtracking.jpg)

<h3> Verifying Iteration </h3>

Two scenarios
- Prover is honest (graph_0), in each reveal event
    - Color the graph with one correct solution
    - Permute the color assignment
- Prover is lying (graph_1), in each reveal event
    - Color with randomly choose from several wrong solutions
    - Permute the color assignment

<h2> Demonstration </h2>

https://user-images.githubusercontent.com/31570342/171650581-026cf774-b431-47a0-8fef-e71261691b47.mp4

<h1> Reference </h1>

1. [Interactive zero knowledge 3-colorability demonstration](https://web.mit.edu/~ezyang/Public/graph/svg.html)
2. [Zero knowledge proof](https://en.wikipedia.org/wiki/Zero-knowledge_proof)
3. [ZK Definition Proof](https://www.cs.cmu.edu/~goyal/s18/15503/scribe_notes/lecture23.pdf)
4. [3-colorable graph algorithms](https://en.wikipedia.org/wiki/Graph_coloring)
5. [D3.js](https://d3js.org/)
