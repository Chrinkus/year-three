// Destructuring examples

// Options object
const dog = {
    species: "dog",
    weight: 23,
    sound: "woof"
};

makeSound(dog);

// Old way
function makeSound(obj) {
    console.log("The " + obj.species + " says " + obj.sound + "!");
}

getWeight(dog);

function getWeight(dog) {
    // Destructure the options object
    const { species, weight, sound } = dog;
    console.log("The " + species + " weighs " + weight + " pounds!");
}

const cat = {
    weight: 14,
    sound: "meow"
};

makeSoundBetter(cat);

// Destructure IN the arguments w/default values!
function makeSoundBetter({ species = "animal", weight, sound }) {
    console.log("The " + species + " says " + sound + "!");
}
