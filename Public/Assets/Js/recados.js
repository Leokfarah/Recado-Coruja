"use strict";
if (!localStorage.getItem('usuarioLogado')) {
    window.location.href = 'index.html';
}
let logout = document.getElementById('logoutBtn');
logout.addEventListener('click', () => {
    atualizaBdRecados();
    localStorage.removeItem('usuarioLogado');
    setTimeout(() => {
        window.location.href = 'logout.html';
    }, 1000);
});
let { login, recados } = JSON.parse(localStorage.getItem('usuarioLogado'));
imprimeRecados();
function atualizaBdRecados() {
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarios'));
    usuarioLogado.forEach(element => {
        if (element.login === login) {
            element.recados = recados;
        }
    });
    localStorage.setItem('usuarios', JSON.stringify(usuarioLogado));
}
const salvarMensagemBtn = document.getElementById('salvarBtn');
salvarMensagemBtn.addEventListener('click', criarRecados);
function criarRecados() {
    let id = 1;
    const tarefa = document.getElementById('tarefa').value;
    const descricao = document.getElementById('descricao').value;
    if (!tarefa || !descricao) {
        mostraHagrid();
        setTimeout(() => {
            escondeHagrid();
        }, 3000);
        return;
    }
    if (recados.length > 0) {
        const idMaiorRecado = recados.reduce((acc, next) => {
            if (acc.id < next.id) {
                return next;
            }
            return acc;
        });
        id = idMaiorRecado.id + 1;
    }
    recados.push({ id, tarefa, descricao });
    localStorage.setItem('usuarioLogado', JSON.stringify({ login, recados }));
    imprimeRecados();
    reset();
}
function imprimeRecados() {
    let table = document.getElementById('tabelaRecados');
    table.innerHTML = '';
    for (const index in recados) {
        let orderNumber = Number(index) + 1;
        table.innerHTML += `
            <tr class="linhas">
                <td>${orderNumber}</td>
                <td>${recados[index].tarefa}</td>
                <td>${recados[index].descricao}</td>
                <td>
                <button class="apagarBtn" onclick ="apagarMensagem(${recados[index].id})">Apagar</button>
                <button class="editarBtn" onclick = "editarMensagem(${recados[index].id})">Editar</button>
                </td>
            </tr>
         `;
    }
}
let modalTarefa = document.getElementById('editTarefa');
let modalDescricao = document.getElementById('editDescricao');
function editarMensagem(id) {
    setTimeout(() => {
        mostraModal();
        modalImprimeRecado(id);
    }, 200);
    const salvarBtnModal = document.getElementById('salvarBtnModal');
    salvarBtnModal.onclick = () => {
        modalEditaRecado(id);
        setTimeout(() => {
            fechaModal();
        }, 500);
    };
    const cancelarBtnModal = document.getElementById('cancelarBtnModal');
    cancelarBtnModal.addEventListener('click', fechaModal);
}
function modalImprimeRecado(id) {
    const recadoTemp = procuraRecado(id);
    modalTarefa.value = recados[recadoTemp].tarefa;
    modalDescricao.value = recados[recadoTemp].descricao;
}
function procuraRecado(id) {
    return recados.findIndex((recado) => recado.id === id);
}
function modalEditaRecado(id) {
    const recadoTemp = procuraRecado(id);
    recados[recadoTemp].tarefa = modalTarefa.value;
    recados[recadoTemp].descricao = modalDescricao.value;
    localStorage.setItem('usuarioLogado', JSON.stringify({ login, recados }));
    imprimeRecados();
}
function fechaModal() {
    let modal = document.getElementById('modal');
    modal.style.display = 'none';
}
function mostraModal() {
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
}
function apagarMensagem(id) {
    mostraDobby();
    const confirmDobby = document.getElementById('confirmDobby');
    confirmDobby.addEventListener('click', () => {
        const remove = recados.filter((recado) => recado.id !== id);
        recados = remove;
        localStorage.setItem('usuarioLogado', JSON.stringify({ login, recados }));
        imprimeRecados();
        escondeDobby();
    });
    const dobbyCancell = document.getElementById('cancelDobby');
    dobbyCancell.addEventListener('click', escondeDobby);
}
function reset() {
    let tarefa = document.getElementById('tarefa');
    tarefa.value = '';
    let descricao = document.getElementById('descricao');
    descricao.value = '';
}
function mostraHagrid() {
    let hagrid = document.getElementById('hagridAlert');
    hagrid.style.display = 'block';
}
function escondeHagrid() {
    let hagrid = document.getElementById('hagridAlert');
    hagrid.style.display = 'none';
}
function mostraDobby() {
    let dobby = document.getElementById('dobbyBox');
    dobby.style.display = 'block';
}
function escondeDobby() {
    let dobby = document.getElementById('dobbyBox');
    dobby.style.display = 'none';
    window.location.reload();
}
