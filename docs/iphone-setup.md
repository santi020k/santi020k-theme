# Santi020k iPhone setup pack

A coordinated pair of existing phone compositions: Halo for the Lock Screen and Contour for the Home Screen. Both have light and dark editions. The PNGs are 1170 × 2532 exports resized from saved raster artwork; adjust the crop on other screen sizes. No app, configuration profile, or subscription is required.

## Download and save

Download the pack at https://theme.santi020k.com/iphone/. In Files, tap the ZIP to extract it. Open each PNG, tap Share, and choose Save Image. You can also save the individual images linked on the website. The pack contains four PNGs, this guide, and the MIT license.

## Set up the pair

1. Open Settings → Wallpaper → Add New Wallpaper → Photos. Select the Halo image (`santi020k-dark-lock.png` or `santi020k-light-lock.png`).
2. Adjust the crop so the circular detail stays below the clock. Choose a clock color that remains readable against the image. Add any widgets you already use.
3. Tap Add → Customize Home Screen. Select the matching Contour image (`santi020k-dark-home.png` or `santi020k-light-home.png`). Adjust Blur to your preference and tap Done.
4. On iOS 18 or later, touch and hold the Home Screen, then choose Edit → Customize → Tinted. Use the eyedropper to sample violet from the wallpaper, or adjust the color and saturation sliders. The labels and available controls can vary with your iOS version.

Create a second wallpaper pair if you want both appearances. Selecting Auto for icons does not automatically switch these wallpaper files. Optionally link a saved Lock Screen to a Focus using the native Focus control in the Lock Screen gallery.

The pack customizes wallpapers and supports native icon tinting. It does not recolor the inside of other apps, replace their actual icons, or install widgets. Use Obsidian's own theme settings for matching notes.

## Switch light and dark automatically

Save both wallpaper pairs first. In Shortcuts, create a Light wallpaper shortcut with the **Switch Between Wallpapers** action and select the saved light pair. Create a Dark wallpaper shortcut for the saved dark pair. You can also add **Set Appearance** to each shortcut if you want it to set the matching system appearance.

Create a Time of Day automation at Sunrise to run the light shortcut, and another at Sunset to run the dark shortcut, repeating daily. Enable immediate or unattended running if your iOS version offers it, and test each shortcut manually. The Automation controls and permission labels vary by iOS version. Switching Dark Mode separately in Control Center does not trigger this schedule; run the matching shortcut to change both together.

Alternatively, link each wallpaper to a Focus you already use and schedule that Focus. Review its notification settings because a Focus also affects notifications and status. A Mac HEIC file cannot install this pairing on iPhone.

See the illustrated setup page at https://theme.santi020k.com/gallery/appearance/#iphone. Device-specific wallpaper selections must be configured on your phone; the ZIP cannot supply a preconfigured shortcut for them.

## Restore your previous setup

Disable the wallpaper automations first if you created them. Select your previous wallpaper pair from the Lock Screen gallery. Return Home Screen icon appearance to your preferred default. Keep your old wallpaper pair until you are happy with this one.

## Sources and artwork

- Apple: https://support.apple.com/guide/iphone/change-the-wallpaper-iph3d267104/ios
- Apple: https://support.apple.com/guide/iphone/customize-apps-and-widgets-on-the-home-screen-iph385473442/ios
- Apple Shortcuts actions: https://support.apple.com/101583
- Apple automation triggers: https://support.apple.com/guide/shortcuts/apd932ff833f/ios
- Apple Focus setup: https://support.apple.com/guide/iphone/iphd6288a67f/ios
- Halo: https://theme.santi020k.com/gallery/halo/
- Contour: https://theme.santi020k.com/gallery/contour/

The source artwork lives in `artwork/minimal-v2/` and `artwork/minimal-v1/`. Existing PNG exports are bundled unchanged by `scripts/build-theme-downloads.mjs`. No system UI is baked into the images.

Created by Santiago Molina — https://santi020k.com
