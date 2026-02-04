async function loadData() {
  const url = "https://api.thingspeak.com/channels/3243838/feeds.json?results=50";

  const response = await fetch(url);
  const data = await response.json();

  const feeds = data.feeds;

  // Kies de meest recente 10 invoeren waar beide velden aanwezig zijn (valt terug op enige veld als er niet genoeg zijn)
  let dataFeeds = feeds.filter(f => f.field1 !== null && f.field2 !== null);
  if (dataFeeds.length < 10) {
    dataFeeds = feeds.filter(f => f.field1 !== null || f.field2 !== null);
  }
  dataFeeds = dataFeeds.slice(-10);

  // Labels en waarden
  const labels = dataFeeds.map(f => f.created_at.substring(11, 16));
  const tempValues = dataFeeds.map(f => f.field1 !== null ? parseFloat(f.field1) : null);
  const ntuValues = dataFeeds.map(f => f.field2 !== null ? parseFloat(f.field2) : null);

  // Update grafiek
  tempChart.data.labels = labels;
  tempChart.data.datasets[0].data = tempValues;
  tempChart.data.datasets[1].data = ntuValues;

  tempChart.update();
}

// Data elke 30 seconden vernieuwen
loadData();
setInterval(loadData, 30000);
