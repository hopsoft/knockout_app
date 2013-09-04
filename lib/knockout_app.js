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
        this.data = function (scope) {
          var viewModel = this;
          var data = ko.toJS(viewModel);
          var newData = {};
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              var value = data[key];
              if (typeof(value) !== "function") {
                if (scope) {
                  newData[scope + "[" + key + "]"] = value;
                } else {
                  newData[key] = value;
                }
              }
            }
          }

          return newData;
        };
        extend(this, properties);
      },

      Page: function (pattern, callback) {
        var self = this;
        self.pattern = pattern;
        self.callback = callback;
        self.onceTracker = {};
        self.run = function () {
          if (!document.location.href.match(self.pattern)) { return; }
          self.callback.call(self);
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

