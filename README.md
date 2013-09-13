## Spice up your apps with Knockout

<blockquote class="twitter-tweet"><p>JavaScript is like a spice. Best used in sprinkles and moderation.</p>&mdash; DHH (@dhh) <a href="https://twitter.com/dhh/statuses/374656854825005056">September 2, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

### A script to provide help & guidance for using Knockout with Rails

* Much lighter than heavy client side frameworks
* Treats every page as a tiny Knockout app
* Designed to work with the [asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html)
* Designed to Work with [turbo links](https://github.com/rails/turbolinks/)
* Serialize Knockout models into Rails params
* Fill knockout models with JSON data
* Also works for non-Rails projects

Depends on [jQuery](http://jquery.com/) & [Knockout](http://knockoutjs.com/).

## Example

```javascript
// app/assets/javascripts/users_new.js
(function($, ko) {

  var paths = [
    "/users/new",
    "/users/*/edit"
  ];

  // page specific logic
  // only executed when the url matches one of the paths
  var page = new ko.app.Page(paths, function () {

    // add logic to manage the page
    // invoked with page.run

    // sugar for models
    page.model = new ko.app.Model({
      id: ko.observable(),
      name: ko.observable(),
      update: function (form) {
        $.ajax("/users/" + page.model.id(), {
          type: "PUT",
          data: page.model.data("user"), // => { "user[name]": value, ... }
          success: function (data) {
            // do stuff
          }
        });
      }
    });

    // easily fill the model with data
    page.model.fill({
      id: 1,
      name: "Nate Hopkins"
    });

    // get/set values with standard knockout
    page.model.id(); // => 1
    page.model.id(2);

    // sports unobtrusive databinding if that's your thing
    page.bind(page.model, document.body, {
      "#name": "value: name",
      "form": "submit: update"
    });
  });

  $(document).on("ready page:change", page.run);

}(jQuery, ko));
```

## Leverage the asset pipeline to add structure

It's easy to add some structure to your Knockout app.
For example, you might prefer to keep your view models in a separate directory.

Simply create a directory structure resembling something like this.

```
|-project
  |-app
    |-assets
      |-javascript_partials
        |-user_model.js    <----- view model code
      |-javascripts
        |-application.js
        |-users_new.js.erb <----- added .erb for pre-processing
```

Then add an evaluate call to render any JavaScript partials.

```javascript
// app/assets/javascripts/users_new.js.erb

(function($, ko) {

  var page = new ko.app.Page(["/users/new"], function () {

    <%= evaluate "../javascript_partials/user_model.js" %> // <----- render the partial

  });

  $(document).on("ready page:change", page.run);
}(jQuery, ko));
```

__Important__: Be sure to create partials as closures so they can be safely resused.

This approach leverages the asset pipeline to keep your app's source clean & organized.
No need to use heavy client frameworks or [AMD](http://en.wikipedia.org/wiki/Asynchronous_module_definition).


