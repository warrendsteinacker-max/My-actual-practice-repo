const logger = {
  reason: "User Interaction",
  log: function() {
    setTimeout(() => {
      console.log("Capturing due to:", this.reason);
    }, 1000);
  }
};

logger.log(); // 4