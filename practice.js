const taskManager = {
  task: "Data Collection",
  // Regular Function
  start: function() {
    console.log("Starting " + this.task);
  },
  // Arrow Function
  stop: function(){
    console.log("Stopping " + this.task);}

};

taskManager.start(); 
taskManager.stop();