const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
});

module.exports = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['i.scdn.co']
  },
  ...withMDX({
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
    webpack: (config, { isServer }) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        // fixes next-mdx-remote: Package path ./jsx-runtime.js is not exported from package react
        // https://github.com/hashicorp/next-mdx-remote/issues/237
        'react/jsx-runtime.js': require.resolve('react/jsx-runtime')
      };

      // Fixes npm packages (mdx) that depend on `fs` module
      if (!isServer) {
        config.resolve.fallback.fs = false;
      }

      return config;
    }
  })
};
