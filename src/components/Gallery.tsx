import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { galleryFeatures } from '../data/galleryItems';

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-600 mb-3">
            Product Gallery
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Explore the RxDoctor Experience
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every workflow is thoughtfully crafted—from physician dashboards to patient
            touchpoints—so teams deliver modern, paperless care without context switching.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryFeatures.map((item) => (
            <article
              key={item.slug}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width="1280"
                  height="720"
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.tagline}</p>
                <Link
                  to={`/gallery/${item.slug}`}
                  className="inline-flex items-center text-blue-600 font-medium text-sm"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View feature story
                </Link>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

