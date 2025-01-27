// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"UWvl":[function(require,module,exports) {
(function (e) {
  "use strict";

  var t = "ScrollIt",
    n = "1.0.3";
  var r = {
    upKey: 38,
    downKey: 40,
    easing: "linear",
    scrollTime: 600,
    activeClass: "active",
    onPageChange: null,
    topOffset: 0
  };
  e.scrollIt = function (t) {
    var n = e.extend(r, t),
      i = 0,
      s = e("[data-scroll-index]:last").attr("data-scroll-index");
    var o = function (t) {
      if (t < 0 || t > s) return;
      var r = e("[data-scroll-index=" + t + "]").offset().top + n.topOffset + 1;
      e("html,body").animate({
        scrollTop: r,
        easing: n.easing
      }, n.scrollTime);
    };
    var u = function (t) {
      var n = e(t.target).closest("[data-scroll-nav]").attr("data-scroll-nav") || e(t.target).closest("[data-scroll-goto]").attr("data-scroll-goto");
      o(parseInt(n));
    };
    var a = function (t) {
      var r = t.which;
      if (e("html,body").is(":animated") && (r == n.upKey || r == n.downKey)) {
        return false;
      }
      if (r == n.upKey && i > 0) {
        o(parseInt(i) - 1);
        return false;
      } else if (r == n.downKey && i < s) {
        o(parseInt(i) + 1);
        return false;
      }
      return true;
    };
    var f = function (t) {
      if (n.onPageChange && t && i != t) n.onPageChange(t);
      i = t;
      e("[data-scroll-nav]").removeClass(n.activeClass);
      e("[data-scroll-nav=" + t + "]").addClass(n.activeClass);
    };
    var l = function () {
      var t = e(window).scrollTop();
      var r = e("[data-scroll-index]").filter(function (r, i) {
        return t >= e(i).offset().top + n.topOffset && t < e(i).offset().top + n.topOffset + e(i).outerHeight();
      });
      var i = r.first().attr("data-scroll-index");
      f(i);
    };
    e(window).on("scroll", l).scroll();
    e(window).on("keydown", a);
    e("body").on("click", "[data-scroll-nav], [data-scroll-goto]", function (e) {
      e.preventDefault();
      u(e);
    });
  };
})(jQuery);
},{}]},{},["UWvl"], null)