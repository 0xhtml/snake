class Game {
    constructor(canvas) {
        canvas.width = 50 * 20;
        canvas.height = 25 * 20;
        this.width = canvas.width;
        this.height = canvas.height;

        this.snakes = [
            new Snake(5, 5, "green", ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"]),
            new Snake(5, 12, "gray", ["l", "k", "j", "i"]),
            new Snake(5, 19, "blue", ["d", "s", "a", "w"])
        ];
        this.moveApple();

        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    moveApple() {
        this.apple = [Math.floor(Math.random() * this.width / 20), Math.floor(Math.random() * this.height / 20)];
        this.snakes.forEach(snake => {
            snake.snake.forEach(part => {
                if (part[0] === this.apple[0] && part[1] === this.apple[1]) {
                    this.moveApple();
                }
            });
        });
    }

    update(subFrame) {
        this.snakes.forEach(snake => {
            if (snake.alive && !subFrame) {
                const snakePreHeadPosition = snake.snake[snake.snake.length - 1];
                if (snakePreHeadPosition[0] < 0 || snakePreHeadPosition[1] < 0 || snakePreHeadPosition[0] > this.width / 20 || snakePreHeadPosition[1] > this.height / 20) {
                    snake.alive = false;
                } else {
                    this.snakes.forEach(sSnake => {
                        sSnake.snake.forEach(part => {
                            if (part[0] === snakePreHeadPosition[0] + snake.x() && part[1] === snakePreHeadPosition[1] + snake.y()) {
                                snake.alive = false;
                            }
                        });
                    });
                }
            }
            snake.updateHead(subFrame);
            if (snake.alive && !subFrame) {
                const snakeHeadPosition = snake.snake[snake.snake.length - 1];
                if (this.apple[0] === snakeHeadPosition[0] && this.apple[1] === snakeHeadPosition[1]) {
                    this.moveApple();
                    snake.length++;
                }
            }
            snake.updateTail(subFrame);
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.snakes.forEach(snake => snake.draw(this.ctx));

        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.apple[0] * 20 + 1, this.apple[1] * 20 + 1, 18, 18);
    }
}
