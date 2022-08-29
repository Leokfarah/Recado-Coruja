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
            mostraLuna()
            setTimeout(() => {
                escondeLuna()
            }, 3000)
            reset(email, password, password2)
            setTimeout(() => {
                window.location.href = 'index.html'
            }, 3000)
        }
    }
})

const showDumbledoreAlert = document.getElementById('newPassword')
showDumbledoreAlert.addEventListener('focus', mostraDumbledore)

const hideDumbledoreAlert = document.getElementById('newPassword')
hideDumbledoreAlert.addEventListener('blur', escondeDumbledore)

const hideDumbledorePass = document.getElementById('dumbledoreBtn')
hideDumbledorePass.addEventListener('click', escondeDumbledorePass)

function verificarEmail(email) {
    let existe = usuarios.some((valor) => valor.login === email.value)

    if (existe) {
        mostraMcgonagall3()
        setTimeout(() => {
            escondeMcgonagall3()
        }, 3000)
        return false
    }

    return true
}

function validarDados(email, password, password2) {

    if (!email) {
        mostraMcgonagall1()
        setTimeout(() => {
            escondeMcgonagall1()
        }, 3000)
        return false
    }

    if (!password.length) {
        mostraHermione1()
        setTimeout(() => {
            escondeHermione1()
        }, 3000)
        return false
    }

    if (!password2.length) {
        mostraHermione2()
        setTimeout(() => {
            escondeHermione2()
        }, 3000)
        return false
    }

    if (password !== password2) {
        mostraHermione3()
        setTimeout(() => {
            escondeHermione3()
        }, 3000)
        return false
    }

    if (email.match(/\S+@\S+\.\S/)) {
        if (password.match(/^(?=.*[!#@$%&'.\-\*\_\,/~`\[\{\}\]=+|:;"\\^(\)´])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{4,}$/)) {
            return true
        } else {
            mostraDumbledore()
            setTimeout(() => {
                escondeDumbledore()
            }, 5000)
            return false
        }
    } else {
        mostraMcgonagall2()
        setTimeout(() => {
            escondeMcgonagall2()
        }, 3000)
        return false
    }

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

function mostraDumbledore() {
    document.getElementById('dumbledoreAlert').style.display = 'block'
}
function escondeDumbledore() {
    document.getElementById('dumbledoreAlert').style.display = 'none'
}

function escondeDumbledorePass() {
    document.getElementById('dumbledoreBox').style.display = 'none'
}

function mostraMcgonagall1() {
    document.getElementById('mcgonagallAlert1').style.display = 'block'
}
function escondeMcgonagall1() {
    document.getElementById('mcgonagallAlert1').style.display = 'none'
}

function mostraMcgonagall2() {
    document.getElementById('mcgonagallAlert2').style.display = 'block'
}
function escondeMcgonagall2() {
    document.getElementById('mcgonagallAlert2').style.display = 'none'
}

function mostraMcgonagall3() {
    document.getElementById('mcgonagallAlert3').style.display = 'block'
}
function escondeMcgonagall3() {
    document.getElementById('mcgonagallAlert3').style.display = 'none'
}

function mostraHermione1() {
    document.getElementById('hermioneAlert1').style.display = 'block'
}
function escondeHermione1() {
    document.getElementById('hermioneAlert1').style.display = 'none'
}

function mostraHermione2() {
    document.getElementById('hermioneAlert2').style.display = 'block'
}
function escondeHermione2() {
    document.getElementById('hermioneAlert2').style.display = 'none'
}

function mostraHermione3() {
    document.getElementById('hermioneAlert3').style.display = 'block'
}
function escondeHermione3() {
    document.getElementById('hermioneAlert3').style.display = 'none'
}

function mostraLuna() {
    document.getElementById('lunaAlert').style.display = 'block'
}
function escondeLuna() {
    document.getElementById('lunaAlert').style.display = 'none'
}