function Filter(name, allProducts, domDetails){
  this.name = name;
  this.allProducts = allProducts;
  this.sideFilters = domDetails.sideFilters;
  this.productContentArea = domDetails.productContentArea;
  this.subFilters = [];
}

Filter.prototype.AvailableFilter = ['brand', 'color', 'available'];

Filter.prototype.init = function(){
  if(this.name != "available"){
    this.createSubFilter();
    this.createCheckboxForSubFIlters();
  } else {
    this.createAvailableFilter();
  }
  this.sideFilters.append("<hr>");
}

//creating filters
Filter.prototype.createSubFilter = function(){
  var _this = this;
  var uniqueSubFilters = [];
  this.allProducts.forEach(function(element){
    if(!uniqueSubFilters.includes(element[_this.name])){
      uniqueSubFilters.push(element[_this.name]);
    }
  });
  this.subFilters = uniqueSubFilters.sort();
}

Filter.prototype.createCheckboxForSubFIlters = function(){
  var _this = this;
  var list = $("<ol></ol>");
  this.subFilters.forEach(function(element){
    var listItem = $("<li></li>");
    var label = $("<label></label>");
    label.text(element);
    label.attr("for", element);
    var checkbox = $("<input>");
    checkbox.attr({
      type: "checkbox",
      name: _this.name,
      value: element,
      id: element
    });
    checkbox.on("click", $.proxy(_this.checkboxClick, _this));
    listItem.append(label, checkbox);
    list.append(listItem);
  });
  this.sideFilters.append(list);
}

Filter.prototype.createAvailableFilter = function(){
  var _this = this;
  var availableList = $("<p></p>");
  var availableLabel = $("<label></label>");
  availableLabel.text("Available");
  availableLabel.attr("for", "available").css("margin-left", "15px");
  var availableCheckbox = $("<input>");
  availableCheckbox.attr({
    type: "checkbox",
    name: "available",
    value: "0",
    id:"available"
  });
  availableCheckbox.on("click", $.proxy(_this.checkboxClick, _this));
  availableList.append(availableLabel, availableCheckbox);
  this.sideFilters.append(availableList);
}

//on clicking
Filter.prototype.checkboxClick = function(){
  var result = this.allProducts;
  for(var filterNum = 0; filterNum < this.AvailableFilter.length; filterNum++){
    var selected = this.findSelectedCheckboxes(this.AvailableFilter[filterNum]);
    if(selected.length > 0){
      result = this.productsInPresentFilter(selected, result, this.AvailableFilter[filterNum]);
      if(!result.length){ break; }
    }
  }
  Product.show(0, this.allProducts.length-1, result, this.productContentArea);
}

Filter.prototype.findSelectedCheckboxes = function(presentFilter){
  return $("input:checked")
    .filter("[name=" + presentFilter + "]")
    .map(function(){ return this.value; })
    .get();
}

Filter.prototype.productsInPresentFilter = function(selected, result, presentFilter){
  var presentValues = [];
  for(var productNum = 0; productNum < result.length; productNum++){
    if(selected.includes(result[productNum][presentFilter])){
      presentValues.push(result[productNum]);
    }
  }
  return presentValues;
}
