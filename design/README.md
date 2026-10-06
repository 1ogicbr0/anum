# Design source

Live canvas (Claude Design): https://claude.ai/artifact/Nuiiqd4Mi2aj1CkhYhV9vs

These `.dc.html` files are the artboards exported from that canvas. Each is a self-contained
HTML page; the inline styles and the `<helmet><style>` block are the reference for the React
build. Palette, type and components are summarised in `Style.dc.html` and in
`../BRAND-ANALYSIS.md`.

| File | Artboard |
|---|---|
| Style.dc.html | Style tile: palette, type scale, buttons, chips, field, product card, icons |
| Main.dc.html | Home, desktop (fluid page, 1440 reference width) |
| MobileHome.dc.html | Home, mobile (390 reference width) |
| Shop.dc.html | Shop / category page (Rings) with filters |
| Product.dc.html | Product page for the Customizable Signet Ring: live initials engraving, gold/silver toggle, size select |

Placeholders: `[price]`, `[number]`, `[Photo — …]` and `[Customer review …]` mark data the
client still has to supply. Lilac "satin" blocks stand in for product photography.

## Direction B (added after reviewing tesoro.pk)

| File | Artboard |
|---|---|
| HomeB.dc.html | Catalogue-first home, desktop. Search-led header, category nav, tabbed product feed with "Add to order" (interactive) |
| MobileHomeB.dc.html | Catalogue-first home, mobile, with a sticky "Send order" bar |
| OrderDrawer.dc.html | The "Your order" drawer that turns a basket into a WhatsApp message (no account, no card) |

Reference: tesoro.pk (Lahore, est. 2009). Borrowed: utility bar, search bar in the header,
category tabs feeding a dense product grid with prices, three-benefit trust row, contact-heavy
footer. Improved: product names and collection on every card, gold/silver availability dots,
WhatsApp order basket instead of a login-gated card-only cart, brand storytelling, mobile layout.
