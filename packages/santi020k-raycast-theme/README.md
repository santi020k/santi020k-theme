# Santi020k Theme for Raycast

Dark and light Raycast themes using the shared Santi020k violet palette. Raycast custom themes require Raycast Pro.

## Install

1. Open `themes/santi020k-dark.url.txt` or `themes/santi020k-light.url.txt`.
2. Copy the complete `raycast://theme?...` URL and open it on a device with Raycast installed.
3. Approve the import, then select the theme in **Raycast Settings → General → Appearance**.
4. Assign the dark and light variants to their matching system appearances.

The JSON files match Raycast Theme Studio exports and can also be contributed to the public Raycast theme gallery.

## Validate

```bash
pnpm --filter santi020k-raycast-theme run validate
```

The validator checks the official 12-color shape, import URLs, mode parity, and primary text contrast.
