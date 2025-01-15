/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "img.freepik.com",
        },
        {
          protocol: "https",
          hostname: "media.istockphoto.com",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "source.unsplash.com",
        },
        {
            protocol: "https",
            hostname: "picsum.photos",
          },
        {
          protocol: "http",
          hostname: "localhost",
          port: "1337", // Tambahkan port jika diperlukan
          pathname: "/uploads/**", // Pastikan pathname sesuai dengan struktur URL
        },
        {
          protocol: "http",
          hostname: "156.67.218.76",
          port: "1337", // Tambahkan port jika diperlukan
          pathname: "/uploads/**", // Pastikan pathname sesuai dengan struktur URL
        },
      ],
    },
  };
  
  export default nextConfig;
  