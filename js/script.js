var productNameInp = document.getElementById("productName"),
  productCategoryInp = document.getElementById("productCategory"),
  productPriceInp = document.getElementById("productPrice"),
  productDescriptionInp = document.getElementById("productDescription"),
  mainBtn = document.getElementById("mainBtn"),
  cancelBtn = document.getElementById("cancelBtn"),
  searchInp = document.getElementById("searchInp"),
  tbody = document.getElementById("tbody");
//ANCHOR check if local storage is empty
if (localStorage.getItem("productData") != null) {
  var productsList = JSON.parse(localStorage.getItem("productData"));
} else {
  var productsList = [];
}
displayProduct();
//ANCHOR create product operation function
function addProduct() {
  var product = {
    productName: productNameInp.value,
    productCat: productCategoryInp.value,
    productPrice: Number(productPriceInp.value),
    productDesc: productDescriptionInp.value
  };
  productsList.push(product);
  localStorage.setItem("productData", JSON.stringify(productsList));
  displayProduct();
  cleanForm();
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
  productsList[x].productName = productNameInp.value;
  productsList[x].productCat = productCategoryInp.value;
  productsList[x].productPrice = productPriceInp.value;
  productsList[x].productDesc = productDescriptionInp.value;
  mainBtn.setAttribute("onclick", `addProduct();`);
  mainBtn.innerHTML = "Add Product";
  cancelBtn.style.visibility = "hidden";
  localStorage.setItem("productData", JSON.stringify(productsList));
  displayProduct();
  cleanForm();
}
//ANCHOR cancel update function
function cancelUpdate() {
  productNameInp.value = "";
  productCategoryInp.value = "";
  productPriceInp.value = "";
  productDescriptionInp.value = "";
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