const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const productionConfig = require('./webpack.prod.conf')
const developmentConfig = require('./webpack.dev.conf')

const merge = require('webpack-merge')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const generateCongif = env => {
  const scriptLoader = [{
    loader: "babel-loader",
    options: {
      presets: ['es2015'],
      plugins: ['transform-runtime']
    }
  }]
  const proCssLoader = [{
      loader: "css-loader",
      // 现在需要通过 css-loader 选项显式地配置 第二个参数是否压缩 第三个是名称
      options: {
        modules: false,
        //当前版本移除了minimize熟悉，好坑
        // minimize:false,
        // camelCase: true,
        // localIdentName:'[path][name]_[local]_[hash:base64:5]',
        sourceMap: env === 'development',
      }
    },
    {
      loader: "postcss-loader",
      options: {
        ident: "postcss",
        sourceMap: env === 'development',
        plugins: [
          // cssnext 包含了auto，所以不需要写
          // require('autoprefixer')(),
          // 可以用很多超前的css语法
          require("postcss-cssnext")(),
          // css压缩
          require("cssnano")()
        ]
      }
    }
  ]
  const devLoader = [{
      loader: "style-loader",
      options: {
        //把css打包在一个标签里
        singleton: false,
        //开启调试css模式
        sourceMap: true,
      }
    },
    {
      loader: 'vue-style-loader'
    },

  ].concat(proCssLoader);

  const styleLoader =
    env === "production" ?
    ExtractTextPlugin.extract({
      // 生产环境：分离、提炼样式文件
      use: proCssLoader
    }) : // 开发环境：页内样式嵌入
    devLoader;

  const fileLoder = env === 'development' ? [{
    loader: "url-loader",
    options: {
      // 小于这个数的图片打包成base64位
      publicPath: "./img",
      outputPath: "",
      useRelativePath: true
    }
  }] : [{
      loader: "url-loader",
      options: {
        // 小于这个数的图片打包成base64位
        limit: 1000,
        publicPath: "./static/assets",
        outputPath: "./static/assets",
        useRelativePath: false,
      }
    },
    {
      loader: "img-loader",
      options: {
        // jpg 压缩
        plugins: [
          require('imagemin-mozjpeg')({
            quality: 80
          }),
          require('imagemin-pngquant')(),
        ]
      }
    },
  ]
  return {
    entry: {
      app: env === 'production' ? './src/main.js' : ['webpack-hot-middleware/client?noInfo=false&reload=true', path.resolve(__dirname, '../src/main.js')],
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      // publicPath: '/',
      filename: './static/js/[name]-[hash:4].js',
      chunkFilename: './static/js/[name].chunk.js',
    },
    devServer:{
      colors:true,
    },
    resolve: {
      //帮助webpack找到路径
      alias: {
        'vue$': 'vue/dist/vue.js',
        'vuex$': 'vuex/dist/vuex.esm.js',
        'highlight.js$': 'highlight.js/lib/highlight.js',
      },
      //导入的时候不用写拓展名
      extensions: [' ', '.js', '.json', '.vue', '.scss', '.css']
    },
    module: {
      rules: [{
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            postcss: [require('postcss-cssnext')()]
          }
        },
        {
          test: /\.js$/,
          use: scriptLoader,
          exclude: /(node_modules)/
        },
        {
          test: /\.css$/,
          use: styleLoader,
        },
        {
          test: /\.html$/,
          use: [{
            loader: "html-loader",
            options: {
              attrs: ['img:src']
            }
          }],
          exclude: /(node_modules)/
        },
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          use: fileLoder
        }
      ]
    },
    plugins: [
      new htmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, '../html.html'),
        inject: 'body',
        minify: {
          collapseWhitespace: env === 'production'
        }
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
      }),
      // new MiniCssExtractPlugin({
      //   filename: "[name].css",
      // }),
      new VueLoaderPlugin(),
    ],
    // optimization: {
    //   /*
    //   上面提到 chunkFilename 指定了 chunk 打包输出的名字，那么文件名存在哪里了呢？
    //   它就存在引用它的文件中。这意味着一个 chunk 文件名发生改变，会导致引用这个 chunk 文件也发生改变。

    //   runtimeChunk 设置为 true, webpack 就会把 chunk 文件名全部存到一个单独的 chunk 中，
    //   这样更新一个文件只会影响到它所在的 chunk 和 runtimeChunk，避免了引用这个 chunk 的文件也发生改变。
    //   */
    //   runtimeChunk: true,

    //   splitChunks: {
    //     /*
    //     默认 entry 的 chunk 不会被拆分
    //     因为我们使用了 html-webpack-plugin 来动态插入 <script> 标签，entry 被拆成多个 chunk 也能自动被插入到 html 中，
    //     所以我们可以配置成 all, 把 entry chunk 也拆分了
    //     */
    //     chunks: 'all'
    //   }
    // }
  }
}
module.exports = env => {
  console.log(env,"webpack中变量")
  let config = env === 'production' ?
    productionConfig :
    developmentConfig
  return merge(generateCongif(env), config)
}