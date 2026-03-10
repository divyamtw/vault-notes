import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-neutral-950 flex flex-col justify-center items-center overflow-hidden font-sans text-neutral-100">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-fuchsia-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="z-10 text-center px-4 max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8">
          Secure Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">
            Thoughts
          </span>
        </h1>
        <p className="text-lg md:text-2xl text-neutral-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          VaultNotes provides a seamless, lightning-fast platform to capture, organize, and safeguard your most important ideas.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/register"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-indigo-600 rounded-full hover:bg-indigo-500 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-neutral-950"
          >
            <span className="mr-2">Get Started Free</span>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-8 py-4 font-semibold text-neutral-300 transition-all duration-300 border border-neutral-700 rounded-full hover:text-white hover:border-neutral-500 hover:bg-neutral-800/50 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950 backdrop-blur-sm"
          >
            Login to Vault
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 text-center text-sm text-neutral-600">
        &copy; {new Date().getFullYear()} VaultNotes. Secure by design.
      </div>
    </div>
  );
};

export default LandingPage;