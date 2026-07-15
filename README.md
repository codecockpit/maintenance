# Code Cockpit maintenance page

Static, fully self-contained maintenance page served by GitHub Pages at https://codecockpit.github.io/maintenance/

Used when codecockpit.dev is down for planned work: enable the "Maintenance mode" redirect rule in Cloudflare (Rules, Redirect Rules) to send all traffic here, disable it when done. The page auto-refreshes every 60 seconds and is marked noindex so it never enters search results.

Everything is inline (CSS, favicon as a data URI) on purpose: this page must not depend on anything that could be down at the same time as the site.
