Screenshots shown inside the phone in MobileSection.

Drop PNG/JPG files here, then point an app entry at them with absolute paths:

    images: ["/mobile/Energyc.jpg", "/mobile/Energyc-2.jpg"],

Each image is its own snap, so an app with two screenshots gets two screens in
the phone and the copy beside it stays on that app for both.

Portrait shots read best — the phone screen is 9:17. Anything else gets
object-cover cropped to fit.

An app with no `images` (or whose file 404s) falls back to a typographic name
card, so a missing screenshot never shows a broken image.

Name files for what they show, not 1/2/3 — the order lives in the `images`
array, and numbered names stop matching it the moment you reorder.

Currently in use:
  Energyc-dashboard.jpg    EnergyC, screen 1
  Energyc-signin.jpg       EnergyC, screen 2
  88resort-home.jpg        88 Resort, screen 1
  88resort-welcome.jpg     88 Resort, screen 2
