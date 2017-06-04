function p1(stringNums) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            stringNums += ", 2";
            resolve(stringNums);
        }, 100);
    });
}

p1("1")
.then(str => {
    return p1(str);
})
.then(notSure => {
    console.log(notSure);
});
