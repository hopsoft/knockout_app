# A less obtrusive binding provider for Knockout.js

I love Knockout.js for the following reasons.

* Less code needs to be written
* Templating is kept on the server
* A focus on data... the view is correct if the data is correct

Knockout's lack of project structure can be jarring, especially if you come from the land of Ember, Angular, or even Backbone. But... this is precisely why you should consider it. Knockout helps you leverage your existing server based tool chain without introducing too much new client side complexity.

The problem I have with Knockout is its declarative approach. I find the declarative style somewhat offensive for modern web development.

## Introducing a less obtrusive binding provider

Luckily the Knockout team saw fit to support extending the framework with 3rd party binding providers.
This means that relief is here for all those who cringe upon seeing markup like this.

```html
<span data-bind="text: name, css: { 'admin-name': isAdmin()  }"></span>
```

Before you flee in panic. I'll attempt to provide some relief for those whose eyes are bleeding right now.

Change the above markup to this.

```html
<span id="user-name"></span>
```

 Now lets add the bindings in a less obtrusive way.

 ```javascript
(function() {

  $(document).ready(function (event) {
    var el = $("user-name").get(0);
    el.bind = "text: name, css: { 'admin-name': isAdmin()  }";
  });

}).call(this);
 ```

Notice that no new attributes were added to the DOM. *Most other unbostrusive solutions opt for DOM manipulation.*

Now lets wire everything up.

```javascript
(function() {

  $(document).ready(function (event) {
    var viewModel = {
      name: "Nathan",
      isAdmin: function() {
        return true;
      }
    };

    ko.bindingProvider.instance = new ko.LessObtrusiveBindingProvider();
    ko.applyBindings(viewModel);
  });

}).call(this);
```

*All Knockout bindings are supported.*

It may not be perfect, but it's much better than before.
**We'll call it Knockout for the church of the less obtrusive.**
Like minded brothers & sisters can now rest at ease.

Enjoy!

