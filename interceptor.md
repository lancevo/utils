# URLMonitor: A Lightweight JavaScript Library for HTTP Request Interception

URLMonitor is a versatile and non-intrusive JavaScript library designed to intercept and monitor both XMLHttpRequest and Fetch API calls in web applications. This lightweight tool allows developers to easily track specific URLs and their responses without modifying existing code or disrupting normal application behavior.

## Key Features:

1. **Dual Interception**: Seamlessly monitors both XMLHttpRequest and Fetch API calls.
2. **Dynamic URL Monitoring**: Add or remove URLs to monitor at runtime.
3. **Custom Callback Support**: Associate unique callback functions with each monitored URL.
4. **Non-Intrusive Design**: Preserves the original functionality of XMLHttpRequest and Fetch.
5. **Flexible Response Handling**: Provides raw response text to callbacks, allowing custom parsing and processing.

## Use Cases:

- Debugging and logging specific API calls
- Monitoring performance of particular endpoints
- Intercepting and modifying responses for testing purposes
- Implementing custom analytics for specific network requests

## How It Works:

URLMonitor works by overriding the native XMLHttpRequest and Fetch implementations. When a request is made:

1. The library checks if the URL matches any monitored URLs.
2. If a match is found, it captures the response.
3. The associated callback function is called with the URL and response text.
4. The original request continues unaffected, maintaining normal application flow.

## Getting Started:

Simply include the URLMonitor library in your project and use the `monitorUrl` function to start tracking specific URLs. Use `removeMonitorUrl` when you no longer need to monitor a URL.


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
