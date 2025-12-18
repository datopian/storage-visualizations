---
toc: false
---

<div class="portaljs-banner">
  <div class="portaljs-banner-content">
    <div class="portaljs-banner-text">
      <p class="portaljs-banner-title">Create beautiful data portals with PortalJS</p>
    </div>
  </div>
  <a href="https://www.portaljs.com/" target="_blank" rel="noopener noreferrer" class="portaljs-banner-cta">
    Get started free
  </a>
</div>

```js
const storageData = FileAttachment("data/cloud_storage_pricing.csv").csv({typed: true});
```

```js
const providers = (await storageData).map(d => ({
  provider: d.Provider,
  storageCost: +d["Storage Price ($/TB)"] || 0,
  downloadCost: +d["Download Price ($/TB)"] || 0,
  url: d.URL || null,
  notes: d.Notes || ""
})).filter(d => d.provider);

const byStorage = [...providers].sort((a, b) => a.storageCost - b.storageCost);
const byDownload = [...providers].sort((a, b) => a.downloadCost - b.downloadCost);
const cheapestStorage = byStorage[0];

const avgStorage = d3.mean(providers, d => d.storageCost);
const avgDownload = d3.mean(providers, d => d.downloadCost);
const freeEgressCount = providers.filter(d => d.downloadCost === 0).length;

const usageCosts = providers.map(d => ({
  ...d,
  moderateUsage: d.storageCost + d.downloadCost * 2
})).sort((a, b) => a.moderateUsage - b.moderateUsage);

const topStorageProviders = byStorage.slice(0, 10);
const topEgressProviders = byDownload.slice(0, 10);
const topUsageProviders = usageCosts.slice(0, 10);
```

<div class="hero">
  <h1>Object Storage Pricing Comparison</h1>
  <p>Compare storage and egress costs across major object storage providers. Prices are in USD.</p>
</div>

```js
display(html`<div class="dashboard-container">
  <div class="dashboard-top">
    <div class="sidebar-section">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-card-header">
            <span class="stat-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></span>
            <span class="stat-card-label">Cheapest</span>
          </div>
          <div class="stat-card-content">
            <div class="stat-card-value">${cheapestStorage?.provider}</div>
            <div class="stat-card-subvalue">$${cheapestStorage?.storageCost}/TB/mo</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-card-header">
            <span class="stat-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></span>
            <span class="stat-card-label">Free Egress</span>
          </div>
          <div class="stat-card-content">
            <div class="stat-card-value">${freeEgressCount}</div>
            <div class="stat-card-subvalue">Providers</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-card-header">
            <span class="stat-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></span>
            <span class="stat-card-label">Avg Storage</span>
          </div>
          <div class="stat-card-content">
            <div class="stat-card-value">$${avgStorage.toFixed(1)}</div>
            <div class="stat-card-subvalue">per TB/month</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-card-header">
            <span class="stat-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></span>
            <span class="stat-card-label">Avg Egress</span>
          </div>
          <div class="stat-card-content">
            <div class="stat-card-value">$${avgDownload.toFixed(1)}</div>
            <div class="stat-card-subvalue">per TB</div>
          </div>
        </div>
      </div>

      <div class="insights-card">
        <div class="insights-header">
          <span class="insights-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>
          <h4 class="insights-title">Key Insights</h4>
        </div>
        <ul class="insights-list">
          <li>Traditional clouds (AWS, GCP) have significantly higher egress fees</li>
          <li>Cloudflare R2 offers free egress with competitive storage rates</li>
          <li>Backblaze and Wasabi offer free egress with some ratio limits</li>
          <li>Storj provides the cheapest storage but uses segment pricing for small files</li>
        </ul>
      </div>
    </div>

    <div class="chart-card">
      <div class="chart-header">
        <div class="chart-title-row">
          <h3 class="chart-title">Storage vs Download Cost ($/TB, best case scenario)</h3>
        </div>
        <span class="chart-badge">Lower & Left is Better</span>
      </div>
      <div class="chart-content">
        ${resize((width) => {
          const isMobile = width < 640;
          const height = isMobile ? 300 : 380;
          return Plot.plot({
            width,
            height,
            marginLeft: 50,
            marginRight: 30,
            marginBottom: 50,
            marginTop: 20,
            style: { background: "transparent" },
            x: {
              label: "Storage Cost ($/TB/mo) →",
              grid: true,
              tickFormat: d => "$" + d
            },
            y: {
              label: "↑ Download Cost ($/TB)",
              grid: true,
              tickFormat: d => "$" + d
            },
            marks: [
              Plot.dot(providers, {
                x: "storageCost",
                y: "downloadCost",
                r: 7,
                fill: d => d.downloadCost === 0 ? "#009966" : d.downloadCost > 50 ? "#3B82F6" : "#F59E0B",
                stroke: "white",
                strokeWidth: 2,
                tip: true,
                title: d => d.provider + "\nStorage: $" + d.storageCost + "/TB\nDownload: $" + d.downloadCost + "/TB"
              }),
              Plot.text(providers, {
                x: "storageCost",
                y: "downloadCost",
                text: "provider",
                dy: -12,
                fontSize: 10,
                fill: "#79716B"
              }),
              Plot.ruleY([0], { stroke: "#E7E5E4" }),
              Plot.ruleX([0], { stroke: "#E7E5E4" })
            ]
          });
        })}
      </div>
    </div>
  </div>

  <div class="dashboard-bottom">
    <div class="chart-card">
      <div class="chart-header">
        <div class="chart-title-row">
          <span class="chart-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></span>
          <h3 class="chart-title">Storage Cost ($/TB/mo)</h3>
        </div>
      </div>
      <div class="chart-content">
        ${resize((width) => {
          const isMobile = width < 500;
          return Plot.plot({
            width,
            height: isMobile ? 320 : 360,
            marginLeft: isMobile ? 90 : 100,
            marginRight: 50,
            marginBottom: 40,
            style: { background: "transparent" },
            x: {
              grid: true,
              tickFormat: d => "$" + d
            },
            y: { label: null },
            marks: [
              Plot.barX(topStorageProviders, {
                x: "storageCost",
                y: "provider",
                fill: d => {
                  if (d.storageCost <= 6) return "#3B82F6";
                  if (d.storageCost <= 10) return "#009966";
                  if (d.storageCost <= 18) return "#F59E0B";
                  return "#F59E0B";
                },
                sort: { y: "x" },
                tip: true,
                title: d => d.provider + ": $" + d.storageCost + "/TB/mo"
              }),
              Plot.text(topStorageProviders, {
                x: "storageCost",
                y: "provider",
                text: d => "$" + d.storageCost,
                dx: 4,
                textAnchor: "start",
                fontSize: 11,
                fill: d => {
                  if (d.storageCost <= 6) return "#3B82F6";
                  if (d.storageCost <= 10) return "#009966";
                  return "#F59E0B";
                }
              }),
              Plot.ruleX([0])
            ]
          });
        })}
      </div>
    </div>

    <div class="chart-card">
      <div class="chart-header">
        <div class="chart-title-row">
          <span class="chart-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></span>
          <h3 class="chart-title">Egress Cost ($/TB)</h3>
        </div>
      </div>
      <div class="chart-content">
        ${resize((width) => {
          const isMobile = width < 500;
          return Plot.plot({
            width,
            height: isMobile ? 320 : 360,
            marginLeft: isMobile ? 90 : 100,
            marginRight: 50,
            marginBottom: 40,
            style: { background: "transparent" },
            x: {
              grid: true,
              tickFormat: d => "$" + d
            },
            y: { label: null },
            marks: [
              Plot.barX(topEgressProviders, {
                x: "downloadCost",
                y: "provider",
                fill: d => {
                  if (d.downloadCost === 0) return "#009966";
                  if (d.downloadCost <= 10) return "#009966";
                  if (d.downloadCost <= 50) return "#F59E0B";
                  return "#DC2626";
                },
                sort: { y: "x" },
                tip: true,
                title: d => d.provider + ": $" + d.downloadCost + "/TB"
              }),
              Plot.text(topEgressProviders, {
                x: "downloadCost",
                y: "provider",
                text: d => d.downloadCost === 0 ? "$0" : "$" + d.downloadCost,
                dx: 4,
                textAnchor: "start",
                fontSize: 11,
                fill: d => d.downloadCost === 0 ? "#009966" : "#79716B"
              }),
              Plot.ruleX([0])
            ]
          });
        })}
      </div>
    </div>

    <div class="chart-card">
      <div class="chart-header">
        <div class="chart-title-row">
          <span class="chart-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></span>
          <h3 class="chart-title">Monthly: 1TB Store + 2TB Download</h3>
        </div>
      </div>
      <div class="chart-content">
        ${resize((width) => {
          const isMobile = width < 500;
          return Plot.plot({
            width,
            height: isMobile ? 320 : 360,
            marginLeft: isMobile ? 90 : 100,
            marginRight: 50,
            marginBottom: 40,
            style: { background: "transparent" },
            x: {
              grid: true,
              tickFormat: d => "$" + d
            },
            y: { label: null },
            marks: [
              Plot.barX(topUsageProviders, {
                x: "moderateUsage",
                y: "provider",
                fill: d => {
                  if (d.moderateUsage <= 10) return "#3B82F6";
                  if (d.moderateUsage <= 25) return "#009966";
                  if (d.moderateUsage <= 50) return "#F59E0B";
                  return "#DC2626";
                },
                sort: { y: "x" },
                tip: true,
                title: d => d.provider + ": $" + d.moderateUsage.toFixed(0) + "/mo"
              }),
              Plot.text(topUsageProviders, {
                x: "moderateUsage",
                y: "provider",
                text: d => "$" + d.moderateUsage.toFixed(0),
                dx: 4,
                textAnchor: "start",
                fontSize: 11,
                fill: d => {
                  if (d.moderateUsage <= 10) return "#3B82F6";
                  if (d.moderateUsage <= 25) return "#009966";
                  if (d.moderateUsage <= 50) return "#F59E0B";
                  return "#DC2626";
                }
              }),
              Plot.ruleX([0])
            ]
          });
        })}
      </div>
    </div>
  </div>

  <div class="dashboard-footer">
    <span>Built with <a href="https://www.portaljs.com/" target="_blank">PortalJS</a> and Observable Framework</span>
    <span>Sources: <a href="https://gist.github.com/Manouchehri/733e6235457e60de24fdbb15046fba7f" target="_blank">comparethe.co</a></span>
  </div>
</div>`)
```
