class AddSliderTaxonsAndApplyThem < ActiveRecord::Migration
  def up
    tags      = Spree::Taxonomy.create(:name => 'Tags')
    slider    = Spree::Taxon.create({:taxonomy_id => tags.id, :parent_id => tags.root.id, :name => 'Slider'})
    featured  = Spree::Taxon.create({:taxonomy_id => tags.id, :parent_id => tags.root.id, :name => 'Featured'})
    latest    = Spree::Taxon.create({:taxonomy_id => tags.id, :parent_id => tags.root.id, :name => 'Latest'})

    products = Spree::Product.all
    
    if products[6] 
      products[0..6].each do |product|
        product.taxons << slider
      end
    end

    if products[15]
      products[4..15].each do |product|
        product.taxons << featured
      end
 
      products[0..12].each do |product|
        product.taxons << latest
      end
    end
  end

  def down
    Spree::Taxonomy.where(:name => 'Tags').destroy_all
  end
end
