// Sets the theme before the first paint (same rule as useTheme), so dark-mode visitors never see the light page flash
try {
  document.documentElement.setAttribute('data-theme', localStorage.getItem('portfolio-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
} catch (e) { /* storage blocked: React sets it on load */ }
