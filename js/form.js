const myForm = document.getElementById('contact');
const response = document.getElementById('response');
const tel = document.getElementById('telefone');

tel.addEventListener('keypress', (e) => maskTel(e.target.value))
tel.addEventListener('change', (e) => maskTel(e.target.value)) 

let send = (e) => {
    e.preventDefault();
    const formData = new FormData(myForm);

    fetch('./php/send.php', {
        method: 'POST',
        body: formData
    }).then(function (response) {
        if (response.ok)
            return response.text();
        
        throw new Error('Algo deu errado, tente novamente.')
    }).then(function (text) {
        console.log(text)
        myForm.classList.remove('was-validated');
        myForm.reset();
        message(text, 'success');
    }).catch(function (error) {
        myForm.classList.remove('was-validated');
        message(error, 'danger');
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

let message = (message, type) => {
    response.classList.add('alert');
    if (type === 'success')
        response.classList.add('alert-success');
    else 
        response.classList.add('alert-danger');

    response.innerHTML = `${message} 
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
}// Dispara quando autocompletado o campo

let maskTel = (value) => {
  value = value.replace(/\D/g, "")
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2")
  value = value.replace(/(\d)(\d{4})$/, "$1-$2")
  tel.value = value // Insere o(s) valor(es) no campo
}