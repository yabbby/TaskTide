import React from 'react';

const HomePage = () => {
  return (
    <div className="bg-darkblue text-white">
{/* Hero Section */}
<section 
  className="bg-cover bg-center h-screen flex flex-col justify-center items-center text-center py-12"
  style={{ backgroundImage: 'url("/Home.png")' }}
>
  <h1 className="text-4xl md:text-5xl font-bold mb-4">
    Welcome to TaskTide
  </h1>
  <p className="text-lg mb-6 text-gray-300">
    Your ultimate task planner and manager to keep your day organized.
  </p>
  <a
    href="/signup"
    className="px-6 py-3 bg-yellow-400 text-darkblue rounded-lg text-lg transition transform hover:bg-yellow-500 hover:scale-105"
  >
    Get Started
  </a>
</section>



      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 text-yellow-400">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-yellow-400 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl bg-darkblue text-white">
              <h3 className="text-xl font-semibold mb-4">Task Management</h3>
              <p>
                Organize, prioritize, and manage your tasks with ease. Set due dates, track progress, and more.
              </p>
            </div>
            <div className="p-6 border border-yellow-400 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl bg-darkblue text-white">
              <h3 className="text-xl font-semibold mb-4">Collaboration</h3>
              <p>
                Work together with your team, share tasks, and stay updated with real-time progress.
              </p>
            </div>
            <div className="p-6 border border-yellow-400 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl bg-darkblue text-white">
              <h3 className="text-xl font-semibold mb-4">Mobile Friendly</h3>
              <p>
                Access and manage your tasks anywhere, anytime, with our responsive mobile-friendly app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-darkblue">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 text-yellow-400">What Our Users Say</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-64 p-6 border border-yellow-400 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl bg-darkblue text-white">
              <p className="text-lg mb-4">"TaskTide has helped me stay on top of my tasks. I can easily track everything in one place!"</p>
              <p className="font-semibold text-yellow-400">Yeabesera Sisay</p>
              <p className="text-gray-400">Productivity Enthusiast</p>
            </div>
            <div className="w-64 p-6 border border-yellow-400 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl bg-darkblue text-white">
              <p className="text-lg mb-4">"I love the collaboration feature. It has streamlined my team's workflow."</p>
              <p className="font-semibold text-yellow-400">Yafet Eyoel</p>
              <p className="text-gray-400">Project Manager</p>
            </div>
            <div className="w-64 p-6 border border-yellow-400 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl bg-darkblue text-white">
              <p className="text-lg mb-4">"I love to Work together with your team, share tasks, and stay updated with real-time progress."</p>
              <p className="font-semibold text-yellow-400">Kaleab Murja</p>
              <p className="text-gray-400">UI/UX Designer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-yellow-400">Ready to Get Started?</h2>
        <p className="text-lg mb-6 text-gray-300">Sign up today and start organizing your tasks with TaskTide!</p>
        <a
          href="/signup"
          className="px-8 py-4 bg-yellow-400 text-darkblue rounded-lg text-xl hover:bg-yellow-500 transition transform hover:scale-105"
        >
          Sign Up Now
        </a>
      </section>
    </div>
  );
};

export default HomePage;
