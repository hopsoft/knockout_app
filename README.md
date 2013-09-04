## Spice up your apps with Knockout

<blockquote class="twitter-tweet"><p>JavaScript is like a spice. Best used in sprinkles and moderation.</p>&mdash; DHH (@dhh) <a href="https://twitter.com/dhh/statuses/374656854825005056">September 2, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

**A small script that provides structure and guidance for using Knockout.**

* Much lighter than heavy client side frameworks.
* Treats every page as a small app... look elsewhere for SPA (single page apps).
* Works with the asset pipeline in Rails, instead of against it.
* Works with [turbo links](https://github.com/rails/turbolinks/) in Rails, instead of against it.
* Easily serialize view models into Rails params.

Depends on [jQuery](http://jquery.com/) & [Knockout](http://knockoutjs.com/).

## Example

```javascript
// app/assets/javascripts/users_new.js
(function($, ko) {

  var path = /\/users\/new\/?$/i;

  // page specific logic
  // only executed when the url matches the path
  var page = new ko.app.Page(path, function () {

    // add logic to manage the page
    // invoked with page.run

    // sugar for models
    page.model = new ko.app.Model({
      id: ko.observable(1),
      name: ko.observable("Nathan Hopkins"),
      update: function (form) {
        $.ajax("/users/" + page.model.id, {
          type: "PUT",
          data: page.model.data("user"), // => { "user[name]": value, ... }
          success: function (data) {
            // do stuff
          }
        });
      }
    });

    // sports unobtrusive databinding if that's your thing
    page.bind(page.model, document.body, {
      "#name": "value: name",
      "form": "submit: update"
    });
  });

  $(document).on("ready page:change", page.run);

}(jQuery, ko));
```

