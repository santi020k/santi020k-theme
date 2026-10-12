# Sculpted home hero

Generated with the built-in image generation tool on October 12, 2026. `master.png`
is the original raster output; the website uses `apps/website/src/assets/hub-hero-sculpted.webp`.
Astro emits responsive WEBP variants. This is decorative artwork, not a product screenshot
or a replacement for the canonical logo.

Prompt sent to the built-in tool:

Create a premium editorial 3D still-life hero artwork for the Santi020k Theme developer theme
family website, landscape 4:3 composition. Current visual direction is Sculpted: calm,
architectural, refined, restrained. A cluster of three substantial rounded rectangular slabs and
a single shallow arch arranged like overlapping work surfaces in real space, pale matte ceramic,
translucent smoky violet glass, deep indigo brushed material. Soft rich violet edge highlights,
tactile subtle grain, broad diffused studio daylight, physically convincing contact shadows. A
small canonical white terminal prompt >_ inset on ONE solid saturated violet rounded square tile
among the sculptural surfaces, crisp and correct, no other lettering. Background is a very pale
lavender seamless studio backdrop #f8f6fd, grounded objects with ample breathing room, tasteful
asymmetric composition, central forms fill about 75 percent of frame. Rich violet #6319be and
deep ink #110c1d accents. Sophisticated product photography/CGI, exceptionally beautiful
material quality. No fabricated software windows or screenshot UI, no devices, no gradients
filling the whole background, no neon glow, no text headlines, no watermark. Entire frame
finished and purposeful, flat illustration forbidden.

Export: `node --input-type=module -e 'import sharp from "sharp"; await sharp("artwork/hub-hero-v3/master.png").webp({quality:88}).toFile("apps/website/src/assets/hub-hero-sculpted.webp")'`.

## Dark companion

Generated with the built-in image generation tool on October 12, 2026, editing
`master.png`. The original output is `master-dark.png`; the responsive website source is
`apps/website/src/assets/hub-hero-sculpted-dark.webp`. Both retain the same dimensions and
composition. CSS selects the visible image using the existing site appearance attribute,
with an operating-system preference fallback when JavaScript is unavailable.

Exact edit prompt:

Use case: lighting-weather. Asset type: dark-mode website hero, landscape 4:3. Input image is the edit target: the approved Santi020k sculptural still life. Create its dark appearance companion. Preserve the exact composition, object geometry, camera framing, relative scale and locations: tall translucent violet glass rounded slab behind, ceramic arch on right, rectangular ceramic block left, front dark pedestal, violet terminal prompt tile with white >_ symbol, small purple glass sphere and rock at front-left. Change only the lighting and material tones to a calm nocturnal studio: deep indigo-black backdrop and floor around #110c1d, charcoal-violet ceramic with subtle texture, luminous but restrained violet glass edges, soft lavender rim lighting, readable white prompt. The purple tile remains rich violet. Keep detailed natural materials, soft shadows, clear separation of dark shapes. No neon glow, no extra objects, no lettering, no UI, no watermark. This is the same scene after dark, not a redesigned composition.

Export: `node --input-type=module -e 'import sharp from "sharp"; await sharp("artwork/hub-hero-v3/master-dark.png").webp({quality:88}).toFile("apps/website/src/assets/hub-hero-sculpted-dark.webp")'`.
