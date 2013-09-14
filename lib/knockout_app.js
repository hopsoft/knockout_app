(function(ko, $) {

  // Copies all properties from extensions to the context.
  // This method is similar to Underscore's extend.
  var extend = function (context, extensions) {
    if (!context) { return; }
    for (var key in extensions) {
      if (extensions.hasOwnProperty(key)) {
        if (context.hasOwnProperty(key)) {
          console.log("Unable to extend [context] with [" + key + "].");
        } else {
          context[key] = extensions[key];
        }
      }
    }
  };

  extend(ko, {
    app: {

      Model: function (properties) {

        // returns a hash that represents the data in this model
        // accepts a scope that will yield: scope[property]=value
        this.distill = function (scope) {
          var viewModel = this;
          var data = ko.toJS(viewModel);
          var newData = {};
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              var value = data[key];
              if (value) {
                if (typeof(value.distill) === "function") {
                  value = value.distill();
                }

                if (typeof(value) !== "function") {
                  if (scope) {
                    newData[scope + "[" + key + "]"] = value;
                  } else {
                    newData[key] = value;
                  }
                }
              }
            }
          }
          return newData;
        };

        // fills this model with json data
        this.hydrate = function (data) {
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              var property = this[key];
              if (property) {
                var value = data[key];
                if (typeof property.hydrate === "function") {
                  property.hydrate(value);
                } else if (typeof property.notifySubscribers === "function") {
                  if (value !== null && value !== undefined) {
                    if (value.push && this[key].push) {
                      $.each(value, function (_, v) {
                        property.push(v);
                      });
                    } else {
                      try {
                        property(value);
                      } catch (e) {}
                    }
                  }
                }
              }
            }
          }
        };

        extend(this, properties);
      },

      Page: function (paths, callback) {
        var self = this;
        self.paths = paths;
        self.callback = callback;
        self.onceTracker = {};

        self.run = function () {
          if (self.shouldRun()) {
            self.callback.call(self);
          }
        };

        self.shouldRun = function () {
          var shouldRun = false;
          var pathParts = document.location.pathname.replace(/^\/|\/$/g, "").split("/");
          $.each(self.paths, function (_, path) {
            var parts = path.replace(/^\/|\/$/g, "").split("/");
            if (parts.length === pathParts.length) {
              var match = true;
              $.each(parts, function (i, part) {
                if (part !== "*" && pathParts[i] !== part) {
                  match = false;
                }
              });
              shouldRun = shouldRun || match;
              return !shouldRun;
            }
          });
          return shouldRun;
        };

        self.once = function (func, args) {
          var key = func.toString();
          if (!self.onceTracker[key]) {
            func.apply(self, args);
            self.onceTracker[key] = true;
          }
        };

        self.bind = function (model, context, binders) {
          var $context = $(context);
          context = $(context).get(0);
          ko.cleanNode(context);
          for (var key in binders) {
            if (binders.hasOwnProperty(key)) {
              $(key).attr("data-bind", binders[key]);
            }
          }
          ko.applyBindings(model, $context.get(0));
        };
      }
    }
  });

}(ko, jQuery));

