
AFRAME.registerComponent("window", {
    schema: {
        position: { type: "vec3", default: { x: 0, y: 0, z: 0 } },
        rotation: { type: "vec3", default: { x: 0, y: 0, z: 0 } },
        width: { type: "number", default: 4 },
        height: { type: "number", default: 4 },
        boards: { type: "number", default: 1 }

    },
    init: function () {
        //create window frame
        this.isPlayerNearThisWindow = false;
        this.debounce = 0;
        let bottomframe = document.createElement("a-box");
        bottomframe.setAttribute("position", `${this.data.position.x} ${this.data.position.y + 0.5} ${this.data.position.z}`);
        bottomframe.setAttribute("rotation", `${this.data.rotation.x} ${this.data.rotation.y} ${this.data.rotation.z}`);
        bottomframe.setAttribute("width", this.data.width);
        bottomframe.setAttribute("height", 1);
        bottomframe.setAttribute("depth", 1);
        bottomframe.setAttribute("color", "#3c3636");
        this.el.appendChild(bottomframe);

        let leftframe = document.createElement("a-box");
        leftframe.setAttribute("position", `${this.data.position.x - this.data.width / 2 + 0.25} ${this.data.position.y + 2} ${this.data.position.z}`);
        leftframe.setAttribute("rotation", `${this.data.rotation.x} ${this.data.rotation.y} ${this.data.rotation.z}`);
        leftframe.setAttribute("width", 0.5);
        leftframe.setAttribute("height", 2);
        leftframe.setAttribute("depth", 1);
        leftframe.setAttribute("color", "#3c3636");
        this.el.appendChild(leftframe);

        let rightframe = document.createElement("a-box");
        rightframe.setAttribute("position", `${this.data.position.x + this.data.width / 2 - 0.25} ${this.data.position.y + 2} ${this.data.position.z}`);
        rightframe.setAttribute("rotation", `${this.data.rotation.x} ${this.data.rotation.y} ${this.data.rotation.z}`);
        rightframe.setAttribute("width", 0.5);
        rightframe.setAttribute("height", 2);
        rightframe.setAttribute("depth", 1);
        rightframe.setAttribute("color", "#3c3636");
        this.el.appendChild(rightframe);

        let topframe = document.createElement("a-box");
        topframe.setAttribute("position", `${this.data.position.x} ${this.data.position.y + 3.5} ${this.data.position.z}`);
        topframe.setAttribute("rotation", `${this.data.rotation.x} ${this.data.rotation.y} ${this.data.rotation.z}`);
        topframe.setAttribute("width", this.data.width);
        topframe.setAttribute("height", 1);
        topframe.setAttribute("depth", 1);
        topframe.setAttribute("color", "#3c3636");
        this.el.appendChild(topframe);

        for (let i = 0; i < this.data.boards; i++) {
            let board = document.createElement("a-box");
            let boardHeight = ((i + 1) / this.data.boards) + ((0.5*(this.data.boards-1)) / this.data.boards);
            board.setAttribute("position", `${this.data.position.x} ${this.data.position.y + 1 + 1*(boardHeight)} ${this.data.position.z + 0.5}`);
            //board height can be represented by the equation: (i/boards + 0.5(boards-1)/boards) 
            //board.setAttribute("rotation", `0 0 0`);
            board.setAttribute("rotation", `${this.data.rotation.x} ${this.data.rotation.y} ${this.data.rotation.z + (Math.random() - 0.5) * 20}`)
            board.setAttribute("width", this.data.width - 1 + 0.5);
            board.setAttribute("height", 0.3);
            board.setAttribute("depth", 0.1);
            board.setAttribute("color", "#895129");
            this.el.appendChild(board);
        }

    },

    tick: function (time, timeDelta) {

        if (this.el.getAttribute("position").distanceTo(playerPosition) < 5) {
            if (!this.isPlayerNearThisWindow) {
                this.isPlayerNearThisWindow = true;
                windowsNearPlayer++;
                updateBoardText()
            }
            if (interactkey) {
                if(this.debounce <= 0){
                    this.el.appendChild(newBoardElement(this.data))
                    this.debounce = 50
                } else {
                    this.debounce -= 1;
                }
            }
            

        } else {
            if (this.isPlayerNearThisWindow) {
                this.isPlayerNearThisWindow = false;
                windowsNearPlayer--;
                updateBoardText()
            }
        }

    }

})

AFRAME.registerComponent("bars", {
    schema: {
        position: { type: "vec3", default: { x: 0, y: 0, z: 0 } },
        rotation: { type: "vec3", default: { x: 0, y: 0, z: 0 } },
    },
    init: function () {
        let leftbar = document.createElement("a-cylinder");
        leftbar.setAttribute("position", `${this.data.position.x - 0.25} ${this.data.position.y + 1.75} ${this.data.position.z}`);
        leftbar.setAttribute("radius", "0.1");
        leftbar.setAttribute("height", "3.5");
        leftbar.setAttribute("color", "#000");
        let rightbar = document.createElement("a-cylinder");
        rightbar.setAttribute("position", `${this.data.position.x + 0.25} ${this.data.position.y + 1.75} ${this.data.position.z}`);
        rightbar.setAttribute("radius", "0.1");
        rightbar.setAttribute("height", "3.5");
        rightbar.setAttribute("color", "#000");
        let topbar = document.createElement("a-box");
        topbar.setAttribute("position", `${this.data.position.x} ${this.data.position.y + 3.75} ${this.data.position.z}`);
        topbar.setAttribute("width", "1");
        topbar.setAttribute("height", "0.5");
        topbar.setAttribute("depth", "1");
        topbar.setAttribute("color", "#3c3636");
        this.el.appendChild(leftbar);
        this.el.appendChild(rightbar);
        this.el.appendChild(topbar);

    }
})

AFRAME.registerComponent("bookshelf", {
    init: function () {

        for (let i = 0; i < 3; i++) {


            let cylinder1 = document.createElement("a-cylinder");
            cylinder1.setAttribute("color", "#000");
            cylinder1.setAttribute("radius", "0.1");
            cylinder1.setAttribute("position", `-1 ${0.5 + i} -0.5`);

            let cylinder2 = document.createElement("a-cylinder");
            cylinder2.setAttribute("color", "#000");
            cylinder2.setAttribute("radius", "0.1");
            cylinder2.setAttribute("position", `1 ${0.5 + i} -0.5`);

            let cylinder3 = document.createElement("a-cylinder");
            cylinder3.setAttribute("color", "#000");
            cylinder3.setAttribute("radius", "0.1");
            cylinder3.setAttribute("position", `-1 ${0.5 + i} 0.5`);

            let cylinder4 = document.createElement("a-cylinder");
            cylinder4.setAttribute("color", "#000");
            cylinder4.setAttribute("radius", "0.1");
            cylinder4.setAttribute("position", `1 ${0.5 + i} 0.5`);

            let box = document.createElement("a-box");
            box.setAttribute("position", `${0} ${1 + i} ${0}`);
            box.setAttribute("height", "0.1");
            box.setAttribute("depth", "1.25");
            box.setAttribute("width", "2.25");
            box.setAttribute("color", "#895129");
            this.el.appendChild(cylinder1);
            this.el.appendChild(cylinder2);
            this.el.appendChild(cylinder3);
            this.el.appendChild(cylinder4);
            this.el.appendChild(box);
        }


    }
});

AFRAME.registerComponent("crates", {
    init: function () {
        let box1 = document.createElement("a-box");
        box1.setAttribute("position", `${0} ${0} ${0}`);
        box1.setAttribute("color", "#895129");
        box1.setAttribute("opacity", "0.8");
        this.el.appendChild(box1);
        let innerbox1 = document.createElement("a-box");
        innerbox1.setAttribute("position", `${0} ${0} ${0}`);
        innerbox1.setAttribute("color", "#000");
        innerbox1.setAttribute("width", "0.8");
        innerbox1.setAttribute("height", "0.8");
        innerbox1.setAttribute("depth", "0.8");
        this.el.appendChild(innerbox1);

        let box2 = document.createElement("a-box");
        box2.setAttribute("position", `${0} ${1} ${0}`);
        box2.setAttribute("color", "#895129");
        box2.setAttribute("opacity", "0.8");
        box2.setAttribute("rotation", "0 15 0");
        this.el.appendChild(box2);

        let innerbox2 = document.createElement("a-box");
        innerbox2.setAttribute("position", `${0} ${1} ${0}`);
        innerbox2.setAttribute("color", "#000");
        innerbox2.setAttribute("width", "0.8");
        innerbox2.setAttribute("height", "0.8");
        innerbox2.setAttribute("depth", "0.8");
        innerbox2.setAttribute("rotation", "0 15 0");
        this.el.appendChild(innerbox2);


    }
})

function newBoardElement(data) {
    let board = document.createElement("a-box");
            board.setAttribute("position", `${data.position.x} ${data.position.y + 2 + (Math.random()-0.5)*1} ${data.position.z + 0.5}`);
            board.setAttribute("rotation", `${data.rotation.x} ${data.rotation.y} ${data.rotation.z + (Math.random() - 0.5) * 20}`);
            board.setAttribute("width", data.width - 1 + 0.5);
            board.setAttribute("height", 0.3);
            board.setAttribute("depth", 0.1);
            board.setAttribute("color", "#895129");
            return board;
}

let interactkey = false;
let camera = document.querySelector("#firstfloor")
document.addEventListener("keydown", function (event) {
    if (event.key === "1") {
        let oldposition = camera.getAttribute("position")
        camera.setAttribute("position", `${oldposition.x} ${1.6} ${oldposition.z}`)
    } else if (event.key === "2") {
        let oldposition = camera.getAttribute("position")
        camera.setAttribute("position", `${oldposition.x} ${5.6} ${oldposition.z}`)
    
    } else if (event.key === "f" || event.key === "F") {
        interactkey = true;
    }
});

document.addEventListener("keyup", function (event) {
    if (event.key === "f" || event.key === "F") {
        interactkey = false;
    }
});

const colors = ["#1b1a18", "#26211e", "#3b3331", "#292522", "#3b3530", "#3d3b37", "#2b2726", "#302d27"];
function tiles(xMin, xMax, zMin, zMax, height = 0) {
    for (let x = xMin; x < xMax; x++) {
        for (let z = zMin; z < zMax; z++) {
            let tile = document.createElement("a-box");
            tile.setAttribute("position", `${x} ${height + 0.05} ${z}`);
            tile.setAttribute("rotation", "-90 0 0");
            tile.setAttribute("width", "0.9");
            tile.setAttribute("height", "0.9");
            tile.setAttribute("depth", "0.05");
            tile.setAttribute("color", colors[Math.floor(Math.random() * colors.length)]);
            document.querySelector("a-scene").appendChild(tile);

            let undertile = document.createElement("a-box");
            undertile.setAttribute("position", `${x} ${height} ${z}`);
            undertile.setAttribute("rotation", "-90 0 0");
            undertile.setAttribute("width", "1");
            undertile.setAttribute("height", "1");
            undertile.setAttribute("depth", "0.05");
            undertile.setAttribute("color", "#25231d");
            document.querySelector("a-scene").appendChild(undertile);
        }
    }
}

const gridColors = ["#343c42", "#424e58"];
function floortiles(xMin, xMax, zMin, zMax, height = 0) {
    for (let x = xMin; x < xMax; x++) {
        for (let z = zMin; z < zMax; z++) {
            let tile = document.createElement("a-box");
            tile.setAttribute("position", `${x} ${height} ${z}`);
            tile.setAttribute("rotation", "-90 0 0");
            tile.setAttribute("width", "0.9");
            tile.setAttribute("height", "0.9");
            tile.setAttribute("depth", "0.025");
            tile.setAttribute("color", gridColors[Math.abs(x % 2 == z % 2 ? 0 : 1)]);
            document.querySelector("a-scene").appendChild(tile);

        }
    }
}

function ceilingTile(xMin, xMax, zMin, zMax, height = 0) {
    for (let x = xMin; x < xMax; x++) {
        for (let z = zMin; z < zMax; z++) {

            let undertile = document.createElement("a-box");
            undertile.setAttribute("position", `${x} ${height} ${z}`);
            undertile.setAttribute("rotation", "-90 0 0");
            undertile.setAttribute("width", "1");
            undertile.setAttribute("height", "1");
            undertile.setAttribute("depth", "0.05");
            undertile.setAttribute("color", "#25231d");
            document.querySelector("a-scene").appendChild(undertile);
        }
    }
}



let player = document.getElementById("firstfloor");
let playerPosition = player.getAttribute("position");
let player_pos_text = document.getElementById("playerpos");
let board_window_text = document.getElementById("boardwindow");
let windowsNearPlayer = 0;


function updateBoardText() {
    if (windowsNearPlayer > 0) {
        board_window_text.setAttribute("value", `Press F to board the window.`);
    } else {
        board_window_text.setAttribute("value", ``);
    }
}

function updateHud() {
    player_pos_text.setAttribute("value",
        `Position: 
      x:${playerPosition.x.toFixed(2)} y:${playerPosition.y.toFixed(2)} z:${playerPosition.z.toFixed(2)}
      windowsnearplayer: ${windowsNearPlayer}`

    );
    requestAnimationFrame(updateHud);
}



document.addEventListener("DOMContentLoaded", function () {
tiles(-15, -1, -13, 10); // Main Room -- front
tiles(-14, -1, 10, 13); // Main Room -- middle
tiles(-15, -1, 13, 18); // Main Room -- back
tiles(-15, 16, -25, -13); // Hallway
tiles(-15, -2, -30, -25) // hallway -- 

//second floor
tiles(-15, -1, -13, 0, 4)
tiles(-15, -8, 0, 1, 4)  // curve
tiles(-15, -9, 1, 2, 4)
tiles(-15, -10, 2, 3, 4)
tiles(-15, -11, 3, 7, 4)

tiles(-15, -12, -30, -25, 4) // hallway stairs left
tiles(-5, -2, -30, -25, 4) // hallway stairs right  
tiles(-15, 16, -25, -13, 4); //hallway 

ceilingTile(-15, -1, 8, 10, 4) //first floor - top - hole
ceilingTile(-15, -13, 10, 16, 4) //first floor - left - hole
ceilingTile(-3, -1, 10, 16, 4) //first floor - left - hole
ceilingTile(-15, -1, 16, 18, 4) //first floor - right hole

ceilingTile(-15, -1, -13, 7, 8) //second floor
ceilingTile(-15, -2, -30, -25, 8)
ceilingTile(-15, 16, -25, -13, 8); //hallway


updateHud();

}
)