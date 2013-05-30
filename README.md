# A less obtrusive binding provider for Knockout.js

I love Knockout.js for the following reasons.

* Powerful but simple data binding
* Less code needs to be written
* Templating can be kept on the server

Unfortunately Knockout's lack of project structure can be jarring, especially if you come from the land of Ember, Angular, or even Backbone.

But, this is precisely why you should consider it.
Knockout helps you leverage your existing server based tool chain without introducing too much client side complexity.
For example, typical HTML generated at the server can act as Knockout's view-templates.
This saves a ton of time... and code.

> My beef with Knockout is its declarative approach, which I find somewhat offensive for modern web development.

## Introducing a less obtrusive approach

**Update:** This project was originally a [Knockout binding provider](http://www.knockmeout.net/2011/09/ko-13-preview-part-2-custom-binding.html),
but has since transitioned to simple helper methods which can help keep your markup clean.

Relief can be found for those who cringe upon seeing markup like this.

```html
<span data-bind="text: name, css: { admin: isAdmin() }"></span>
```

If your eyes are bleeding right now, allow me to provide some relief.
Change the above markup to this.

```html
<span id="user-name"></span>
```

 Now lets add the bindings in a less obtrusive way with JavaScript.

 ```javascript
document.getElementById("user-name").ko("text: name, css: { admin: isAdmin() }");
 ```

 We can also use jQuery.

 ```javascript
 $("#user-name").ko("text: name, css: { admin: isAdmin() }");
 ```

Finally we'll wire everything up.

```javascript
function ViewModel() {
  self = this;
  self.name = "Nathan";
  self.isAdmin = function() {
    return true;
  }
};

ko.applyBindings(new ViewModel());
```

While not perfect, it's much better than before.
We'll call it Knockout for the church of the less obtrusive.
Like minded brothers & sisters can finally rest at ease.

**NOTE**: All Knockout bindings are supported.
Also, you can check out a [working example here](http://jsfiddle.net/DsWqA/6/).

### Enjoy!

