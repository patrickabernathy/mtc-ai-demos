const email = function () {
  const input = document.getElementById("email");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  function handleEmailBlur(event) {
    console.log(event);
    const isValid = emailPattern.test(event.target.value);
    console.log(helpers.stringUppercase(isValid ? "valid" : "invalid"));
  }

  return {
    init: function () {
      input.addEventListener("blur", handleEmailBlur);
    }
  }
}()
