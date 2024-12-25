import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="bg-darkblue text-white min-h-screen flex flex-col">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

        {/* Company History Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white text-darkblue p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-semibold mb-4">Company History</h2>
              <p className="text-lg">
                TaskTide was founded in 2022 with the mission to make task management easy, efficient, and rewarding.
                Over the years, we have grown into a trusted platform used by thousands of users worldwide.
              </p>
            </div>

            <div className="bg-white text-darkblue p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-lg">
                Our mission is to help people organize their tasks, stay productive, and achieve their goals.
                We believe that effective task management can lead to a more organized and fulfilling life.
              </p>
            </div>

            <div className="bg-white text-darkblue p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h3 className="font-semibold text-xl">Yeabesera Sisay</h3>
                  <p className="text-sm">CEO & Founder</p>
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Yafet Eyoel</h3>
                  <p className="text-sm">COO</p>
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Kaleab Murja</h3>
                  <p className="text-sm">CTO</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="bg-white text-darkblue p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <ul className="list-disc pl-6">
              <li className="text-lg">Innovation: We are committed to continuous improvement and creativity.</li>
              <li className="text-lg">Integrity: We operate with honesty, transparency, and respect.</li>
              <li className="text-lg">Customer Focus: We prioritize the needs of our users in everything we do.</li>
            </ul>
          </div>
        </section>

        {/* Awards & Recognition Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Awards & Recognition</h2>
          <div className="bg-white text-darkblue p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <p className="text-lg">
              TaskTide has been recognized for excellence in productivity tools, winning multiple awards including the 
              "Best Task Management App" in 2023.
            </p>
          </div>
        </section>

        {/* Contact Us Button */}
        <section className="text-center">
          <a 
            href="/contact" 
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Contact Us
          </a>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;
