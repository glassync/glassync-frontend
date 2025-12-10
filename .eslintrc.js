module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
      // Разрешаем любые переводы строк (важно для Linux + Windows)
      'linebreak-style': 'off',
      'prettier/prettier': [
          'error',
          {
              endOfLine: 'auto'
          }
      ]
  },
};
