import bannerOnePng from '../../../../packages/theme/assets/banners/banner-1.png?url'
import bannerOne from '../../../../packages/theme/assets/banners/banner-1.webp'
import bannerOneWebp from '../../../../packages/theme/assets/banners/banner-1.webp?url'
import bannerTwoPng from '../../../../packages/theme/assets/banners/banner-2.png?url'
import bannerTwo from '../../../../packages/theme/assets/banners/banner-2.webp'
import bannerTwoWebp from '../../../../packages/theme/assets/banners/banner-2.webp?url'
import bannerThreePng from '../../../../packages/theme/assets/banners/banner-3.png?url'
import bannerThree from '../../../../packages/theme/assets/banners/banner-3.webp'
import bannerThreeWebp from '../../../../packages/theme/assets/banners/banner-3.webp?url'
import bannerFourPng from '../../../../packages/theme/assets/banners/banner-4.png?url'
import bannerFour from '../../../../packages/theme/assets/banners/banner-4.webp'
import bannerFourWebp from '../../../../packages/theme/assets/banners/banner-4.webp?url'
import bannerFivePng from '../../../../packages/theme/assets/banners/banner-5.png?url'
import bannerFive from '../../../../packages/theme/assets/banners/banner-5.webp'
import bannerFiveWebp from '../../../../packages/theme/assets/banners/banner-5.webp?url'
import chromeWallpaperPng from '../../../../packages/theme/assets/chrome/images/theme_ntp_background.png?url'
import chromeWallpaperSvg from '../../../../packages/theme/assets/chrome/images/theme_ntp_background.svg?url'
import chromeWallpaper from '../../../../packages/theme/assets/chrome/images/theme_ntp_background.webp'
import chromeWallpaperWebp from '../../../../packages/theme/assets/chrome/images/theme_ntp_background.webp?url'
import chromeWallpaperHeic from '../../../../packages/theme/assets/chrome/images/wallpaper.heic?url'
import logoLightPng from '../../../../packages/theme/assets/logos/logo-santi020k.png?url'
import logoLightSvg from '../../../../packages/theme/assets/logos/logo-santi020k.svg?url'
import logoLight from '../../../../packages/theme/assets/logos/logo-santi020k.webp'
import logoLightWebp from '../../../../packages/theme/assets/logos/logo-santi020k.webp?url'
import logoDarkPng from '../../../../packages/theme/assets/logos/logo-santi020k-dark.png?url'
import logoDarkSvg from '../../../../packages/theme/assets/logos/logo-santi020k-dark.svg?url'
import logoDark from '../../../../packages/theme/assets/logos/logo-santi020k-dark.webp'
import logoDarkWebp from '../../../../packages/theme/assets/logos/logo-santi020k-dark.webp?url'
import logoSquarePng from '../../../../packages/theme/assets/logos/logo-square.png?url'
import logoSquareSvg from '../../../../packages/theme/assets/logos/logo-square.svg?url'
import logoSquare from '../../../../packages/theme/assets/logos/logo-square.webp'
import logoSquareWebp from '../../../../packages/theme/assets/logos/logo-square.webp?url'
import previewDark from '../../../../packages/theme/assets/vscode/previews/preview-dark.png'
import previewDarkPng from '../../../../packages/theme/assets/vscode/previews/preview-dark.png?url'
import previewDarkSvg from '../../../../packages/theme/assets/vscode/previews/preview-dark.svg?url'
import previewHcDark from '../../../../packages/theme/assets/vscode/previews/preview-hc-dark.png'
import previewHcDarkPng from '../../../../packages/theme/assets/vscode/previews/preview-hc-dark.png?url'
import previewHcDarkSvg from '../../../../packages/theme/assets/vscode/previews/preview-hc-dark.svg?url'
import previewHcLight from '../../../../packages/theme/assets/vscode/previews/preview-hc-light.png'
import previewHcLightPng from '../../../../packages/theme/assets/vscode/previews/preview-hc-light.png?url'
import previewHcLightSvg from '../../../../packages/theme/assets/vscode/previews/preview-hc-light.svg?url'
import previewLight from '../../../../packages/theme/assets/vscode/previews/preview-light.png'
import previewLightPng from '../../../../packages/theme/assets/vscode/previews/preview-light.png?url'
import previewLightSvg from '../../../../packages/theme/assets/vscode/previews/preview-light.svg?url'
import wallpaperOneDesktopPng from '../../../../packages/theme/assets/wallpapers/wallpaper-1-desktop.png?url'
import wallpaperOneDesktop from '../../../../packages/theme/assets/wallpapers/wallpaper-1-desktop.webp'
import wallpaperOneDesktopWebp from '../../../../packages/theme/assets/wallpapers/wallpaper-1-desktop.webp?url'
import wallpaperOneMobilePng from '../../../../packages/theme/assets/wallpapers/wallpaper-1-mobile.png?url'
import wallpaperOneMobile from '../../../../packages/theme/assets/wallpapers/wallpaper-1-mobile.webp'
import wallpaperOneMobileWebp from '../../../../packages/theme/assets/wallpapers/wallpaper-1-mobile.webp?url'
import wallpaperTwoDesktopPng from '../../../../packages/theme/assets/wallpapers/wallpaper-2-desktop.png?url'
import wallpaperTwoDesktop from '../../../../packages/theme/assets/wallpapers/wallpaper-2-desktop.webp'
import wallpaperTwoDesktopWebp from '../../../../packages/theme/assets/wallpapers/wallpaper-2-desktop.webp?url'
import wallpaperTwoMobilePng from '../../../../packages/theme/assets/wallpapers/wallpaper-2-mobile.png?url'
import wallpaperTwoMobile from '../../../../packages/theme/assets/wallpapers/wallpaper-2-mobile.webp'
import wallpaperTwoMobileWebp from '../../../../packages/theme/assets/wallpapers/wallpaper-2-mobile.webp?url'
import wallpaperThreeDesktopPng from '../../../../packages/theme/assets/wallpapers/wallpaper-3-desktop.png?url'
import wallpaperThreeDesktop from '../../../../packages/theme/assets/wallpapers/wallpaper-3-desktop.webp'
import wallpaperThreeDesktopWebp from '../../../../packages/theme/assets/wallpapers/wallpaper-3-desktop.webp?url'
import wallpaperThreeMobilePng from '../../../../packages/theme/assets/wallpapers/wallpaper-3-mobile.png?url'
import wallpaperThreeMobile from '../../../../packages/theme/assets/wallpapers/wallpaper-3-mobile.webp'
import wallpaperThreeMobileWebp from '../../../../packages/theme/assets/wallpapers/wallpaper-3-mobile.webp?url'

const download = (label, href, file) => ({ label, href, file })

const wallpaper = (title, variant, dimensions, preview, base, png, webp, portrait = false) => ({
  title,
  category: 'wallpapers',
  variant,
  dimensions,
  preview,
  portrait,
  formats: [download('PNG', png, `${base}.png`), download('WEBP', webp, `${base}.webp`)]
})

const banner = (preview, index, png, webp) => ({
  title: `Social banner 0${index}`,
  category: 'banners',
  variant: 'Wide',
  dimensions: '1584 × 396',
  preview,
  contain: true,
  formats: [download('PNG', png, `santi020k-banner-${index}.png`), download('WEBP', webp, `santi020k-banner-${index}.webp`)]
})

const preview = (title, variant, image, base, png, svg) => ({
  title,
  category: 'previews',
  variant,
  dimensions: '1280 × 720',
  preview: image,
  formats: [download('PNG', png, `${base}.png`), download('SVG', svg, `${base}.svg`)]
})

const logo = (title, variant, dimensions, image, base, png, svg, webp) => ({
  title,
  category: 'logos',
  variant,
  dimensions,
  preview: image,
  contain: true,
  formats: [download('SVG', svg, `${base}.svg`), download('PNG', png, `${base}.png`), download('WEBP', webp, `${base}.webp`)]
})

export const galleryAssets = [
  wallpaper('Violet horizon 01', 'Desktop', '3840 × 2160', wallpaperOneDesktop, 'santi020k-wallpaper-1-desktop', wallpaperOneDesktopPng, wallpaperOneDesktopWebp),
  wallpaper('Violet horizon 01', 'Mobile', '1170 × 2532', wallpaperOneMobile, 'santi020k-wallpaper-1-mobile', wallpaperOneMobilePng, wallpaperOneMobileWebp, true),
  wallpaper('Violet horizon 02', 'Desktop', '3840 × 2160', wallpaperTwoDesktop, 'santi020k-wallpaper-2-desktop', wallpaperTwoDesktopPng, wallpaperTwoDesktopWebp),
  wallpaper('Violet horizon 02', 'Mobile', '1170 × 2532', wallpaperTwoMobile, 'santi020k-wallpaper-2-mobile', wallpaperTwoMobilePng, wallpaperTwoMobileWebp, true),
  wallpaper('Violet horizon 03', 'Desktop', '3840 × 2160', wallpaperThreeDesktop, 'santi020k-wallpaper-3-desktop', wallpaperThreeDesktopPng, wallpaperThreeDesktopWebp),
  wallpaper('Violet horizon 03', 'Mobile', '1170 × 2532', wallpaperThreeMobile, 'santi020k-wallpaper-3-mobile', wallpaperThreeMobilePng, wallpaperThreeMobileWebp, true),
  {
    title: 'Chrome new tab wallpaper',
    category: 'wallpapers',
    variant: 'Browser',
    dimensions: '3840 × 2160 master',
    preview: chromeWallpaper,
    formats: [
      download('HEIC', chromeWallpaperHeic, 'santi020k-chrome-wallpaper.heic'),
      download('PNG', chromeWallpaperPng, 'santi020k-chrome-wallpaper.png'),
      download('SVG', chromeWallpaperSvg, 'santi020k-chrome-wallpaper.svg'),
      download('WEBP', chromeWallpaperWebp, 'santi020k-chrome-wallpaper.webp')
    ]
  },
  banner(bannerOne, 1, bannerOnePng, bannerOneWebp),
  banner(bannerTwo, 2, bannerTwoPng, bannerTwoWebp),
  banner(bannerThree, 3, bannerThreePng, bannerThreeWebp),
  banner(bannerFour, 4, bannerFourPng, bannerFourWebp),
  banner(bannerFive, 5, bannerFivePng, bannerFiveWebp),
  preview('VS Code dark', 'Dark', previewDark, 'santi020k-vscode-dark', previewDarkPng, previewDarkSvg),
  preview('VS Code light', 'Light', previewLight, 'santi020k-vscode-light', previewLightPng, previewLightSvg),
  preview('VS Code HC dark', 'High contrast', previewHcDark, 'santi020k-vscode-hc-dark', previewHcDarkPng, previewHcDarkSvg),
  preview('VS Code HC light', 'High contrast', previewHcLight, 'santi020k-vscode-hc-light', previewHcLightPng, previewHcLightSvg),
  logo('Wordmark for dark surfaces', 'Dark surface', '1008 × 160', logoDark, 'santi020k-wordmark-dark', logoDarkPng, logoDarkSvg, logoDarkWebp),
  logo('Wordmark for light surfaces', 'Light surface', '1008 × 160', logoLight, 'santi020k-wordmark-light', logoLightPng, logoLightSvg, logoLightWebp),
  logo('Square logo', 'Square', '512 × 512', logoSquare, 'santi020k-logo-square', logoSquarePng, logoSquareSvg, logoSquareWebp)
]
