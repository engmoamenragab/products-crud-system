var productNameInp = document.getElementById("productName"),
  productCategoryInp = document.getElementById("productCategory"),
  productPriceInp = document.getElementById("productPrice"),
  productDescriptionInp = document.getElementById("productDescription"),
  productNameAlert = document.querySelector(".productNameRow .form-alert"),
  productCategoryAlert = document.querySelector(".productCategoryRow .form-alert"),
  productPriceAlert = document.querySelector(".productPriceRow .form-alert"),
  productDescriptionAlert = document.querySelector(".productDescriptionRow .form-alert"),
  productBtnsAlert = document.querySelector(".productBtnsRow .form-alert"),
  mainBtn = document.getElementById("mainBtn"),
  cancelBtn = document.getElementById("cancelBtn"),
  searchInp = document.getElementById("searchInp"),
  tbody = document.getElementById("tbody"),
  productNameInpValue,
  productCategoryInpValue,
  productPriceInpValue,
  productDescriptionInpValue;
//ANCHOR check if local storage is empty
if (localStorage.getItem("productData") != null) {
  var productsList = JSON.parse(localStorage.getItem("productData"));
} else {
  var productsList = [];
}
displayProduct();
//ANCHOR create product operation function
function addProduct() {
  productNameInpValue = productNameInp.value;
  productCategoryInpValue = productCategoryInp.value;
  productPriceInpValue = productPriceInp.value;
  productDescriptionInpValue = productDescriptionInp.value;
  if (productNameInpValue != "" && productCategoryInpValue != "" && productPriceInpValue != "" && productDescriptionInpValue != "") {
    if (validateProductName() && validateProductCategory() && validateProductPrice() && validateProductDescription()) {
      var product = {
        productName: productNameInp.value,
        productCat: productCategoryInp.value,
        productPrice: Number(productPriceInp.value),
        productDesc: productDescriptionInp.value
      };
      productBtnsAlert.classList.add("d-none");
      productsList.push(product);
      localStorage.setItem("productData", JSON.stringify(productsList));
      displayProduct();
      cleanForm();
      clearProductNameValidation();
      clearProductCategoryValidation();
      clearProductPriceValidation();
      clearProductDescriptionValidation();
    }
  } else {
    productBtnsAlert.classList.remove("d-none");
  }
}
//ANCHOR clean form
function cleanForm() {
  productNameInp.value = "";
  productCategoryInp.value = "";
  productPriceInp.value = "";
  productDescriptionInp.value = "";
}
//ANCHOR display product
function displayProduct() {
  var trs = "";
  for (var i = 0; i < productsList.length; i++) {
    trs += `<tr><td>${i}</td>
        <td>${productsList[i].productName}</td>
        <td>${productsList[i].productCat}</td>
        <td>${productsList[i].productPrice}</td>
        <td>${productsList[i].productDesc}</td>
        <td><button onclick="updateProduct(${i});" class="btn btn-warning"><i class="fas fa-edit"></i></button></td>
        <td><button onclick="deleteProduct(${i});" class="btn btn-danger"><i class="fas fa-trash"></i></button></td></tr>`;
  }
  tbody.innerHTML = trs;
}
//ANCHOR delet product function
function deleteProduct(x) {
  productsList.splice(x, 1);
  localStorage.setItem("productData", JSON.stringify(productsList));
  displayProduct();
}
//ANCHOR update product function
function updateProduct(x) {
  productNameInp.value = productsList[x].productName;
  productCategoryInp.value = productsList[x].productCat;
  productPriceInp.value = productsList[x].productPrice;
  productDescriptionInp.value = productsList[x].productDesc;
  mainBtn.setAttribute("onclick", `updateProductBtn(${x});`);
  mainBtn.innerHTML = "Update Product";
  cancelBtn.style.visibility = "visible";
}
//ANCHOR update product btn function
function updateProductBtn(x) {
  productNameInpValue = productNameInp.value;
  productCategoryInpValue = productCategoryInp.value;
  productPriceInpValue = productPriceInp.value;
  productDescriptionInpValue = productDescriptionInp.value;
  if (productNameInpValue != "" && productCategoryInpValue != "" && productPriceInpValue != "" && productDescriptionInpValue != "") {
    if (validateProductName() && validateProductCategory() && validateProductPrice() && validateProductDescription()) {
      productsList[x].productName = productNameInpValue;
      productsList[x].productCat = productCategoryInpValue;
      productsList[x].productPrice = productPriceInpValue;
      productsList[x].productDesc = productDescriptionInpValue;
      mainBtn.setAttribute("onclick", `addProduct();`);
      mainBtn.innerHTML = "Add Product";
      cancelBtn.style.visibility = "hidden";
      localStorage.setItem("productData", JSON.stringify(productsList));
      displayProduct();
      cleanForm();
      clearProductNameValidation();
      clearProductCategoryValidation();
      clearProductPriceValidation();
      clearProductDescriptionValidation();
      productBtnsAlert.classList.add("d-none");
    }
  } else {
    productBtnsAlert.classList.remove("d-none");
  }
}
//ANCHOR cancel update function
function cancelUpdate() {
  cleanForm();
  clearProductNameValidation();
  clearProductCategoryValidation();
  clearProductPriceValidation();
  clearProductDescriptionValidation();
  productBtnsAlert.classList.add("d-none");
  mainBtn.setAttribute("onclick", `addProduct();`);
  mainBtn.innerHTML = "Add Product";
  cancelBtn.style.visibility = "hidden";
}
//ANCHOR real time search
function realTimeSearch() {
  var searchedWord = searchInp.value.toLowerCase();
  var trs = "";
  for (var i = 0; i < productsList.length; i++) {
    if (productsList[i].productName.toLowerCase().includes(searchedWord) && searchedWord !== "") {
      var text = productsList[i].productName;
      var regexText = new RegExp(searchedWord, "gi");
      console.log(regexText);
      var newText = text.replace(regexText, `<mark style="padding: 0; background-color: yellow;">${searchedWord}</mark>`);
      trs += `<tr><td>${i}</td>
        <td>${newText}</td>
        <td>${productsList[i].productCat}</td>
        <td>${productsList[i].productPrice}</td>
        <td>${productsList[i].productDesc}</td>
        <td><button onclick="updateProduct(${i});" class="btn btn-warning"><i class="fas fa-edit"></i></button></td>
        <td><button onclick="deleteProduct(${i});" class="btn btn-danger"><i class="fas fa-trash"></i></button></td></tr>`;
    } else if (productsList[i].productName.toLowerCase().includes(searchedWord)) {
      trs += `<tr><td>${i}</td>
        <td>${productsList[i].productName}</td>
        <td>${productsList[i].productCat}</td>
        <td>${productsList[i].productPrice}</td>
        <td>${productsList[i].productDesc}</td>
        <td><button onclick="updateProduct(${i});" class="btn btn-warning"><i class="fas fa-edit"></i></button></td>
        <td><button onclick="deleteProduct(${i});" class="btn btn-danger"><i class="fas fa-trash"></i></button></td></tr>`;
    }
  }
  tbody.innerHTML = trs;
}
//ANCHOR validate product name function
function validateProductName() {
  var productNameRegex = /^[A-Z][a-z ]{3,20}$/;
  productNameInpValue = productNameInp.value;
  validateProductNameRegex = productNameRegex.test(productNameInpValue);
  if (validateProductNameRegex == true) {
    productNameInp.classList.add("is-valid");
    productNameInp.classList.remove("is-invalid");
    productNameAlert.classList.add("d-none");
    return true;
  } else {
    productNameInp.classList.remove("is-valid");
    productNameInp.classList.add("is-invalid");
    productNameAlert.classList.remove("d-none");
    return false;
  }
}
//ANCHOR clear product name validation function
function clearProductNameValidation() {
  productNameInpValue = productNameInp.value;
  if (productNameInpValue == "") {
    productNameInp.classList.remove("is-valid");
    productNameInp.classList.remove("is-invalid");
    productNameAlert.classList.add("d-none");
    return true;
  }
}
//ANCHOR connect clear product name validation function with product name input
productNameInp.addEventListener("keyup", validateProductName);
//ANCHOR connect clear validate product name function with product name input
productNameInp.addEventListener("blur", clearProductNameValidation);
//ANCHOR validate product category function
function validateProductCategory() {
  var productCategoryRegex = /^[A-Z][a-z ]{3,20}$/;
  productCategoryInpValue = productCategoryInp.value;
  validateProductCategoryRegex = productCategoryRegex.test(productCategoryInpValue);
  if (validateProductCategoryRegex == true) {
    productCategoryInp.classList.add("is-valid");
    productCategoryInp.classList.remove("is-invalid");
    productCategoryAlert.classList.add("d-none");
    return true;
  } else {
    productCategoryInp.classList.remove("is-valid");
    productCategoryInp.classList.add("is-invalid");
    productCategoryAlert.classList.remove("d-none");
    return false;
  }
}
//ANCHOR clear product category validation function
function clearProductCategoryValidation() {
  productCategoryInpValue = productCategoryInp.value;
  if (productCategoryInpValue == "") {
    productCategoryInp.classList.remove("is-valid");
    productCategoryInp.classList.remove("is-invalid");
    productCategoryAlert.classList.add("d-none");
    return true;
  }
}
//ANCHOR connect clear product category validation function with product category input
productCategoryInp.addEventListener("keyup", validateProductCategory);
//ANCHOR connect clear validate product category function with product category input
productCategoryInp.addEventListener("blur", clearProductCategoryValidation);
//ANCHOR validate product price function
function validateProductPrice() {
  var productPriceRegex = /^([1-9][0-9]{3}|[1-4][0-9]{4}|50000)$/;
  productPriceInpValue = productPriceInp.value;
  validateProductPriceRegex = productPriceRegex.test(productPriceInpValue);
  if (validateProductPriceRegex == true) {
    productPriceInp.classList.add("is-valid");
    productPriceInp.classList.remove("is-invalid");
    productPriceAlert.classList.add("d-none");
    return true;
  } else {
    productPriceInp.classList.remove("is-valid");
    productPriceInp.classList.add("is-invalid");
    productPriceAlert.classList.remove("d-none");
    return false;
  }
}
//ANCHOR clear product price validation function
function clearProductPriceValidation() {
  productPriceInpValue = productPriceInp.value;
  if (productPriceInpValue == "") {
    productPriceInp.classList.remove("is-valid");
    productPriceInp.classList.remove("is-invalid");
    productPriceAlert.classList.add("d-none");
    return true;
  }
}
//ANCHOR connect clear product price validation function with product price input
productPriceInp.addEventListener("keyup", validateProductPrice);
//ANCHOR connect clear validate product price function with product price input
productPriceInp.addEventListener("blur", clearProductPriceValidation);
//ANCHOR validate product description function
function validateProductDescription() {
  var productDescriptionRegex = /^[A-Z]?[A-Za-z ]{3,20}$/;
  productDescriptionInpValue = productDescriptionInp.value;
  validateProductDescriptionRegex = productDescriptionRegex.test(productDescriptionInpValue);
  if (validateProductDescriptionRegex == true) {
    productDescriptionInp.classList.add("is-valid");
    productDescriptionInp.classList.remove("is-invalid");
    productDescriptionAlert.classList.add("d-none");
    return true;
  } else {
    productDescriptionInp.classList.remove("is-valid");
    productDescriptionInp.classList.add("is-invalid");
    productDescriptionAlert.classList.remove("d-none");
    return false;
  }
}
//ANCHOR clear product description validation function
function clearProductDescriptionValidation() {
  productDescriptionInpValue = productDescriptionInp.value;
  if (productDescriptionInpValue == "") {
    productDescriptionInp.classList.remove("is-valid");
    productDescriptionInp.classList.remove("is-invalid");
    productDescriptionAlert.classList.add("d-none");
    return true;
  }
}
//ANCHOR connect clear product description validation function with product description input
productDescriptionInp.addEventListener("keyup", validateProductDescription);
//ANCHOR connect clear validate product description function with product description input
productDescriptionInp.addEventListener("blur", clearProductDescriptionValidation);