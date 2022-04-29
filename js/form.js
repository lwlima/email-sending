const myForm = document.getElementById('contact');

let send = (e) => {
    e.preventDefault();
    const formData = new FormData(myForm);

    fetch('./php/send.php', {
        method: 'post',
        body: formData
    }).then(function (response) {
        if (response.ok) {
            return response.text();
        }
        throw new Error('Algo deu errado, tente novamente.')
    }).then(function (text) {
        console.log(text)
        myForm.classList.remove('was-validated');
        myForm.reset();
    }).catch(function (error) {
        myForm.classList.remove('was-validated');
        console.log(error);
    })
}

let validate = (() => {
    myForm.addEventListener('submit', function (e) {
        if (!myForm.checkValidity()) {
            e.preventDefault();
            e.stopPropagation()
        } else {
            send(e);
        }
        myForm.classList.add('was-validated')
    })
})()