class Graph {
    constructor() {
        this.nodes = new Map();
    }

    addNode(node) {
        this.nodes.set(node, []);
    }

    addEdge(source, destination) {
        this.nodes.get(source).push(destination);
        this.nodes.get(destination).push(source);;
    }

    removeEdge(edge) {
        var data = this.nodes.get(edge);
        data.forEach(value => {
            var adj = this.nodes.get(value);
            for(var va of adj) {
                if(va == edge) {
                    adj.splice(adj.indexOf(va), 1);
                }
            }
        })
        data.splice(0)

        //return this.nodes.get(edge);
    }

    async bfs(startingNode, stop) {
        var vis = document.querySelectorAll("td");
        vis.item(0).classList.add("visited");
        var queue = [];
        var queue2 = [];
        var visited = [];
        queue.push(startingNode);
        queue2.push([startingNode]);
        visited[startingNode] = true;

        while(queue.length > 0) {
            var currentNode = queue.shift();
            var path = queue2.shift();
            var adjacencyListOfCurrentNode = this.nodes.get(currentNode);

            for(var node of adjacencyListOfCurrentNode) {
                if(!visited[node]) {
                    visited[node] = true;
                    var newpath = [...path];
                    newpath.push(node);
                    queue2.push(newpath);

                    if(node == stop) {
                        path.push(node)
                        vis.forEach(value => {
                            path.forEach(elem => {
                                if(elem == value.innerHTML) {
                                    value.classList.add("found")
                                }
                            });
                        });
                        return document.querySelector("h3").innerHTML = `${stop} is Found`;
                    }

                    await new Promise(res => setTimeout(() => {
                        vis.forEach(value => {
                            if(node == value.innerHTML) {
                                res(value.classList.add("visited"))
                            }
                        })
                    }, 10));
                    queue.push(node);
                }
            }
        }
        if(queue < 1) {
            return document.querySelector("h3").innerHTML = `${stop} Not Found`;
        }
    }

    display() {
        for(var [node, adjacencyList] of this.nodes) {
            console.log(`${node} : ${adjacencyList}`);
        }
    }
}

function rowNode(row, rowLength) {
    var arr = []
    for(var cell1 in row.children) {
        if(typeof(row.children[cell1]) == "object") {
            row.children[cell1].innerHTML = num;
            graph.addNode(row.children[cell1].innerHTML)
            arr.push(row.children[cell1].innerHTML)
            if(num <= rowLength) {
                if(arr.length > 1) {
                    var node = arr.shift()
                    graph.addEdge(node, row.children[cell1].innerHTML);
                }
            }
            ++num;
        }
    }
}

function rowEdge(row, rowsec) {
    for(var index in row.children) {
        if(typeof(row.children[index]) == "object") {
            graph.addEdge(row.children[index].innerHTML, rowsec.children[index].innerHTML)
        }
    }
}

function add() {
    num = 1;
    var size = document.querySelector("tr").cells.length
    //console.log(size)
    var all = document.querySelectorAll("tr");

    for(var ro in all) {
        if(typeof(all[ro]) == "object") {
            rowNode(all[ro], size)
            size += size;
        }
    }
    
    for(var ro in all) {
        if(typeof(all[ro]) == "object") {
            if(ro < (all.length - 1)) {
                rowEdge(all[ro], all[parseInt(ro) + 1])
            }
        }
    }
}

function automate() {
    graph.nodes.clear();
    add();
}

function wall() {
    var cell = document.querySelectorAll("td");;
    var select = document.querySelector("select");
    //var option = select.options[select.selectedIndex].value * 2;
    var option = Math.floor((select.options[select.selectedIndex].value * graph.nodes.size) / 100)
    var count = 0;
    cell.forEach(value => {
        if(value.classList.contains("wall")) {
            value.classList.remove("wall");
        }
        value.classList.remove("visited");
        value.classList.remove("found");
    })

    automate();
    
    for(var index in cell) {
        if(count < option) {
            var random = Math.floor((Math.random() * (graph.nodes.size - 1)) + 1);
            if(random != 0) {
                graph.removeEdge(cell[random].innerHTML);
                cell[random].classList.add("wall");
            }
        }
        ++count;
    }
    count = 0
    for(var val in cell) {
        if(typeof(cell[val]) == "object") {
            var size = graph.nodes.get(cell[val].innerHTML)
            if(size < 1) {
                if(val != 0) {
                    cell[val].classList.add("wall");
                }
            }
        }
    }
}

var graph = new Graph();

setTimeout(() => {
    add();
}, 500)

var test = document.querySelectorAll("td");
var button = document.querySelector("button");

button.addEventListener('click', wall);

test.forEach(grid => grid.addEventListener('click', function() {
    if(graph.nodes.get(grid.innerHTML).length < 1) return document.querySelector("h3").innerHTML = `Not Found`;
    if(grid.innerHTML == 1) return document.querySelector("h3").innerHTML = `1 is already found`;
    document.querySelector("h3").innerHTML = `Looking For ${grid.innerHTML}`
    document.querySelectorAll("td").forEach(value => {
        value.classList.remove("visited");
        value.classList.remove("found");
    });
    graph.bfs("1", grid.innerHTML)
}))

/*document.querySelector("input").addEventListener("keyup", enter => {
    if(enter.key == "Enter") {
        var val = document.querySelector("input").value
        var vis = document.querySelectorAll("td");
        if(val == 1) return document.querySelector("h3").innerHTML = `1 is already found`;
        if(!graph.nodes.has(val)) return document.querySelector("h3").innerHTML = `${val} Not Found`;
        vis.forEach(value => {
            value.classList.remove("first");
            value.classList.remove("visited");
            value.classList.remove("found");
        });
        graph.bfs("1", val);
    }
});*/