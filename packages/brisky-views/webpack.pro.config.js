{
  mode: 'development',
  context: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views',
  output: {
    path: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\public',
    filename: '[name]',
    publicPath: '/',
    chunkFilename: '[name]',
    library: undefined,
    libraryExport: undefined,
    libraryTarget: 'umd'
  },
  resolve: {
    alias: {
      '@': 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\src',
      vue$: 'vue/dist/vue.runtime.esm-bundler.js'
    },
    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules',
      'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\@vue\\cli-service\\node_modules'
    ]
  },
  resolveLoader: {
    modules: [
      'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\@vue\\cli-plugin-typescript\\node_modules',
      'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\@vue\\cli-plugin-babel\\node_modules',
      'node_modules',
      'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules',
      'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\@vue\\cli-service\\node_modules'
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('esm') */
      {
        test: /\.m?jsx?$/,
        resolve: {
          fullySpecified: false
        }
      },
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          /* config.module.rule('vue').use('cache-loader') */
          {
            loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '4c79db54'
            }
          },
          /* config.module.rule('vue').use('vue-loader') */
          {
            loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\vue-loader\\dist\\index.js',
            options: {
              cacheDirectory: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '4c79db54',
              babelParserPlugins: [
                'jsx',
                'classProperties',
                'decorators-legacy'
              ]
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          /* config.module.rule('images').use('url-loader') */
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              esModule: true,
              fallback: {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'views/__assets__/img/[name].[hash:8].[ext]',
                  esModule: true
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          /* config.module.rule('svg').use('file-loader') */
          {
            loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\file-loader\\dist\\cjs.js',
            options: {
              name: 'views/__assets__/img/[name].[hash:8].[ext]',
              esModule: true
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          /* config.module.rule('media').use('url-loader') */
          {
            loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              esModule: true,
              fallback: {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'views/__assets__/media/[name].[hash:8].[ext]',
                  esModule: true
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          /* config.module.rule('fonts').use('url-loader') */
          {
            loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              esModule: true,
              fallback: {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'views/__assets__/fonts/[name].[hash:8].[ext]',
                  esModule: true
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('css').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('css').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue').use('css-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('vue').use('postcss-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('css').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal') */
          {
            use: [
              /* config.module.rule('css').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal').use('css-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('normal').use('postcss-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('scss').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('sass-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('scss').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('css-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('postcss-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('sass-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('scss').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('sass-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('scss').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('css-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('postcss-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('sass-loader') */
              {
                loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          /* config.module.rule('js').use('babel-loader') */
          {
            loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\babel-loader\\lib\\index.js',
            options: {
              cacheCompression: false,
              cacheDirectory: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\.cache\\babel-loader',
              cacheIdentifier: '7dda6ccc'
            }
          }
        ]
      },
      /* config.module.rule('ts') */
      {
        test: /\.ts$/,
        use: [
          /* config.module.rule('ts').use('cache-loader') */
          {
            loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\.cache\\ts-loader',
              cacheIdentifier: '263658fb'
            }
          },
          /* config.module.rule('ts').use('babel-loader') */
          {
            loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\babel-loader\\lib\\index.js'
          },
          /* config.module.rule('ts').use('ts-loader') */
          {
            loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\ts-loader\\index.js',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [
                '\\.vue$'
              ],
              happyPackMode: false
            }
          }
        ]
      },
      /* config.module.rule('tsx') */
      {
        test: /\.tsx$/,
        use: [
          /* config.module.rule('tsx').use('cache-loader') */
          {
            loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\.cache\\ts-loader',
              cacheIdentifier: '263658fb'
            }
          },
          /* config.module.rule('tsx').use('babel-loader') */
          {
            loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\babel-loader\\lib\\index.js'
          },
          /* config.module.rule('tsx').use('ts-loader') */
          {
            loader: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\ts-loader\\index.js',
            options: {
              transpileOnly: true,
              happyPackMode: false,
              appendTsxSuffixTo: [
                '\\.vue$'
              ]
            }
          }
        ]
      }
    ]
  },
  optimization: {
    realContentHash: false,
    splitChunks: {
      minSize: 10485760,
      minChunks: 1024,
      cacheGroups: {
        vendors: false,
        'default': false
      }
    },
    minimizer: [
      /* config.optimization.minimizer('terser') */
      new TerserPlugin(
        {
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          },
          parallel: true,
          extractComments: false
        }
      )
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('feature-flags') */
    new DefinePlugin(
      {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false'
      }
    ),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          BASE_URL: '"/"'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('eslint') */
    new ESLintWebpackPlugin(
      {
        extensions: [
          '.js',
          '.jsx',
          '.vue',
          '.ts',
          '.tsx'
        ],
        cwd: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views',
        cache: true,
        cacheLocation: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\.cache\\eslint\\706737a4.json',
        context: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views',
        threads: false,
        emitWarning: false,
        emitError: false,
        eslintPath: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\eslint',
        formatter: 'codeframe'
      }
    ),
    /* config.plugin('fork-ts-checker') */
    new ForkTsCheckerWebpackPlugin(
      {
        typescript: {
          extensions: {
            vue: {
              enabled: true,
              compiler: 'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\node_modules\\@vue\\compiler-sfc\\dist\\compiler-sfc.cjs.js'
            }
          },
          diagnosticOptions: {
            semantic: true,
            syntactic: false
          }
        }
      }
    )
  ],
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
    buildDependencies: {
      config: [
        'E:\\HANS\\SourceCode\\brisky\\packages\\brisky-views\\vue.config.js'
      ]
    }
  }
}
