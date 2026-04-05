import React from 'react';
import { useNavigate, useParams, Navigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { galleryFeatures } from '../data/galleryItems';

const GalleryFeaturePage: React.FC = () => {
  const { slug } = useParams();
  const featureIndex = galleryFeatures.findIndex((item) => item.slug === slug);
  const feature = featureIndex >= 0 ? galleryFeatures[featureIndex] : undefined;
  const navigate = useNavigate();

  if (!feature) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header />
      <main className="pt-24 bg-gray-50">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">{feature.summary}</p>
              <div className="flex flex-wrap gap-4">
                {feature.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl bg-white shadow px-5 py-4 text-center"
                  >
                    <p className="text-2xl font-semibold text-gray-900">
                      {metric.value}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  to="/#gallery"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-2xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  ← Back to gallery
                </Link>
                {feature.cta && (
                  <a
                    href={feature.cta.href}
                    target={feature.cta.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition"
                  >
                    {feature.cta.label}
                  </a>
                )}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width="1280"
                height="720"
              />
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {feature.highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="bg-white rounded-3xl p-6 shadow border border-gray-100"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {highlight.title}
                </h2>
                <p className="text-gray-600 text-sm">{highlight.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <button
              onClick={() =>
                navigate(`/gallery/${galleryFeatures[(featureIndex - 1 + galleryFeatures.length) % galleryFeatures.length].slug}`)
              }
              className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-2xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
            >
              ← Previous feature
            </button>
            <button
              onClick={() =>
                navigate(`/gallery/${galleryFeatures[(featureIndex + 1) % galleryFeatures.length].slug}`)
              }
              className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
            >
              Next feature →
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default GalleryFeaturePage;

