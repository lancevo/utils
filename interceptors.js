(function () {
  // Store the original XMLHttpRequest open method
  const originalXMLHttpRequest = window.XMLHttpRequest.prototype.open;

  // Create a map to store monitored URLs and their callback functions
  const monitoredUrls = new Map();

  /**
   * Monitor a specific URL and associate it with a callback function.
   * @param {string} urlToMonitor - The URL (or part of the URL) to monitor.
   * @param {function} callbackFn - The function to call with the response data.
   */
  function monitorUrl(urlToMonitor, callbackFn) {
    if (typeof urlToMonitor !== "string" || typeof callbackFn !== "function") {
      throw new Error("Invalid arguments. Expected a string URL and a function.");
    }
    monitoredUrls.set(urlToMonitor, callbackFn);
  }

  // Override the XMLHttpRequest open method
  window.XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
    this.addEventListener("load", function () {
      try {
        // Parse the response as JSON (if applicable)
        const responseData = JSON.parse(this.responseText);

        // Check if the URL matches any monitored URLs
        monitoredUrls.forEach((callbackFn, monitoredUrl) => {
          if (url.includes(monitoredUrl)) {
            // Call the associated callback function with the response data
            callbackFn(url, responseData);
          }
        });
      } catch (error) {
        console.error("Error processing response:", error);
      }
    });

    // Call the original open method
    return originalXMLHttpRequest.apply(this, arguments);
  };

  // Expose the monitorUrl function as part of the library's public API
  window.URLMonitor = {
    monitorUrl,
  };
})();
