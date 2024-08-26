//chaves do localStorage

const chaveMercado = 'dadosLoja'
const chaveCliente = 'dadosCliente'


// Função para obter os dados armazenados no localStorage
const getLocalStorage = (chave) => JSON.parse(localStorage.getItem(chave)) ?? []

// Função para armazenar dados no localStorage
const setLocalStorage = (chave, dado) => localStorage.setItem(chave, JSON.stringify(dado))

// CRUD usuario--------------------------------------------------------------------------------------------------
const lerUsuario = () => getLocalStorage(chaveCliente)

const deletarUsuario = (index) => {
    const dbUsuario = lerUsuario()
    dbUsuario.splice(index, 1)
    setLocalStorage(chaveCliente, dbUsuario)
}

const atualizarUsuario = (index, usuario) => {
    const dbUsuario = lerUsuario()
    dbUsuario[index] = usuario
    setLocalStorage(chaveCliente, dbUsuario)
}

const criarUsuario = (usuario) => {
    const dbUsuario = getLocalStorage(chaveCliente)
    dbUsuario.push(usuario)
    setLocalStorage(chaveCliente, dbUsuario)
}

// CRUD loja -----------------------------------------------------------------------------------------

const deletarLoja = (index) => {
    const dbLoja = lerLoja()
    dbLoja.splice(index, 1)
    setLocalStorage(chaveMercado, dbLoja)
}

const atualizarLoja = (index, Loja) => {
    const dbLoja = lerLoja()
    dbLoja[index] = Loja
    setLocalStorage(chaveMercado, dbLoja)
}

const lerLoja = () => getLocalStorage(chaveMercado)

const criarLoja = (Loja) => {
    const dbLoja = getLocalStorage(chaveMercado)
    dbLoja.push(Loja)
    setLocalStorage(chaveMercado, dbLoja)
}

// Troca o tipo de cadastro -----------------------------------------

const tipoCadastro = (tipo) => {
    if (tipo === "loja") {
        window.location.href = "cadastroLojaPassoUm.html"
    } else if (tipo === 'cliente') {
        window.location.href = "cadastroCliente.html"
    }
}

// Validações -------------------------------------------------

const verificarEmailLoja = (email) => {
    const db = lerLoja()
    const usuarioEncontrado = db.find((element) => element.emailLoja === email)
    return usuarioEncontrado
}

const verificarEmailProprietario = (email) => {
    const db = lerLoja()
    const usuarioEncontrado = db.find((element) => element.emailProprietario === email)
    return usuarioEncontrado
}

const verificarEmailCliente = (email) => {
    const db = lerUsuario()
    const usuarioEncontrado = db.find((element) => element.email === email)
    return usuarioEncontrado
}

const verificarSenha = (senha, chave) => {
    const db = getLocalStorage(chave)
    const usuarioEncontrado = db.find((element) => element.senha === senha)
    return usuarioEncontrado
}

const confereSenha = () => {
    const senha = document.querySelector('input[name=senha]')
    const confirmSenha = document.querySelector('input[name=confirmar-senha]')

    if (confirmSenha.value === senha.value) {
        return true
    } else {

        return false
    }
}

const verificaCamposValidos = (formId) => document.getElementById(formId).reportValidity()

//salva dados--------------------------------------------------------------------------------------------

const salvaDadosPaginaUm = () => {
    if (verificaCamposValidos('cadastro-form-um')) {
        const emailLoja = document.getElementById('email-loja-cadastro').value
        const avisoLoginEmail = document.getElementById('id-aviso-email')

        if (verificarEmailLoja(emailLoja) || verificarEmailProprietario(emailLoja) || verificarEmailCliente(emailLoja)) {
            avisoLoginEmail.classList = 'ativo'
        } else {
            const nomeLoja = document.getElementById('nomeLoja-cadastro').value
            const celularLoja = document.getElementById('celular-loja-cadastro').value
            const cnpj = document.getElementById('cnpj-loja-cadastro').value
            setLocalStorage('nomeLoja', nomeLoja)
            setLocalStorage('emailLoja', emailLoja)
            setLocalStorage('celularLoja', celularLoja)
            setLocalStorage('cnpj', cnpj)
            window.location.href = 'cadastroLojaPassoDois.html'
        }
    }
}
const salvaDadosPaginaDois = () => {
    if (verificaCamposValidos('cadastro-form-dois')) {
        const cep = document.getElementById('cep').value
        const bairro = document.getElementById('bairro').value
        const numero = document.getElementById('numero').value
        const complemento = document.getElementById('complemento').value
        setLocalStorage('cep', cep)
        setLocalStorage('bairro', bairro)
        setLocalStorage('numero', numero)
        setLocalStorage('complemento', complemento)
        window.location.href = 'cadastroLojaPassoTres.html'
    }
}

const salvaDadosPaginaTres = () => {
    if (verificaCamposValidos('cadastro-form-tres')) {
        const emailProprietario = document.getElementById('email-cadastro').value
        const avisoLoginEmail = document.getElementById('id-aviso-email')
        const avisoSenha = document.getElementById('id-aviso-senha')

        if (verificarEmailLoja(emailProprietario) || verificarEmailProprietario(emailProprietario) || verificarEmailCliente(emailProprietario)) {
            avisoLoginEmail.classList = 'ativo'

        } else {
            if (confereSenha()) {
                const nomeProprietario = document.getElementById('firstname-cadastro').value
                const sobrenomeProprietario = document.getElementById('sobrenome-cadastro').value
                const celularProprietario = document.getElementById('celular-cadastro').value
                const senha = document.getElementById('senha-cadastro').value
                setLocalStorage('nomeProprietario', nomeProprietario)
                setLocalStorage('sobrenomeProprietario', sobrenomeProprietario)
                setLocalStorage('emailProprietario', emailProprietario)
                setLocalStorage('celularProprietario', celularProprietario)
                setLocalStorage('senha', senha)
                window.location.href = 'concluir_(finalizar).html'
            } else {
                avisoSenha.classList = 'ativo'
            }
        }
    }
}


const salvaDadosLoja = () => {
    const loja = {
        nomeProprietario: getLocalStorage('nomeProprietario'),
        sobrenomeProprietario: getLocalStorage('sobrenomeProprietario'),
        celularProprietario: getLocalStorage('celularProprietario'),
        emailProprietario: getLocalStorage('emailProprietario'),
        senha: getLocalStorage('senha'),
        nomeLoja: getLocalStorage('nomeLoja'),
        emailLoja: getLocalStorage('emailLoja'),
        celularLoja: getLocalStorage('celularLoja'),
        cnpj: getLocalStorage('cnpj'),
        cep: getLocalStorage('cep'),
        bairro: getLocalStorage('bairro'),
        numero: getLocalStorage('numero'),
        complemento: getLocalStorage('complemento')
    }
    deletaTudoListaCompras()
    criarLoja(loja)
    window.location.href = 'perfilMercado.html'
}

const salvaDadosCliente = () => {
    if (verificaCamposValidos('cadastro-form-cliente')) {

        const emailCadastro = document.getElementById('email-cadastro').value
        const avisoLoginEmail = document.getElementById('id-aviso-email')
        const avisoSenha = document.getElementById('id-aviso-senha')

        if (verificarEmailCliente(emailCadastro) || verificarEmailLoja(emailCadastro) || verificarEmailProprietario(emailCadastro)) {

            avisoLoginEmail.classList = 'ativo'
        } else {
            if (confereSenha()) {
                const email = document.getElementById('email-cadastro').value
                setLocalStorage('emailCliente', email)
                const usuario = {


                    nome: document.getElementById('firstname-cadastro').value,
                    sobrenome: document.getElementById('sobrenome-cadastro').value,
                    email: getLocalStorage('emailCliente'),
                    celular: document.getElementById('celular-cadastro').value,
                    senha: document.getElementById('senha-cadastro').value,
                }
                criarUsuario(usuario)
                deletaTudoListaCompras()
                window.location.href = 'perfilUsuario.html'
            } else {
                avisoSenha.classList = 'ativo'
            }

        }
    }
}

// Login----------------------------------------------------------------------------------------------
const processarLogin = () => {
    const emailLogin = document.getElementById('email-login').value
    const senhaLogin = document.getElementById('senha-login').value
    const avisoLoginEmail = document.getElementById('id-aviso-email')
    const avisoLoginSenha = document.getElementById('id-aviso-senha')

    if (verificarEmailCliente(emailLogin)) {
        if (verificarSenha(senhaLogin, chaveCliente)) {
            setLocalStorage('emailCliente', emailLogin)
            deletaTudoListaCompras()
            window.location.href = 'perfilUsuario.html'

        } else {
            avisoLoginSenha.classList = 'ativo'

        }

    } else if (verificarEmailProprietario(emailLogin)) {

        if (verificarSenha(senhaLogin, chaveMercado)) {
            setLocalStorage('emailProprietario', emailLogin)
            deletaTudoListaCompras()
            window.location.href = 'perfilMercado.html'

        } else {
            avisoLoginSenha.classList = 'ativo'
        }
    } else {
        avisoLoginEmail.classList = 'ativo'

    }
}

//Encontra o indece-index------------------------------------------------------------------------------------------------------------

function encontraIndiceCliente() {
    const emailCliente = getLocalStorage('emailCliente')
    const db = lerUsuario()
    const usuarioEncontrado = db.find((element) => element.email === emailCliente)
    console.log(db)
    console.log(emailCliente)
    console.log(usuarioEncontrado)

    const indice = db.indexOf(usuarioEncontrado)
    return indice
}

function encontraIndiceLoja() {
    const emailLoja = getLocalStorage('emailProprietario')
    console.log(emailLoja)
    const db = lerLoja()
    const usuarioEncontrado = db.find((element) => element.emailProprietario === emailLoja)

    const indice = db.indexOf(usuarioEncontrado)
    return indice
}

//crud perfil mercado e clente
function abreEditarCliente() {
    destravaCamposCliente()
    insereDadosCliente()

}
function abreEditarLoja() {
    destravaCamposLoja()
    insereDadosLoja()

}
function retiraAtributoCliente() {
    // Encontrando os elementos input
    const nameInput = document.getElementById('inputs-info-nome-cliente')
    const sobrenomeInput = document.getElementById('inputs-info-sobrenome-cliente')
    const emailInput = document.getElementById('inputs-info-email-cliente')
    const celularInput = document.getElementById('inputs-info-celular-cliente')
    const senhaInput = document.getElementById('inputs-info-senha-cliente')


    // Removendo o atributo readonly
    nameInput.removeAttribute('readonly')
    sobrenomeInput.removeAttribute('readonly')
    emailInput.removeAttribute('readonly')
    celularInput.removeAttribute('readonly')
    senhaInput.removeAttribute('readonly')
}

function adicionaAtributoCliente() {
    // Encontrando os elementos input
    const nameInput = document.getElementById('inputs-info-nome-cliente')
    const sobrenomeInput = document.getElementById('inputs-info-sobrenome-cliente')
    const emailInput = document.getElementById('inputs-info-email-cliente')
    const celularInput = document.getElementById('inputs-info-celular-cliente')
    const senhaInput = document.getElementById('inputs-info-senha-cliente')


    // Removendo o atributo readonly
    nameInput.setAttribute('readonly', 'readonly')
    sobrenomeInput.setAttribute('readonly', 'readonly')
    emailInput.setAttribute('readonly', 'readonly')
    celularInput.setAttribute('readonly', 'readonly')
    senhaInput.setAttribute('readonly', 'readonly')
}

function retiraAtributoLoja() {
    // Encontrando os elementos input
    const nameInput = document.getElementById('inputs-info-nome-proprietario')
    const sobrenomeInput = document.getElementById('inputs-info-sobrenome-proprietario')
    const emailInput = document.getElementById('inputs-info-email-pessoal-loja')
    const celularInput = document.getElementById('inputs-info-celular-pessoal-loja')
    const senhaInput = document.getElementById('inputs-info-senha-loja')
    const nameLojaInput = document.getElementById('inputs-info-nome-loja')
    const emailComercialInput = document.getElementById('inputs-info-email-loja')
    const celularComercialInput = document.getElementById('inputs-info-celular-loja')
    const cepInput = document.getElementById('inputs-info-cep-loja')
    const cnpjInput = document.getElementById('inputs-info-cnpj-loja')
    const bairroInput = document.getElementById('inputs-info-bairro')
    const numeroInput = document.getElementById('inputs-info-numero-loja')
    const complementoInput = document.getElementById('inputs-info-complemento-loja')

    // Removendo o atributo readonly
    nameInput.removeAttribute('readonly')
    sobrenomeInput.removeAttribute('readonly')
    emailInput.removeAttribute('readonly')
    celularInput.removeAttribute('readonly')
    senhaInput.removeAttribute('readonly')
    nameLojaInput.removeAttribute('readonly')
    emailComercialInput.removeAttribute('readonly')
    celularComercialInput.removeAttribute('readonly')
    cepInput.removeAttribute('readonly')
    cnpjInput.removeAttribute('readonly')
    bairroInput.removeAttribute('readonly')
    numeroInput.removeAttribute('readonly')
    complementoInput.removeAttribute('readonly')

}

function adicionaAtributoLoja() {
    // Encontrando os elementos input
    const nameInput = document.getElementById('inputs-info-nome-proprietario')
    const sobrenomeInput = document.getElementById('inputs-info-sobrenome-proprietario')
    const emailInput = document.getElementById('inputs-info-email-pessoal-loja')
    const celularInput = document.getElementById('inputs-info-celular-pessoal-loja')
    const senhaInput = document.getElementById('inputs-info-senha-loja')
    const nameLojaInput = document.getElementById('inputs-info-nome-loja')
    const emailComercialInput = document.getElementById('inputs-info-email-loja')
    const celularComercialInput = document.getElementById('inputs-info-celular-loja')
    const cepInput = document.getElementById('inputs-info-cep-loja')
    const cnpjInput = document.getElementById('inputs-info-cnpj-loja')
    const bairroInput = document.getElementById('inputs-info-bairro')
    const numeroInput = document.getElementById('inputs-info-numero-loja')
    const complementoInput = document.getElementById('inputs-info-complemento-loja')

    // Removendo o atributo readonly
    nameInput.setAttribute('readonly', 'readonly')
    sobrenomeInput.setAttribute('readonly', 'readonly')
    emailInput.setAttribute('readonly', 'readonly')
    celularInput.setAttribute('readonly', 'readonly')
    senhaInput.setAttribute('readonly', 'readonly')
    nameLojaInput.setAttribute('readonly', 'readonly')
    emailComercialInput.setAttribute('readonly', 'readonly')
    celularComercialInput.setAttribute('readonly', 'readonly')
    cepInput.setAttribute('readonly', 'readonly')
    cnpjInput.setAttribute('readonly', 'readonly')
    bairroInput.setAttribute('readonly', 'readonly')
    numeroInput.setAttribute('readonly', 'readonly')
    complementoInput.setAttribute('readonly', 'readonly')

}
function insereDadosCliente() {
    const index = encontraIndiceCliente()
    const db = lerUsuario()
    const user = db[index]
    console.log(index)
    console.log(db)
    console.log(user)
    const nameInput = document.getElementById('inputs-info-nome-cliente')
    const sobrenomeInput = document.getElementById('inputs-info-sobrenome-cliente')
    const emailInput = document.getElementById('inputs-info-email-cliente')
    const celularInput = document.getElementById('inputs-info-celular-cliente')
    const senhaInput = document.getElementById('inputs-info-senha-cliente')

    nameInput.value = user.nome
    sobrenomeInput.value = user.sobrenome
    emailInput.value = user.email
    celularInput.value = user.celular
    senhaInput.value = user.senha
}

function insereDadosLoja() {
    const index = encontraIndiceLoja()
    const db = lerLoja()
    const user = db[index]
    console.log(index)
    console.log(db)
    console.log(user)
    const nameInput = document.getElementById('inputs-info-nome-proprietario')
    const sobrenomeInput = document.getElementById('inputs-info-sobrenome-proprietario')
    const emailInput = document.getElementById('inputs-info-email-pessoal-loja')
    const celularInput = document.getElementById('inputs-info-celular-pessoal-loja')
    const senhaInput = document.getElementById('inputs-info-senha-loja')
    const nameLojaInput = document.getElementById('inputs-info-nome-loja')
    const emailComercialInput = document.getElementById('inputs-info-email-loja')
    const celularComercialInput = document.getElementById('inputs-info-celular-loja')
    const cepInput = document.getElementById('inputs-info-cep-loja')
    const cnpjInput = document.getElementById('inputs-info-cnpj-loja')
    const bairroInput = document.getElementById('inputs-info-bairro')
    const numeroInput = document.getElementById('inputs-info-numero-loja')
    const complementoInput = document.getElementById('inputs-info-complemento-loja')

    nameInput.value = user.nomeProprietario
    sobrenomeInput.value = user.sobrenomeProprietario
    emailInput.value = user.emailProprietario
    celularInput.value = user.celularProprietario
    senhaInput.value = user.senha
    nameLojaInput.value = user.nomeLoja
    emailComercialInput.value = user.emailLoja
    celularComercialInput.value = user.celularLoja
    cepInput.value = user.cep
    cnpjInput.value = user.cnpj
    bairroInput.value = user.bairro
    numeroInput.value = user.numero
    complementoInput.value = user.complemento
}

function editaCamposCliente() {
    const index = encontraIndiceCliente(chaveCliente)
    const email = document.getElementById('inputs-info-email-cliente').value
    const avisoEmail = document.getElementById('id-aviso-email')

    // Obtenha o email atual do localStorage
    const emailClienteAtual = getLocalStorage('emailCliente')

    // Armazene o novo email no localStorage
    setLocalStorage('emailCliente', email)

    // Verifica se o email foi alterado
    let emailValido = true
    if (verificaCamposValidos('informacoes-cliente')) {
        if (email !== emailClienteAtual) {
            if (verificarEmailCliente(email) || verificarEmailLoja(email) || verificarEmailProprietario(email)) {
                emailValido = false
                avisoEmail.classList.add('ativo')
            } else {
                avisoEmail.classList.remove('ativo')
            }
        } else {
            avisoEmail.classList.remove('ativo')
        }

        // Só atualize o usuário se o email for válido ou se não houve mudança de email
        if (emailValido) {
            const user = {
                nome: document.getElementById('inputs-info-nome-cliente').value,
                sobrenome: document.getElementById('inputs-info-sobrenome-cliente').value,
                email: getLocalStorage('emailCliente'),
                celular: document.getElementById('inputs-info-celular-cliente').value,
                senha: document.getElementById('inputs-info-senha-cliente').value,
            }
            atualizarUsuario(index, user)
            travaCamposCliente()
        }
    }
}
function editaCamposLoja() {
    const index = encontraIndiceLoja()
    const email = document.getElementById('inputs-info-email-pessoal-loja').value
    const emailLoja = document.getElementById('inputs-info-email-loja').value
    const avisoEmail = document.getElementById('id-aviso-email')
    const avisoEmailComercial = document.getElementById('id-aviso-email-comercial')

    // Obtenha o email atual do localStorage
    const emailPessoalAtual = getLocalStorage('emailPessoal')
    const emailLojaAtual = getLocalStorage('emailLoja')

    // Armazene os novos emails no localStorage
    setLocalStorage('emailPessoal', email)
    setLocalStorage('emailLoja', emailLoja)

    // Validações
    let emailPessoalValido = true
    let emailLojaValido = true
    if (verificaCamposValidos('informacoes-mercado')) {
        if (email !== emailPessoalAtual) {
            if (verificarEmailCliente(email) || verificarEmailLoja(email) || verificarEmailProprietario(email)) {
                emailPessoalValido = false
                avisoEmail.classList.add('ativo')
            } else {
                avisoEmail.classList.remove('ativo')
            }
        } else {
            avisoEmail.classList.remove('ativo')
        }

        if (emailLoja !== emailLojaAtual) {
            if (verificarEmailCliente(emailLoja) || verificarEmailLoja(emailLoja) || verificarEmailProprietario(emailLoja)) {
                emailLojaValido = false
                avisoEmailComercial.classList.add('ativo')
            } else {
                avisoEmailComercial.classList.remove('ativo')
            }
        } else {
            avisoEmailComercial.classList.remove('ativo')
        }

        if (emailPessoalValido && emailLojaValido) {
            const user = {
                nomeProprietario: document.getElementById('inputs-info-nome-proprietario').value,
                sobrenomeProprietario: document.getElementById('inputs-info-sobrenome-proprietario').value,
                celularProprietario: document.getElementById('inputs-info-celular-pessoal-loja').value,
                emailProprietario: getLocalStorage('emailPessoal'),
                senha: document.getElementById('inputs-info-senha-loja').value,
                nomeLoja: document.getElementById('inputs-info-nome-loja').value,
                emailLoja: getLocalStorage('emailLoja'),
                celularLoja: document.getElementById('inputs-info-celular-loja').value,
                cnpj: document.getElementById('inputs-info-cnpj-loja').value,
                cep: document.getElementById('inputs-info-cep-loja').value,
                bairro: document.getElementById('inputs-info-bairro').value,
                numero: document.getElementById('inputs-info-numero-loja').value,
                complemento: document.getElementById('inputs-info-complemento-loja').value
            }
            atualizarLoja(index, user)
            travaCamposLoja()
        }
    }
}
function travaCamposCliente() {
    document.getElementById('inputs-info-nome-cliente').classList.add('active')
    document.getElementById('inputs-info-email-cliente').classList.add('active')
    document.getElementById('inputs-info-sobrenome-cliente').classList.add('active')
    document.getElementById('inputs-info-celular-cliente').classList.add('active')
    document.getElementById('inputs-info-senha-cliente').classList.add('active')
    adicionaAtributoCliente()
}


function destravaCamposCliente() {
    document.getElementById('inputs-info-nome-cliente').classList.remove('active')
    document.getElementById('inputs-info-email-cliente').classList.remove('active')
    document.getElementById('inputs-info-sobrenome-cliente').classList.remove('active')
    document.getElementById('inputs-info-celular-cliente').classList.remove('active')
    document.getElementById('inputs-info-senha-cliente').classList.remove('active')
    retiraAtributoCliente()
}

function travaCamposLoja() {
    document.getElementById('inputs-info-nome-proprietario').classList.add('active')
    document.getElementById('inputs-info-sobrenome-proprietario').classList.add('active')
    document.getElementById('inputs-info-email-pessoal-loja').classList.add('active')
    document.getElementById('inputs-info-celular-pessoal-loja').classList.add('active')
    document.getElementById('inputs-info-senha-loja').classList.add('active')
    document.getElementById('inputs-info-nome-loja').classList.add('active')
    document.getElementById('inputs-info-email-loja').classList.add('active')
    document.getElementById('inputs-info-celular-loja').classList.add('active')
    document.getElementById('inputs-info-cep-loja').classList.add('active')
    document.getElementById('inputs-info-cnpj-loja').classList.add('active')
    document.getElementById('inputs-info-bairro').classList.add('active')
    document.getElementById('inputs-info-numero-loja').classList.add('active')
    document.getElementById('inputs-info-complemento-loja').classList.add('active')
    adicionaAtributoLoja()
}


function destravaCamposLoja() {
    document.getElementById('inputs-info-nome-proprietario').classList.remove('active')
    document.getElementById('inputs-info-sobrenome-proprietario').classList.remove('active')
    document.getElementById('inputs-info-email-pessoal-loja').classList.remove('active')
    document.getElementById('inputs-info-celular-pessoal-loja').classList.remove('active')
    document.getElementById('inputs-info-senha-loja').classList.remove('active')
    document.getElementById('inputs-info-nome-loja').classList.remove('active')
    document.getElementById('inputs-info-email-loja').classList.remove('active')
    document.getElementById('inputs-info-celular-loja').classList.remove('active')
    document.getElementById('inputs-info-cep-loja').classList.remove('active')
    document.getElementById('inputs-info-cnpj-loja').classList.remove('active')
    document.getElementById('inputs-info-bairro').classList.remove('active')
    document.getElementById('inputs-info-numero-loja').classList.remove('active')
    document.getElementById('inputs-info-complemento-loja').classList.remove('active')
    retiraAtributoLoja()
}
//Vetor de objetos de produtos


function deletaUserLogado(){
    const email = getLocalStorage('emailCliente')
    const objeto = verificarEmailCliente(email)
    const db = lerUsuario()

    const index = db.findIndex(item => item.email === objeto.email)
    deletarUsuario(index)
    window.location.href = 'login.html'
}

function deletaUserLogadoLoja(){
    const email = getLocalStorage('emailProprietario')
    const objeto = verificarEmailProprietario(email)
    const db = lerLoja()
    console.log(email)
    console.log(objeto)
    console.log(db)

    
    const index = db.findIndex(item => item.emailProprietario === objeto.emailProprietario)
    deletarLoja(index)
    window.location.href = 'login.html'
}

function deletaTudoListaCompras(){
    const db = getLocalStorage('lista_compras')
    
    while(db.length > 0){
        db.splice(0, 1)
        setLocalStorage('lista_compras', db)
    }
}
