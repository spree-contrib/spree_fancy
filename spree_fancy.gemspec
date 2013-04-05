Gem::Specification.new do |s|
  s.platform    = Gem::Platform::RUBY
  s.name        = 'spree_fancy'
  s.version     = '1.3.0'
  s.summary     = 'Fancy Spree Theme'
  s.description = 'Fancy theme to apply to out of the box Spree so it looks a bit nicer. Use it as a starting point.'
  s.required_ruby_version = '>= 1.8.7'

  s.author    = 'Alexey Topolyanskiy'
  s.email     = 'devilcoders@gmail.com'
  s.homepage  = 'http://www.spreecommerce.com'

  #s.files       = `git ls-files`.split("\n")
  #s.test_files  = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.require_path = 'lib'
  s.requirements << 'none'

  s.add_dependency 'spree_core', '~> 2.0.0.beta'
  s.add_dependency 'compass-rails'

  s.add_development_dependency 'capybara', '1.0.1'
  s.add_development_dependency 'factory_girl', '~> 2.6.4'
  s.add_development_dependency 'ffaker'
  s.add_development_dependency 'rspec-rails',  '~> 2.9'
  s.add_development_dependency 'sqlite3'
end
