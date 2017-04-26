# Part 2: Node.js Modules

- typically node.js apps are purely JS
    - may be written in c++ but not here
- small apps may be written in a single file
    - larger apps will be written in pieces or modules
- modules are split logically
    - functionality
    - what can be decoupled out
    - what can be useful to multiple apps

## Overview of JavaScript Modules

- when initially conceived, JS didn't seem to need modular support
- over the years two methods of shoe-horning modules into JS arose
    - AMD
        - asynchronus module definition
            - good for web apps
            - modules loaded as needed and are singletons
            - does not work well in high latency or poor network environments
        - good for bandwidth problem, bad for unreliable networks
        - common implementations: Require.js & Dojo
    - CommonJS
        - synchronous file-sys based module
    - ES2015 Modules
        - similar to CommonJS
            - cannot be used dynamically
        - not yet supported ANYWHERE..
            - must use a transpiler like Babel
                - transpiles ES2015 modules to CommonJS
    - System.js Dynamic Loader
        - ES2015 mods are static, people want dynamic
        - System.js would fix this issue
- This course will focus on CommonJS and ES2015 modules
    - modules export a value or an object
    - when the export is a function it allows for a configuration to be passed
- Behind the scenes the module is wrapped in a function with the parameters
    - module, require, \_dirname, and \_filename

### Configurable Modules

- Modules can return a funciton object
    - can be invoked with args to configure the return value of the function
    - returned object is NOT a singleton

### Destructuring Module Imports
- with CommonJS the entire exports object is returned
    - no way to limit which parts are exported
- to filter out the unwanted exports ES2015 destructuring can be used

### Modules are Singletons
- once a module is required it is loaded, executed and result is a singleton
    - all future calls to require the mod will return original singleton result
    - this allows data to be shared between components of an application

### Behind the Scenes
- CommonJS modules are wrapped in a JS function w/5 named params
    - exports - object which will be exported
    - module - module object containing metadata about the mod
    - require - function used to require other mods
    - \_\_dirname - directory name of folder the mod's source code is in
    - \_\_filename - filename of mod's source code
- if `module.exports` is assigned a new object, that new object is returned
    - the other exports variable does not point to new object
        - its not even looked at
    - best practice is to assign to `module.exports` whenever possible

## ES2015 Modules
- destructuring allows the possibility of optimizing the source code of mods
    - unused mods could be dropped from final app's source code
        - tree-shaking

### Babel Config
- transpiles ES2015 to ES5.1
- Babel can be used via command line programs with tools like grunt
`npm i babel-cli babel-preset-es2015`

**Transpiling did not work with modules**

END OF MODULE
