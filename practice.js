for (var i = 1; i <= 3; i++) {
  function task(a) {setTimeout(() => {
    console.log("Task Index:", a);
  }, 1000);
}
    task(i);
}