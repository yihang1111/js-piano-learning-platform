const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  // 添加这些配置解决路径问题
  configureWebpack: {
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src'),
      },
    },
  },
});

const path = require('path');
// function resolve(dir) {
//   return path.join(__dirname, dir);
// }
module.exports = {
  pluginOptions: {
    // 第三方插件配置
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/styles/commons.less')], // less所在文件路径
    },
  },
};
