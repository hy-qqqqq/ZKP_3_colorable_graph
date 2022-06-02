from graph_coloring import Graph

def main():
    for id in range(3):
        GC = Graph(puzzle_id=id)
        if GC.graph_coloring():
            data = GC.dump_json()
            print(data)
            print("solution exists")
        else:
            print("solution does not exist")

if __name__ == '__main__':
    main()
