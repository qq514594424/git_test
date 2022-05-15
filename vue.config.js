const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'./',
  transpileDependencies: true,
  pluginOptions:{
    'style-resources-loader':{
        preProcessor:'scss',
        patterns:[]
    }
  },
  lintOnSave:false
})
