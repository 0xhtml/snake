import Item from "./item.js";
import Snake from "./snake.js";

export default class Game {
    constructor(canvas) {
        canvas.width = 50 * 20;
        canvas.height = 25 * 20;
        this.width = canvas.width;
        this.height = canvas.height;
        this.borders = [this.width / 20 - 1, this.height / 20 - 1];
        this.gameEnded = 0;
        this.ctx = canvas.getContext("2d");
        this.reset();
    }

    reset() {
        this.gameEnded = 0;
        this.snakes = [];
        this.snakes.push(new Snake(this, 5, 5, [255, 255, 0], ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"]));
        this.snakes.push(new Snake(this, 5, 12, [0, 255, 0], ["k", "l", "i", "j"]));
        this.snakes.push(new Snake(this, 5, 19, [0, 0, 255], ["s", "d", "w", "a"]));
        this.items = [];
        this.items.push(new Item(this, "red", snake => snake.length++, () => { return true; }));
        this.items.push(new Item(this, "#ff00ff", snake => snake.length += 5, () => { return Math.random() < 0.01; }));
        this.items.push(new Item(this, "#ffffff", snake => snake.speed += 0.3, () => { return Math.random() < 0.005; }));
        this.draw();
    }

    update(frame) {
        if (this.gameEnded === 0) {
            var livingSnakes = 0;
            this.snakes.forEach(snake => {
                snake.update(frame);
                if (snake.alive) {
                    this.items.forEach(item => {
                        if (item.visible) {
                            if (item.x == snake.getHeadPosition()[0] && item.y == snake.getHeadPosition()[1]) {
                                item.oneat(snake);
                            }
                        } else {
                            if (frame % 10 === 0) {
                                item.reset(false);
                            }
                        }
                    });
                    livingSnakes++;
                }
            });
            if (livingSnakes <= 1) {
                this.gameEnded = 1;
            }
        } else {
            this.snakes.forEach(snake => {
                if (!snake.alive) {
                    snake.update(frame);
                }
            });
            if (this.gameEnded > 60) {
                this.reset();
                return;
            }
            this.gameEnded++;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.snakes.forEach(snake => snake.draw(this.ctx));
        this.items.forEach(item => item.draw(this.ctx));
    }

    checkCollisionWithSnakes(x, y, self) {
        for (var snake of this.snakes) {
            if (snake === self) {
                continue;
            }
            for (var position of snake.snake) {
                if (position[0] === x && position[1] === y) {
                    return true;
                }
            }
        }
        return false;
    }

    checkCollisionWithItems(x, y, self) {
        for (var item of this.items) {
            if (item === self) {
                continue;
            }
            if (item.x === x && item.y === y) {
                return true;
            }
        }
        return false;
    }
}