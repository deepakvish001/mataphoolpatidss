import React from 'react';

const MissionCourses = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Welcome Header */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8">
            <span className="text-foreground">WELCOME TO </span>
            <span className="text-orange-500">PANKH </span>
            <span className="text-green-600">PARIDHI </span>
            <span className="text-blue-600">FOUNDATION</span>
          </h1>

          {/* Mission Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-red-600 mb-4">
              OUR MISSION
            </h2>
            <p className="text-lg md:text-xl text-foreground font-medium">
              Our mission is to create digital/skilled India.
            </p>
          </div>

          {/* Courses Section */}
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-red-600 mb-12">
              COURSES OFFERED
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* DDU-GKV Course */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-border/20">
                <div className="h-32 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="text-purple-600 font-bold text-2xl mb-2">📚</div>
                    <div className="text-purple-600 font-semibold text-sm">
                      Deen Dayal Upadhyaya<br/>
                      Grameen Kaushalya Yojana
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-purple-600">DDUGKY</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Empowering India • Powering the World
                </p>
              </div>

              {/* PMKVY Course */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-border/20">
                <div className="h-32 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="text-orange-500 font-bold text-3xl mb-2">🏆</div>
                    <div className="text-orange-500 font-semibold text-sm">
                      प्रधानमंत्री कौशल विकास योजना<br/>
                      PRADHAN MANTRI KAUSHAL VIKAS YOJANA
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-orange-500">PMKVY</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Skill Development for Better Future
                </p>
              </div>

              {/* PMGDISHA Course */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-border/20">
                <div className="h-32 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="text-green-600 font-bold text-3xl mb-2">💻</div>
                    <div className="text-green-600 font-semibold text-sm">
                      PRADHAN MANTRI GRAMIN<br/>
                      DIGITAL SAKSHARTA ABHIYAN
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-green-600">PMGDISHA</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Digital Literacy for Rural India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionCourses;