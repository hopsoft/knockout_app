context = exports ? this

class context.ko.LessObtrusiveBindingProvider

  constructor: ->
    @baseProvider = new ko.bindingProvider()

  nodeHasBindings: (node) ->
    @getBindingString(node).length > 0

  getBindings: (node, bindingContext) ->
    bindingString = @getBindingString(node)
    return null unless bindingString.length > 0
    @baseProvider.parseBindingsString bindingString, bindingContext, node

  getBindingString: (node) ->
    (node.bind || "").replace(/^\s+|\s+$/g, "")

