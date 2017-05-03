const vector = (x, y) => {
    const state = {
        x,
        y
    };

    return Object.assign(
        {},
        reporter(state),
        mover(state),
        addGetX(state),
        addGetY(state)
    );
};

const mover = (state) => ({
    move: (magnitude, angle) => {
        state.x += magnitude * Math.cos(angle);
        state.y += magnitude * Math.sin(angle);
    }
});

const addGetX = (state) => ({
    getX: () => { return state.x; }
});

const addGetY = (state) => ({
    getY: () => { return state.y; }
});

const reporter = (state) => ({
    report: () => {
        console.log(state.x + ", " + state.y);
    }
});

const player = (x, y) => {
    const state = {
        loc: vector(x, y),
        width: 64,
        speed: 8
    };

    return Object.assign(
        {},
        addMoveUp(state),
        addMoveDown(state),
        addMoveLeft(state),
        addMoveRight(state),
        addDraw(state),
        addReport(state)
    );
};

const addMoveUp = (state) => ({
    moveUp: () => {
        state.loc.move(state.speed, -Math.PI / 2);
    }
});

const addMoveDown = (state) => ({
    moveDown: () => {
        state.loc.move(state.speed, Math.PI / 2);
    }
});

const addMoveLeft = (state) => ({
    moveLeft: () => {
        state.loc.move(state.speed, Math.PI);
    }
});

const addMoveRight = (state) => ({
    moveRight: () => {
        state.loc.move(state.speed, 0);
    }
});

const addDraw = (state) => ({
    draw: (ctx) => {
        ctx.fillStyle = "indigo";
        ctx.fillRect(state.loc.getX(), state.loc.getY(),
                     state.width, state.width);
    }
});

const addReport = (state) => ({
    report: () => {
        state.loc.report();
    }
});
module.exports = player;
