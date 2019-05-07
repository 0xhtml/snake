class Snake {
    constructor(startX, startY, color, keys) {
        this.snake = [[startX, startY]];
        this.direction = 0;
        this.canChangeDirection = true;
        this.length = 6;
        this.color = color;
        this.keys = keys;
        this.alive = true;

        window.addEventListener("keydown", event => {
            if (this.canChangeDirection && this.alive) {
                switch (event.key) {
                    case this.keys[0]:
                        if (this.direction !== 2) {
                            this.canChangeDirection = false;
                            this.direction = 0;
                        }
                        break;
                    case this.keys[1]:
                        if (this.direction !== 3) {
                            this.canChangeDirection = false;
                            this.direction = 1;
                        }
                        break;
                    case this.keys[2]:
                        if (this.direction !== 0) {
                            this.canChangeDirection = false;
                            this.direction = 2;
                        }
                        break;
                    case this.keys[3]:
                        if (this.direction !== 1) {
                            this.canChangeDirection = false;
                            this.direction = 3;
                        }
                        break;
                }
            }
        });
    }

    updateHead(subFrame) {
        if (this.alive && !subFrame) {
            const snakeHeadPosition = this.snake[this.snake.length - 1];
            this.snake.push([snakeHeadPosition[0] + this.x(), snakeHeadPosition[1] + this.y()]);
        }
    }

    updateTail(subFrame) {
        if ((this.snake.length > this.length && !subFrame) || !this.alive) {
            this.snake.splice(0, 1);
        }
        this.canChangeDirection = true;
    }

    draw(ctx) {
        const snakeHeadPosition = this.snake[this.snake.length - 1];
        this.snake.forEach(position => {
            if (position[0] === snakeHeadPosition[0] && position[1] === snakeHeadPosition[1] && this.alive) {
                ctx.fillStyle = "light" + this.color;
            } else {
                ctx.fillStyle = this.color;
            }
            ctx.fillRect(position[0] * 20 + 1, position[1] * 20 + 1, 18, 18);
        });
    }

    x() {
        switch (this.direction) {
            case 0:
                return 1;
            case 1:
                return 0;
            case 2:
                return -1;
            case 3:
                return 0;
        }
    }

    y() {
        switch (this.direction) {
            case 0:
                return 0;
            case 1:
                return 1;
            case 2:
                return 0;
            case 3:
                return -1;
        }
    }
}
