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
        mazeElement.textContent = "";
        console.log(mazeElement);

        // Get map size
        this.mazeSize(this.mazeMap1);
        // Go through every square of the map
        for (let i = 0; i < this.length; i++) {
            const mapLine = document.createElement("div");
            mapLine.classList.add("map-line");
            // mazeElement.append(lineBreak);
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
                // } else if (this.playerPosition.length !== 0) {
                //     // const newSpanPlayer = document.createElement("span");
                //     const currentPlayerTile = document.getElementById(
                //         this.playerPosition.toString().replace(",", "")
                //     );
                //     console.log(currentPlayerTile);

                //     // currentPlayerTile.replaceWith(newSpanPlayer);
                //     // newSpanPlayer.classList.add("player");
                // }
                // Add ID to every span element
                newSpan.id = `${[i]}${[j]}`;
                // Append map tile to the mapline element
                mapLine.append(newSpan);
            }
            // Apend mapline to the maze element
            mazeElement.append(mapLine);
        }
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
            // test.displayMazeMap();
            break;
        case "ArrowLeft":
            test.playerMoveLeft();
            break;
        case "ArrowDown":
            test.playerMoveDown();
            break;
        case "ArrowUp":
            test.playerMoveUp();
    }

    // if (event.key === "ArrowRight") {
    //     console.log("rigth");
    // }
    // console.log(event.key);
});
