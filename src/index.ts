type UserLog = {
    login: string,
    recados: Recados[],
}

if (localStorage.getItem('usuarioLogado')) {
    window.location.href = 'recados.html'
}

let logar = document.getElementById('logar') as HTMLButtonElement;
logar.addEventListener('click', (e) => {
    e.preventDefault()

    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const log = buscarBdLog()


    let verificarUsuario = log.findIndex((usuario) => usuario.login === email.value && usuario.password === password.value)
    if (verificarUsuario >= 0) {
        const usuarioLogado: UserLog = {
            login: log[verificarUsuario].login,
            recados: log[verificarUsuario].recados,
        }

        salvarDadosLog(usuarioLogado)

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

function buscarBdLog(): Array<User> {
    const usuarios = localStorage.getItem('usuarios') || []

    if (typeof usuarios === 'string') {
        return JSON.parse(usuarios);
    }
    return []
}

function salvarDadosLog(usuarios: UserLog): void {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarios))
}

function mostraDolores(): void {
    let dolores = document.getElementById('doloresAlert') as HTMLImageElement;
    dolores.style.display = 'block'
}

function escondeDolores(): void {
    let dolores = document.getElementById('doloresAlert') as HTMLImageElement;
    dolores.style.display = 'none'
}