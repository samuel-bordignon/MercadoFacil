// Função para obter os dados armazenados no localStorage
const getLocalStorage = (chave) => JSON.parse(localStorage.getItem(chave)) ?? []

// Função para armazenar dados no localStorage
const setLocalStorage = (chave, dado) => localStorage.setItem(chave, JSON.stringify(dado))

function adicionarALista(produto) {
    let listaCompras = getLocalStorage('lista_compras') || []
    
    // Verifica se o produto já está na lista
    const index = listaCompras.findIndex(item => item.codigo === produto.codigo)
    if (index > -1) {
        // Se o produto já existe, apenas aumenta a quantidade
        listaCompras[index].quantidade += 1
    } else {
        // Se não existe, adiciona o produto com quantidade 1
        produto.quantidade = 1
        listaCompras.push(produto)
    }

    setLocalStorage('lista_compras', listaCompras)
    criarCardsLista(listaCompras)
}

// Função para reduzir produto da lista
function reduzirDaLista(produto) {
    let listaCompras = getLocalStorage('lista_compras') || []
    
    // Encontra o produto na lista
    const index = listaCompras.findIndex(item => item.codigo === produto.codigo)
    if (index > -1) {
        // Reduz a quantidade se for maior que 1
        if (listaCompras[index].quantidade > 1) {
            listaCompras[index].quantidade -= 1
        } else {
            // Remove o produto se a quantidade for 1
            listaCompras.splice(index, 1)
        }
    }

    setLocalStorage('lista_compras', listaCompras)
    criarCardsLista(listaCompras)
}

// Função para criar os cards da lista de compras
function criarCardsLista(listas) {
    const lista = document.getElementById("campoListaCompras")
    lista.innerHTML = '' // Limpa o container antes de adicionar novos cards

    listas.forEach(item => {
        const card = document.createElement("div")
        card.className = "card"

        const containerImg = document.createElement("div")
        containerImg.className = "containerImg"

        const containerNome = document.createElement("div")
        containerNome.className = "containerNome"
        
        const containerPreco = document.createElement("div")
        containerPreco.className = "containerPreco"

        const containerBotoes = document.createElement("div")
        containerBotoes.className = "containerBotoes"

        if (item.imagem) {
            const img = document.createElement("img")
            img.src = item.imagem
            img.alt = item.nome
            containerImg.appendChild(img)
        }

        const nome = document.createElement("h3")
        nome.textContent = item.nome

        const preco = document.createElement("p")
        preco.textContent = `Preço: R$ ${(item.preco)}`

        const quantidadeDisplay = document.createElement("p")
        quantidadeDisplay.className = "quantidade"
        quantidadeDisplay.textContent = item.quantidade

        const botaoAdicionar = document.createElement("button")
        botaoAdicionar.textContent = "Adicionar"
        botaoAdicionar.setAttribute('onclick', `adicionarALista(${JSON.stringify(item)})`)

        const botaoReduzir = document.createElement("button")
        botaoReduzir.textContent = "Remover"
        botaoReduzir.setAttribute('onclick', `reduzirDaLista(${JSON.stringify(item)})`)

        containerNome.appendChild(nome)
        containerPreco.appendChild(preco)
        containerBotoes.appendChild(botaoAdicionar)
        containerBotoes.appendChild(quantidadeDisplay) // Adiciona o display da quantidade
        containerBotoes.appendChild(botaoReduzir)

        card.appendChild(containerImg)
        card.appendChild(containerNome)
        card.appendChild(containerPreco)
        card.appendChild(containerBotoes)

        lista.appendChild(card)
    })

    // Atualiza o valor total da compra
    atualizarValorTotal(listas)
}

// Função para atualizar o valor total
function atualizarValorTotal(listas) {
    const total = listas.reduce((acc, item) => acc + (item.preco * item.quantidade), 0)
    const valorTotal = document.getElementById("valorTotal")
    if (valorTotal) {
        valorTotal.textContent = `Valor Total: R$ ${total.toFixed(2)}`
    } else {
        const novoValorTotal = document.createElement("div")
        novoValorTotal.id = "valorTotal"
        novoValorTotal.textContent = `Valor Total: R$ ${total.toFixed(2)}`
        document.getElementById("campoListaCompras").appendChild(novoValorTotal)
    }
}

// Inicializa a lista de compras ao carregar a página
const listaCompras = getLocalStorage('lista_compras') || []
criarCardsLista(listaCompras)


function criaListaTexto(listaCompras){
    const listaNomes = []
    listaCompras.forEach((objeto) => listaNomes.push(objeto.nome))
    return listaNomes
}


document.getElementById('sendWhatsApp').addEventListener('click', function () {
    // Lista de nomes
    const nomes = criaListaTexto(listaCompras)
    console.log(nomes)

    // Concatena os nomes em uma única string
    const mensagem = nomes.join('\n');

    // Número de telefone no formato internacional, sem sinais de + ou espaços
    const numero = '554899749819';  // Substitua pelo número desejado

    // Gera a URL do WhatsApp com a mensagem
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    // Abre a URL em uma nova janela ou aba
    window.open(url, '_blank');
});
