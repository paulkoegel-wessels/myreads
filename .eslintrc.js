module.exports = {
  parser: 'babel-eslint',
  extends: 'semistandard-react',
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    codeFrame: false, // recommended by babel-eslint
    'no-debugger': 'off',
    'no-useless-return': 'off',
    quotes: ['error', 'single'],
    'semistandard-react/prop-types': 'off',
    'space-before-function-paren': 'error',
    'space-infix-ops': 'off',
    strict: 0 // recommended by babel-eslint
  }
};
