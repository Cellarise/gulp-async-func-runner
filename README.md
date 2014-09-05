# gulp-async-function-runner
[![view on npm](http://img.shields.io/npm/v/gulp-async-function-runner.svg)](https://www.npmjs.org/package/gulp-async-function-runner)
[![npm module downloads per month](http://img.shields.io/npm/dm/gulp-async-function-runner.svg)](https://www.npmjs.org/package/gulp-async-function-runner)
[![Dependency Status](https://david-dm.org/Cellarise/gulp-async-function-runner.svg)](https://david-dm.org/Cellarise/gulp-async-function-runner)

> A gulp task for running asynchronous functions.


##Usage 

This gulp task expects an options object, an asynchronous function and a callback function. The task runs the asynchronous function passing it the options, a chunk of data, and the callback function.

### As a gulp task

Use the task to execute an asynchronous function within a gulp pipe.

```js
var asyncPipe = require('gulp-async-function-runner');
gulp.src('test/*')
    .pipe(asyncPipe(
        opts,
        asyncFunc,
        callback)
    );
```



# API
<a name="module_gulp-async-function-runner"></a>
#gulp-async-function-runner
A gulp task for running asynchronous functions.

**Params**

- opts `Object` - optional options. Options to be passed to the task function should be provided in this object.  
  - \[oneTimeRun=false\] `Object` - flag to run the task only once no matter how many data chunks are passed through the stream  
  - \[passThrough=false\] `Object` - flag to pass data chunks through without modification.
Default behaviour is to stream the data transformed by the asynchronous function.
Set to passThrough to true if you only want to use the results of the asynchronous function as part of the `done` callback function.  
- task `function` - the asynchronous task to call and wait for callback to be executed.
The task must be a function with the following signature: task(options, chunk, enc, callback)
   - options {Object} - an options object. This will be passed the opts parameter from this module.
   - chunk {Object} - the current chunk of data passing through stream.
   - callback  - the callback function to be executed once task complete.
   The callback function has the following signature: callback(error, data).
   This will be passed the done parameter from this module which must have a matching signature.  
- done `function` - the callback function called once the asynchronous task has completed.
The function must have the following signature: done(error, data).  

**Type**: `name`  
**Returns**: `readable-stream/transform`  
**Example**  
Usage:
```
var asyncPipe = require('gulp-async-function-runner');
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
    <td colspan=4><strong>Version: 0.1.2 - released 2014-08-05</strong></td>
   </tr>

  <tr>
    <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype'/></td> 
    <td style="width:80px;text-align:center;">Non-functional</td> 
    <td style="width:80px;text-align:left;">MDGASYNC-4</td>
    <td>Package: Rename Github repository to change word function to func.</td>
   </tr>


  <tr>
    <td colspan=4><strong>Version: 0.1.1 - released 2014-09-05</strong></td>
   </tr>

  <tr>
    <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com/secure/viewavatar?size=xsmall&amp;avatarId=10403&amp;avatarType=issuetype'/></td> 
    <td style="width:80px;text-align:center;">Bug</td> 
    <td style="width:80px;text-align:left;">MDGASYNC-3</td>
    <td>Task: Fix stream.push() after EOF called</td>
   </tr>


  <tr>
    <td colspan=4><strong>Version: 0.1.0 - released 2014-09-05</strong></td>
   </tr>

  <tr>
    <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype'/></td> 
    <td style="width:80px;text-align:center;">Feature</td> 
    <td style="width:80px;text-align:left;">MDGASYNC-2</td>
    <td>Package: Develop asynchronous function runner.</td>
   </tr>


</table>



# License

MIT License (MIT). All rights not explicitly granted in the license are reserved.

Copyright (c) 2014 John Barry

## Dependencies
[ansi-regex@0.2.1](&quot;https://github.com/sindresorhus/ansi-regex&quot;) - &quot;MIT&quot;, [ansi-styles@1.1.0](&quot;https://github.com/sindresorhus/ansi-styles&quot;) - &quot;MIT&quot;, [chalk@0.5.1](&quot;https://github.com/sindresorhus/chalk&quot;) - &quot;MIT&quot;, [clone-stats@0.0.1](&quot;https://github.com/hughsk/clone-stats&quot;) - &quot;MIT&quot;, [core-util-is@1.0.1](&quot;https://github.com/isaacs/core-util-is&quot;) - &quot;MIT&quot;, [dateformat@1.0.8-1.2.3](&quot;https://github.com/felixge/node-dateformat&quot;) - &quot;MIT*&quot;, [duplexer2@0.0.2](&quot;https://github.com/deoxxa/duplexer2&quot;) - &quot;BSD&quot;, [escape-string-regexp@1.0.1](&quot;https://github.com/sindresorhus/escape-string-regexp&quot;) - &quot;MIT&quot;, [gulp-async-function-runner@0.0.0](&quot;https://github.com/Cellarise/gulp-async-func-runner&quot;) - &quot;MIT License (MIT)&quot;, [gulp-util@3.0.1](&quot;https://github.com/wearefractal/gulp-util&quot;) - [&quot;MIT&quot;], [has-ansi@0.1.0](&quot;https://github.com/sindresorhus/has-ansi&quot;) - &quot;MIT&quot;, [inherits@2.0.1](&quot;https://github.com/isaacs/inherits&quot;) - &quot;ISC&quot;, [isarray@0.0.1](&quot;https://github.com/juliangruber/isarray&quot;) - &quot;MIT&quot;, [lodash._escapehtmlchar@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._escapestringchar@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._htmlescapes@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._isnative@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._objecttypes@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._reinterpolate@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._reunescapedhtml@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._shimkeys@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.defaults@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.escape@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.isobject@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.keys@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.template@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.templatesettings@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.values@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash@2.4.1](&quot;https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [minimist@1.1.0](&quot;https://github.com/substack/minimist&quot;) - &quot;MIT&quot;, [multipipe@0.1.1](&quot;https://github.com/segmentio/multipipe&quot;) - &quot;MIT*&quot;, [readable-stream@1.0.31](&quot;https://github.com/isaacs/readable-stream&quot;) - &quot;MIT&quot;, [readable-stream@1.1.13](&quot;https://github.com/isaacs/readable-stream&quot;) - &quot;MIT&quot;, [string_decoder@0.10.31](&quot;https://github.com/rvagg/string_decoder&quot;) - &quot;MIT&quot;, [strip-ansi@0.3.0](&quot;https://github.com/sindresorhus/strip-ansi&quot;) - &quot;MIT&quot;, [supports-color@0.2.0](&quot;https://github.com/sindresorhus/supports-color&quot;) - &quot;MIT&quot;, [through2@0.6.1](&quot;https://github.com/rvagg/through2&quot;) - &quot;MIT&quot;, [underscore@1.7.0](&quot;https://github.com/jashkenas/underscore&quot;) - [&quot;MIT&quot;], [vinyl@0.4.3](&quot;https://github.com/wearefractal/vinyl&quot;) - [&quot;MIT&quot;], [xtend@4.0.0](&quot;https://github.com/Raynos/xtend&quot;) - [&quot;MIT&quot;], 
*documented by [npm-licenses](http://github.com/AceMetrix/npm-license.git)*.