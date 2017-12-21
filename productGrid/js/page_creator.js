function ProductPageCreator(domDetails){
  this.allProducts = [];
  this.allProductsShowing = this.allProducts;
  this.sideFilters = domDetails.filter;
  this.productContentArea = domDetails.productContentArea;
}
ProductPageCreator.prototype.init = function(){
  this.getJsonData();
}
ProductPageCreator.prototype.getJsonData = function(){
  var _this = this;
  $.ajax({
    url: "product.json",
    context: _this,
    dataType: "json"
  }).done(_this.onJsonSuccess);
};

ProductPageCreator.prototype.onJsonSuccess = function(data){
  var _this = this;
  $.each(data, function(key, value){
    _this.createProduct(value);
  });
  this.createSideFilter();
  Product.showProducts(0, this.allProducts.length - 1, this.allProductsShowing, this.productContentArea);
}

ProductPageCreator.prototype.createProduct = function(value){
  var product = new Product(value);
  this.allProducts.push(product);
}

ProductPageCreator.prototype.createSideFilter = function(){
  var domDetails = {
    sideFilters: this.sideFilters,
    productContentArea: this.productContentArea
  }
  var brandFilter = new Filter("brand", this.allProducts, domDetails);
  brandFilter.init();

  var colorFilter = new Filter("color", this.allProducts, domDetails);
  colorFilter.init();

  var soldFilter = new Filter("available", this.allProducts, domDetails);
  soldFilter.init();
}
///////////////////////////////////////////////////////////
$(document).ready(function(){
  var domDetails = {
    productContentArea: $("#content"),
    filter: $("#filters")
  }
  var productPageCreator = new ProductPageCreator(domDetails);
  productPageCreator.init();
})
