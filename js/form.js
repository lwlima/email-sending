const myForm = document.getElementById('contact');

let validate = (() => {
    myForm.addEventListener('submit', function (e) {
        if (!myForm.checkValidity()) {
            e.preventDefault();
            e.stopPropagation()
        }
        myForm.classList.add('was-validated')
    })
})()