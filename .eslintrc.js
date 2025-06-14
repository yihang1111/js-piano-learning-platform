module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'prettier', // 直接使用 prettier 而不是 @vue/prettier
  ],
  plugins: ['prettier'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2021,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'prettier/prettier': 'warn',
    'vue/multi-word-component-names': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/attribute-hyphenation': ['warn', 'always'],
    'vue/v-bind-style': ['warn', 'shorthand'],
  },
};
