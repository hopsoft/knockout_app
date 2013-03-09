(function() {
  var LessObtrusiveBindingProvider, ko;

  ko = window.ko;

  LessObtrusiveBindingProvider = (function() {

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
      return (node.bind || "").replace(/^\s+|\s+$/, "");
    };

    return LessObtrusiveBindingProvider;

  })();

  ko.LessObtrusiveBindingProvider = LessObtrusiveBindingProvider;

}).call(this);
