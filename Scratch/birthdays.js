const birthdays = [
    { name: "Jacob",    birthday: "2013-09-13" },
    { name: "Caitlin",  birthday: "1983-07-26" },
    { name: "Dave",     birthday: "1983-11-22" },
    { name: "Chris",    birthday: "1979-02-27" },
    { name: "Chelsey",  birthday: "1985-05-15" },
    { name: "Corey",    birthday: "1986-12-09" }
];

const jacob1 = Date.parse("2013-09-13");
const jacob2 = Date.parse("Sept 13, 2013");

console.log(jacob1, " ", jacob2);           // ?? Different ??

const diff = jacob2 - jacob1;               // 18 million micro seconds
console.log(diff / 1000 / 60 / 60);         // ms > s > h = 5 hours

// Timezone related?
const less = new Date(jacob1);
const more = new Date(jacob2);
console.log(less.getTimezoneOffset());      // 300 minutes and...
console.log(more.getTimezoneOffset());      // 300 minutes too. hm..

/* Not sure why but different date strings containing same data produce
 * different time values. The MDN page acknowledges that parsing datestrings
 * can lead to unpredictable results.
 */

console.log(birthdays.sort((a, b) => {
    return Date.parse(a.birthday) - Date.parse(b.birthday);
}).reverse());

// Works! Now I can display 5 most recent blog posts!
