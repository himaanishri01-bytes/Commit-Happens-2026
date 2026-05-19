document.getElementById('captureBtn').addEventListener('click', async () => {
  const statusDiv = document.getElementById('status');
  statusDiv.innerText = "Capturing...";
  statusDiv.style.color = "#ffc107";

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    let evidenceText = "Secured snapshot of web evidence.";
    let currentUrl = (tab && tab.url) ? tab.url : "Unknown URL";

    try {
      if (tab && tab.id && !currentUrl.startsWith('chrome://') && !currentUrl.startsWith('file://')) {
        const results = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => document.body.innerText.substring(0, 500)
        });
        if (results && results[0] && results[0].result) {
          evidenceText = results[0].result;
        }
      }
    } catch (scriptError) {
      console.log("Automatic scraping restricted on this page type.");
    }

    // Connect to your node backend server
    const response = await fetch('http://localhost:5000/api/evidence', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: currentUrl,
        timestamp: new Date().toISOString(),
        evidenceText: evidenceText
      })
    });

    const data = await response.json();
    if (response.ok) {
      statusDiv.innerText = "Evidence secured successfully!";
      statusDiv.style.color = "#28a745";
    } else {
      throw new Error(data.error || "Server rejected package");
    }
  } catch (error) {
    statusDiv.innerText = "Connection Error";
    statusDiv.style.color = "#dc3545";
    console.error(error);
  }
});