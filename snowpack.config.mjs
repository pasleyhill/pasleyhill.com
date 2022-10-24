 // snowpack.config.mjs
 export default {
    mount: {
      src: '/',
     // public: '/',
    },
   devOptions: {
     tailwindConfig: './tailwind.config.js',
   },
   plugins: [
     '@snowpack/plugin-postcss',
   ],
  };