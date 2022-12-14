if (!localStorage.getItem('usuarioLogado')) {
    window.location.href = 'index.html'
}

let logout = (document.getElementById('logoutBtn') as HTMLButtonElement);
logout.addEventListener('click', () => {
    atualizaBdRecados()
    localStorage.removeItem('usuarioLogado')
    setTimeout(() => {
        window.location.href = 'logout.html'
    }, 1000)
})

let { login, recados }: User = JSON.parse(localStorage.getItem('usuarioLogado')!);

imprimeRecados()

function atualizaBdRecados(): void {
    let usuarioLogado: Array<User> = JSON.parse(localStorage.getItem('usuarios')!);

    usuarioLogado.forEach(element => {
        if (element.login === login) {
            element.recados = recados
        }
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarioLogado))
}

const salvarMensagemBtn = document.getElementById('salvarBtn') as HTMLButtonElement;
salvarMensagemBtn.addEventListener('click', criarRecados)


function criarRecados(): void {
    let id = 1
    const tarefa = (document.getElementById('tarefa') as HTMLInputElement).value;
    const descricao = (document.getElementById('descricao') as HTMLInputElement).value;

    if (!tarefa || !descricao) {
        mostraHagrid()
        setTimeout(() => {
            escondeHagrid()
        }, 3000)
        return
    }

    if (recados.length > 0) {
        const idMaiorRecado = recados.reduce((acc, next) => {
            if (acc.id < next.id) {
                return next
            } return acc
        })

        id = idMaiorRecado.id + 1
    }

    recados.push({ id, tarefa, descricao })

    localStorage.setItem('usuarioLogado', JSON.stringify({ login, recados }))

    imprimeRecados()
    reset()
}

function imprimeRecados(): void {
    let table = document.getElementById('tabelaRecados') as HTMLTableElement;
    table.innerHTML = ''

    for (const index in recados) {
        let orderNumber = Number(index) + 1
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
         `
    }
}

let modalTarefa = document.getElementById('editTarefa') as HTMLInputElement;
let modalDescricao = document.getElementById('editDescricao') as HTMLInputElement;

function editarMensagem(id: number): void {
    setTimeout(() => {
        mostraModal()
        modalImprimeRecado(id)
    }, 200)

    const salvarBtnModal = document.getElementById('salvarBtnModal') as HTMLButtonElement;
    salvarBtnModal.onclick = () => {
        modalEditaRecado(id)
        setTimeout(() => {
            fechaModal()
        }, 500)
    }

    const cancelarBtnModal = document.getElementById('cancelarBtnModal') as HTMLButtonElement;
    cancelarBtnModal.addEventListener('click', fechaModal)
}

function modalImprimeRecado(id: number): void {
    const recadoTemp = procuraRecado(id)
    modalTarefa.value = recados[recadoTemp].tarefa
    modalDescricao.value = recados[recadoTemp].descricao
}

function procuraRecado(id: number): number {
    return recados.findIndex((recado) => recado.id === id)
}

function modalEditaRecado(id: number): void {
    const recadoTemp = procuraRecado(id)
    recados[recadoTemp].tarefa = modalTarefa.value
    recados[recadoTemp].descricao = modalDescricao.value

    localStorage.setItem('usuarioLogado', JSON.stringify({ login, recados }))
    imprimeRecados()
}

function fechaModal(): void {
    let modal = document.getElementById('modal') as HTMLDivElement;
    modal.style.display = 'none'
}

function mostraModal(): void {
    let modal = document.getElementById('modal') as HTMLDivElement;
    modal.style.display = 'block'
}

function apagarMensagem(id: number): void {
    mostraDobby()

    const confirmDobby = document.getElementById('confirmDobby') as HTMLButtonElement;
    confirmDobby.onclick = () => {
        const remove = recados.filter((recado) => recado.id !== id)
        recados = remove
        localStorage.setItem('usuarioLogado', JSON.stringify({ login, recados }))

        imprimeRecados()
        escondeDobby()
    }

    const dobbyCancell = document.getElementById('cancelDobby') as HTMLButtonElement;
    dobbyCancell.onclick = escondeDobby
}

function reset(): void {
    let tarefa = document.getElementById('tarefa') as HTMLInputElement;
    tarefa.value = ''
    let descricao = document.getElementById('descricao') as HTMLInputElement;
    descricao.value = ''
}

function mostraHagrid(): void {
    let hagrid = document.getElementById('hagridAlert') as HTMLImageElement;
    hagrid.style.display = 'block'
}

function escondeHagrid(): void {
    let hagrid = document.getElementById('hagridAlert') as HTMLImageElement;
    hagrid.style.display = 'none'
}

function mostraDobby(): void {
    let dobby = document.getElementById('dobbyBox') as HTMLDivElement;
    dobby.style.display = 'block'
}

function escondeDobby(): void {
    let dobby = document.getElementById('dobbyBox') as HTMLDivElement;
    dobby.style.display = 'none'
}