context = exports ? this

ko._applyBindings = ko._applyBindings

class context.ko.LessObtrusiveBindingProvider

  constructor: ->
    @baseProvider = new ko.bindingProvider()

  nodeHasBindings: (node) ->
    @getBindingString(node).length > 0

  getBindings: (node, bindingContext) ->
    node.bindingString ||= @getBindingString(node)
    return null unless node.bindingString.length > 0
    @baseProvider.parseBindingsString node.bindingString, bindingContext, node

  getBindingString: (node) ->
    (node.binding || "").replace(/^\s+|\s+$/g, "")

