/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    loader: "custom",
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
  eslint: {
    dirs: ["lib", "app"],
  },
  output: "export",
};
