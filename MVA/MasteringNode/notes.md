# Mastering Node.js

## Part 1: Introduction

Node REPL Environment
- Read, Evaluate, Print, Loop

NPM
- Node.js Package Manager
- tool for intstalling and creating packages
- global packages have executables
    - one version for all programs on system
- local packages are installed per project

Building a simple server
- HTTP module is part of node.js core
    - provides web server and client funcitonality
    - very flexible
        - too flexible, necessitates much boilerplate
    - to help manage the flex, other packages are used
        - Express, Hapi
- node.js is great for a web server due to its easy handling of JSON

### Creating the server
- tutorial uses the Express framework
    - apparently this is old and Koa is the new standard
- initialize app as a new express app and register route to our app
```javascript
const app = express();

app.use(express.static("www"));
```
- time must be spent learning more about Express/Koa

### File I/O
- node.js gives access to the file system both sync and async
    - sync must only be used during initial program load
    - after which async should be used 

### Debugging Node.js
- Node.js has built in command line debugger but its no good
    - instead try all of these options, two of which are MS supplied
        - the others cost money, or something
    - node inspector
        - chrome web-inspector-like tool

### Creating a Package
- All projects need to be configured to work with NPM
    - using `npm init`
- the `package.json` file contains
    - metadata about the project
    - a list of app and dev dependencies
- allows you to not put source node_modules into source control
    - no one needs to fork around Express
        - instead a reference is provided
    - some packages contain binary components
        - distributed as c++
- to save application dependencies such as Express
    - we say `npm install --save` or just `-S`
- to save develpment dependencies such as Gulp
    - we say `npm install --save-dev` or just `-D`
        - versions are indicated using the SEMVER scheme(?)
#### Procedure
`npm init`
- answer all questions
`npm i -S express`
- save express as an app dependency
`npm i -D gulp`
- save gulp as a dev dependency
- when installing on new system/machine just type
`npm install` or `npm i`
    - and all dependencies will be downloaded and installed

### Running Packages with Scripts
- add a `"start"` property to the `package.json` scripts property
    - give it the value of the launch command `node index`
    - now app can be launched by simply typing `npm start`

END OF MODULE

