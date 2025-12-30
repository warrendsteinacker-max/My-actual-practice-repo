const taskManager = {
  task: "Data Collection",
  // Regular Function
  start: function() { setTimeout(() => {
    console.log("Task in progress: " + this.task);
  }, 1000);
  },
  // Arrow Function
  stop: function(){
    console.log("Stopping " + this.task);}

};

taskManager.start(); 
taskManager.stop();