// let fNum = 0;
// let sNUm = 1;

// for (let i = 0; i < 6; i++) {
//   console.log(fNum);
//   tNum = fNum + sNUm;
//   fNum = sNUm;
//   sNUm = tNum;
// }

// console.table([fNum,sNUm]);

// let testStr = "Rahul Gupta";
// let testStr2 = "ankush Gupta";

// // console.log(eval("2+2"));
// let str3 = new String("Hello");
// console.log(str3);
// console.log(str3.charAt(str3.length - 1));
// console.log(str3.concat(" ", testStr));
// console.log(testStr.toLowerCase().includes("rahul"));

// const date1 = new Date();
// console.log(date1);
// console.log(date1.toDateString());
// console.log(date1.toString());
// console.log(date1.toLocaleString());
// console.log(date1.toLocaleDateString());
// console.log(date1.toTimeString());
// console.log(date1.toUTCString());

// let arr = [1, 2, 3, 4, 5];
// let arr2 = [1, 2, 3, 4, 5];
// console.log(arr.splice(1, 2));
// console.log(arr);

// let name1 = "rahul gupta";
// console.log(Array.from(name1));
// console.log(Array.of(name1, arr));

const obj1 = {
  name: "rahul Gupta",
  age: 18,
  email: "rahul123@gmail.com",
  "eren yeager": "my name",
};
const obj2 = {
  1: "a",
  2: "b",
  3: "c",
};

// obj1.greeting = function () {
//   return `hello `;
// };

// obj1.greeting2 = function () {
//   return `hello ${this.name}`;
// };
// console.log(obj1.greeting());
// console.log(obj1.greeting2());

// const obj3 = Object.assign({}, obj1, obj2);
// const obj3 = { ...obj1, ...obj2 };
// console.log(obj3);
// console.log(obj1);

const obj4 = {
  name: "rahul Gupta",
  age: 18,
  email: "rahul123@gmail.com",
  "eren yeager": "my name",
};

// for (const [item, value] of obj4) {
//object is not iterable via for of loop
// console.log(item, value);
// }

// const arr = [1, 2, 3, 4, 5];
// for (const item of arr) {
//   console.log(item);
// }

const map = new Map();
map.set("hello", "rahul");
map.set("yes", "arun");
map.set("no", "gupta");

for (const key in map) {
  //map is not iterable
  console.log(key);
}

for (const key in obj4) {
  // console.log(`${key}:${obj4[key]}`);
}

for (const [key, value] in obj4) {
  //here key , value fetches the frist index only not the entire item
  // console.log(`${key}:${value}`);
}

const arr = [1, 2, 3, 4, 5];

arr.forEach((element) => {
  // console.log(element);
});

const total = arr.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log(typeof 42.1);
console.log(total);
