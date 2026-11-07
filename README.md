# YatraLoop academic planning lab

IIM Bodh Gaya EMBA · Data Driven Marketing Decisions · Case 4 · 13 November 2026.

Open `dist/index.html` directly for offline use. No installation, backend, tracking or remote runtime assets. Hosted publication may impose Sites private access; the local folder has no login.

Presentation sequence: Ads → Pages → How it works → Dashboard. Ads open standalone `trips.html` or `himachal.html` sections; both pages link back to the campaign. Keys 1–5 jump to sections; D focuses Dashboard. Reset levers restores quarterly view, ₹14,000 scenario trip value, two Q3 promotions and 6% test conversion.

`dist/data.js` owns inputs and precomputed plan outputs. `dist/model.js` calculates dashboard results. Run `node --test tests/model.test.cjs` for forecast reconciliation, tranche sensitivity, Q3 overflow and ROAS checks. Meta sensitivity deliberately holds tranche CPL at the brief's rounded ₹1,190 while the full base funnel uses exact rates. Uplift follows seasonality. No paid halo is applied to CRM.

The four 1080px WebP creatives are in `dist/ads/`. Illustrative AI-generated travel imagery is in `dist/images/`; it depicts fictional scenes and people. Their exact text and deterministic artwork can be regenerated on macOS with `swift -module-cache-path /tmp/yatraloop-swift-cache scripts/render-ads.swift`.

All inclusions/exclusions and refund terms are SAMPLE. No package price, person, testimonial or inventory claim is invented. Georgia and system sans-serif fonts support offline display.

## GitHub Pages

The repository includes a GitHub Actions workflow that publishes `dist/` to GitHub Pages whenever `main` is updated. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The first successful workflow run will publish the site at the repository's Pages URL.

`dist/reviews.js` contains fictional star ratings, review counts and testimonials for the classroom mockup. The Google-style badge is a visual example, not a linked Google Business profile. None of these are customer reviews or actual campaign results.

Testimonial portraits are served as a 468×312 lossless WebP sprite, sized for 52px avatars at up to 3× display density. The full-resolution PNG is retained in `source-assets/`; regenerate with `cwebp -resize 468 312 -lossless -z 9 source-assets/traveller-portraits-original.png -o dist/images/traveller-portraits.webp`.

Illustrative destination prices and the dated Himachal departure are stored in `dist/catalog.js`. The countdown uses the current date in India and hides an expired departure; update the departure date when preparing a future presentation. These sample prices do not alter the dashboard forecast or its scenario trip values.

The trip catalog also stores illustrative trip lengths, departure dates, and seat counts. Expired departures are not displayed as available. The Himachal concept describes 24×7 captain support, personal photography, and end-of-day photo delivery.

The support widget and “Talk to captain” action are offline interface previews. Messages stay in the browser and are not sent to a captain or support team; connecting real support requires a separate service.

Himachal cost and cancellation copy is an illustrative proposal for the fictional concept. The cancellation windows were benchmarked against JustWravel's published domestic-tour policy (https://static.justwravel.com/files/cgnfe1hd/production/5031d9f0132e7f12272ae0b0b3ebf30e4e4e7e61.pdf); this concept proposes an original-payment refund at 30+ days and a full refund if the operator cancels. No actual booking or refund is processed.
