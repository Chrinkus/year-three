import { getAll, add } from "./widgets";

add({ name: "first widget", color: "red", size: "large" });

console.log(getAll().length);