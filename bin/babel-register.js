require('babel-register')({
  presets: [
    [
      'env',
      {
        modules: 'commonjs',
      },
    ],
    'react',
    'stage-1',
  ],
})
