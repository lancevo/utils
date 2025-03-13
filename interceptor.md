```js
// Add a URL to monitor with its associated callback function
URLMonitor.monitorUrl("example.com/signal", (url, responseText) => {
  console.log("Monitored URL:", url);
  console.log("Response Text:", responseText);
});

// Add another URL to monitor
URLMonitor.monitorUrl("/api/some-other-endpoint", (url, responseText) => {
  console.log("Another Monitored URL:", url);
  console.log("Response Text:", responseText);
});

// Remove a monitored URL when you no longer need it
URLMonitor.removeMonitorUrl("example.com/signal");
```
