require('babel-register')({
  presets: [
    [
      'env',
      {
        modules: 'commonjs',
      },
    ],
    'preact',
  ],
})
