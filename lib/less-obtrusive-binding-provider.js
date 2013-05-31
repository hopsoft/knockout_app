(function($) {

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

  extend(HTMLElement.prototype, {
    ko: function (binding) {
      this.setAttribute("data-bind", binding);
    }
  });

  if (typeof($) != "undefined") {
    extend($.fn, {
      ko: function (binding) {
        this.attr("data-bind", binding);
      }
    });
  }

}($));

