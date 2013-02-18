class AddSliderTaxonsAndApplyThem < ActiveRecord::Migration
  def up
    tags      = Spree::Taxonomy.create(:name => 'Tags')
    slider    = Spree::Taxon.create({:taxonomy_id => tags.id, :name => 'Slider'})
    featured  = Spree::Taxon.create({:taxonomy_id => tags.id, :name => 'Featured'})
    latest    = Spree::Taxon.create({:taxonomy_id => tags.id, :name => 'Latest'})

    products = Spree::Product.all
    
    if products[6] 
      products[0..6].each do |product|
        product.taxons << slider
      end
    end

    if products[16]
      products[4..16].each do |product|
        product.taxons << featured
      end
 
      products[0..12].each do |product|
        product.taxons << latest
      end
    end
  end

  def down
    Spree::Taxonomy.where(:name => 'Tags').first.destroy()
  end
end
