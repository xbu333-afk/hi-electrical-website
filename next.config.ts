import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // מאפשר גלישה מהטלפון ברשת הביתית (npm run dev / next dev -H 0.0.0.0)
  allowedDevOrigins: ["192.168.1.122"],

  async redirects() {
    return [
      // דפים כלליים מהאתר הישן
      {
        source: "/copy-of-%D7%A0%D7%92%D7%99%D7%A9%D7%95%D7%AA",
        destination: "/accessibility",
        permanent: true,
      },
      {
        source: "/copy-of-%D7%94%D7%90%D7%A8%D7%A7%D7%94",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about-4",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/general-5",
        destination: "/",
        permanent: true,
      },
      {
        source: "/copy-of-%D7%91%D7%99%D7%AA",
        destination: "/",
        permanent: true,
      },
      {
        source: "/copy-of-contact",
        destination: "/",
        permanent: true,
      },
      {
        source: "/copy-of-%D7%A9%D7%A8%D7%95%D7%AA%D7%99-%D7%97%D7%A9%D7%9E%D7%9C",
        destination: "/",
        permanent: true,
      },
      {
        source: "/%D7%9E%D7%97%D7%A9%D7%91%D7%95%D7%9F-%D7%A6%D7%A8%D7%99%D7%9B%D7%AA-%D7%97%D7%A9%D7%9E%D7%9C-%D7%91%D7%97%D7%99%D7%A0%D7%9D",
        destination: "/",
        permanent: true,
      },
      {
        source: "/copy-of-%D7%91%D7%99%D7%AA-%D7%99%D7%A6%D7%90%D7%AA-%D7%A6%D7%93%D7%99%D7%A71",
        destination: "/",
        permanent: true,
      },
      {
        source: "/%D7%9E%D7%97%D7%99%D7%A8%D7%95%D7%9F-%D7%97-%D7%99-%D7%A9%D7%A8%D7%95%D7%AA%D7%99-%D7%97%D7%A9%D7%9E%D7%9C",
        destination: "/pricing",
        permanent: true,
      },
      // דפי ערים מהאתר הישן
      {
        source: "/copy-of-%D7%97%D7%A9%D7%9E%D7%9C%D7%90%D7%99-%D7%99%D7%A6%D7%90%D7%AA-%D7%A6%D7%93%D7%99%D7%A7-%D7%91%D7%94%D7%95%D7%93-%D7%94%D7%A9%D7%A8%D7%95%D7%9F",
        destination: "/cities/hod-hasharon",
        permanent: true,
      },
      {
        source: "/copy-of-%D7%97%D7%A9%D7%9E%D7%9C%D7%90%D7%99-%D7%99%D7%A6%D7%90%D7%AA-%D7%A6%D7%93%D7%99%D7%A7-%D7%91%D7%94%D7%95%D7%93-%D7%94%D7%A9%D7%A8%D7%95%D7%9F-1",
        destination: "/cities/herzliya",
        permanent: true,
      },
      {
        source: "/copy-of-%D7%97%D7%A9%D7%9E%D7%9C%D7%90%D7%99-%D7%99%D7%A6%D7%90%D7%AA-%D7%A6%D7%93%D7%99%D7%A7-%D7%91%D7%A9%D7%95%D7%94%D7%9D",
        destination: "/cities/rosh-haayin",
        permanent: true,
      },
      {
        source: "/copy-of-%D7%97%D7%A9%D7%9E%D7%9C%D7%90%D7%99-%D7%99%D7%A6%D7%90%D7%AA-%D7%A6%D7%93%D7%99%D7%A7-%D7%91%D7%A4%D7%AA%D7%97-%D7%AA%D7%A7%D7%95%D7%95%D7%94",
        destination: "/cities/hod-hasharon",
        permanent: true,
      },
      {
        source: "/copy-of-%D7%97%D7%A9%D7%9E%D7%9C%D7%90%D7%99-%D7%99%D7%A6%D7%90%D7%AA-%D7%A6%D7%93%D7%99%D7%A7-%D7%91%D7%A8%D7%9E%D7%AA-%D7%92%D7%9F",
        destination: "/cities/ramat-hasharon",
        permanent: true,
      },
      {
        source: "/copy-of-%D7%97%D7%A9%D7%9E%D7%9C%D7%90%D7%99-%D7%99%D7%A6%D7%90%D7%AA-%D7%A6%D7%93%D7%99%D7%A7-%D7%91%D7%9B%D7%A4%D7%A8-%D7%A1%D7%91%D7%90",
        destination: "/cities/ramat-gan",
        permanent: true,
      },
      {
        source: "/copy-of-%D7%97%D7%A9%D7%9E%D7%9C%D7%90%D7%99-%D7%99%D7%A6%D7%90%D7%AA-%D7%A6%D7%93%D7%99%D7%A7-%D7%91%D7%94%D7%95%D7%93-%D7%94%D7%A9%D7%A8%D7%95%D7%9F-3",
        destination: "/cities/kfar-saba",
        permanent: true,
      },
      {
        source: "/copy-of-%D7%97%D7%A9%D7%9E%D7%9C%D7%90%D7%99-%D7%99%D7%A6%D7%90%D7%AA-%D7%A6%D7%93%D7%99%D7%A7-%D7%91%D7%94%D7%95%D7%93-%D7%94%D7%A9%D7%A8%D7%95%D7%9F-4",
        destination: "/cities/shoham",
        permanent: true,
      },
      {
        source: "/copy-of-%D7%97%D7%A9%D7%9E%D7%9C%D7%90%D7%99-%D7%99%D7%A6%D7%90%D7%AA-%D7%A6%D7%93%D7%99%D7%A7-%D7%91%D7%94%D7%95%D7%93-%D7%94%D7%A9%D7%A8%D7%95%D7%9F-2",
        destination: "/cities/raanana",
        permanent: true,
      },
      {
        source: "/copy-of-%D7%97%D7%A9%D7%9E%D7%9C%D7%90%D7%99-%D7%99%D7%A6%D7%90%D7%AA-%D7%A6%D7%93%D7%99%D7%A7-%D7%91%D7%A8%D7%90%D7%A9-%D7%94%D7%A2%D7%99%D7%9F-%D7%90%D7%9C%D7%A2%D7%93",
        destination: "/cities/ganei-tikva",
        permanent: true,
      },
      {
        source: "/copy-of-%D7%97%D7%A9%D7%9E%D7%9C%D7%90%D7%99-%D7%99%D7%A6%D7%90%D7%AA-%D7%A6%D7%93%D7%99%D7%A7-%D7%91%D7%A4%D7%AA%D7%97-%D7%AA%D7%A7%D7%95%D7%95%D7%94-1",
        destination: "/cities/givat-shmuel",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
