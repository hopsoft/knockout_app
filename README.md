# A less obtrusive binding provider for Knockout.js

I love Knockout.js for the following reasons.

* Powerful but simple data binding
* Less code needs to be written
* Templating can be kept on the server

Unfortunately Knockout's lack of project structure can be jarring, especially if you come from the land of Ember, Angular, or even Backbone. But... this is precisely why you should consider it. Knockout helps you leverage your existing server based tool chain without introducing too much client side complexity.

The problem I have with Knockout is its declarative approach. I find the declarative style somewhat offensive for modern web development.

## Introducing a less obtrusive binding provider

Luckily the Knockout team saw fit to support extending the framework with 3rd party binding providers.
This means relief can be found for those who cringe upon seeing markup like this.

```html
<span data-bind="text: name, css: { admin: isAdmin()  }"></span>
```

If your eyes are bleeding right now, allow me to provide some relief.

Change the above markup to this.

```html
<span id="user-name"></span>
```

 Now lets add the bindings in a less obtrusive way.

 ```javascript
var el = document.getElementById("user-name");
el.bind = "text: name, css: { admin: isAdmin() }";
 ```

Notice that no new attributes were added to the DOM. *Most other unbostrusive solutions opt for DOM manipulation.*

Now lets wire everything up.

```javascript
function ViewModel() {
  self = this;
  self.name = "Nathan";
  self.isAdmin = function() {
    return true;
  }
};

ko.bindingProvider.instance = new ko.LessObtrusiveBindingProvider();
ko.applyBindings(new ViewModel());
```

*All Knockout bindings are supported.*

It may not be perfect, but it's much better than before.
**We'll call it Knockout for the church of the less obtrusive.**
Like minded brothers & sisters can now rest at ease.

Check out a working example [here](http://tinkerbin.com/92C0yXi7).

Enjoy!

