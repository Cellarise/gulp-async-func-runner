# API
<a name="module_gulp-async-func-runner"></a>
#gulp-async-func-runner
A gulp task for running asynchronous functions.
**Params**

- opts `Object` - optional options. Options to be passed to the task function should be provided in this object.  
  - \[oneTimeRun=false\] `Object` - flag to run the task only once no matter how many data chunks are passed
  - \[passThrough=false\] `Object` - flag to pass data chunks through without modification.
- task `function` - the asynchronous task to call and wait for callback to be executed.
- done `function` - the callback function called once the asynchronous task has completed.

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