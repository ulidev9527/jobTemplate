const
    path = require('path'),
    webpack = require('webpack');

/**
 * webpack >= 3.0 配置
 * env true||false 是否是正式版本，如果是正式版本将生成一个bulid文件夹，并且代码都是经过压缩的
 * files Array 文件名称,传入文件的绝对路径
 */
module.exports = (env, files) => {
    env = env || false;
    return {
        entry: (() => {
            const
                listObj = {};
            //路径和生成数据提取
            files.forEach((file, i) => {
                listObj[path.parse(file).name] = file;
            });
            return listObj;
        })(),
        output: {
            filename: '[name].js',
            path: __dirname + '\\static\\js',
            pathinfo: !env,
            sourceMapFilename: "maps\\[name].js.map"
        },
        devtool: !env && 'source-map',
        plugins: (() => {
            let list = [];

            // 压缩js
            env && list.push(new webpack.optimize.UglifyJsPlugin({
                compress: true
            }));

            return list;
        })(),
        module: {
            rules: [{
                test: /\.js$|\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ["transform-react-jsx"]
                    }
                }
            }, {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }, {
                test: /\.ts$|\.tsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'ts-loader'
                }
            }]
        },
        //配置外部包，此处配置了外部包后就不会在代码中进行合并
        externals: {
            //<script src="//cdn.bootcss.com/react/15.6.1/react.min.js"></script>
            'react': 'React',
            //<script src="//cdn.bootcss.com/react/15.6.1/react-dom.min.js"></script>
            'react-dom': 'ReactDOM'
        },
        resolve: {
            //模块自动解析后缀
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }
    }
}