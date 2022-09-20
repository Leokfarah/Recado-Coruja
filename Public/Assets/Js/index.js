"use strict";
if (localStorage.getItem('usuarioLogado')) {
    window.location.href = 'recados.html';
}
let logar = document.getElementById('logar');
logar.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const log = buscarBdLog();
    let verificarUsuario = log.findIndex((usuario) => usuario.login === email.value && usuario.password === password.value);
    if (verificarUsuario >= 0) {
        const usuarioLogado = {
            login: log[verificarUsuario].login,
            recados: log[verificarUsuario].recados,
        };
        salvarDadosLog(usuarioLogado);
        setTimeout(() => {
            window.location.href = 'recados.html';
        }, 1000);
    }
    else {
        mostraDolores();
        setTimeout(() => {
            escondeDolores();
        }, 5000);
    }
});
function buscarBdLog() {
    const usuarios = localStorage.getItem('usuarios') || [];
    if (typeof usuarios === 'string') {
        return JSON.parse(usuarios);
    }
    return [];
}
function salvarDadosLog(usuarios) {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarios));
}
function mostraDolores() {
    let dolores = document.getElementById('doloresAlert');
    dolores.style.display = 'block';
}
function escondeDolores() {
    let dolores = document.getElementById('doloresAlert');
    dolores.style.display = 'none';
}
