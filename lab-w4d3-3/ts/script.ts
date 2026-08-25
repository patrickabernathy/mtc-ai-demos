// Your code goes here.
const cafe = function () {
    const addItem = function (e: MouseEvent): void {
        let order = document.getElementById('order') as HTMLUListElement;
        let total = document.getElementById('total')!.innerText;

        let target = e.currentTarget as HTMLElement;

        order.innerHTML = order.innerHTML + "<li>" + target.dataset.item + "<button type='button' class='remove' data-price='" + target.dataset.price + "'><i class='fa-solid fa-trash'></i></button></li>";

        total = String(parseFloat(total) + parseFloat(target.dataset.price as string));
        document.getElementById('total')!.innerText = total;

        let removeButtons = document.querySelectorAll<HTMLButtonElement>('.remove');
        removeButtons.forEach(function (btn) {
                btn.removeEventListener('click', removeItem as EventListener);
                btn.addEventListener('click', removeItem as EventListener);
        });
    };

    const clearItems = function (): void {
        let order = document.getElementById('order') as HTMLUListElement;
        let total = document.getElementById('total') as HTMLElement;

        order.innerHTML = "";
        total.innerText = "0.00";
    };

    const removeItem = function (e: MouseEvent): void {
        let order = document.getElementById('order') as HTMLUListElement;
        let target = e.currentTarget as HTMLElement;
        let row = target.parentElement as HTMLElement;

        for (let i = 0; i < order.children.length; i++) {
            if (order.children[i] === row) {
                order.removeChild(order.children[i]);
                break;
            }
        }

        let total = document.getElementById('total')!.innerText;
        total = String(parseFloat(total) - parseFloat(target.dataset.price as string));
        document.getElementById('total')!.innerText = total;
    };

    return {
        init: function (): void {
            console.log('it works');
            let addButtons = document.querySelectorAll<HTMLButtonElement>('.addButton');
            addButtons.forEach(function (btn) {
                btn.addEventListener('click', addItem);
            });

            document.getElementById('clear-order')!.addEventListener('click', clearItems);
        }
    };
};
