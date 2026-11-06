// Runs before first paint (see src/index.html). Keep it tiny and dependency-free.
try {
  var theme = localStorage.getItem('rotw-theme');
  if (theme === 'light' || theme === 'dark') {
    document.documentElement.setAttribute('data-theme', theme);
  }
} catch (e) {
  /* storage unavailable — the default (dark) theme stays */
}
