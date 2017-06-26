const talker = (npcId) => {
    const state = {
        npcId,
        hp: 5,
        conversation: 0
    };

    return Object.assign(
        {},
        addTalk(state)
    );
};

const addTalk = (state) => ({
    talk: (target) => {
        const say = messages(state.npcId, state.conversation);
        state.conversation += 1;
        return say;
    }
});

const messages = {
    npc : [
        "Hello, welcome to dialogue trees!",
        "This actually is more of a dialogue pole..",
        "I'll have to think of a way to branch into different paths."
    ]
}

function getMessage(unitId, convState) {
    "use strict";
}
