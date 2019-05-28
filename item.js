export default class Item {
    constructor(game, color, oneataction, canspawn) {
        this.game = game;
        this.color = color;
        this.oneataction = oneataction;
        this.canspawn = canspawn;
        this.visible = false;
        this.reset(false);
    }

    reset(r) {
        if (r || this.canspawn()) {
            this.visible = true;
            this.x = Math.floor(Math.random() * this.game.width);
            this.y = Math.floor(Math.random() * this.game.height);
            if (
                this.game.checkCollisionWithSnakes(this.x, this.y, this) ||
                this.game.checkCollisionWithItems(this.x, this.y, this)
            ) {
                this.reset(true);
            }
        }
    }

    oneat(snake) {
        this.oneataction(snake);
        this.visible = false;
        this.reset(false);
    }

    draw(ctx) {
        if (this.visible) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x * 20 + 1, this.y * 20 + 1, 18, 18);
        }
    }
}
