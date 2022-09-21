type User = {
    login: string,
    password: string,
    recados: Recados[],
}

type Recados = {
    id: number,
    tarefa: string,
    descricao: string,
}

let formularioHTML = document.getElementById('formulario') as HTMLInputElement;
let usuarios = buscarBd();

let criarAcc = document.getElementById('criarAcc') as HTMLButtonElement;
criarAcc.addEventListener('click', (e) => {
    e.preventDefault()

    const email = document.getElementById('newEmail') as HTMLInputElement;
    const password = document.getElementById('newPassword') as HTMLInputElement;
    const password2 = document.getElementById('newPassword2') as HTMLInputElement;

    const emailOk = verificarEmail(email.value)
    if (emailOk) {

        if (validarDados(email.value, password.value, password2.value)) {
            const usuario: User = {
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
            resetCampos(email, password, password2)
            setTimeout(() => {
                window.location.href = 'index.html'
            }, 3000)
        }
    }
})

const showDumbledoreAlert = document.getElementById('newPassword') as HTMLInputElement;
showDumbledoreAlert.addEventListener('focus', mostraDumbledore)

const hideDumbledoreAlert = document.getElementById('newPassword') as HTMLInputElement;
hideDumbledoreAlert.addEventListener('blur', escondeDumbledore)

function verificarEmail(email: string): boolean {

    let existe = usuarios.some((valor: User) => valor.login === email)

    if (existe) {
        mostraMcgonagall3()
        setTimeout(() => {
            escondeMcgonagall3()
        }, 3000)
        return false
    }

    return true
}

function validarDados(email: string, password: string, password2: string): boolean {

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

function salvarDados(usuarios: Array<User>): void {
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
}

function buscarBd(): Array<User> {
    const usuarios = localStorage.getItem('usuarios') || []

    if (typeof usuarios === 'string') {
        return JSON.parse(usuarios);
    }
    return []
}

function resetCampos(email: HTMLInputElement, password: HTMLInputElement, password2: HTMLInputElement): void {
    email.value = ''
    password.value = ''
    password2.value = ''
}

function mostraDumbledore(): void {
    const dumbledoreAlert = document.getElementById('dumbledoreAlert') as HTMLImageElement;
    dumbledoreAlert.style.display = 'block'
}

function escondeDumbledore(): void {
    const dumbledoreAlert = document.getElementById('dumbledoreAlert') as HTMLImageElement;
    dumbledoreAlert.style.display = 'none'
}

function mostraMcgonagall1(): void {
    const mcGonagallAlert = document.getElementById('mcgonagallAlert1') as HTMLImageElement;
    mcGonagallAlert.style.display = 'block'
}

function escondeMcgonagall1(): void {
    const mcGonagallAlert = document.getElementById('mcgonagallAlert1') as HTMLImageElement;
    mcGonagallAlert.style.display = 'none'
}

function mostraMcgonagall2(): void {
    const mcGonagallAlert = document.getElementById('mcgonagallAlert2') as HTMLImageElement;
    mcGonagallAlert.style.display = 'block'
}
function escondeMcgonagall2(): void {
    const mcGonagallAlert = document.getElementById('mcgonagallAlert2') as HTMLImageElement;
    mcGonagallAlert.style.display = 'none'
}

function mostraMcgonagall3(): void {
    const mcGonagallAlert = document.getElementById('mcgonagallAlert3') as HTMLImageElement;
    mcGonagallAlert.style.display = 'block'
}
function escondeMcgonagall3(): void {
    const mcGonagallAlert = document.getElementById('mcgonagallAlert3') as HTMLImageElement;
    mcGonagallAlert.style.display = 'none'
}

function mostraHermione1(): void {
    const hermioneAlert = document.getElementById('hermioneAlert1') as HTMLImageElement;
    hermioneAlert.style.display = 'block'
}

function escondeHermione1(): void {
    const hermioneAlert = document.getElementById('hermioneAlert1') as HTMLImageElement;
    hermioneAlert.style.display = 'none'
}

function mostraHermione2(): void {
    const hermioneAlert = document.getElementById('hermioneAlert2') as HTMLImageElement;
    hermioneAlert.style.display = 'block'
}

function escondeHermione2(): void {
    const hermioneAlert = document.getElementById('hermioneAlert2') as HTMLImageElement;
    hermioneAlert.style.display = 'none'
}

function mostraHermione3(): void {
    const hermioneAlert = document.getElementById('hermioneAlert3') as HTMLImageElement;
    hermioneAlert.style.display = 'block'
}

function escondeHermione3(): void {
    const hermioneAlert = document.getElementById('hermioneAlert3') as HTMLImageElement;
    hermioneAlert.style.display = 'none'
}

function mostraLuna(): void {
    const lunaAlert = document.getElementById('lunaAlert') as HTMLImageElement;
    lunaAlert.style.display = 'block'
}

function escondeLuna(): void {
    const lunaAlert = document.getElementById('lunaAlert') as HTMLImageElement;
    lunaAlert.style.display = 'none'
}