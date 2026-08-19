
const input = document.getElementById("fullName");
const button = document.getElementById("submit");

function priceWithTax(price) {
return price * 1.08;
}


button.addEventListener("click", function () {
//alert(input.value);
let total = priceWithTax('bob');
alert(total);
});
