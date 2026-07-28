---
"santi020k-chrome-theme": patch
"@santi020k/theme": patch
---

Removed the New Tab Page background image from the Chrome theme (both dark and light variants) in favor of a solid `ntp_background` color. The bundled PNG background image was a recurring source of "could not decode image" errors in Chrome's theme engine; a solid color background avoids that failure mode entirely while keeping the same violet palette.
