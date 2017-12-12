module.exports = {
  root: true,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['react', 'prettier'],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  rules: {
    'prettier/prettier': 'warn',

    'react/jsx-uses-react': 'error',

    'react/jsx-uses-vars': 'error',
  },
};
