 // snowpack.config.mjs
 export default {
    mount: {
      src: '/',
    },
   devOptions: {
     tailwindConfig: './tailwind.config.js',
   },
   plugins: [
     '@snowpack/plugin-postcss',
   ],
  };