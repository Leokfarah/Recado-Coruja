if (localStorage.getItem('usuarioLogado')) {
    window.location.href = 'recados.html'
}

document.getElementById('logar').addEventListener('click', (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const log = buscarBd()


    let verificarUsuario = log.findIndex((usuario) => usuario.login === email && usuario.password === password)
    if (verificarUsuario >= 0) {
        const usuarioLogado = {
            login: log[verificarUsuario].login,
            recados: log[verificarUsuario].recados,
        }

        salvarDados(usuarioLogado)

        setTimeout(() => {
            window.location.href = 'recados.html'
        }, 1000)

    } else {
        mostraDolores()
        setTimeout(() => {
            escondeDolores()
        }, 5000)
    }
})

function buscarBd() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    return usuarios
}

function salvarDados(usuarios) {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarios))
}

function mostraDolores() {
    document.getElementById('doloresAlert').style.display = 'block'
}
function escondeDolores() {
    document.getElementById('doloresAlert').style.display = 'none'
}