
// coollection data
let title = document.getElementById("titile");
let priceInput = document.getElementById("price");
let taxesInput = document.getElementById("taxes");
let adsInput = document.getElementById("ads");
let discountInput = document.getElementById("discount");
let countInput  = document.getElementById("count");
let categoryInput = document.getElementById("category");
let createButton = document.getElementById("submit");
let total = document.getElementById("total");

// create mood button
let moodBtn = "create";

// create global variable
let globalVariable;

// create function get totoal

function getTotal() {
  
    if(priceInput.value != '') {
         
        let result = (+priceInput.value + +taxesInput.value + +adsInput.value)  - +discountInput.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#040';
    } else {
        total.innerHTML = '';
        total.style.backgroundColor = '#c90d00';
    }
}


// create prdouct

// check if local storage is null
let dataProduct;

if(localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
} else {
     dataProduct = []; 
}

// create prdouct
createButton.onclick = function() {

    // create object include data on product
    let newProductObject = {
          titile: title.value,
          price: priceInput.value,
          taxes: taxesInput.value,
          ads: adsInput.value,
          discount: discountInput.value,
          total: total.innerHTML,
          count: countInput.value,
          category: categoryInput.value
    }

    if(moodBtn === "create") {
        if(newProductObject.count > 1) {
            for(let i = 0 ; i < newProductObject.count; i++) {
                dataProduct.push(newProductObject);
            }
        } else {
            dataProduct.push(newProductObject);
        }
    }  else {
                dataProduct[globalVariable] = newProductObject;
                moodBtn = "create";
                createButton.innerHTML = "create";
                countInput.style.display = 'none';
    }
    

    localStorage.setItem('product',JSON.stringify(dataProduct));

    // trigger function show data
    showData()

    // trigger function clear text in input
    clearData()
}


// show data in body
function showData() {
  
    let table = '';
    for(let i = 0; i < dataProduct.length; i++) {
        table += `
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].titile}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="udpdate">update</button></td>
                <td><button onclick="clearOneProduct(${i})" id="delete">delete</button></td>
            </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;
}

// trigger function to prevent delete after reload 
showData();

// clear text in input
function clearData() {
    title.value = '';
    priceInput.value = '';
    adsInput.value = '';
    taxesInput.value = '';
    discountInput.value = '';
    countInput.value = '';
    categoryInput.value = '';
    total.innerHTML = '';
}

// clear data for one product
function clearOneProduct(i) {
   dataProduct.splice(i,1);
   localStorage.product = JSON.stringify(dataProduct);

   // trigger function to update data
   showData();
}

// update produt
function updateProduct(index) {
    title.value = dataProduct[index].titile;
    priceInput.value = dataProduct[index].price;
    adsInput.value = dataProduct[index].ads;
    taxesInput.value = dataProduct[index].taxes;
    discountInput.value = dataProduct[index].discount;
    getTotal();
    countInput.style.display = 'none';
    categoryInput.value = dataProduct[index].category;
    createButton.innerHTML = 'Update';
    
    moodBtn = "update";
    globalVariable = index;
    scroll({
        top:0,
    })
}


// search on product
let searchMoood = 'title';

function getSearchMood(id) {

    let search = document.getElementById('search');
    if(id == 'title') {
         searchMoood = 'title';
    }  else {
        searchMoood = 'category';
    }
    search.focus();
    search.value = '';
    showData();
}

// create function search
function searchData(value) {
    let table = '';
    if(searchMoood == 'title') {

        for(let i = 0; i < dataProduct.length; i++) {

            if(dataProduct[i].titile.includes(value)) {
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].titile}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="udpdate">update</button></td>
                <td><button onclick="clearOneProduct(${i})" id="delete">delete</button></td>
            </tr>
        `;
            }
        }
    } else {
        for(let i = 0; i < dataProduct.length; i++) {

            if(dataProduct[i].category.includes(value)) {
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].titile}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="udpdate">update</button></td>
                <td><button onclick="clearOneProduct(${i})" id="delete">delete</button></td>
            </tr>
        `;
            }
        }

    }
    document.getElementById('tbody').innerHTML = table;
}