class Maze {
    mazeMap1 = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, "*", 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, "P", 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    playerPosition = [];

    get playerPosition() {
        return this.playerPosition;
    }

    mazeSize(maze) {
        this.length = maze.length;
        this.width = maze[0].length;
    }

    display() {
        const mazeElement = document.getElementById("maze-map");

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
                if (mapTile === 0) {
                    newSpan.classList.add("tile");
                }
                if (mapTile === 1) {
                    newSpan.classList.add("wall");
                }
                if (mapTile === "*") {
                    newSpan.classList.add("reward");
                }
                if (mapTile === "P" && this.playerPosition.length === 0) {
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
}

class Player {
    constructor(position) {
        this.playerPosition = position;
    }

    remove(oldPlayerPosition) {
        oldPlayerPosition.classList.remove("player");
        oldPlayerPosition.classList.add("tile");
    }

    add(newPlayerPosition) {
        newPlayerPosition.classList.add("player");
    }

    updateMap() {
        // Get old player position
        const oldPlayerPositionEl = document.querySelector(".player");
        // Remove old position
        this.remove(oldPlayerPositionEl);

        // Get new player position
        const newPlayerPositionEl = document.getElementById(
            this.playerPosition.toString().replace(",", "")
        );
        // Add a new plyer position on the maze
        this.add(newPlayerPositionEl);
    }

    checkIfMovePosible(posElement0, nextStepPos0, posElement1, nextStepPos1) {
        // Copy the cur player position
        const curPlayerPos = [...this.playerPosition];

        // Get the future tile
        const futureTile = document.getElementById(
            `${(curPlayerPos[posElement0] += nextStepPos0)}${(curPlayerPos[
                posElement1
            ] += nextStepPos1)}`
        );

        // Check if the future tile is a wall
        if (futureTile.className === "wall") {
            return 0;
        }
    }

    moveRigth() {
        if (this.checkIfMovePosible(0, 0, 1, 1) !== 0) {
            this.playerPosition[1] += 1;
        }
    }

    moveLeft() {
        if (this.checkIfMovePosible(0, 0, 1, -1) !== 0) {
            this.playerPosition[1] -= 1;
        }
    }

    moveUp() {
        if (this.checkIfMovePosible(0, -1, 1, 0) !== 0) {
            this.playerPosition[0] -= 1;
        }
    }

    moveDown() {
        if (this.checkIfMovePosible(0, 1, 1, 0) !== 0) {
            this.playerPosition[0] += 1;
        }
    }
}

class Score {
    points = 0;

    addPoints(playerPos) {
        const playerPosTile = document.getElementById(
            `${playerPos[0]}${playerPos[1]}`
        );

        if (playerPosTile.classList.contains("reward")) {
            playerPosTile.classList.remove("reward");
            this.points += 150;
        }

        return this.points;
    }
}

class App {
    // Display maze
    static init() {
        const maze = new Maze();
        maze.display();
        this.playerPosition = maze.playerPosition;
    }

    static updateScore() {
        this.currentScoreP1.addPoints(this.playerPosition);
    }

    // Player movement logic
    static playerMovement() {
        const player1 = new Player(this.playerPosition);
        this.currentScoreP1 = new Score();

        document.addEventListener("keydown", (event) => {
            let pressedKey = event.key;
            switch (pressedKey) {
                case "ArrowRight":
                    player1.moveRigth();
                    player1.updateMap();
                    this.updateScore();
                    break;
                case "ArrowLeft":
                    player1.moveLeft();
                    player1.updateMap();
                    this.updateScore();
                    break;
                case "ArrowDown":
                    player1.moveDown();
                    player1.updateMap();
                    this.updateScore();
                    break;
                case "ArrowUp":
                    player1.moveUp();
                    player1.updateMap();
                    this.updateScore();
            }
        });
    }
}

App.init();
App.playerMovement();
App.updateScore();
// test.playerMove();
