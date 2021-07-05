const { createProxyMiddleware } = require('http-proxy-middleware');
const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL || process.env.GATEWAY_URL
const IDENTITY_URL = process.env.REACT_APP_IDENTITY_URL || process.env.IDENTITY_URL
const MEDIA_URL = process.env.REACT_APP_MEDIA_URL || process.env.MEDIA_URL
const CORE_SERVICE_URL = process.env.REACT_APP_CORE_SERVICE_URL || process.env.CORE_SERVICE_URL
const QUIZ_SERVICE_URL = process.env.REACT_APP_QUIZ_SERVICE_URL || process.env.QUIZ_SERVICE_URL

module.exports = function(app) {
  app.use('/media/', createProxyMiddleware({
    target: MEDIA_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/media': '/'
    }
}))
app.use('/gateway/', createProxyMiddleware({
  target: GATEWAY_URL,
  changeOrigin: true,
  pathRewrite: {
      '^/gateway': '/'
  }
}))
  app.use('/identity/', createProxyMiddleware({
    target: IDENTITY_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/identity': '/'
    }
}))
app.use('/core-service/', createProxyMiddleware({
  target: CORE_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
      '^/core-service': '/'
  }
}))
app.use('/quiz-service/', createProxyMiddleware({
  target: QUIZ_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
      '^/quiz-service': '/'
  }
}))
};

