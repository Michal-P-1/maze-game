class MazePattern {
    mazeMap1 = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 5, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    playerPosition = [];

    mazeSize(maze) {
        this.length = maze.length;
        this.width = maze[0].length;
    }

    displayMazeMap() {
        const mazeElement = document.getElementById("maze-map");

        // Get map size
        this.mazeSize(this.mazeMap1);
        // Go through every square of the map
        for (let i = 0; i < this.length; i++) {
            const mapLine = document.createElement("div");
            mapLine.classList.add("map-line");
            // mazeElement.append(lineBreak);
            console.log(this.playerPosition.length);
            for (let j = 0; j < this.width; j++) {
                // Get every individual tile of the map
                let mapTile = this.mazeMap1[i][j];
                // Create a new html span element for every square
                const newSpan = document.createElement("span");
                if (mapTile === 1) {
                    newSpan.classList.add("wall");
                }
                if (mapTile === 0) {
                    newSpan.classList.add("tile");
                }
                if (mapTile === 5 && this.playerPosition.length === 0) {
                    this.playerPosition = [i, j];
                    newSpan.classList.add("player");
                }

                // Add ID to every span element
                newSpan.id = `${[i]}${[j]}`;
                // Append map tile to the mapline element
                mapLine.append(newSpan);
            }
            // Apend mapline to the maze element
            mazeElement.append(mapLine);
        }
    }

    movePlayer() {
        const mazeElement = document.getElementById("maze-map");
        const oldPlayerPositionEl = document.querySelector(".player");
        oldPlayerPositionEl.classList.remove("player");
        oldPlayerPositionEl.classList.add("tile");
        const newPlayerPositionEl = document.getElementById(
            this.playerPosition.toString().replace(",", "")
        );
        newPlayerPositionEl.classList.add("player");
    }

    playerMoveRigth() {
        // console.log(this.playerPosition);
        this.playerPosition[1] += 1;
        console.log(this.playerPosition);
    }

    playerMoveLeft() {
        // console.log(this.playerPosition);
        this.playerPosition[1] -= 1;
        console.log(this.playerPosition);
    }

    playerMoveUp() {
        // console.log(this.playerPosition);
        this.playerPosition[0] -= 1;
        console.log(this.playerPosition);
    }

    playerMoveDown() {
        // console.log(this.playerPosition);
        this.playerPosition[0] += 1;
        console.log(this.playerPosition);
    }
}

const test = new MazePattern();
test.displayMazeMap();
// test.playerMove();

document.addEventListener("keydown", (event) => {
    let pressedKey = event.key;
    switch (pressedKey) {
        case "ArrowRight":
            test.playerMoveRigth();
            test.movePlayer();
            break;
        case "ArrowLeft":
            test.playerMoveLeft();
            test.movePlayer();
            break;
        case "ArrowDown":
            test.playerMoveDown();
            test.movePlayer();
            break;
        case "ArrowUp":
            test.playerMoveUp();
            test.movePlayer();
    }

    // if (event.key === "ArrowRight") {
    //     console.log("rigth");
    // }
    // console.log(event.key);
});
