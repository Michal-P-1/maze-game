class Maze {
    map1 = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, "P2", 1],
        [1, 0, 0, 0, 0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, "P1", 1, 0, 0, 0, 0, "*", 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    map2 = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, "P2", 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, "*", 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, "P1", 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    map3 = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, "P2", 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, "*", 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, "P1", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    mazeElement = document.getElementById("maze-map");
    player1Position = [];
    player2Position = [];
    currentLevel = 1;
    currentMap = 1;

    mazeSize(maze) {
        this.length = maze.length;
        this.width = maze[0].length;
    }

    setCurrentMap(currentLevel) {
        this.currentMap = this.map1;
        if (currentLevel === 1) {
            this.mazeElement.textContent = "";
            this.currentMap = this.map1;
        }
        if (currentLevel === 2) {
            this.mazeElement.textContent = "";
            this.currentMap = this.map2;
        }
        if (currentLevel === 3) {
            this.mazeElement.textContent = "";
            this.currentMap = this.map3;
        }
    }

    display(currentLevel) {
        this.setCurrentMap(currentLevel);
        // Get map size
        this.mazeSize(this.currentMap);

        // Go through every square of the map
        for (let i = 0; i < this.length; i++) {
            const mapLine = document.createElement("div");
            mapLine.classList.add("map-line");

            for (let j = 0; j < this.width; j++) {
                // Get every individual tile of the map
                let mapElement = this.currentMap[i][j];
                // Create a new html span element for every square
                const newMapTile = document.createElement("span");
                if (mapElement === 0) {
                    newMapTile.classList.add("tile");
                }
                if (mapElement === 1) {
                    newMapTile.classList.add("wall");
                }
                if (mapElement === "*") {
                    newMapTile.classList.add("reward");
                }
                if (mapElement === "P1") {
                    this.player1Position = [i, j];
                    newMapTile.classList.add("player1");
                }
                if (mapElement === "P2") {
                    this.player2Position = [i, j];
                    newMapTile.classList.add("player2");
                }

                // Add ID to every span element
                newMapTile.id = `${[i]}${[j]}`;
                // Append map tile to the mapline element
                mapLine.append(newMapTile);
            }

            // Apend mapline to the maze element
            this.mazeElement.append(mapLine);
        }
    }

    checkIfLevelUpdate() {
        const rewardElement = document.querySelector(".reward");
        if (!rewardElement) {
            this.currentLevel += 1;
            this.changeLevel = 1;
        } else {
            this.changeLevel = 0;
        }
    }
}

class Player {
    constructor(playerId, position, moves = 0) {
        this.playerPosition = position;
        this.playerId = playerId;
        this.playerMoves = moves;
        this.stopCountingMoves = 0;
    }

    get moves() {
        return this.playerMoves;
    }

    remove(oldPlayerPosition) {
        oldPlayerPosition.classList.remove(`${this.playerId}`);
        oldPlayerPosition.classList.add("tile");
    }

    add(newPlayerPosition) {
        newPlayerPosition.classList.add(`${this.playerId}`);
    }

    updateMap() {
        // Get old player position
        const oldPlayerPositionEl = document.querySelector(`.${this.playerId}`);
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
        // Check if the future tile is the second player
        else if (
            futureTile.classList.contains("player1") ||
            futureTile.classList.contains("player2")
        ) {
            return 0;
        } else if (this.stopCountingMoves !== 1) {
            this.playerMoves += 1;
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

class Board {
    constructor(playerId, points = 0, moves = 0) {
        this.playerId = playerId;
        this.points = points;
        this.playerMoves = moves;
    }

    update(playerId, moves) {
        const pointsElement = document.getElementById(playerId);
        const movesElement = pointsElement.nextElementSibling;

        pointsElement.textContent = this.points;
        movesElement.textContent = `(${moves})`;
    }

    updateScore() {
        this.playerPosTile = document.querySelector(`.${this.playerId}`);
        if (this.playerPosTile.classList.contains("reward")) {
            this.playerPosTile.classList.remove("reward");
            this.points += 150;
        }
    }
}

class App {
    // Display maze
    static init() {
        this.maze = new Maze();
        this.maze.display();
        this.showResultElement = document.querySelector(".game-result");
        this.resetInfoElement = document.querySelector("h3");
    }

    static updatePlayersPositions() {
        this.player1.playerPosition = this.maze.player1Position;
        this.player2.playerPosition = this.maze.player2Position;
    }

    static updateLvl() {
        this.maze.checkIfLevelUpdate();
        // Boolean value
        const changeLevel = this.maze.changeLevel;
        // Current level
        const currentLevel = this.maze.currentLevel;
        // Change map to lvl 1 - reset
        if ((changeLevel === 1) & (currentLevel === 1)) {
            // Update maze map
            this.maze.display(1);
            this.updatePlayersPositions();
        }
        // Change map to lvl 2
        if ((changeLevel === 1) & (currentLevel === 2)) {
            // Update maze map
            this.maze.display(2);
            this.updatePlayersPositions();
        }
        // Change map to lvl 3
        else if (changeLevel === 1 && currentLevel === 3) {
            this.maze.display(3);
            this.updatePlayersPositions();
        } else if (currentLevel === 4) {
            this.winnerDetermination();
            this.showResultElement.classList.remove("hide");
            this.player1.stopCountingMoves = 1;
            this.player2.stopCountingMoves = 1;
        }
    }

    static winnerDetermination() {
        const player1Score = this.boardP1.points;
        const player2Score = this.boardP2.points;

        const player1Moves = this.player1.moves;
        const player2Moves = this.player2.moves;

        let boardMessage = "";

        if (player1Score < player2Score) {
            boardMessage = `Player 2 wins with the score of ${player2Score}`;
        } else if (player1Score > player2Score) {
            boardMessage = `Player 1 wins with the score of ${player1Score}`;
        } else {
            if (player1Moves > player2Moves) {
                boardMessage = `The same score. Player 2 wins with only ${player2Moves} moves.`;
            } else if (player1Moves < player2Moves) {
                boardMessage = `The same score. Player 1 wins with only ${player1Moves} moves.`;
            } else {
                boardMessage = `It's a tie.`;
            }
        }
        this.showResultElement.textContent = boardMessage;
        this.resetInfoElement.classList.remove("hide");
    }

    static movementHandler(event, player, rightKey, leftKey, downKey, upKey) {
        let pressedKey = event.key;

        switch (pressedKey) {
            case rightKey:
                player.moveRigth();
                break;
            case leftKey:
                player.moveLeft();
                break;
            case downKey:
                player.moveDown();
                break;
            case upKey:
                player.moveUp();
                break;
            case " ":
                this.resetInfoElement.classList.add("hide");
                this.resetGame();
        }
    }

    static update(player, board, boardScoreElement) {
        // Map update
        player.updateMap();

        // Board update
        board.updateScore();
        board.update(boardScoreElement, player.moves);

        // Check if level need to be updated and update it
        this.updateLvl();
    }

    static resetGame() {
        // Reset DOM element
        this.maze.mazeElement.textContent = "";
        // Hide result element
        this.showResultElement.classList.add("hide");
        // Reset maze settings
        this.maze.currentLevel = 0;
        this.maze.changeLevel = 1;
        // Reset players scores
        this.boardP1.points = 0;
        this.boardP2.points = 0;
        // Reset players moves
        this.player1.playerMoves = 0;
        this.player2.playerMoves = 0;
        // Allow counting moves
        this.player1.stopCountingMoves = 0;
        this.player2.stopCountingMoves = 0;

        //  Update level
        this.updateLvl();
    }

    // Player movement logic
    static player1Movement() {
        this.player1 = new Player("player1", this.maze.player1Position);
        this.boardP1 = new Board("player1");

        document.addEventListener("keydown", (event) => {
            this.movementHandler(
                event,
                this.player1,
                "ArrowRight",
                "ArrowLeft",
                "ArrowDown",
                "ArrowUp"
            );
            this.update(this.player1, this.boardP1, "player1-score");
        });
    }

    static player2Movement() {
        this.player2 = new Player("player2", this.maze.player2Position);
        const player2Moves = this.player2.moves;
        this.boardP2 = new Board("player2", player2Moves);

        document.addEventListener("keydown", (event) => {
            this.movementHandler(event, this.player2, "d", "a", "s", "w");
            this.update(this.player2, this.boardP2, "player2-score");
        });
    }
}

App.init();
App.player1Movement();
App.player2Movement();
