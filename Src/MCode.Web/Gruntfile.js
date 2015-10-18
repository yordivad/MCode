"use strict";

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require("load-grunt-tasks")(grunt);

    grunt.registerMultiTask("exportmodules", "append export namespace to generate js files for testeabity", function() {

        var self = this;

        grunt.file.expand(self.data.src).forEach(function(filepath) {
            filepath = filepath.replace(".ts", ".js");
            var content = grunt.file.read(filepath);
            content += " " + self.data.export;
            grunt.file.write(filepath, content);
        });
    });


    grunt.initConfig({
            pkg: grunt.file.readJSON("package.json"),

            bowercopy: {
                libs: {
                    options: {
                        destPrefix: "client/libs"
                    },
                    files: {
                        "jquery.js": "jquery/jquery.js",
                        "sweetalert.js": "sweetalert/dist/sweetalert-dev.js",
                        "angular.js": "angular/angular.js",
                        "bootstrap.js": "bootstrap/dist/js/bootstrap.js",
                        "klay.js": "klay-js/klay.js"
                    }
                },

                css: {
                    options: {
                        destPrefix: "client/content"
                    },
                    files: {
                        "bootstrap.css": "bootstrap/dist/css/bootstrap.css",
                        "bootstrap-theme.css": "bootstrap/dist/css/bootstrap.css"
                    }
                },

                fonts: {
                    options: {
                        destPrefix: "client/fonts"
                    },
                    files: {
                        "glyphicons-halflings-regular.eot": "bootstrap/dist/fonts/glyphicons-halflings-regular.eot",
                        "glyphicons-halflings-regular.svg": "bootstrap/dist/fonts/glyphicons-halflings-regular.svg",
                        "glyphicons-halflings-regular.ttf": "bootstrap/dist/fonts/glyphicons-halflings-regular.ttf",
                        "glyphicons-halflings-regular.woff": "bootstrap/dist/fonts/glyphicons-halflings-regular.woff",
                        "glyphicons-halflings-regular.woff2": "bootstrap/dist/fonts/glyphicons-halflings-regular.woff2"
                    }
                }

            },

            tslint: {
                options: {
                    configuration: grunt.file.readJSON("tslint.json")
                },
                files: {
                    src: ["client/scripts/**/*.ts"]
                }
            },

            jslint: {
                all: {
                    src: ["test/features/**/*.js"],
                    directives: {
                        node: true
                    }
                }
            },

            exportmodules: {
                main: {
                    src: ["client/scripts/**/*.ts"],
                    export: "if (typeof exports !== \"undefined\") { exports.Aurea = Aurea; }"
                }
            },

            copy: {
                options: {
                    punctuation: ""
                },
                main: {
                    files: [
                        { expand: true, cwd: "dist", src: ["**"], dest: "web/scripts/", filter: "isFile" },
                        { expand: true, cwd: "client/scripts/libs/", src: ["**"], dest: "web/scripts/libs", filter: "isFile" },
                        { expand: true, cwd: "standalone", src: ["**"], dest: "web/scripts/", filter: "isFile" }
                    ]
                }
            },

            concat: {
                dist: {
                    src: ["test/test.helper.js", "client/scripts/libs/*.*", "client/scripts/core.js", "client/scripts/sandbox.js", "client/scripts/app.js", "client/scripts/init/**/*.js", "client/scripts/modules/**/*.js"],
                    dest: "test/source.js"
                }
            },

            typescript: {
                local: {
                    src: ["client/scripts/**/*.ts"],
                    dest: "client/scripts/",
                    options: {
                        module: "commonjs", //or commonjs
                        target: "es5", //or es3
                        basePath: "client/scripts",
                        sourceMap: false,
                        declaration: false
                    }
                },
                base: {
                    src: ["client/scripts/**/*.ts"],
                    dest: "dist/",
                    options: {
                        module: "commonjs", //or commonjs
                        target: "es5", //or es3
                        basePath: "client/scripts",
                        sourceMap: false,
                        declaration: false
                    }
                }
            },

            mocha_istanbul: {
                coverage: {
                    src: "test/features", // a folder works nicely
                    options: {
                        mask: "*.config.js"
                    }
                },

                coverageSpecial: {
                    src: ["test/features/**/*.js"], // specifying file patterns works as well
                    options: {
                        coverageFolder: "coverageSpecial",
                        mask: "*.config.js",
                        mochaOptions: ["--harmony", "--async-only"], // any extra options
                        istanbulOptions: ["--harmony", "--handle-sigint"]
                    }
                },

                coveralls: {
                    src: ["test/features"], // multiple folders also works
                    options: {
                        coverage: true, // this will make the grunt.event.on("coverage") event listener to be triggered
                        check: {
                            lines: 75,
                            statements: 75
                        },
                        root: "./src", // define where the cover task should consider the root of libraries that are covered by tests
                        reportFormats: ["teamcity", "lcov"]
                    }
                }
            },

            istanbul_check_coverage: {
                default: {
                    options: {
                        coverageFolder: "coverage*", // will check both coverage folders and merge the coverage results
                        check: {
                            lines: 80,
                            statements: 80
                        }
                    }
                }
            },

            file_append: {
                default_options: {
                    files: [
                        {
                            append: "if (typeof exports !== \"undefined\") { exports.Aurea = Aurea; }",
                            input: "src/sou",
                            output: "test/source.js"
                        }
                    ]
                }
            },

            watch: {
                scripts: {
                    files: ["client/scripts/**/*.ts", "test/features/**/*.js"],
                    tasks: ["tslint", "jslint:all", "typescript", "exportmodules", "mocha_istanbul:coveralls"],
                    options: {
                        spawn: false,
                    }
                }
            }

        }
    );

    // Task: Build production version ready for deployment
    grunt.registerTask("build", [
        "bowercopy",
        "tslint",
        "jslint:all",
        "typescript",
        "copy",
        "watch",
        "mocha_istanbul:coveralls",
        "mocha_istanbul:coverage"
    ]);

    grunt.registerTask("default", ["build"]);

};