/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    // Umbraco API URL
    UMBRACO_API_URL: process.env.UMBRACO_API_URL || 'http://localhost:59970',
  },
  basePath: '/umbraco-nextjs-demo',
    //output: "export",
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost', // http://localhost:59970
            port: '59970',
            pathname: '/media/**'
          },
        ],
      },
    };

    module.exports = nextConfig