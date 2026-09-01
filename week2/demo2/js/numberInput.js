const numberInput = function () {
    const input = document.getElementById("phone");
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

    function handleNumericKeydown(event) {
        console.log(event);
        if (allowedKeys.includes(event.key)) {
            return;
        }

        if (!/^[0-9]$/.test(event.key)) {
            event.preventDefault();
        }
    }

    return {
        init: function () {
            input.addEventListener("keydown", handleNumericKeydown);
        }
    }
}()


