const player = (x, y) => {
    const state = {
        x,
        y,
        width: 64,
        speed: 6,

        move (angle) {
            this.x += this.speed * Math.cos(angle);
            this.y += this.speed * Math.sin(angle);
        }
    };

    return Object.assign(
        {},
        addMoveUp(state),
        addMoveDown(state),
        addMoveLeft(state),
        addMoveRight(state),

        addDraw(state),
        addControls(state)
    );
};

const addMoveUp = (state) => ({
    moveUp: () => state.move(-Math.PI / 2)
});

const addMoveDown = (state) => ({
    moveDown: () => state.move(Math.PI / 2)
});

const addMoveLeft = (state) => ({
    moveLeft: () => state.move(Math.PI)
});

const addMoveRight = (state) => ({
    moveRight: () => state.move(0)
});

const addDraw = (state) => ({
    draw: (ctx) => {
        ctx.fillStyle = "indigo";
        ctx.fillRect(state.x, state.y, state.width, state.width);
    }
});

const addControls = (state) => ({
    controls: {
        "W": { action: "moveUp", behaviour: "queued" },
        "S": { action: "moveDown", behaviour: "queued" },
        "A": { action: "moveLeft", behaviour: "queued" },
        "D": { action: "moveRight", behaviour: "queued" }
    }
});

module.exports = player;
