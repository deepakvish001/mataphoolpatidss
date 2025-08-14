import React from 'react';

const ModiQuote = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-red-700 via-red-600 to-red-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-8 max-w-6xl mx-auto">
          {/* Modi Photo */}
          <div className="flex-shrink-0">
            <img 
              src="/lovable-uploads/bc858178-be73-4208-b835-0f7a26a93e3e.png" 
              alt="PM Shri Narendra Modi"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/20 shadow-2xl"
            />
          </div>
          
          {/* Quote Text */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              WE NEED TO GIVE IMPETUS TO
            </h2>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-orange-200 leading-tight mt-2">
              ENTREPRENEURSHIP : PM SHRI NARENDRA MODI
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModiQuote;