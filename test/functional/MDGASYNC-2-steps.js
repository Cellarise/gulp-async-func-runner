/* jslint node: true */
"use strict";
var English = require('yadda').localisation.English;
var assert = require('assert');
var gulp = require('gulp');
var asyncPipe = require('../..');

/* Feature: Package: Develop asynchronous function runner. */
module.exports = (function () {
    return English.library()
        /*Scenario: Simple asynchronous function execution */
        .define("Given a simple asynchronous function", function (done) {
            this.world.asyncFunc = function (opts, cb) {
                assert.equal(opts.testOpt, "test option");
                cb(false, "test data");
            };
            done();
        })
        .define("When executing the function as part of a gulp pipe", function (done) {
            assert(true);
            done();
        })
        .define("Then the pipe will wait for function to complete before continuing", function (done) {
            var asyncFuncComplete = false;
            var self = this;
            var opts = {
                oneTimeRun: true,
                passThrough: true,
                testOpt: "test option"
            };
            gulp.src('test/*')
                .pipe(asyncPipe(
                    opts,
                    function(opts, chunk, cb) {
                        self.world.asyncFunc(opts, cb);
                    },
                    function (error, data) {
                        if (!error) {
                            assert.equal(data, "test data");
                        } else {
                            assert(false);
                        }
                        asyncFuncComplete = true;
                    })
                )
                .on('finish', function(){
                    assert(asyncFuncComplete, 'async function complete = ' + asyncFuncComplete);
                    done();
                });
        });
})();