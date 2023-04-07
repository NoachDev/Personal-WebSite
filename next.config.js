module.exports = {
  reactStrictMode: true,
  
  swcMinify: true,

  compiler: {
    styledComponents: true,
  },

  async headers() {

    return [
      {
        source: "/fonts/PoiretOne.ttf",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};