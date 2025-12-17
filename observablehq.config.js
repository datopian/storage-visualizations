export default {
  title: "Cloud Storage Pricing Portal",
  pages: [
    {name: "Cloud Storage Pricing", path: "/cloud-storage"}
  ],
  head: `
  <link rel="icon" href="observable.png" type="image/png" sizes="32x32">
  <script>
    sessionStorage.setItem("observablehq-sidebar", "false");
  </script>
  <script type="module">
    import { inject } from 'https://esm.sh/@vercel/analytics@1.5.0';
    inject();
  </script>
  `,
  root: "src",
  style: "style.css",
  footer: 'Built with <a href="https://www.portaljs.com/" target="_blank" rel="noopener noreferrer">PortalJS</a> and Observable Framework.',
};
