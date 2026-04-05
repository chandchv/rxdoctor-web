import React from 'react';

export interface AppDownloadCTAProps {
  message?: string;
  variant?: 'banner' | 'inline';
}

const AppDownloadCTA: React.FC<AppDownloadCTAProps> = ({
  message = 'Download the RxDoctor app',
  variant = 'banner',
}) => {
  const isBanner = variant === 'banner';

  return (
    <div
      data-testid="app-download-cta"
      className={
        isBanner
          ? 'w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white'
          : 'inline-flex flex-col items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10'
      }
    >
      <p
        className={
          isBanner
            ? 'text-lg font-semibold mb-4'
            : 'text-sm font-semibold text-white'
        }
      >
        {message}
      </p>
      <div
        className={
          isBanner
            ? 'flex flex-col sm:flex-row justify-center items-center gap-4'
            : 'flex flex-col sm:flex-row items-start gap-3'
        }
      >
        <a
          href="https://play.google.com/store/apps/details?id=com.rxdoctor"
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] min-w-[44px] inline-flex items-center"
        >
          <img
            src="https://rxdoctor.in/badges/google-play.png"
            alt="Get RxDoctor on Google Play"
            className="h-10"
          />
        </a>
        <a
          href="https://apps.apple.com/app/rxdoctor/id000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] min-w-[44px] inline-flex items-center"
        >
          <img
            src="https://rxdoctor.in/badges/app-store.png"
            alt="Download RxDoctor on the App Store"
            className="h-10"
          />
        </a>
      </div>
    </div>
  );
};

export default AppDownloadCTA;
