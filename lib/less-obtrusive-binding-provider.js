(function($) {

  try {
    if (HTMLElement.prototype.ko === undefined) {
      HTMLElement.prototype.ko = function (binding) {
        this.setAttribute("data-bind", binding);
      };
    } else {
      console.log("Unable to extend [HTMLElement.prototype] with a [ko] method because it already exists.");
    }
  } catch (e) {
    console.log("Failed to extend [HTMLElement.prototype] with a [ko] method.");
  }

  try {
    if ($.fn && $.fn.ko === undefined) {
      $.fn.ko = function (binding) {
        this.attr("data-bind", binding);
      };
    } else {
      console.log("Unable to extend [$.fn] with a [ko] method because it already exists.");
    }
  } catch (e) {
    console.log("Failed to extend [$.fn] with a [ko] method.");
  }

}($));
