function f1(f) {
  console.log("1");
  f();
}
function f2() {
  console.log("2");
}
f1(f2);
