import React from 'react';

const VideoSection = () => {
  return (
    <div className="relative w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 lg:py-32">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 -mt-20 -mb-20 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left - Video */}
          <div className="w-full lg:w-1/2">
            <div className="relative group">
              {/* Video Container */}
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                {/* Replace with your actual video */}
                <video
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop"
                  controls
                >
                  <source src="/path-to-your-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Play Button Overlay (optional, appears before video plays) */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-900/40 flex items-center justify-center group-hover:bg-blue-600/30 transition-all duration-300">
                  <button className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-8 left-8 w-full h-full rounded-3xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 blur-2xl"></div>
            </div>

            {/* Video Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-slate-400 text-sm">Documents Drafted</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-slate-400 text-sm">Client Satisfaction</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-slate-400 text-sm">Support Available</div>
              </div>
            </div>
          </div>

          {/* Right - Description */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Badge */}
            <div>
              <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 text-sm font-semibold uppercase tracking-wider rounded-full border border-blue-500/20">
                See How It Works
              </span>
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Streamlined Legal Documentation
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mt-2">
                  Made Simple
                </span>
              </h2>
              <p className="text-slate-300 text-lg lg:text-xl leading-relaxed">
                Watch how our platform transforms complex legal documentation into a simple, 
                efficient process. From initial consultation to final delivery, we handle every 
                step with precision and care.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.75 17L9 20L8 21H16L15 20L14.25 17M3 13H21M5 17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17ZM12 14V20M9 17H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">AI-Powered Drafting</h3>
                  <p className="text-slate-400 text-sm">
                    Advanced AI technology ensures accuracy and compliance in every document we create.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12.75L11.25 15L15 9.75M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Secure & Confidential</h3>
                  <p className="text-slate-400 text-sm">
                    Bank-level encryption and strict confidentiality protocols protect your sensitive information.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Fast Turnaround</h3>
                  <p className="text-slate-400 text-sm">
                    Get your documents reviewed and finalized within 24-48 hours without compromising quality.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-blue-500/50 transition-all duration-300">
                Get Started Today
                <svg className="w-5 h-5 inline-block ml-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
