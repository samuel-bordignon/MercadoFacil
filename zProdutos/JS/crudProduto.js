// Função para obter os dados armazenados no localStorage
const getLocalStorage = (chave) => JSON.parse(localStorage.getItem(chave)) ?? []

// Função para armazenar dados no localStorage
const setLocalStorage = (chave, dado) => localStorage.setItem(chave, JSON.stringify(dado))


const deletarProduto = (index) => {
    const dbProduto = lerProduto()
    dbProduto.splice(index, 1)
    setLocalStorage('db_produto', dbProduto)
}

const atualizarProduto = (index, produto) => {
    const dbProduto = lerProduto()
    dbProduto[index] = produto
    setLocalStorage('db_produto', dbProduto)
}

const lerProduto = () => getLocalStorage('db_produto')

const criarProduto = (produto) => {
    const dbProduto = getLocalStorage('db_produto')
    dbProduto.push(produto)
    setLocalStorage('db_produto', dbProduto)
}


const verificaCamposValidos = (formId) => document.getElementById(formId).reportValidity()


const verificarCodigo = (codigo) => {
    const db = lerProduto()
    const usuarioEncontrado = db.find((element) => element.codigo === codigo)
    return usuarioEncontrado
}



const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    limparCampos()
    document.getElementById('modal').classList.remove('active')
}


const limparCampos = () => {
    const campos = document.querySelectorAll('.modal-field')
    campos.forEach(campo => campo.value = '')
}

//interação com o layout
const salvarProduto = () => {
    if (verificaCamposValidos('form-produtos')) {
        const codigoProduto = document.getElementById('codigo-produto').value
        const avisoCodigo = document.getElementById('id-aviso-codigo')
        const index = document.getElementById('nome-produto').dataset.index

        if (index === 'novo') {
            // Verificação de código duplicado apenas ao criar um novo produto
            if (verificarCodigo(codigoProduto)) {
                avisoCodigo.classList.add('ativo')
                return
            } else {
                avisoCodigo.classList.remove('ativo')
            }
        }
        const produto = {
            nome: document.getElementById('nome-produto').value,
            preco: document.getElementById('preco-produto').value,
            descricao: document.getElementById('descricao-produto').value,
            codigo: codigoProduto,
            imagem: document.querySelector(".picture__img") ? document.querySelector(".picture__img").src : "",
            categoria: document.getElementById('selectCategoria').value
        }

        if (index === 'novo') {
            criarProduto(produto)
        } else {
            atualizarProduto(index, produto)
        }

        atualizarTabela()
        closeModal()
    }
}

const criarLinha = (produto, index) => {
    const novaLinha = document.createElement('tr')
    novaLinha.innerHTML = `
        <td><label class="box-imagem"><img src="${produto.imagem}" class="tabela__imagem" /></label>${produto.nome}</td>
        <td>${produto.preco}</td>
        <td>${produto.descricao}</td>
        <td>${produto.categoria}</td>
        <td>${produto.codigo}</td>
        <td>
            <button type="button" class="button green" id="editar-${index}">editar</button>
            <button type="button" class="button red" id="deletar-${index}">excluir</button>
        </td>
    `
    document.querySelector('#tabelaProduto>tbody').appendChild(novaLinha)
}

const limparTabela = () => {
    const linhas = document.querySelectorAll('#tabelaProduto>tbody tr')
    linhas.forEach(linha => linha.parentNode.removeChild(linha))
}

const atualizarTabela = () => {
    const dbProduto = lerProduto()
    limparTabela()
    dbProduto.forEach(criarLinha)
}

document.addEventListener('DOMContentLoaded', function () {
    const inputFile = document.querySelector("#picture__input")
    const pictureImage = document.querySelector(".picture__image")
    const pictureImageTxt = "Escolha uma imagem"
    pictureImage.innerHTML = pictureImageTxt

    // Função para atualizar a imagem selecionada
    inputFile.addEventListener("change", function (e) {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.addEventListener("load", function (e) {
                const img = document.createElement("img")
                img.src = e.target.result;
                img.classList.add("picture__img")

                pictureImage.innerHTML = ""
                pictureImage.appendChild(img)
            });

            reader.readAsDataURL(file)
        } else {
            pictureImage.innerHTML = pictureImageTxt
        }
    });
})

const preencherCampos = (produto) => {
    document.getElementById('nome-produto').value = produto.nome
    document.getElementById('preco-produto').value = produto.preco
    document.getElementById('descricao-produto').value = produto.descricao
    document.getElementById('codigo-produto').value = produto.codigo
    document.getElementById('selectCategoria').value = produto.categoria
    document.getElementById('nome-produto').dataset.index = produto.index

    if (produto.imagem) {
        const pictureImage = document.querySelector(".picture__image")
        const img = document.createElement("img")
        img.src = produto.imagem
        img.classList.add("picture__img")

        pictureImage.innerHTML = ""
        pictureImage.appendChild(img)
    }
}

const editarProduto = (index) => {
    const produto = lerProduto()[index]
    produto.index = index
    preencherCampos(produto)
    openModal()
}

const editarDeletar = (evento) => {
    if (evento.target.type == 'button') {
        const [acao, index] = evento.target.id.split('-')

        if (acao == 'editar') {
            editarProduto(index)
        } else {
            // Mostrar a caixa de aviso e definir o índice a ser excluído
            document.getElementById('box-aviso').style.visibility = 'visible'
            document.getElementById('confirmarSim').dataset.index = index
        }
    }
}

const confirmarExclusao = (confirmado) => {
    const index = document.getElementById('confirmarSim').dataset.index
    console.log(index)
    if (confirmado) {
        deletarProduto(index)
        atualizarTabela()
    }

    // Esconder a caixa de aviso
    document.getElementById('box-aviso').style.visibility = 'hidden'
}

//eventos
document.addEventListener('DOMContentLoaded', atualizarTabela)

document.getElementById('cadastrarProduto')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', salvarProduto)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

document.querySelector('#tabelaProduto>tbody')
    .addEventListener('click', editarDeletar)

document.getElementById('confirmarSim')
    .addEventListener('click', () => confirmarExclusao(true))

document.getElementById('confirmarNao')
    .addEventListener('click', () => confirmarExclusao(false))


    