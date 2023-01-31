- [Webpack](#webpack)
    - [Why webpack](#why-webpack)
- [Installing webpack](#installing-webpack)
- [Setup project](#setup-project)
- [Installing scripts](#installing-scripts)
- [Creating bundle](#creating-bundle)
- [Configuring webpack](#configuring-webpack)
    - [Config File](#config-file)
- [Webpack Plugins](#webpack-plugins)
    - [HTMLWebpackPlugin](#HTMLWebpackPlugin)
- [Caching](#caching)
    - [Ouptut filenames](#output-filenames)
- [Development server](#development-server)
- [Hash files cleanup](#Hash-files-cleanup)
- [Source Maps](#source-maps)
- [loaders](#loaders)
    - [styleloader, cssloader and sassloader](#styleloader-cssloader-and-sassloader)
        - [loader functions](#loader-functions)
    - [babel loader](#babel-loader)
- [MiniCssExtractPlugin](#MiniCssExtractPlugin)
- [Asset resource loader](#assest-resource-loader)

# Webpack

It is a javascript module bundler. Module refers to small unit independent resuable code. Its main purpose is to bundle JavaScript files for usage in browsers, yet it is also capable of transforming, bundling different assets such as images, fonts and stylesheets using loaders.

## Why webpack

So why do we use webpack and why do we need to bundle our JavaScript, when we can just use the script tag.

We most certainly can, but on an application with alot of code, lets say 10k lines of code which will work just fine with the script tag, but managing all that code in one file is not a good idea. Add to that, multiple people working on the same file simultaneously is a recipe for disaster.

One thing to fix this problem that we can do is spliting the code in different parts, and break our huge file in smaller files/modules. Then insert the multiple script tags for the smaller files. In a carefully chosen order to maintain the hierarchy. And adding alot of script tags will effect the applications performance as each script tag will make a HTTP request.

This is where webpack helps us.

Webpack build a dependency graph of all the files and their dependencies, and bundle all the files.

# Installing webpack

Webpack is recommended to install locally, rather than globally. This means you would install it seperately on each project rather than having a single global installation that's used on every project. 

1. Initialize your project directory with npm's default settings, which creates a package.json file.

```
npm init -y
```

2. Install webpack and the webpack CLI, after which you will notice the two packages (**webpack** and **webpack-cli**) now listed as dependencies in the package.json file

```
npm install webpack webpack-cli --save-dev
```
# Setup project

In the same location as package.json file. Add the following:

1. A folder called src
2. An index.html file inside src
3. An index.js file inside src
4. A dist folder

The webpack docs explains what the **src** (source) and **dist** (distribution) folder are for (though this is not specific to webpack but more about bundling and build processes in general):

***"The “source” code is the code that we’ll write and edit. The “distribution” code is the minimized and optimized output of our build process that the browser will display."***

Traditionally, when we want to add one or more libraries as dependencies in a project, we would list them as the bottom of your **index.html** page using seperate **script** tags one after another. That's where a tool like webpack helps because you'll not only avoid having to manually add scripts to your pages but you'll be able to add them, bundle them for optimization, and sometimes even load them on demand.

# Installing Scripts

Now, lets install a dependency for the project, then use webpack to bundle them. To be clear: webpack doesn't require these; I have installed the lodash js library to demonstrate webpack's bundling features.

To install lodash js library.

```
npm install lodash --save
```

In this case, I'm using **--save** flag instead of **--save-dev** because I want these as part of the production build. When the webpack was installed, **--save-dev** flag was used as a developer dependency, so webpack won't be part of the production build.

Now the package.json has the following appended below the **devDpendencies** section:

```json
  "dependencies": {
    "lodash": "^4.17.21"
  }
```

To demonstrate that these utilities are successfully bundled, I'm going to add the following to my **index.js** file in the **src** folder.

```js
import { camelCase } from 'lodash';
console.log(camelCase('Hello world')); // Outputs: helloWorld
```

Behind the scenes, webpack will recognize the **import** statements and will look for the dependencies in the **node_modules** folder.

# Creating bundle

Webpack uses a specific JavaScript file, named in **package.json**, is something called an ***entry point***. The entry point indicates to webpack which module to use to build out the project's ***dependency graph***. A dependency graph is a map of every module the application needs.

We can configure a custom entry point, but for now we will use the default entry point **./src/index.js**. 
Now that we have installed a dependencies, we can build our bundle with webpack. We can do this by running the following command on the projects's directory terminal.

```
npx webpack
```
*npx is Node Package eXecute. It is simply an NPM package runner.*

Running this command tells webpack to bundle the JavaScript dependencies using the specified entry point and the **dist** folder will produce the output. In this case, **main.js** is the only generated file. Even though there is an **index.html** file in the **src** folder, webpack hasn't done anything with that, so webpack has only produced **main.js** so far.


# Configuring Webpack

Until now we have been using webpack as **"zero config"** tool, meaning that we have been running this project without the **webpack.config.js** file. Now it is time to learn how to create a production ready webpack config file.

## Config File

Let's create a **webpack.config.js** file. 

Let config the entry point and output:

```js
const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    }
}
```

The entry property tells webpack where our source code is located. It is the entry point for out app.

The output property tells webpack what to call the output file and where to place it in.

Now let's create an npm script in **package.json** file to run the webpack

```json
  "scripts": {
    "build": "webpack"
  }
```

Now we can run the build process with the **npm run build** command. Let's run the command to verify the configuration has been setup properly. We can even delete the dist folder so see if the dist folder and output is being generated.

```
npm run build
```

# Webpack plugins

Webpack has a rich ecosystem of modules called "plugins", which are libraries that can modify and enhance the webpack build process.

## HTMLWebpackPlugin

At the moment we have to update the file name we reference in out script tag in our index.html file, each time we update the oputput file neme in our webpack.config.js file. To manage this we will use the HTMLWebpackPlugin to help us with our problem.

let's install the plugin using this command:

```
npm install --save-dev html-webpack-plugin
```

Now let's **require** this plugin in our **webpack.config.js** file and then include it in the **plugins array** in our config setup.

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
        })
    ],
}
```

Now we can delete the dist folder and run the **npm run build** command to generate the js bundle and the html file with the filename we specified.

And finally, for the **template** we supply the location of our **index.html** file in the **src** directory.

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: 'src/template.html',
        })
    ],
}
```

Run the npm run build command.

# Caching

So we're using webpack to bundle our modular application which yields a deployable /dist directory. Once the contents of /dist have been deployed to a server, clients (typically browsers) will hit that server to grab the site and its assets. The last step can be time consuming, which is why browsers use a technique called caching. This allows sites to load faster with less unnecessary network traffic. However, it can also cause headaches when you need new code to be picked up.

Lets focus on the configuration needed to ensure files produced by webpack compilation can remain cached unless their content has changed.

## Ouptut filenames

We can use the output.filename substitutions setting to define the names of our output files. Webpack provides a method of templating the filenames using bracketed strings called substitutions. The [contenthash] substitution will add a unique hash based on the content of an asset. When the asset's content changes, [contenthash] will change as well.

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle[contenthash].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: 'src/index.html',
        })
    ],
}
```

Let's run the webpack **npm run build** after which we can see a bunch of numbers after bundle filename.

# Development server

As we've made these changes, we still need to run the npm run build command each time to see new changes in our app. To automate this process let's create a development server.

To automate our process we will use the **webpack-dev-server**.

Next we will add a new script on the **package.json** file.

```
  "scripts": {
    "build": "webpack",
    "dev": "webpack serve" //add this
  },
```

Then run the command **npm run dev** which will prompt us to install the **webpack-dev-server** package or instead we can use the command ***npm install webpack-dev-server --save-dev*** to install the webpack dev server.

Next we will add a few configs to the server in the webpack.config.js file like port number, hot reload, and Gzip compression.

# Hash files cleanup

At the moment every time we change something and run the npm run build command webpack will create a new bundle hash file, to prevent that form happening we can go to webpack.config.js file and under the output filename we can add a new property called **clean: true**

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle[contenthash].js',
        clean: true,
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: 'src/index.html',
        })
    ],
}
```

# Source Map

Source map are a neccessity for debugging, lets see how we can configure webpack to generate source maps. 

In the webpack.congif.js file we can simply add ***devtool: 'source-map'*** and run the npm build after which we can see in the dist folder a map for the js.

# Loaders

We have used a webpack plugin, new lets have a look at loaders. Loaders help webpack to understand and load different file types. Out of the box, webpack understands how to handle our js files, but it doesn't know what to do with css or images.

To style our app lets add some css on the main.scss file and import the css directly into our index.js file. However, at the moment this will not work as there is no loader to handle the css. To fix this lets configure the styleloader and cssloader.

## styleloader, cssloader and sassloader

There are three loader in particular that will be helpful for us here: style-loader, css-loader and sass-loader. Let's get those included in our project.

Let's install these loaders and also dart sass 

```
 npm install --save-dev sass style-loader css-loader sass-loader
```

Then we can add them to our webpack.config.js file in the modules rule section.

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle[contenthash].js',
        clean: true,
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: 'src/index.html',
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            }
        ],
    },
}
```

This section sets up rules for webpack so it knows what to do with each file it encounters. The test property is a regular expression that webpack checks against the file name. In this case, we want to handle files with a .scss extension.

Then, the use property tells webpack what loader or loaders to use to handle files matching the criteria. Note that the order here matters!

***Webpack loaders are read from right to left***. So first the css-loader will be applied, and then the style-loader will be applied.


### loader functions

Now, let's what these loader actually to for us.

**css-loader** interprets and resolves imported CSS files that you reference in the javascrip. So in this case, css-loader helps make this line work:

```js

import './styles/main.scss'

```

Next, **style-loader** injects the css into the DOM. By default, style-loader takes the CSS it encounters and adds it to the DOM inside a **style** tag.

**sass-loader** complies the sass into css.


## babel loader

If we want our code to be back ward compatible with old browser we could use babel, which is a complier that can turn ES6+ code to ES5 code. And webpack has a loader for that the **bable-loader** [Bable installation](https://babeljs.io/setup#installation)

```
npm install --save-dev babel-loader @babel/core @babel/preset-env
```

Next, we'll add a new rule to our module rules array in our webpack.config.js file

```
module: {
    rules: [
      {*Css rules here, I am removing the common part to keep it small*},
      {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-env']
              },
          },
      },
    ]
 }

```
This will tell webpack that when it encounters .js files to use Babel to transform the code. We use the exclude property to make sure Babel doesn't transform JavaScript file in the node_modules directory.

# MiniCssExtractPlugin

Rather than injecting CSS into our HTML as style tags, we can use the [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/) to generate seperate CSS files for us.  

Let's install the MiniCssExtractPlugin

```

npm install --save-dev mini-css-extract-plugin

```

Let's add the MiniCssExtractPlugin in the webpack.config.js file

```

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

```

This one is a little different because it actually is both a plugin and a loader, so it goes in the module rules and in the plugins sections.

Also note that we use the square brackets in our file name to dynamically set the name to the original source file's name and also include the contenthash, which is a hash (an alphanumeric string) that represents the file's contents.


```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        clean: true,
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    },
                },
            },
        ],
    },
}
```

# Asset resource loader

Webpack comes with the assets modeules which allows to use asset files (fonts, icons, etc) without configuring additional loaders.

To use the asset resource loader under the module section we have to add the following rules

```

    module: {
        rules: [
            {
                <!-- css loader -->
            },
            {
                <!-- babel loader -->
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ],
    },

```

And if we want the resource name to be the same under the output section we can configure the **assetModuleFilename**

```

 assetModuleFilename: '[name][ext]'

```