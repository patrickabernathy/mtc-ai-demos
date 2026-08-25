// Your code goes here.
const cafe = function () {
    const addItem = function (e) {
        let order = document.getElementById('order');
        let total = document.getElementById('total').innerText;        

        order.innerHTML = order.innerHTML + "<li>" + e.currentTarget.dataset.item + "<button type='button' class='remove' data-price='" + e.currentTarget.dataset.price + "'><i class='fa-solid fa-trash'></i></button></li>";
        
        total = parseFloat(total) + parseFloat(e.currentTarget.dataset.price);
        document.getElementById('total').innerText = total;

        let removeButtons = document.querySelectorAll('.remove')
        removeButtons.forEach(function (btn) {
                btn.removeEventListener ('click', removeItem)
                btn.addEventListener ('click', removeItem)
        });
    };

    const clearItems = function () {
        let order = document.getElementById('order');
        let total = document.getElementById('total');  

        order.innerHTML = "";
        total.innerText = "0.00"
    };

    const removeItem = function (e) {
        let order = document.getElementById('order');
        let row = e.currentTarget.parentElement;

        for (let i = 0; i < order.children.length; i++) {
            if (order.children[i] === row) {
                order.removeChild(order.children[i]);
                break;
            }
        }

        let total = document.getElementById('total').innerText;
        total = parseFloat(total) - parseFloat(e.currentTarget.dataset.price);
        document.getElementById('total').innerText = total;
    }

    return {
        init: function () {
            console.log('it works');
            let addButtons = document.querySelectorAll('.addButton');
            addButtons.forEach(function (btn) {
                btn.addEventListener('click', addItem)
            });

            document.getElementById('clear-order').addEventListener('click', clearItems);            
        }
    }
}