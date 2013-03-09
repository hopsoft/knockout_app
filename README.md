# A less obtrusive binding provider for Knockout.js

I love Knockout.js for the following reasons.

* Less code needs to be written
* Templating is kept on the server
* A focus on data... if the data is right the view is right

Knockout's lack of project structure can be jarring, especially if you come from the land of Ember, Angular, or even Backbone. But... this is precisely why you should consider it. Knockout helps you leverage your existing tool chain without introducing too much new complexity.

The problem I have with Knockout is its declarative approach. I find the declarative style somewhat offensive for modern web development.

## Introducing a less obtrusive binding provider

Luckily the Knockout team saw fit to support extending the framework with 3rd party binding providers.
This means that relief is here for all those who cringe upon seeing markup like this.

```html
<span data-bind="text: name, css: { 'admin-name': isAdmin()  }"></span>
```

Before you flee in panic. Lets try to provide some relief for those whose eyes are bleeding right now.
 
 Change the above markup to this.
 
 ```html
 <span id="user-name"></span>
 ```
