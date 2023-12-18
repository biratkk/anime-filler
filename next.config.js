/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  headers: async () => [
    {
      source: "/api/*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
        {
          key: "Access-Control-Allow-Methods",
          value: "GET,DELETE,PATCH,POST,PUT",
        },
      ],
    },
  ],
};

module.exports = nextConfig;
