const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  },
  configureWebpack: () => {
    return {
      resolve: {
        fallback: {
          path: require.resolve("path-browserify")
        }
      }
    }
  }
})
