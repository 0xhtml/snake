class Game {
    constructor(canvas) {
        canvas.width = 50 * 20;
        canvas.height = 25 * 20;
        this.width = canvas.width;
        this.height = canvas.height;
        this.borders = [0, 0, this.width / 20 - 1, this.height / 20 - 1];
        this.showWinner = false;

        this.snakes = [
            new Snake(5, 5, [255, 255, 0], ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"], this.borders),
            new Snake(5, 12, [0, 255, 0], ["k", "l", "i", "j"], this.borders),
            new Snake(5, 19, [0, 0, 255], ["s", "d", "w", "a"], this.borders)
        ];
        this.moveApple();

        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    moveApple() {
        this.apple = [Math.floor(Math.random() * this.borders[2]), Math.floor(Math.random() * this.borders[3])];
        for (let i = 0; i < this.snakes.length; i++) {
            for (let position of this.snakes[i].snake) {
                if (position[0] === this.apple[0] && position[1] === this.apple[1]) {
                    this.moveApple();
                    return;
                }
            }
        }
    }

    update(subFrame) {
        if (!this.showWinner) {
            let livingSnakes = 0;
            for (let i = 0; i < this.snakes.length; i++) {
                this.snakes[i].update(subFrame);
                if (this.snakes[i].alive) {
                    livingSnakes++;
                    const snakeHeadPosition = this.snakes[i].getHeadPosition();
                    if (snakeHeadPosition[0] === this.apple[0] && snakeHeadPosition[1] === this.apple[1]) {
                        this.snakes[i].length++;
                        this.moveApple();
                    }
                    for (let j = 0; j < this.snakes.length; j++) {
                        if (j === i) {
                            continue;
                        }
                        for (let position of this.snakes[j].snake) {
                            if (position[0] === snakeHeadPosition[0] && position[1] === snakeHeadPosition[1]) {
                                this.snakes[i].alive = false;
                                break;
                            }
                        }
                    }
                }
            }
            if (livingSnakes <= 1) {
                this.showWinner = true;
                setTimeout(() => {
                    this.snakes = [
                        new Snake(5, 5, [255, 255, 0], ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"], this.borders),
                        new Snake(5, 12, [0, 255, 0], ["k", "l", "i", "j"], this.borders),
                        new Snake(5, 19, [0, 0, 255], ["s", "d", "w", "a"], this.borders)
                    ];
                    this.moveApple();
                    this.showWinner = false;
                }, 2000);
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        if (this.showWinner) {
            this.snakes.forEach(snake => {
                if (snake.alive) {
                    this.ctx.fillStyle = "rgb(" + snake.color[0] + ", " + snake.color[1] + ", " + snake.color[2] + ")";
                    this.ctx.fillRect(this.width / 3, this.height / 3, this.width / 3, this.height / 3);
                }
            });
        } else {
            this.snakes.forEach(snake => snake.draw(this.ctx));

            this.ctx.fillStyle = "red";
            this.ctx.fillRect(this.apple[0] * 20 + 1, this.apple[1] * 20 + 1, 18, 18);
        }
    }
}
