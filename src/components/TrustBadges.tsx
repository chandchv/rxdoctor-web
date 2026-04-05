import React from 'react';

export interface TrustBadge {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export interface TrustBadgesProps {
  badges: TrustBadge[];
}

const TrustBadges: React.FC<TrustBadgesProps> = ({ badges }) => {
  return (
    <div
      data-testid="trust-badges"
      className="flex flex-wrap justify-center gap-4"
    >
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300"
        >
          <span className="flex-shrink-0">{badge.icon}</span>
          <span className="font-semibold text-white">{badge.value}</span>
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
