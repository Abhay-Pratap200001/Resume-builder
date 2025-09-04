export const landingPageStyles = {
  // ==============================
  // Main container
  // ==============================
  container: "min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50",

  // ==============================
  // Header styles
  // ==============================
  header: "fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-violet-100/50",
  headerContainer: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center",
  logoContainer: "flex items-center gap-3",
  logoIcon: "w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-lg",
  logoIconInner: "w-5 h-5 text-white",
  logoText: "text-xl sm:text-2xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent",

  // ==============================
  // Mobile header buttons
  // ==============================
  mobileMenuButton: "md:hidden p-2 rounded-xl hover:bg-violet-50 transition-colors",
  mobileMenuIcon: "text-violet-600",

  // ==============================
  // Auth buttons
  // ==============================
  desktopAuthButton: "relative group px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all",
  desktopAuthButtonText: "relative",
  desktopAuthButtonOverlay: "absolute inset-0 bg-gradient-to-br from-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl",
  mobileAuthButton: "w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-2xl hover:shadow-md transition-all",

  // ==============================
  // Mobile menu
  // ==============================
  mobileMenu: "hidden md:hidden bg-white/95 backdrop-blur-lg w-full fixed top-16 left-0 right-0 z-40 shadow-lg border-b border-violet-100",
  mobileMenuContainer: "max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4",
  mobileUserInfo: "flex flex-col gap-4 py-2",
  mobileUserWelcome: "text-violet-700 font-medium text-center py-2 text-base sm:text-lg",
  mobileDashboardButton: "w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl hover:shadow-md transition",
  mobileAuthButtonAlt: "w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl hover:shadow-md",

  // ==============================
  // Main content
  // ==============================
  main: "pt-24",

  // ==============================
  // Hero Section
  // ==============================
  heroSection: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20",
  heroGrid: "flex flex-wrap justify-between gap-10 lg:gap-12 items-center",
  heroLeft: "space-y-8",
  tagline: "inline-flex items-center gap-2 sm:gap-3 px-4 py-2 bg-gradient-to-r from-violet-100 to-fuchsia-100 border border-violet-200 text-violet-600 rounded-full text-sm font-medium shadow-sm",
  heading: "text-4xl sm:text-6xl lg:text-8xl font-black leading-tight",
  headingText: "block text-slate-900",
  headingGradient: "block bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 bg-clip-text text-transparent",
  description: "text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl font-medium",
  ctaButtons: "flex flex-col sm:flex-row gap-4",
};
