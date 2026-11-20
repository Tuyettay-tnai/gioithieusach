import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { normalizeImageUrl } from '../config/eventConfig';

export function LotusEmblem({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 8C20.2 14.2 18.2 20.1 18.2 25.5C18.2 29.8 20.8 33.2 24 33.2C27.2 33.2 29.8 29.8 29.8 25.5C29.8 20.1 27.8 14.2 24 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M18.6 28.4C14.8 25.4 11.4 22.8 8.2 21.8C9.8 28.4 13.8 33.4 19.6 34.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.4 28.4C33.2 25.4 36.6 22.8 39.8 21.8C38.2 28.4 34.2 33.4 28.4 34.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 34.6C17.4 36.8 20.7 38 24 38C27.3 38 30.6 36.8 33.5 34.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24.5" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function DongSonMedallion({
  className = 'w-64 h-64',
}: {
  className?: string;
}) {
  const rays = Array.from({ length: 12 }, (_, index) => index * 30);
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="120"
        cy="120"
        r="114"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeDasharray="3 5"
      />
      <circle cx="120" cy="120" r="102" stroke="currentColor" strokeWidth="1" />
      <circle
        cx="120"
        cy="120"
        r="86"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="2 4"
      />
      <circle cx="120" cy="120" r="70" stroke="currentColor" strokeWidth="1" />
      <circle cx="120" cy="120" r="36" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="120" cy="120" r="14" stroke="currentColor" strokeWidth="1" />
      {rays.map((angle) => (
        <g key={angle} transform={`rotate(${angle} 120 120)`}>
          <path
            d="M120 84L124.5 53L120 42L115.5 53L120 84Z"
            stroke="currentColor"
            strokeWidth="0.85"
            strokeLinejoin="round"
          />
          <circle cx="120" cy="26" r="1.6" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}

export function EditorialDivider({
  tone = 'light',
}: {
  tone?: 'light' | 'dark';
}) {
  const lineColor =
    tone === 'dark' ? 'bg-[#C49A45]/30' : 'bg-[#D9CCB8]';
  const iconColor = tone === 'dark' ? 'text-[#C49A45]' : 'text-[#9E2A2B]';
  return (
    <div className="flex items-center justify-center gap-4 my-6" aria-hidden="true">
      <span className={`h-px w-16 sm:w-24 ${lineColor}`} />
      <LotusEmblem className={`w-6 h-6 ${iconColor}`} />
      <span className={`h-px w-16 sm:w-24 ${lineColor}`} />
    </div>
  );
}

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ResilientImageProps) {
  const resolvedSrc = normalizeImageUrl(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [resolvedSrc]);

  if (hasError || !resolvedSrc) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#3A261D] via-[#2B1D16] to-[#562121] text-[#F6F1E7] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <BookOpen className="w-8 h-8 text-[#C49A45] mb-3 opacity-85" />
        <p className="font-serif text-sm tracking-wide text-[#F6F1E7]/90 line-clamp-3">
          {fallbackTitle || alt}
        </p>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
}
