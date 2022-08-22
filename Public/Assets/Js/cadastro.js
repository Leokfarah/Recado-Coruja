let formularioHTML = document.getElementById('formulario');
let usuarios = buscarBd();

document.getElementById('criarAcc').addEventListener('click', (e) => {
    e.preventDefault()

    const email = document.getElementById('newEmail')
    const password = document.getElementById('newPassword')
    const password2 = document.getElementById('newPassword2')


    if (verificarEmail(email)) {

        if (validarDados(email.value, password.value, password2.value)) {
            const usuario = {
                login: email.value,
                password: password.value,
                recados: [],
            }

            usuarios.push(usuario)
            salvarDados(usuarios)
            alert("Conta criada com sucesso!")
            reset(email, password, password2)
            setTimeout(() => {
                window.location.href = 'index.html'
            }, 1000)
        }
    }
})


function verificarEmail(email) {
    let existe = usuarios.some((valor) => valor.login === email.value)

    if (existe) {
        alert("Email já utilizado")
        return false
    }

    return true
}

function validarDados(email, password, password2) {

    if (!email) {
        alert("Você deve preencher o email")
        return false
    }

    if (!password.length) {
        alert("Você deve preencher sua senha")
        return false
    }

    if (!password2.length) {
        alert("Você deve repetir sua senha")
        return false
    }

    if (password !== password2) {
        alert("As senhas não conferem")
        return false
    }

    return true
}

function salvarDados(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
}

function buscarBd() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    return usuarios
}

function reset(email, password, password2) {
    email.value = ''
    password.value = ''
    password2.value = ''
}