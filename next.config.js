/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    loader: "custom",
    formats: ["image/avif", "image/webp"],
  },
  eslint: {
    dirs: ["lib", "app"],
  },
};
