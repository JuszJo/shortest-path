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

        document.querySelectorAll("td").forEach(value => {
            if(value.innerHTML == edge) {
                value.classList.add("wall");
            }
        })

        return this.nodes.get(edge);
    }

    async bfs(startingNode, stop) {
        var vis = document.querySelectorAll("td");
        vis.item(0).classList.add("visited");
        var queue = [];
        var queue2 = []
        var visited = [];
        var path = [];
        queue.push(startingNode);
        queue2.push([startingNode]);
        path.push([startingNode]);
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
                                    value.classList.add("found");
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
    }

    display() {
        for(var [node, adjacencyList] of this.nodes) {
            console.log(`${node} : ${adjacencyList}`);
        }
    }
}

var graph = new Graph();

var row1 = document.querySelector(".row1");
var row2 = document.querySelector(".row2");
var row3 = document.querySelector(".row3");
var row4 = document.querySelector(".row4");
var row5 = document.querySelector(".row5");
var row6 = document.querySelector(".row6");
var row7 = document.querySelector(".row7");
var row8 = document.querySelector(".row8");
var row9 = document.querySelector(".row9");
var row10 = document.querySelector(".row10");

var arr = [];
var num = 1;

function rowNode(row, rowLength) {
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
    arr = [];
}

function rowEdge(row, rowsec) {
    for(var index in row.children) {
        if(typeof(row.children[index]) == "object") {
            graph.addEdge(row.children[index].innerHTML, rowsec.children[index].innerHTML)
        }
    }
}

rowNode(row1, 20);
rowNode(row2, 40);
rowNode(row3, 60);
rowNode(row4, 80);
rowNode(row5, 100);
rowNode(row6, 120);
rowNode(row7, 140);
rowNode(row8, 160);
rowNode(row9, 180);
rowNode(row10, 200);

rowEdge(row1, row2);
rowEdge(row2, row3);
rowEdge(row3, row4);
rowEdge(row4, row5);
rowEdge(row5, row6);
rowEdge(row6, row7);
rowEdge(row7, row8);
rowEdge(row8, row9);
rowEdge(row9, row10);

graph.removeEdge('7');
graph.removeEdge('27');
graph.removeEdge('47');
graph.removeEdge('67');
graph.removeEdge('87');
graph.removeEdge('88');
graph.removeEdge('41');
graph.removeEdge('42');
graph.removeEdge('43');
graph.removeEdge('44');

var rem = 13;
var rem5 = 121;
var rem2 = 161;
var rem4 = 11;
var rem3 = 54;
var rem6 = 155;
var rem7 = 70;

for(var shit = 0; shit < 6; ++shit) {
    graph.removeEdge(rem.toString());
    graph.removeEdge(rem2.toString());
    graph.removeEdge(rem3.toString());
    graph.removeEdge(rem4.toString());
    graph.removeEdge(rem5.toString());
    graph.removeEdge(rem6.toString());
    graph.removeEdge(rem7.toString());
    ++rem2;
    ++rem3;
    ++rem5;
    ++rem6;
    rem4 += 20;
    rem += 20;
    rem7 += 20;
}

document.querySelector("input").addEventListener("keyup", enter => {
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
});

var test = document.querySelectorAll("td");

test.forEach(grid => grid.addEventListener('click', function() {
    if(graph.nodes.get(grid.innerHTML).length < 1) return document.querySelector("h3").innerHTML = `Not Found`;
    if(grid.innerHTML == 1) return document.querySelector("h3").innerHTML = `1 is already found`;
    document.querySelectorAll("td").forEach(value => {
        value.classList.remove("first");
        value.classList.remove("visited");
        value.classList.remove("found");
    });
    graph.bfs("1", grid.innerHTML)
}))