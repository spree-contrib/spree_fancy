SpreeFancy
==========

Fancy theme to be applied to base Spree install. Its intended as a starting point to show how a barebones Spree install can be easily modified to give a nice look in feel. Special bonus is its fully responsive and looks good on mobile devices.

If you'd like to see the theme in action, you can register for your own personal [online sandbox](http://spreecommerce.com/demo) which uses the same theme.

Installation
============

Themes in Spree are typically implemented as [Spree extensions](http://guides.spreecommerce.com/extensions.html). To use the theme you will need an existing Spree application running Spree version 1.3 or higher. If you are unsure of how to do this you can find instructions on how to create a simple Spree application in the [Spree README](https://github.com/spree/spree).

Once you have a rails application running Spree, its a simple three step process to install the spree_fancy extension.  First, add the gem to your `Gemfile`:

```
gem 'spree_fancy', :github => 'spree/spree_fancy', :branch => '1-3-stable'
```

Then install the gem via Bundler:

```
$ bundle install
```

Finally, you need to copy over the migrations from the extension into your application, and set up asset pipeline require statements for `spree_fancy`:

```
$ bundle exec rails g spree_fancy:install
```


Testing
-------

Be sure to bundle your dependencies and then create a dummy test app for the specs to run against.

    $ bundle
    $ bundle exec rake test_app
    $ bundle exec rspec spec

Copyright (c) 2012-2013 Spree Commerce Inc., released under the New BSD License
