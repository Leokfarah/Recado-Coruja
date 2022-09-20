"use strict";
let formularioHTML = document.getElementById('formulario');
let usuarios = buscarBd();
let criarAcc = document.getElementById('criarAcc');
criarAcc.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('newEmail');
    const password = document.getElementById('newPassword');
    const password2 = document.getElementById('newPassword2');
    const emailOk = verificarEmail(email.value);
    if (emailOk) {
        if (validarDados(email.value, password.value, password2.value)) {
            const usuario = {
                login: email.value,
                password: password.value,
                recados: [],
            };
            usuarios.push(usuario);
            salvarDados(usuarios);
            mostraLuna();
            setTimeout(() => {
                escondeLuna();
            }, 3000);
            resetCampos(email.value, password.value, password2.value);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
    }
});
const showDumbledoreAlert = document.getElementById('newPassword');
showDumbledoreAlert.addEventListener('focus', mostraDumbledore);
const hideDumbledoreAlert = document.getElementById('newPassword');
hideDumbledoreAlert.addEventListener('blur', escondeDumbledore);
function verificarEmail(email) {
    let existe = usuarios.some((valor) => valor.login === email);
    if (existe) {
        mostraMcgonagall3();
        setTimeout(() => {
            escondeMcgonagall3();
        }, 3000);
        return false;
    }
    return true;
}
function validarDados(email, password, password2) {
    if (!email) {
        mostraMcgonagall1();
        setTimeout(() => {
            escondeMcgonagall1();
        }, 3000);
        return false;
    }
    if (!password.length) {
        mostraHermione1();
        setTimeout(() => {
            escondeHermione1();
        }, 3000);
        return false;
    }
    if (!password2.length) {
        mostraHermione2();
        setTimeout(() => {
            escondeHermione2();
        }, 3000);
        return false;
    }
    if (password !== password2) {
        mostraHermione3();
        setTimeout(() => {
            escondeHermione3();
        }, 3000);
        return false;
    }
    if (email.match(/\S+@\S+\.\S/)) {
        if (password.match(/^(?=.*[!#@$%&'.\-\*\_\,/~`\[\{\}\]=+|:;"\\^(\)´])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{4,}$/)) {
            return true;
        }
        else {
            mostraDumbledore();
            setTimeout(() => {
                escondeDumbledore();
            }, 5000);
            return false;
        }
    }
    else {
        mostraMcgonagall2();
        setTimeout(() => {
            escondeMcgonagall2();
        }, 3000);
        return false;
    }
}
function salvarDados(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}
function buscarBd() {
    const usuarios = localStorage.getItem('usuarios') || [];
    if (typeof usuarios === 'string') {
        return JSON.parse(usuarios);
    }
    return [];
}
function resetCampos(email, password, password2) {
    email = '';
    password = '';
    password2 = '';
}
function mostraDumbledore() {
    const dumbledoreAlert = document.getElementById('dumbledoreAlert');
    dumbledoreAlert.style.display = 'block';
}
function escondeDumbledore() {
    const dumbledoreAlert = document.getElementById('dumbledoreAlert');
    dumbledoreAlert.style.display = 'none';
}
function escondeDumbledorePass() {
    const dumbledorePass = document.getElementById('dumbledoreBox');
    dumbledorePass.style.display = 'none';
}
function mostraMcgonagall1() {
    const mcGonagallAlert = document.getElementById('mcgonagallAlert1');
    mcGonagallAlert.style.display = 'block';
}
function escondeMcgonagall1() {
    const mcGonagallAlert = document.getElementById('mcgonagallAlert1');
    mcGonagallAlert.style.display = 'none';
}
function mostraMcgonagall2() {
    const mcGonagallAlert = document.getElementById('mcgonagallAlert2');
    mcGonagallAlert.style.display = 'block';
}
function escondeMcgonagall2() {
    const mcGonagallAlert = document.getElementById('mcgonagallAlert2');
    mcGonagallAlert.style.display = 'none';
}
function mostraMcgonagall3() {
    const mcGonagallAlert = document.getElementById('mcgonagallAlert3');
    mcGonagallAlert.style.display = 'block';
}
function escondeMcgonagall3() {
    const mcGonagallAlert = document.getElementById('mcgonagallAlert3');
    mcGonagallAlert.style.display = 'none';
}
function mostraHermione1() {
    const hermioneAlert = document.getElementById('hermioneAlert1');
    hermioneAlert.style.display = 'block';
}
function escondeHermione1() {
    const hermioneAlert = document.getElementById('hermioneAlert1');
    hermioneAlert.style.display = 'none';
}
function mostraHermione2() {
    const hermioneAlert = document.getElementById('hermioneAlert2');
    hermioneAlert.style.display = 'block';
}
function escondeHermione2() {
    const hermioneAlert = document.getElementById('hermioneAlert2');
    hermioneAlert.style.display = 'none';
}
function mostraHermione3() {
    const hermioneAlert = document.getElementById('hermioneAlert3');
    hermioneAlert.style.display = 'block';
}
function escondeHermione3() {
    const hermioneAlert = document.getElementById('hermioneAlert3');
    hermioneAlert.style.display = 'none';
}
function mostraLuna() {
    const lunaAlert = document.getElementById('lunaAlert');
    lunaAlert.style.display = 'block';
}
function escondeLuna() {
    const lunaAlert = document.getElementById('lunaAlert');
    lunaAlert.style.display = 'none';
}
