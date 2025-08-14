import React from 'react';

const ImageSlider = () => {
  const images = [
    '/lovable-uploads/767db9eb-7c2e-4b94-869d-d7b52c3b85bc.png',
    '/lovable-uploads/826f162e-1417-45ee-bec0-7b1539fd2090.png',
    '/lovable-uploads/88b8f60b-e761-455e-b18f-01d8271389a5.png',
    '/lovable-uploads/857ae7b2-1d84-4084-9efd-ad9aa8f23eb8.png',
    '/lovable-uploads/bd4748be-2192-4dd2-a780-086700f48940.png',
    '/lovable-uploads/376bf80e-326d-4c04-8d95-d167152497f9.png',
    '/lovable-uploads/124478ce-accd-4ae6-8894-6702c3ec546d.png',
    '/lovable-uploads/053fbcea-43b7-49b0-ab13-2bef1dfa1237.png',
    '/lovable-uploads/9620e816-f7c5-4d6f-abd0-4af4654dc295.png',
    '/lovable-uploads/3e0e5b19-aebb-453d-9da8-0dfd427dc60f.png'
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <h2 className="text-4xl font-black text-primary mb-4">
            Our Certified Partners & Authorizations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Proud to be certified and authorized by leading government agencies and skill development councils across India
          </p>
        </div>
      </div>
      
      <div className="relative">
        {/* Continuous sliding container */}
        <div className="flex animate-[slide_30s_linear_infinite] gap-6">
          {/* First set of images */}
          {images.map((image, index) => (
            <div
              key={`first-${index}`}
              className="flex-none w-64 h-48 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex items-center justify-center"
            >
              <img
                src={image}
                alt={`Certified partner logo ${index + 1}`}
                className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
           {images.map((image, index) => (
            <div
              key={`second-${index}`}
              className="flex-none w-64 h-48 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex items-center justify-center"
            >
              <img
                src={image}
                alt={`Certified partner logo ${index + 1}`}
                className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300"
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
          Authorized by Government of India for quality skill development and certification programs
        </p>
      </div>
    </section>
  );
};

export default ImageSlider;