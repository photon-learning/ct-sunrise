module.exports = {
  root: true,

  env: {
    node: true,
    jquery: true,
  },

  extends: [
    'plugin:vue/vue3-essential',
    // '@vue/airbnb',
    "eslint:recommended"
  ],

  rules: {
    'no-nested-ternary': 0,
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-underscore-dangle': ['error', { allow: ['__typename'] }],
    'max-len': [
      'error', { code: 120 },
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state',
          'acc',
          'e',
          'ctx',
          'req',
          'request',
          'res',
          'response',
          '$scope',
        ],
      },
    ],
    'graphql/template-strings': [
      'error',
      {
        env: 'literal',
        // validators: 'all',
        // eslint-disable-next-line global-require
        schemaJson: require('./graphql.schema.json'),
      },
    ],
    'graphql/no-deprecated-fields': [
      'error',
      {
        env: 'apollo',
        // eslint-disable-next-line global-require
        schemaJson: require('./graphql.schema.json'),
      },
    ],
    'vue/no-use-v-if-with-v-for': 0,
    'vue/component-tags-order': 0,
    'vue/no-parsing-error': ['error', {
      'abrupt-closing-of-empty-comment': true,
      'absence-of-digits-in-numeric-character-reference': true,
      'cdata-in-html-content': true,
      'character-reference-outside-unicode-range': true,
      'control-character-in-input-stream': true,
      'control-character-reference': true,
      'eof-before-tag-name': true,
      'eof-in-cdata': true,
      'eof-in-comment': true,
      'eof-in-tag': true,
      'incorrectly-closed-comment': true,
      'incorrectly-opened-comment': true,
      'invalid-first-character-of-tag-name': true,
      'missing-attribute-value': true,
      'missing-end-tag-name': true,
      'missing-semicolon-after-character-reference': true,
      'missing-whitespace-between-attributes': true,
      'nested-comment': false,
      'noncharacter-character-reference': true,
      'noncharacter-in-input-stream': true,
      'null-character-reference': true,
      'surrogate-character-reference': true,
      'surrogate-in-input-stream': true,
      'unexpected-character-in-attribute-name': true,
      'unexpected-character-in-unquoted-attribute-value': true,
      'unexpected-equals-sign-before-attribute-name': true,
      'unexpected-null-character': true,
      'unexpected-question-mark-instead-of-tag-name': true,
      'unexpected-solidus-in-tag': true,
      'unknown-named-character-reference': true,
      'end-tag-with-attributes': true,
      'duplicate-attribute': true,
      'end-tag-with-trailing-solidus': true,
      'non-void-html-element-start-tag-with-trailing-solidus': false,
      'x-invalid-end-tag': true,
      'x-invalid-namespace': true,
    }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: [
    'graphql',
  ],
};
