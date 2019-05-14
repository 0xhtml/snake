class Snake {
    constructor(game, startX, startY, color, keys) {
        this.game = game;
        this.snake = [
            [startX, startY]
        ];
        this.color = color;
        this.keys = keys;

        this.direction = 1;
        this.canChangeDirection = true;
        this.length = 6;
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

    update(frame) {
        if (this.alive) {
            if (frame % 10 === 0) {
                const snakeHeadPosition = this.getHeadPosition();
                const newSnakeHeadPosition = [snakeHeadPosition[0] + this.x(), snakeHeadPosition[1] + this.y()];

                if (newSnakeHeadPosition[0] < 0 || newSnakeHeadPosition[1] < 0 || newSnakeHeadPosition[0] > this.game.borders[0] || newSnakeHeadPosition[1] > this.game.borders[1]) {
                    this.alive = false;
                    return;
                }
                for (var position of this.snake) {
                    if (position[0] === newSnakeHeadPosition[0] && position[1] === newSnakeHeadPosition[1]) {
                        this.alive = false;
                        return;
                    }
                }
                if (this.game.checkCollisionWithSnakes(newSnakeHeadPosition[0], newSnakeHeadPosition[1], this)) {
                    this.alive = false;
                    return;
                }
                
                this.snake.push(newSnakeHeadPosition);
                if (this.snake.length > this.length) {
                    this.snake.splice(0, 1);
                }
                this.canChangeDirection = true;
            }
        } else {
            if (frame % 3 === 0) {
                this.snake.splice(0, 1);
            }
        }
    }

    draw(ctx) {
        const snakeHeadPosition = this.getHeadPosition();
        const length = this.snake.length;
        for (var i = 0; i < length; i++) {
            var r = this.color[0];
            var g = this.color[1];
            var b = this.color[2];
            if (this.snake[i][0] === snakeHeadPosition[0] && this.snake[i][1] === snakeHeadPosition[1] && this.alive) {
                r += 127;
                g += 127;
                b += 127;
            } else {
                r -= (length - i) * (127 / length);
                g -= (length - i) * (127 / length);
                b -= (length - i) * (127 / length);
            }
            r = Math.max(0, Math.min(255, r));
            g = Math.max(0, Math.min(255, g));
            b = Math.max(0, Math.min(255, b));
            ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
            ctx.fillRect(this.snake[i][0] * 20 + 1, this.snake[i][1] * 20 + 1, 18, 18);
        }
    }

    x() {
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

    y() {
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

    getHeadPosition() {
        return this.snake[this.snake.length - 1];
    }
}