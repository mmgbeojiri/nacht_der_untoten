class Tile {

    constructor(xMin, xMax, zMin, zMax, height = 0, abovetile = true) {
        const colors = ["#1b1a18", "#26211e", "#3b3331", "#292522", "#3b3530", "#3d3b37", "#2b2726", "#302d27"];
        if (abovetile) {
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
                }
            }
        }

        for (let x = xMin; x < xMax; x++) {
            for (let z = zMin; z < zMax; z++) {
                let undertile = document.createElement("a-box");
                undertile.setAttribute("position", `${x} ${height} ${z}`);
                undertile.setAttribute("rotation", "-90 0 0");
                undertile.setAttribute("width", "1");
                undertile.setAttribute("height", "1");
                undertile.setAttribute("depth", "0.05");
                undertile.setAttribute("color", "#25231d");
                undertile.setAttribute("static-body", "shape: plane;")
                document.querySelector("a-scene").appendChild(undertile);
            }
        }
    }
}