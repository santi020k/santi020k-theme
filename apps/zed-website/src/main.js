import "./styles.css";

import {
  bindPreferredSiteThemeSync,
  bindSiteNavigation,
  SITE_HUB_DESKTOP_NAV_QUERY,
  syncSiteThemeToggle,
} from "@santi020k/theme/site";

// The theme toggle is Lumen's <ThemeToggle>, which already animates the
// switch with its own circular reveal effect (see UIPrimitives). We only
// need to keep the button's aria state in sync with the current theme.
const toggle = document.querySelector(".theme-toggle");
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const desktopNavQuery = window.matchMedia(SITE_HUB_DESKTOP_NAV_QUERY);

syncSiteThemeToggle(toggle);

if (toggle) {
  toggle.addEventListener("ui:theme-change", () => syncSiteThemeToggle(toggle));
}

bindSiteNavigation({
  desktopNavQuery,
  header,
  navLinks,
  navToggle,
});

bindPreferredSiteThemeSync({
  onThemeChange: () => syncSiteThemeToggle(toggle),
});
