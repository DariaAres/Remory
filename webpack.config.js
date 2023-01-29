const path = require('path')//получаем даступ к путю конфигурации
const HTMLPlugin = require('html-webpack-plugin')//подключение html
const { CleanWebpackPlugin} = require('Clean-webpack-plugin')//очищаем плагин
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = { //используем node js => экспортируем js обьект
    entry: './src/remory.js', // входной файл
        output: { //конфигурация обьекта
        filename: 'bundle.[chunkhash].js',
            path: path.resolve(__dirname, 'public')//создание глобального путя
    },
    devServer: {//настройка dev server для автоматической загрузки
        port: 3000
    },
    plugins: [
        new HTMLPlugin({
            template: './src/index.html' // подключаем файл ./src/index.html
        }),


        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            { //как только webpack встречаются файлы с расширением css он должен подключить два тоадера
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
}

