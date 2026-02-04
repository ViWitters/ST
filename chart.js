async function loadData() {
  const url = "https://api.thingspeak.com/channels/3243838/feeds.json?results=20";

  const response = await fetch(url);
  const data = await response.json();

  const feeds = data.feeds;

  // Labels (tijd)
  const labels = feeds.map(f => f.created_at.substring(11, 16));

  // Temperatuur (field1)
  const tempValues = feeds.map(f => parseFloat(f.field1));

  // NTU (field2)
  const ntuValues = feeds.map(f => parseFloat(f.field2));

  // Update grafiek
  tempChart.data.labels = labels;
  tempChart.data.datasets[0].data = tempValues;
  tempChart.data.datasets[1].data = ntuValues;

  tempChart.update();
}

// Data elke 30 seconden vernieuwen
loadData();
setInterval(loadData, 30000);
