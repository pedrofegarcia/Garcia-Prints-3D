// =========================
// MENU MOBILE
// =========================

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

// =========================
// HEADER
// =========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {
        header.style.background = "#111111";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.4)";
    } else {
        header.style.background = "rgba(17,17,17,.9)";
        header.style.boxShadow = "none";
    }

});

// =========================
// CATÁLOGO
// =========================

const listaProdutos = document.getElementById("lista-produtos");

if (listaProdutos) {

    fetch("produtos.json")
        .then(res => res.json())
        .then(produtos => {

            mostrarProdutos(produtos);

            document.getElementById("pesquisa").addEventListener("input", pesquisar);

            document.getElementById("categoria").addEventListener("change", pesquisar);

            function pesquisar() {

                const texto = document
                    .getElementById("pesquisa")
                    .value
                    .toLowerCase();

                const categoria = document.getElementById("categoria").value;

                const resultado = produtos.filter(produto => {

                    const nome = produto.nome.toLowerCase();

                    const pesquisaNome = nome.includes(texto);

                    const pesquisaCategoria =
                        categoria === "Todos" ||
                        produto.categoria === categoria;

                    return pesquisaNome && pesquisaCategoria;

                });

                mostrarProdutos(resultado);

            }

        });

}

function mostrarProdutos(produtos){

    listaProdutos.innerHTML = "";

    produtos.forEach(produto=>{

        listaProdutos.innerHTML += `
        
        <div class="produto-card">

            <div class="produto-img">
                <img src="${produto.imagem}" alt="${produto.nome}">
            </div>

            <div class="produto-info">

                <h3>${produto.nome}</h3>

                <p class="preco">${produto.preco}</p>

                <a href="produto.html?id=${produto.id}" class="btn-card">
                    Ver Produto
                </a>

            </div>

        </div>

        `;

    });

}
// =========================
// PÁGINA DO PRODUTO
// =========================

const imagemProduto = document.getElementById("imagemProduto");

if (imagemProduto) {

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id"));

    fetch("produtos.json")
        .then(res => res.json())
        .then(produtos => {

            const produto = produtos.find(p => p.id === id);

            if (!produto) return;

            document.getElementById("imagemProduto").src = produto.imagem;
            document.getElementById("nomeProduto").textContent = produto.nome;
            document.getElementById("precoProduto").textContent = produto.preco;

        });

}