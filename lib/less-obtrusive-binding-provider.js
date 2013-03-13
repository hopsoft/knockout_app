(function() {
  var context;

  context = typeof exports !== "undefined" && exports !== null ? exports : this;

  context.ko.LessObtrusiveBindingProvider = (function() {

    function LessObtrusiveBindingProvider() {
      this.baseProvider = new ko.bindingProvider();
    }

    LessObtrusiveBindingProvider.prototype.nodeHasBindings = function(node) {
      return this.getBindingString(node).length > 0;
    };

    LessObtrusiveBindingProvider.prototype.getBindings = function(node, bindingContext) {
      var bindingString;
      bindingString = this.getBindingString(node);
      if (!(bindingString.length > 0)) return null;
      return this.baseProvider.parseBindingsString(bindingString, bindingContext, node);
    };

    LessObtrusiveBindingProvider.prototype.getBindingString = function(node) {
      return (node.bind || "").replace(/^\s+|\s+$/g, "");
    };

    return LessObtrusiveBindingProvider;

  })();

}).call(this);
