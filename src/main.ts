import './style.css';

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const bird = document.getElementById("bird");

const scoreText = document.getElementById("scoreText");
let score = 0;
setText("Click to start!");

let isJumping = false;
let gameOver = true;
let speed = 1; // Initial speed

document.addEventListener('mousedown', () => jump());

setInterval(() => main(), 10);

function main() {
    if (!gameOver) {
        score++;
        setText("Score: " + score);
        speed += 0.001; // Adjust the increment as needed
        moveObstacles();
        checkGameOver();
    }
}

function jump() {
    if (!gameOver) {
        if (!isJumping) {
            isJumping = true;
            dino?.classList.add("jump");
            setTimeout(removeJump, 500);
        }
    } else {
        startGame();
    }
}

function removeJump() {
    dino?.classList.remove("jump");
    isJumping = false;
}

function removeObstacles() {
    cactus?.classList.remove("cactusMove");
    bird?.classList.remove("birdMove");
}

function checkGameOver() {
    if (!gameOver && dino && cactus && bird) {
        const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
        const cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
        const birdLeft = parseInt(window.getComputedStyle(bird).getPropertyValue("left"));

        if (dinoTop >= 150 && Math.abs(cactusLeft) < 7) {
            endGame();
        }

        if (dinoTop <= 55 && Math.abs(birdLeft) < 11) {
            endGame();
        }
    }
}

function startGame() {
    console.log("Game started!");
    gameOver = false;
    score = 0;
    speed = 1; // Reset speed
    cactus?.classList.add("cactusMove");
    bird?.classList.add("birdMove");
}

function moveObstacles() {
    const obstacles = [cactus, bird];

    obstacles.forEach((obstacle) => {
        const currentLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
        obstacle.style.left = currentLeft - speed + "px";
    });
}

function endGame() {
    console.log("Player died!");
    setText("Final Score: " + score + "! Click To Play Again!");
    gameOver = true;
    removeJump();
    removeObstacles();
}

function setText(s) {
    if (scoreText) {
        scoreText.textContent = s;
    }
}
