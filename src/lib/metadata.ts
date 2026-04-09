import type { Metadata } from "next";
import { siteConfig } from "./constants";

type PageMetadataArgs = {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
};

export function generatePageMetadata({
  title,
  description,
  path = "",
  ogImage = "/images/og-image.jpg",
}: PageMetadataArgs = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;

  const pageDescription = description || siteConfig.description;
  const url = `${siteConfig.url}${path}`;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: siteConfig.name,
      locale: "en_ZA",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phoneRaw,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "ZA",
    },
    areaServed: {
      "@type": "Country",
      name: "South Africa",
    },
    serviceType: [
      "Commercial Construction",
      "Project Management",
      "Civil Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Construction Materials Supply",
      "Renovation and Remodeling",
      "Architectural Services",
    ],
    foundingDate: String(siteConfig.foundedYear),
  };
}
