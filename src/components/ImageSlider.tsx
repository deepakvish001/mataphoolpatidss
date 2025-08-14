import React from 'react';

const ImageSlider = () => {
  const images = [
    '/lovable-uploads/d6577713-1ec2-4c09-ace0-65aa6e97f4fc.png',
    '/lovable-uploads/f15af816-2dc8-45f6-9e1a-10ca186f8a09.png',
    '/lovable-uploads/8461fa07-3ddd-4930-84ae-d9d3aa24b773.png',
    '/lovable-uploads/b2d1c6b0-7e01-4874-9785-0869f95c9ad2.png',
    '/lovable-uploads/6f00f730-31c1-4ed6-bfa9-736f409f052d.png',
    '/lovable-uploads/8c4ef4ee-1b4a-4e1d-bde6-36b4ddf3cf29.png',
    '/lovable-uploads/4017cb0a-c1ac-49f8-ad3b-05a00260ede7.png',
    '/lovable-uploads/45142334-a490-400f-ab80-26d923651a59.png',
    '/lovable-uploads/3c20df4a-02aa-4e0a-a200-f29bb19ed853.png',
    '/lovable-uploads/a6b9777a-00e6-413f-ae43-01584d8e0c5a.png'
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <h2 className="text-4xl font-black text-primary mb-4">
            Yuva Vikas Society in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Witness the transformative journey of thousands of young minds through our comprehensive training and development programs
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
              className="flex-none w-80 h-60 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={image}
                alt={`Yuva Vikas Society training program ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {images.map((image, index) => (
            <div
              key={`second-${index}`}
              className="flex-none w-80 h-60 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={image}
                alt={`Yuva Vikas Society training program ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
          Empowering youth through skill development and educational excellence
        </p>
      </div>
    </section>
  );
};

export default ImageSlider;