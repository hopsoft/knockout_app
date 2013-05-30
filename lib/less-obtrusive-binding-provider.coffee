context = exports ? this

class context.ko.LessObtrusiveBindingProvider

  constructor: ->
    @baseProvider = new ko.bindingProvider()

  nodeHasBindings: (node) ->
    @getBindingString(node).length > 0

  # invoked when performing data bindings, see: knockout/src/binding/bindingAttributeSyntax.js:119
  getBindings: (node, bindingContext) ->
    bindingString = @getBindingString(node)
    return null unless bindingString.length > 0

    # preserve binding data just in case we need it later
    node._binding = node._binding

    # throw away the binding data to prevent multiple bindings
    delete node.binding

    @baseProvider.parseBindingsString bindingString, bindingContext, node

  getBindingString: (node) ->
    (node.binding || "").replace(/^\s+|\s+$/g, "")

