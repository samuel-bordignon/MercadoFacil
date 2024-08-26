// Função para obter os dados armazenados no localStorage
const getLocalStorage = (chave) => JSON.parse(localStorage.getItem(chave)) ?? []

// Função para armazenar dados no localStorage
const setLocalStorage = (chave, dado) => localStorage.setItem(chave, JSON.stringify(dado))

const produtos = getLocalStorage('db_produto')

// Função para ordenar os produtos por preço
function ordenarProdutosPorPreco(produtos) {
    return produtos.sort((a, b) => a.preco - b.preco)
}

function encontraProduto(produto){
    let listaCompras = getLocalStorage('lista_compras');
    // Encontra o produto na lista
    const index = listaCompras.findIndex(item => item.codigo === produto.codigo);
    if (index > -1) {
       return true
    }else{
        return false
    }
}

// Função para adicionar o produto à lista de compras
function adicionarALista(produto) {
    let listaCompras = getLocalStorage('lista_compras');
    // Verifica se o produto já está na lista
    const index = listaCompras.findIndex(item => item.codigo === produto.codigo);
    if (index === -1) {
        // Adiciona o produto se não estiver na lista
        produto.quantidade = 1;
        listaCompras.push(produto);
    } else {
        // Incrementa a quantidade se já estiver na lista
        listaCompras[index].quantidade += 1;
    }
    setLocalStorage('lista_compras', listaCompras);
}

// Função para retirar o produto da lista de compras
function retirarALista(produto) {
    let listaCompras = getLocalStorage('lista_compras');
    // Encontra o produto na lista
    const index = listaCompras.findIndex(item => item.codigo === produto.codigo);
    if (index > -1) {
        // Reduz a quantidade se for maior que 1
        if (listaCompras[index].quantidade > 1) {
            listaCompras[index].quantidade -= 1;
        } else {
            // Remove o produto se a quantidade for 1
            listaCompras.splice(index, 1);
        }
    }
    setLocalStorage('lista_compras', listaCompras);
}

// Função para alternar a adição e retirada de produtos
function adicionaRetiraProduto(botao, produto) {
    let r = encontraProduto(produto)
    
    if (!encontraProduto(produto)) {
        botao.textContent = 'Retirar da lista';
        botao.classList.remove('btn-adicionar');
        botao.classList.add('btn-retirar');
        adicionarALista(produto);
    } else {
        botao.textContent = 'Adicionar à lista';
        botao.classList.remove('btn-retirar');
        botao.classList.add('btn-adicionar');
        retirarALista(produto);
    }
}

// Função para criar cards de produtos
function criarCards(produtos) {
    const leiteContainer = document.getElementById("leite-container");
    const paoContainer = document.getElementById("pao-container");
    const carneContainer = document.getElementById("carne-container");

    leiteContainer.innerHTML = ''; // Limpa o container antes de adicionar novos cards
    paoContainer.innerHTML = ''; // Limpa o container antes de adicionar novos cards
    carneContainer.innerHTML = ''; // Limpa o container antes de adicionar novos cards

    produtos.forEach(produto => {
        const card = document.createElement("div");
        card.className = "card";

        if (produto.imagem) {
            const img = document.createElement("img");
            img.src = produto.imagem;
            img.alt = produto.nome;
            card.appendChild(img);
        }

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;

        const descricao = document.createElement("p");
        descricao.textContent = produto.descricao;

        const preco = document.createElement("p");
        preco.textContent = `Preço: R$ ${produto.preco}`;

        const botao = document.createElement("button");
        botao.id = `botao-${produto.codigo}`; // Define um ID único para o botão
        
        // Verifica se o produto já está na lista de compras e ajusta a classe e o texto do botão
        if (encontraProduto(produto)) {
            botao.className = 'btn-retirar';
            botao.textContent = 'Retirar da lista';
        } else {
            botao.className = 'btn-adicionar';
            botao.textContent = 'Adicionar à lista';
        }

        botao.addEventListener('click', function() {
            adicionaRetiraProduto(botao, produto);
        });

        card.appendChild(nome);
        card.appendChild(descricao);
        card.appendChild(preco);
        card.appendChild(botao);

        if (produto.categoria === "laticinios") {
            leiteContainer.appendChild(card);
        } else if (produto.categoria === "açougue") {
            paoContainer.appendChild(card);
        } else if (produto.categoria === "hortifruti") {
            carneContainer.appendChild(card);
        }
    });
}

// Ordena os produtos e cria os cards
const produtosOrdenados = ordenarProdutosPorPreco(produtos);
criarCards(produtosOrdenados);

