var polymer;
(function (polymer) {
    function createEs6PolymerBase() {
        var pb = function () { };
        window["polymer"]["Base"] = pb;
        pb["create"] = function () {
            throw "element not yet registered in Polymer";
        };
        pb["register"] = function (dontRegister) {
            if (dontRegister === true)
                polymer.createClass(this);
            else
                polymer.createElement(this);
        };
    }
    polymer.createEs6PolymerBase = createEs6PolymerBase;
    function prepareForRegistration(elementClass) {
        function copyMembers(dest, source) {
            if (source === undefined || source === null)
                return;
            Object.keys(source).map(function (member) {
                if (!dest.hasOwnProperty(member))
                    dest[member] = source[member];
            });
            copyMembers(dest, source.__proto__);
        }
        if (elementClass.prototype.is === undefined) {
            var proto = elementClass.prototype;
            var instance = new elementClass();
            if (!instance.is) {
                throw new Error("no name for " + elementClass);
            }
            proto.is = instance.is;
            if (instance.extends) {
                proto.extends = instance.extends;
            }
            if (instance.properties) {
                proto.properties = instance.properties;
            }
            if (instance.listeners) {
                proto.listeners = instance.listeners;
            }
            if (instance.observers) {
                proto.observers = instance.observers;
            }
            if (instance.behaviors) {
                proto.behaviors = instance.behaviors;
            }
            if (instance.hostAttributes) {
                proto.hostAttributes = instance.hostAttributes;
            }
            if (instance.style) {
                proto.style = instance.style;
            }
            if (instance.template) {
                proto.template = instance.template;
            }
        }
        var preparedElement = elementClass.prototype;
        preparedElement["$custom_cons"] = function () {
            var args = this.$custom_cons_args;
            elementClass.apply(this, args);
        };
        preparedElement["$custom_cons_args"] = [];
        if (preparedElement["factoryImpl"] !== undefined) {
            throw "do not use factoryImpl() use constructor() instead";
        }
        else {
            preparedElement["factoryImpl"] = function () {
                this.$custom_cons_args = arguments;
            };
        }
        var attachToFunction = "attached";
        var oldFunction = preparedElement[attachToFunction];
        preparedElement[attachToFunction] = function () {
            this.$custom_cons();
            if (oldFunction !== undefined)
                oldFunction.apply(this);
        };
        copyMembers(preparedElement, elementClass.prototype.__proto__);
        return preparedElement;
    }
    polymer.prepareForRegistration = prepareForRegistration;
    function createDomModule(definition) {
        var domModule = document.createElement('dom-module');
        var proto = definition.prototype;
        domModule.id = proto.is;
        var html = "";
        if (proto.style !== undefined)
            html += "<style>" + proto.style + "</style>";
        if (proto.template !== undefined)
            html += "<template>" + proto.template + "</template>";
        domModule.innerHTML = html;
        domModule.createdCallback();
    }
    polymer.createDomModule = createDomModule;
    function createElement(element) {
        if (polymer.isRegistered(element)) {
            throw "element already registered in Polymer";
        }
        if ((element.prototype).template !== undefined || (element.prototype).style !== undefined) {
            polymer.createDomModule(element);
        }
        var maker = Polymer(polymer.prepareForRegistration(element));
        element["create"] = function () {
            var newOb = Object.create(maker.prototype);
            return maker.apply(newOb, arguments);
        };
        return maker;
    }
    polymer.createElement = createElement;
    function createClass(element) {
        if (polymer.isRegistered(element)) {
            throw "element already registered in Polymer";
        }
        if ((element.prototype).template !== undefined || (element.prototype).style !== undefined) {
            polymer.createDomModule(element);
        }
        var maker = Polymer.Class(polymer.prepareForRegistration(element));
        element["create"] = function () {
            var newOb = Object.create(maker.prototype);
            return maker.apply(newOb, arguments);
        };
        return maker;
    }
    polymer.createClass = createClass;
    function isRegistered(element) {
        return (element.prototype).$custom_cons !== undefined;
    }
    polymer.isRegistered = isRegistered;
})(polymer || (polymer = {}));
polymer.createEs6PolymerBase();
function component(tagname, extendsTag) {
    return function (target) {
        target.prototype["is"] = tagname;
        if (extendsTag !== undefined) {
            target.prototype["extends"] = extendsTag;
        }
    };
}
function extend(tagname) {
    return function (target) {
        target.prototype["extends"] = tagname;
    };
}
function template(templateString) {
    return function (target) {
        target.prototype["template"] = templateString;
    };
}
function style(styleString) {
    return function (target) {
        target.prototype["style"] = styleString;
    };
}
function hostAttributes(attributes) {
    return function (target) {
        target.prototype["hostAttributes"] = attributes;
    };
}
function property(ob) {
    return function (target, propertyKey) {
        target.properties = target.properties || {};
        if (typeof (target[propertyKey]) === "function") {
            var params = ob["computed"];
            var getterName = "get_computed_" + propertyKey;
            ob["computed"] = getterName + "(" + params + ")";
            target.properties[propertyKey] = ob;
            target[getterName] = target[propertyKey];
        }
        else {
            target.properties[propertyKey] = ob || {};
        }
    };
}
function computed(ob) {
    return function (target, computedFuncName) {
        target.properties = target.properties || {};
        var propOb = ob || {};
        var getterName = "get_computed_" + computedFuncName;
        var funcText = target[computedFuncName].toString();
        var start = funcText.indexOf("(");
        var end = funcText.indexOf(")");
        var propertiesList = funcText.substring(start + 1, end);
        propOb["computed"] = getterName + "(" + propertiesList + ")";
        target.properties[computedFuncName] = propOb;
        target[getterName] = target[computedFuncName];
    };
}
function listen(eventName) {
    return function (target, propertyKey) {
        target.listeners = target.listeners || {};
        target.listeners[eventName] = propertyKey;
    };
}
function behavior(behaviorObject) {
    return function (target) {
        if (typeof (target) === "function") {
            target.prototype["behaviors"] = target.prototype["behaviors"] || [];
            var beObject = behaviorObject.prototype === undefined ? behaviorObject : behaviorObject.prototype;
            target.prototype["behaviors"].push(beObject);
        }
        else {
            target.behaviors = target.behaviors || [];
            var beObject = behaviorObject.prototype === undefined ? behaviorObject : behaviorObject.prototype;
            target.behaviors.push(beObject);
        }
    };
}
function observe(observedProps) {
    if (observedProps.indexOf(",") > 0 || observedProps.indexOf(".") > 0) {
        return function (target, observerFuncName) {
            target.observers = target.observers || [];
            target.observers.push(observerFuncName + "(" + observedProps + ")");
        };
    }
    else {
        return function (target, observerName) {
            target.properties = target.properties || {};
            target.properties[observedProps] = target.properties[observedProps] || {};
            target.properties[observedProps].observer = observerName;
        };
    }
}
