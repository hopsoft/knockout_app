## A small script that provides guidance for Knockout app structure

Depends on [jQuery](http://jquery.com/) & [Knockout](http://knockoutjs.com/).

* Much lighter than heavy client side frameworks.
* Treats every page as a small app... look elsewhere for SPA (single page apps).
* Works with the asset pipeline in Rails, instead of against it.
* Works with [turbo links](https://github.com/rails/turbolinks/) in Rails, instead of against it.
* Easily serialize view models into Rails params.

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/steveklabnik">@steveklabnik</a> JavaScript is like a spice. Best used in sprinkles and moderation.</p>&mdash; DHH (@dhh) <a href="https://twitter.com/dhh/statuses/374656854825005056">September 2, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## Example Usage

```javascript
(function($, ko) {

  // regex the url must match for this page to 'run'
  var path = /\/users\/new\/?$/i;

  // the micro app for this page
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

