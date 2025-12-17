---
toc: false
---

<div class="portaljs-banner">
  <div class="portaljs-banner-content">
    <span class="portaljs-banner-icon">🌀</span>
    <div class="portaljs-banner-text">
      <p class="portaljs-banner-title">Create beautiful data portals with PortalJS</p>
      <p class="portaljs-banner-description">The open-source framework for building data catalogs, dashboards, and visualizations.</p>
    </div>
  </div>
  <a href="https://www.portaljs.com/" target="_blank" rel="noopener noreferrer" class="portaljs-banner-cta">
    Get Started Free <span class="portaljs-banner-cta-arrow">→</span>
  </a>
</div>

<div class="hero-large">
  <h1>Cloud Storage Pricing Portal</h1>
  <p>Compare storage and egress costs across major cloud providers including AWS S3, Cloudflare R2, Backblaze B2, and more.</p>
</div>

```js
const storageData = FileAttachment("data/cloud_storage_pricing.csv").csv({typed: true});
```

```js
const providers = (await storageData).map(d => ({
  provider: d.Provider,
  storageCost: +d["Storage Price ($/TB)"] || 0,
  downloadCost: +d["Download Price ($/TB)"] || 0
})).filter(d => d.provider);

const avgStorage = d3.mean(providers, d => d.storageCost);
const avgDownload = d3.mean(providers, d => d.downloadCost);
const freeEgressCount = providers.filter(d => d.downloadCost === 0).length;
const cheapestStorage = [...providers].sort((a, b) => a.storageCost - b.storageCost)[0];
```

<div class="key-stats">
  <div class="key-stat">
    <div class="value">${providers.length}</div>
    <div class="label">Providers</div>
  </div>
  <div class="key-stat">
    <div class="value">${freeEgressCount}</div>
    <div class="label">Free Egress</div>
  </div>
  <div class="key-stat">
    <div class="value">$${avgStorage.toFixed(1)}</div>
    <div class="label">Avg Storage/TB</div>
  </div>
  <div class="key-stat">
    <div class="value">$${avgDownload.toFixed(1)}</div>
    <div class="label">Avg Egress/TB</div>
  </div>
</div>

<div class="landing-grid">
  <div class="landing-card">
    <a href="./cloud-storage">
      <h3>Cloud Storage Pricing</h3>
      <p>Compare storage and egress costs across 17+ cloud providers. Find the best value for your use case with interactive visualizations.</p>
    </a>
  </div>
  <div class="landing-card">
    <h3>Key Highlights</h3>
    <p>Cloudflare R2 offers free egress. Storj has the cheapest storage at $4/TB. Traditional clouds like AWS and GCP have high egress fees.</p>
  </div>
</div>

---

## Data Sources

This portal uses pricing data sourced from public provider documentation and community research.

- **Primary Source:** [Cloud Storage Pricing Analysis](https://gist.github.com/Manouchehri/733e6235457e60de24fdbb15046fba7f)
- **Providers Covered:** AWS S3, Cloudflare R2, Backblaze B2, Google Cloud Storage, Wasabi, Storj, and more
- **Last Updated:** December 2024
