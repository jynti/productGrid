function Product(value){
  this.brand = value.brand;
  this.color = value.color;
  this.name = value.name;
  this.available = value.sold_out;
  this.url = value.url;
}
Product.showProducts = function(from, to, visibleProducts, productContentArea){
  productContentArea.empty();
  var _this = this;
  visibleProducts.forEach(function(element){
      var productDiv = $("<div></div>");
      productDiv.addClass("product-class");
      var productImg = $("<img>");
      productImg.attr({
        "src": "images/"+ element.url
      });
      productImg.addClass("image-class");
      productDiv.append(productImg);
      productContentArea.append(productDiv);
  });
}
