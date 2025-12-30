function Task(title) {
  this.title = title;
  // This is inefficient if we have 10,000 tasks!
  this.save = function() {
    console.log(`Saving ${this.title} to Book Collection...`);
  };
}

const t1 = new Task("History");
const t2 = "Science";