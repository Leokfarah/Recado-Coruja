if (!localStorage.getItem('usuarioLogado')) {
    window.location.href = 'index.html'
}

document.getElementById('logoutBtn').addEventListener('click', () => {
    atualizaBdRecados()
    localStorage.removeItem('usuarioLogado')
    setTimeout(() => {
        window.location.href = 'logout.html'
    }, 1000)
})

let usuario = JSON.parse(localStorage.getItem('usuarioLogado'))

imprimeRecados()

function atualizaBdRecados() {
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarios'))

    usuarioLogado.forEach(element => {
        if (element.login === usuario.login) {
            element.recados = usuario.recados
        }
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarioLogado))
}

const salvarMensagemBtn = document.getElementById('salvarBtn')
salvarMensagemBtn.addEventListener('click', criarRecados)


function criarRecados() {
    let id = 1
    const tarefa = document.getElementById('tarefa').value
    const descricao = document.getElementById('descricao').value

    if (!tarefa || !descricao) {
        mostraHagrid()
        setTimeout(() => {
            escondeHagrid()
        }, 3000)
        return
    }

    if (usuario.recados.length > 0) {
        const idMaiorRecado = usuario.recados.reduce((acc, next) => {
            if (acc.id < next.id) {
                return next
            } return acc
        })

        id = idMaiorRecado.id + 1
    }

    usuario.recados.push({ id, tarefa, descricao })

    localStorage.setItem('usuarioLogado', JSON.stringify(usuario))

    reset()
    imprimeRecados()
}

function imprimeRecados() {
    let table = document.getElementById('tabelaRecados')
    table.innerHTML = ''

    for (const index in usuario.recados) {
        let orderNumber = Number(index) + 1
        table.innerHTML += `
            <tr class="linhas">
                <td>${orderNumber}</td>
                <td>${usuario.recados[index].tarefa}</td>
                <td>${usuario.recados[index].descricao}</td>
                <td>
                <button class="apagarBtn" onclick ="apagarMensagem(${usuario.recados[index].id})">Apagar</button>
                <button class="editarBtn" onclick = "editarMensagem(${usuario.recados[index].id})">Editar</button>
                </td>
            </tr>
         `
    }
}


let modalTarefa = document.getElementById('editTarefa')
let modalDescricao = document.getElementById('editDescricao')

function editarMensagem(id) {
    setTimeout(() => {
        mostraModal()
        modalImprimeRecado(id)
    }, 200)


    const salvarBtnModal = document.getElementById('salvarBtnModal')
    salvarBtnModal.onclick = () => {
        modalEditaRecado(id)
        setTimeout(() => {
            fechaModal()
        }, 500)
    }

    const cancelarBtnModal = document.getElementById('cancelarBtnModal')
    cancelarBtnModal.addEventListener('click', fechaModal)
}

function modalImprimeRecado(id) {
    const recadoTemp = procuraRecado(id)
    modalTarefa.value = usuario.recados[recadoTemp].tarefa
    modalDescricao.value = usuario.recados[recadoTemp].descricao
}

function procuraRecado(id) {
    return usuario.recados.findIndex((recado) => recado.id === id)
}

function modalEditaRecado(id) {
    const recadoTemp = procuraRecado(id)
    usuario.recados[recadoTemp].tarefa = modalTarefa.value
    usuario.recados[recadoTemp].descricao = modalDescricao.value

    localStorage.setItem('usuarioLogado', JSON.stringify(usuario))
    imprimeRecados()
}

function fechaModal() {
    document.getElementById('modal').style.display = 'none'
}

function mostraModal() {
    document.getElementById('modal').style.display = 'block'
}

function apagarMensagem(id) {
    mostradobby()

    const dobbyCancell = document.getElementById('cancelDobby')
    dobbyCancell.addEventListener('click', escondeDobby)

    const confirmDobby = document.getElementById('confirmDobby')
    confirmDobby.addEventListener('click', () => {
        const remove = usuario.recados.filter((recados) => recados.id !== id)
        usuario.recados = remove
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario))

        imprimeRecados()
        escondeDobby()
    })

}

function reset() {
    document.getElementById('tarefa').value = ''
    document.getElementById('descricao').value = ''
}

function mostraHagrid() {
    document.getElementById('hagridAlert').style.display = 'block'
}
function escondeHagrid() {
    document.getElementById('hagridAlert').style.display = 'none'
}

function mostradobby() {
    document.getElementById('dobbyBox').style.display = 'block'
}

function escondeDobby() {
    document.getElementById('dobbyBox').style.display = 'none'
}