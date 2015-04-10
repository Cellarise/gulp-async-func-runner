# gulp-async-func-runner
[![view on npm](http://img.shields.io/npm/v/gulp-async-func-runner.svg?style=flat)](https://www.npmjs.org/package/gulp-async-func-runner)
[![npm module downloads per month](http://img.shields.io/npm/dm/gulp-async-func-runner.svg?style=flat)](https://www.npmjs.org/package/gulp-async-func-runner)
[![Dependency status](https://david-dm.org/Cellarise/gulp-async-func-runner.svg?style=flat)](https://david-dm.org/Cellarise/gulp-async-func-runner)
[![Coverage](https://img.shields.io/badge/coverage-84%25_skipped:0%25-green.svg?style=flat)](https://www.npmjs.org/package/gulp-async-func-runner)

> A gulp task for running asynchronous functions.


##Usage 

This gulp task expects an options object, an asynchronous function and a callback function. The task runs the asynchronous function passing it the options, a chunk of data, and the callback function.

### As a gulp task

Use the task to execute an asynchronous function within a gulp pipe.

```js
var asyncPipe = require('gulp-async-func-runner');
gulp.src('test/*')
    .pipe(asyncPipe(
        opts,
        asyncFunc,
        callback)
    );
```


# API
<a name="module_gulp-async-func-runner"></a>
#gulp-async-func-runner
A gulp task for running asynchronous functions.
**Params**

- opts `Object` - optional options. Options to be passed to the task function should be provided in this object.  
  - \[oneTimeRun=false\] `Object` - flag to run the task only once no matter how many data chunks are passedthrough the stream  
  - \[passThrough=false\] `Object` - flag to pass data chunks through without modification.Default behaviour is to stream the data transformed by the asynchronous function.Set to passThrough to true if you only want to use the results of the asynchronous function as part of the`done` callback function.  
- task `function` - the asynchronous task to call and wait for callback to be executed.The task must be a function with the following signature: task(options, chunk, enc, callback)   - options {Object} - an options object. This will be passed the opts parameter from this module.   - chunk {Object} - the current chunk of data passing through stream.   - callback  - the callback function to be executed once task complete.   The callback function has the following signature: callback(error, data).   This will be passed the done parameter from this module which must have a matching signature.  
- done `function` - the callback function called once the asynchronous task has completed.The function must have the following signature: done(error, data).  

**Type**: `name`  
**Returns**: `through2` - readable-stream/transform  
**Example**  
Usage:
```
var asyncPipe = require('gulp-async-func-runner');
```

Given a simple asynchronous function:
```js
var asyncFunc = function (opts, cb) {
    assert.equal(opts.testOpt, "test option");
    cb(false, "test data");
};
```

When executing the function as part of a gulp pipe:
```js
var opts = {
    oneTimeRun: true,
    passThrough: true,
    testOpt: "test option"
};
gulp.src('test/*')
    .pipe(asyncPipe(
        opts,
        function(opts, chunk, cb) {
            asyncFunc(opts, cb); //wrap in function to match the function signature
        },
        function (error, data) {
            //results of the asynchronous function available on data parameter
            ...
        })
    );
```

Then the pipe will wait for function to complete before continuing:
```js
gulp.src('test/*')
    .pipe(asyncPipe(
        ...
    )
    .on('finish', function(){
        //pipe will not finish before the results of the asynchronous function are available
        ...
    });
```
*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*.


#Changelog

<table style="width:100%;border-spacing:0px;border-collapse:collapse;margin:0px;padding:0px;border-width:0px;">
  <tr>
    <th style="width:20px;text-align:center;"></th>
    <th style="width:80px;text-align:center;">Type</th>
    <th style="width:80px;text-align:left;">ID</th>
    <th style="text-align:left;">Summary</th>
  </tr>
    
<tr>
        <td colspan=4><strong>Version: 0.1.4 - released 2015-04-11</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype'/></td>
            <td style="width:80px;text-align:center;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGASYNC-13</td>
            <td>Package: Update package dependencies</td>
          </tr>
        
<tr>
            <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype'/></td>
            <td style="width:80px;text-align:center;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGASYNC-12</td>
            <td>Package: Update eslint configuration, test.js runner and dev dependencies</td>
          </tr>
        
<tr>
            <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype'/></td>
            <td style="width:80px;text-align:center;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGASYNC-11</td>
            <td>Package: Update eslint configuration, test.js runner and dev dependencies</td>
          </tr>
        
<tr>
            <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype'/></td>
            <td style="width:80px;text-align:center;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGASYNC-10</td>
            <td>Package: Migrate from jshint to eslint static code analysis</td>
          </tr>
        
<tr>
            <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype'/></td>
            <td style="width:80px;text-align:center;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGASYNC-9</td>
            <td>Package: Remove all gulp tasks except &#39;test&#39; and update readme docs</td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.3 - released 2014-10-07</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype'/></td>
            <td style="width:80px;text-align:center;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGASYNC-7</td>
            <td>Package: Update package dependencies</td>
          </tr>
        
<tr>
            <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype'/></td>
            <td style="width:80px;text-align:center;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGASYNC-6</td>
            <td>Doc: update changelog template</td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.2 - released 2014-09-05</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype'/></td>
            <td style="width:80px;text-align:center;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGASYNC-4</td>
            <td>Package: Rename package and Github repository to change word function to func.</td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.1 - released 2014-09-05</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10403&amp;avatarType=issuetype'/></td>
            <td style="width:80px;text-align:center;">Bug</td>
            <td style="width:80px;text-align:left;">MDGASYNC-3</td>
            <td>Task: Fix stream.push() after EOF called</td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.0 - released 2014-09-05</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype'/></td>
            <td style="width:80px;text-align:center;">Feature</td>
            <td style="width:80px;text-align:left;">MDGASYNC-2</td>
            <td>Package: Develop asynchronous function runner.</td>
          </tr>
        
    
</table>



# License

MIT License (MIT). All rights not explicitly granted in the license are reserved.

Copyright (c) 2015 John Barry
## Dependencies
[ansi-regex@1.1.1](&quot;https://github.com/sindresorhus/ansi-regex&quot;) - &quot;MIT&quot;, [ansi-styles@2.0.1](&quot;https://github.com/sindresorhus/ansi-styles&quot;) - &quot;MIT&quot;, [array-differ@1.0.0](&quot;https://github.com/sindresorhus/array-differ&quot;) - &quot;MIT&quot;, [array-uniq@1.0.2](&quot;https://github.com/sindresorhus/array-uniq&quot;) - &quot;MIT&quot;, [beeper@1.0.0](&quot;https://github.com/sindresorhus/beeper&quot;) - &quot;MIT&quot;, [camelcase-keys@1.0.0](&quot;https://github.com/sindresorhus/camelcase-keys&quot;) - &quot;MIT&quot;, [camelcase@1.0.2](&quot;https://github.com/sindresorhus/camelcase&quot;) - &quot;MIT&quot;, [chalk@1.0.0](&quot;https://github.com/sindresorhus/chalk&quot;) - &quot;MIT&quot;, [clone-stats@0.0.1](&quot;https://github.com/hughsk/clone-stats&quot;) - &quot;MIT&quot;, [clone@0.2.0](&quot;https://github.com/pvorb/node-clone&quot;) - &quot;MIT&quot;, [core-util-is@1.0.1](&quot;https://github.com/isaacs/core-util-is&quot;) - &quot;MIT&quot;, [dateformat@1.0.11](&quot;https://github.com/felixge/node-dateformat&quot;) - &quot;MIT&quot;, [duplexer2@0.0.2](&quot;https://github.com/deoxxa/duplexer2&quot;) - &quot;BSD&quot;, [escape-string-regexp@1.0.3](&quot;https://github.com/sindresorhus/escape-string-regexp&quot;) - &quot;MIT&quot;, [get-stdin@4.0.1](&quot;https://github.com/sindresorhus/get-stdin&quot;) - &quot;MIT&quot;, [gulp-async-func-runner@0.0.0](&quot;https://github.com/Cellarise/gulp-async-func-runner&quot;) - &quot;MIT License (MIT)&quot;, [gulp-util@3.0.4](&quot;https://github.com/wearefractal/gulp-util&quot;) - [&quot;MIT&quot;], [has-ansi@1.0.3](&quot;https://github.com/sindresorhus/has-ansi&quot;) - &quot;MIT&quot;, [indent-string@1.2.1](&quot;https://github.com/sindresorhus/indent-string&quot;) - &quot;MIT&quot;, [inherits@2.0.1](&quot;https://github.com/isaacs/inherits&quot;) - &quot;ISC&quot;, [is-finite@1.0.0](&quot;https://github.com/sindresorhus/is-finite&quot;) - &quot;MIT&quot;, [isarray@0.0.1](&quot;https://github.com/juliangruber/isarray&quot;) - &quot;MIT&quot;, [lodash._basecopy@3.0.0](&quot;https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash._basetostring@3.0.0](&quot;https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash._basevalues@3.0.0](&quot;https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash._isiterateecall@3.0.5](&quot;https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash._reescape@3.0.0](&quot;https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash._reevaluate@3.0.0](&quot;https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash._reinterpolate@3.0.0](&quot;https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash.escape@3.0.0](&quot;https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash.isarguments@3.0.1](&quot;https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash.isarray@3.0.1](&quot;https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash.isnative@3.0.1](&quot;https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash.keys@3.0.5](&quot;https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash.restparam@3.6.0](&quot;https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash.template@3.4.0](&quot;https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash.templatesettings@3.1.0](&quot;https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [map-obj@1.0.0](&quot;https://github.com/sindresorhus/map-obj&quot;) - &quot;MIT&quot;, [meow@3.1.0](&quot;https://github.com/sindresorhus/meow&quot;) - &quot;MIT&quot;, [minimist@1.1.1](&quot;https://github.com/substack/minimist&quot;) - &quot;MIT&quot;, [multipipe@0.1.2](&quot;https://github.com/juliangruber/multipipe&quot;) - &quot;MIT&quot;, [object-assign@2.0.0](&quot;https://github.com/sindresorhus/object-assign&quot;) - &quot;MIT&quot;, [readable-stream@1.0.33](&quot;https://github.com/isaacs/readable-stream&quot;) - &quot;MIT&quot;, [readable-stream@1.1.13](&quot;https://github.com/isaacs/readable-stream&quot;) - &quot;MIT&quot;, [repeating@1.1.2](&quot;https://github.com/sindresorhus/repeating&quot;) - &quot;MIT&quot;, [replace-ext@0.0.1](&quot;https://github.com/wearefractal/replace-ext&quot;) - [&quot;MIT&quot;], [string_decoder@0.10.31](&quot;https://github.com/rvagg/string_decoder&quot;) - &quot;MIT&quot;, [strip-ansi@2.0.1](&quot;https://github.com/sindresorhus/strip-ansi&quot;) - &quot;MIT&quot;, [supports-color@1.3.1](&quot;https://github.com/sindresorhus/supports-color&quot;) - &quot;MIT&quot;, [through2@0.6.5](&quot;https://github.com/rvagg/through2&quot;) - &quot;MIT&quot;, [underscore@1.8.3](&quot;https://github.com/jashkenas/underscore&quot;) - &quot;MIT&quot;, [vinyl@0.4.6](&quot;https://github.com/wearefractal/vinyl&quot;) - [&quot;MIT&quot;], [xtend@4.0.0](&quot;https://github.com/Raynos/xtend&quot;) - [&quot;MIT&quot;], 
*documented by [npm-licenses](http://github.com/AceMetrix/npm-license.git)*.