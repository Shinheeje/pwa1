module.exports = {
  staticFileGlobs: [
    'css/**.css',
    '*.html',
    'images/**.*',
    'img/**.*',
    'javascript/*.js'
  ],
  stripPrefix: 'app/',
  runtimeCaching: [{
    urlPattern: /this\\.is\\.a\\.regex/,
    handler: 'networkFirst'
  }]
};