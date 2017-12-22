function Product(value){
  this.brand = value.brand;
  this.color = value.color;
  this.name = value.name;
  this.available = value.sold_out;
  this.url = value.url;
}

Product.show = function(visibleProducts, productContentArea){
  productContentArea.empty();
  var _this = this;
  visibleProducts.forEach(function(element){
    var productDiv = $("<div></div>").addClass("product-class");
    var productImg = $("<img>").attr("src", "images/" + element.url).addClass("image-class");
    productDiv.append(productImg);
    productContentArea.append(productDiv);
  });
}
