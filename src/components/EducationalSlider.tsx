import React from 'react';

const EducationalSlider = () => {
  const images = [
    '/lovable-uploads/c8cad483-9a7b-40cf-a2ac-31889c66e7a3.png',
    '/lovable-uploads/8a62098f-160f-46ab-bfb6-6b9925185546.png',
    '/lovable-uploads/60da17e6-671d-4114-b484-8d261ba68550.png',
    '/lovable-uploads/042149ef-3fb9-4762-a4af-9040bf71cf0c.png',
    '/lovable-uploads/df1ed1f1-ab94-4dfd-8d73-47d8a689b431.png',
    '/lovable-uploads/06308d95-5409-4a6b-99a9-4af328870551.png',
    '/lovable-uploads/3beadfde-7ca1-4555-afca-ed8803d2ff6f.png',
    '/lovable-uploads/59196885-8a77-450d-b61e-153153e167a7.png',
    '/lovable-uploads/b0e5ecf5-f9c5-4420-a39d-dbcebf9ce985.png',
    '/lovable-uploads/7dd12d0d-7ddf-4d56-8b7e-b1e1ee7eeb9b.png'
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-secondary/5 via-primary/5 to-secondary/5 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <h2 className="text-4xl font-black text-primary mb-4">
            Educational Excellence & Student Life
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering students through quality education, practical learning, and comprehensive skill development programs
          </p>
        </div>
      </div>
      
      <div className="relative">
        {/* Continuous sliding container */}
        <div className="flex animate-[slide_25s_linear_infinite] gap-6">
          {/* First set of images */}
          {images.map((image, index) => (
            <div
              key={`first-${index}`}
              className="flex-none w-80 h-60 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 p-2"
            >
              <img
                src={image}
                alt={`Educational environment ${index + 1}`}
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {images.map((image, index) => (
            <div
              key={`second-${index}`}
              className="flex-none w-80 h-60 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 p-2"
            >
              <img
                src={image}
                alt={`Educational environment ${index + 1}`}
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        
        {/* Gradient overlays for seamless blend */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
      </div>
      
      <div className="text-center mt-12">
        <p className="text-lg text-muted-foreground">
          Creating future leaders through innovative learning experiences and practical skill development
        </p>
      </div>
    </section>
  );
};

export default EducationalSlider;