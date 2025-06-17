import postcssNesting from 'postcss-nesting';

export default {
  plugins: {
    // 👇 сначала nesting
    'postcss-nesting': postcssNesting,
    tailwindcss: {},
    autoprefixer: {},
  },
}