// HASH MAP IMPLEMENTATION

/*const graph = {
    a : ['a', 'b'],
    b : ['c'],
    c : ['d'],
    d : ['b', 'c']
};*/

class Graph {
    constructor() {
        this.nodes = new Map();
    }

    addNode(node) {
        this.nodes.set(node, []);
    }

    addEdge(source, destination) {
        this.nodes.get(source).push(destination);
        this.nodes.get(destination).push(source);
    }

    removeNode() {

    }

    removeEdge() {

    }

    async bfs(startingNode, stop) {
        var span = document.querySelectorAll("span");
        span[0].style.backgroundColor = "red";
        var queue = [];
        var arr = [];
        var visited = [];
        var found = false
        queue.push([startingNode]);
        visited[startingNode] = true;
        //arr.push(visited[startingNode])

        while(queue.length > 0) {
            var path = queue.shift();
            
            var node = path[path.length - 1];
            
            //if(node == stop) return console.log(`This is the shortest path : ${path}`);
            //console.log(`this is for ${node}`);
            
            var adjacencyListOfCurrentNode = this.nodes.get(node)
            //console.log(`this is for ${node} : ${adjacencyListOfCurrentNode}`);
            

            for(var adjacent of adjacencyListOfCurrentNode) {
                await new Promise(res => setTimeout(() => {
                    for(let i in span) {
                        if(span[i].innerHTML == adjacent) {
                            res(span[i].style.backgroundColor = "red");
                        }
                    }
                }, 100)
                );
                if(adjacent == stop) {
                    path.push(adjacent);
                    /*setTimeout(() => {for(var co of span) {
                        for(var pa of path) {
                            if(co.innerHTML == pa) {
                                co.style.backgroundColor = "blue";
                            }
                        }
                    }}, 1000);*/
                    arr.push(path);
                    //document.querySelector("h3").innerHTML = `This is the shortest path : ${path}`;
                    //console.log(`This is the shortest path : ${path}`);
                }
                if(!visited[adjacent]) {
                    visited[adjacent] = true;
                    console.log(`This is path : ${path}`)
                    //arr.push(visited[adjacent])
                    var newPath = [...path];
                    newPath.push(adjacent);
                    console.log(newPath);
                    queue.push(newPath);
                }
            }
            //console.log(`this is visited : ${arr}`)
        }
        
        var size = graph.nodes.size
        var winner = []
        arr.forEach(value => {
            if(value.length <= size) {
                size = value.length
                winner.push(value);
            }
        })
        console.log(winner.length)

        if(winner.length > 1) {
            document.querySelector("h3").innerHTML = `There are ${winner.length} shortest paths : `;
            for(var pat in winner) {
                for(var co of span) {
                    for(var pa of winner[pat]) {
                        if(co.innerHTML == pa) {
                            console.log(co.innerHTML);
                            co.style.backgroundColor = "blue";
                        }
                    }
                }
                var vari = document.createElement("h4"/*`h${parseInt(pat) + 1}`*/);
                vari.innerHTML = winner[pat];
                document.querySelector("h3").append(vari);
            }
        }
        else {
            setTimeout(() => {
                for(var co of span) {
                    for(var pa of winner[0]) {
                        if(co.innerHTML == pa) {
                            co.style.backgroundColor = "blue";
                        }
                    }
                }
            }, 500);
            return document.querySelector("h3").innerHTML = `This is the shortest path : ${winner}`;
        }    
        
        //console.log(arr);
        /*let visitedNode = [];
        let queue = [];
        let track = [];
        let path = [];
        var count = 0;
        visitedNode[startingNode] = true;
        queue.push(startingNode);
        track.push(startingNode);
        //track.push(startingNode);
        var span = document.querySelectorAll("span");
        span[0].style.backgroundColor = "red";
        
        while (queue.length > 0) {
            const currentNode = queue.shift();
            //console.log(currentNode);
            const adjacencyListOfCurrentNode = this.nodes.get(currentNode);
            //console.log(`${currentNode} : ${adjacencyListOfCurrentNode}`);
            track.push(currentNode);
            for (let node of adjacencyListOfCurrentNode) {
                if (!visitedNode[node]) {
                    visitedNode[node] = true;
                    await new Promise(res => setTimeout(() => {
                        for(let i in span) {
                            if(span[i].innerHTML == node) {
                                span[i].style.backgroundColor = "red";
                            }
                        }
                        queue.push(node);
                        //console.log(queue);
                        ++count;

                        if(node == stop){
                            document.querySelector("h3").innerHTML = `${stop} has been found in ${count} iterations`;
                            this.fastest(stop, startingNode);
                            //path[startingNode] = track;
                            //console.log(path);
                            return console.log(`${stop} has been found in ${count} iterations`);
                        }
                        res();
                    }, 500));
                }
            }
        }*/
    }

    async fastest(found, head) {
        let span = document.querySelectorAll("span");
        async function my() {
            await new Promise(res => setTimeout(() => {span.forEach(elem => {
                if(elem.innerHTML != head) {
                    res(elem.style.backgroundColor = "burlywood");
                }
            })}, 500));
        }
    }

    display() {
        for(var [node, adjacencyList] of this.nodes) {
            console.log(`${node} : ${adjacencyList}`);
        }
    }
}

var graph = new Graph();

graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addNode('D');
graph.addNode('E');
graph.addNode('F');
graph.addNode('G');
graph.addNode('H');

graph.addEdge("A", "B");
graph.addEdge("A", "D");
graph.addEdge("B", "C");
graph.addEdge("B", "D");
graph.addEdge("E", "F");
graph.addEdge("D", "E");
graph.addEdge("B", "G");
graph.addEdge("D", "G");
graph.addEdge("G", "H");
graph.addEdge("C", "H");

//graph.display();

//console.log(graph.nodes);

var i = 1;

graph.nodes.forEach((value, key) => {
    document.querySelector(`div span:nth-child(${i})`).innerHTML = key
    ++i;
});

document.querySelector("input").addEventListener("keyup", enter => {
    if(enter.key == "Enter") {
        func();
    }
});

function func() {
    var val = document.querySelector("input").value
    var con = document.querySelector("h2");
    con.innerHTML = `Looking For ${val}`;
    if(!graph.nodes.has(val)) return document.querySelector("h3").innerHTML = `${val} Not Found`;
    if(val == "A") {
        return document.querySelector("h3").innerHTML = `A is already Visited`;
    }

    document.querySelectorAll("span").forEach((value, key, par) => {
            if(key != 0 ) {
                value.style.backgroundColor = "burlywood";
            }

        //console.log("this is the : ", value)
        //console.log("this is the : ", key)
        //console.log("this is the : ", par)
    })
    graph.bfs('A', val);
}

graph.display()

//graph.nodes.forEach((value, key) => {
//    console.log(value);
//    console.log(key);
//})