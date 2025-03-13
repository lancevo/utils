(function () {
  // Store the original XMLHttpRequest open method and fetch function
  const originalXMLHttpRequest = window.XMLHttpRequest.prototype.open;
  const originalFetch = window.fetch;

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

  /**
   * Remove a monitored URL so it is no longer tracked.
   * @param {string} urlToRemove - The URL (or part of the URL) to stop monitoring.
   */
  function removeMonitorUrl(urlToRemove) {
    if (typeof urlToRemove !== "string") {
      throw new Error("Invalid argument. Expected a string URL.");
    }
    monitoredUrls.delete(urlToRemove);
  }

  // Override the XMLHttpRequest open method
  window.XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
    this.addEventListener("load", function () {
      // Check if the URL matches any monitored URLs
      monitoredUrls.forEach((callbackFn, monitoredUrl) => {
        if (url.includes(monitoredUrl)) {
          // Call the associated callback function with the response text
          callbackFn(url, this.responseText);
        }
      });
    });

    // Call the original open method
    return originalXMLHttpRequest.apply(this, arguments);
  };

  // Override the fetch function
  window.fetch = async function (input, init) {
    const requestUrl = typeof input === "string" ? input : input.url;

    // Call the original fetch function
    const response = await originalFetch(input, init);

    // Clone the response so we can read its body without affecting the original response
    const clonedResponse = response.clone();

    // Read the response body as text and check if it matches any monitored URLs
    clonedResponse.text().then((responseText) => {
      monitoredUrls.forEach((callbackFn, monitoredUrl) => {
        if (requestUrl.includes(monitoredUrl)) {
          // Call the associated callback function with the response text
          callbackFn(requestUrl, responseText);
        }
      });
    });

    return response; // Return the original response to preserve fetch behavior
  };

  // Expose public API for monitoring and removing URLs
  window.URLMonitor = {
    monitorUrl,
    removeMonitorUrl,
  };
})();
