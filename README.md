# YatraLoop academic planning lab

IIM Bodh Gaya EMBA · Data Driven Marketing Decisions · Case 4 · 13 November 2026.

Open `dist/index.html` directly for offline use. No installation, backend, tracking or remote runtime assets. Hosted publication may impose Sites private access; the local folder has no login.

Presentation sequence: Ads → Pages → How it works → Dashboard. Keys 1–5 jump to sections; D focuses Dashboard. Reset levers restores quarterly view, ₹14,000 scenario trip value, two Q3 promotions and 6% test conversion.

`dist/data.js` owns inputs and precomputed plan outputs. `dist/model.js` calculates dashboard results. Run `node --test tests/model.test.cjs` for forecast reconciliation, tranche sensitivity, Q3 overflow and ROAS checks. Meta sensitivity deliberately holds tranche CPL at the brief's rounded ₹1,190 while the full base funnel uses exact rates. Uplift follows seasonality. No paid halo is applied to CRM.

The four 1080px PNG creatives are in `dist/ads/`. Illustrative AI-generated travel imagery is in `dist/images/`; it depicts fictional scenes and people. Their exact text and deterministic artwork can be regenerated on macOS with `swift -module-cache-path /tmp/yatraloop-swift-cache scripts/render-ads.swift`.

All inclusions/exclusions and refund terms are SAMPLE. No package price, person, testimonial or inventory claim is invented. Georgia and system sans-serif fonts support offline display.
