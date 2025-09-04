import React, { useContext, useState } from "react";
import { landingPageStyles } from "../assets/dummystyle";
import {
  ArrowRight,
  Download,
  LayoutTemplate,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ProfileInfoCard } from "../components/Cards";
import Login from "../components/Login";
import Modal from "../components/Model";
import Signup from "../components/Signup";

const LandingPage = () => {
  // Get user data from context (logged-in user info)
  const { user } = useContext(UserContext);

  // React Router navigation hook
  const navigate = useNavigate();

  // Local state for modal and mobile menu
  const [openAuthModel, setOpenAuthModel] = useState(false); // for login/signup modal
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // for mobile menu toggle
  const [currentPage, setCurrentPage] = useState("login"); // decides whether to show Login or Signup

  // Handle "Get Started" button
  const handleCTA = () => {
    if (!user) {
      // If no user logged in, open auth modal
      setOpenAuthModel(true);
    } else {
      // If logged in, go to dashboard
      navigate("/dashboard");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-violet-100/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          
          {/* Logo section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-lg">
              <LayoutTemplate className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              ResumeXpert
            </span>
          </div>


          {/* Mobile menu button (hamburger icon) */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-violet-50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

            {mobileMenuOpen ? (<X size={24} className="text-violet-600" />) : (
              <Menu size={24} className="text-violet-600" />)}
          </button>


          {/* Desktop authentication buttons */}
          <div className="hidden md:flex items-center">
            {user ? (
              // If logged in, show profile card
              <ProfileInfoCard />) : (
              // If not logged in, show "Get Started" button
              <button
                className="relative group px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                onClick={() => setOpenAuthModel(true)}>
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <span className="relative">Get Started</span>
              </button>)}
          </div>
        </div>



        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg w-full fixed top-16 left-0 right-0 z-40 shadow-lg border-b border-violet-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4">
              {user ? (
                // If logged in
                <div className="flex flex-col gap-4 py-2">
                  <div className="text-violet-700 font-medium text-center py-2 text-base sm:text-lg">
                    WELCOME BACK
                  </div>

                  <button
                    className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl hover:shadow-md transition"
                    onClick={() => {
                      navigate("/dashboard");
                      setMobileMenuOpen(false);}}>
                    Go to Dashboard
                  </button>
                </div>
              ) : (


                // If not logged in
                <button
                  className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl hover:shadow-md"
                  onClick={() => {
                    setOpenAuthModel(true);
                    setMobileMenuOpen(false);}}>
                  Get Started
                </button>)}

            </div>
          </div>
        )}
      </header>



      {/* ================= MAIN CONTENT ================= */}
      <main className={landingPageStyles.main}>

        
        {/* -------- HERO SECTION -------- */}
        <section className={landingPageStyles.heroSection}>
          <div className={landingPageStyles.heroGrid}>


            {/* Left side (text content) */}
            <div className={landingPageStyles.heroLeft}>
              <div className={landingPageStyles.tagline}>
                Professional Resume Builder
              </div>


              {/* Main heading */}
              <h1 className={landingPageStyles.heading}>
                <span className={landingPageStyles.headingText}>Craft</span>
                <span className={landingPageStyles.headingGradient}>
                  Professional
                </span>
                <span className={landingPageStyles.headingText}>Resume</span>
              </h1>


              {/* Short description */}
              <p className={landingPageStyles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit...
              </p>


              {/* Call-to-action buttons */}
              <div className="flex justify-center sm:justify-start gap-2">
                <button onClick={handleCTA} className="relative group h-20 px-8 sm:px-10 lg:px-14 py-3 sm:py-4 lg:py-5 text-base sm:text-lg lg:text-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                  <span className="relative flex">
                    Start Building
                    <ArrowRight size={34} className="ml-2" />
                  </span>
                </button>


                <button onClick={handleCTA} className="relative group h-20 px-8 sm:px-10 lg:px-14 py-3 sm:py-4 lg:py-5 text-base sm:text-lg lg:text-xl bg-gradient-to-r from-violet-500 to-fuchsia-300 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                  View Templates
                </button>
              </div>


              {/* Stats below hero */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center py-12">
                {[
                  { value: "50k+", label: "Resumes Created", gradient: "from-violet-600 to-fuchsia-600" },
                  { value: "4.9★", label: "User Rating", gradient: "from-orange-500 to-red-500" },
                  { value: "5 Min", label: "Build Time", gradient: "from-emerald-500 to-teal-500" }].map((stat, idx) => (<div key={idx} className="flex flex-col items-center">
                    <div className={`text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="mt-2 text-gray-700 text-sm sm:text-base md:text-lg font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Right side (SVG illustration) */}
            <div className="relative flex items-center justify-center">
              {/* Background blur and shapes */}
              {/* ... kept as-is (SVG illustration code) */}
            </div>
          </div>
        </section>



        {/* -------- FEATURES SECTION -------- */}
        <section className="py-30 bg-gray-100 h-150">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center">

              <h2 className="md:text-4xl font-extrabold text-gray-800">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  ResumeXpert
                </span>
              </h2>

              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet consectetur adipisicing elit...
              </p>

            </div>


            {/* Features cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-20 gap-6">
              {[
                { icon: <Zap className="w-8 h-8 text-violet-500" />, title: "Lightning Fast", description: "Create professional resumes in under 5 minutes", gradient: "from-violet-500 to-purple-400", bg: "bg-violet-100" },
                { icon: <LayoutTemplate className="w-8 h-8 text-fuchsia-500" />, title: "Pro Templates", description: "Choose from dozens of recruiter-approved templates", gradient: "from-fuchsia-500 to-pink-400", bg: "bg-fuchsia-100" },
                { icon: <Download className="w-8 h-8 text-orange-500" />, title: "Instant Export", description: "Download high-quality PDFs instantly", gradient: "from-orange-500 to-yellow-400", bg: "bg-orange-100" },
              ].map((features, index) => (

                <div key={index} className="relative rounded-2xl shadow-md hover:shadow-xl transition duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-200 opacity-0 hover:opacity-20 transition duration-300"></div>
                  <div className={`relative p-6 rounded-2xl ${features.bg}`}>
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${features.gradient}`}>
                      {features.icon}
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-gray-800">
                      {features.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600">
                      {features.description}
                    </p>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* -------- CTA SECTION -------- */}
        <section className="relative py-20 px-6 bg-gradient-to-b from-white to-purple-50">
          <div className="max-w-4xl mx-auto flex items-center justify-center">
            <div className="relative w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-10 text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                
                Ready to Build Your{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Standout Resume?
                </span>
              </h2>
              <p className="mt-4 text-gray-500 text-lg">
                Join thousands of professionals who landed their dream jobs
              </p>

              <button
                onClick={handleCTA}
                className="relative mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
                Start Building Now
              </button>
            </div>
          </div>
        </section>
      </main>


      {/* ================= FOOTER ================= */}
      <footer className="bg-gradient-to-b from-white to-purple-300 border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-sm sm:text-base">
            Crafted with <span className="animate-pulse text-red-500">❤️</span>{" "}
            by{" "}
            <a href="https://yourportfolio.com" target="_blank" rel="noopener noreferrer"
              className="font-medium text-purple-600 hover:text-pink-500 transition-colors">
              Your Name
            </a>

          </p>
        </div>
      </footer>
      

      {/* ================= LOGIN / SIGNUP MODAL ================= */}
      <Modal
        isOpen={openAuthModel}
        onClose={() => {
          setOpenAuthModel(false);
          setCurrentPage("login"); // Always reset to login when modal closes
        }}
        hideHeader>
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <Signup setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
