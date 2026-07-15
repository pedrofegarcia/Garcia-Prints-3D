console.log("SCRIPT FUNCIONANDO");
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
// CATÁLOGO
// =========================

const listaProdutos = document.getElementById("lista-produtos");
const subfiltros = document.getElementById("subfiltros");


if (listaProdutos) {

    fetch("produtos.json")

    .then(res => res.json())

    .then(listaDoJson => {

        mostrarProdutos(listaDoJson);

        // =========================
// ABRIR FILTRO VINDO DA HOME
// =========================

const parametrosURL = new URLSearchParams(window.location.search);

const categoriaURL = parametrosURL.get("categoria");
const subcategoriaURL = parametrosURL.get("subcategoria");


if(categoriaURL){

    let resultado = listaDoJson.filter(produto => {


        const categoriaOK = Array.isArray(produto.categoria)

        ?

        produto.categoria.some(cat =>
            cat.toLowerCase() === categoriaURL.toLowerCase()
        )

        :

        produto.categoria.toLowerCase() === categoriaURL.toLowerCase();



        return categoriaOK;


    });



    if(subcategoriaURL){

        resultado = resultado.filter(produto => {


            const subOK = Array.isArray(produto.subcategoria)

            ?

            produto.subcategoria.some(sub =>
                sub.toLowerCase() === subcategoriaURL.toLowerCase()
            )

            :

            produto.subcategoria.toLowerCase() === subcategoriaURL.toLowerCase();



            return subOK;


        });

    }


    mostrarProdutos(resultado);

}

        const pesquisaInput = document.getElementById("pesquisa");


        document.querySelectorAll(".filtro")
        .forEach(botao => {

            botao.addEventListener("click",()=>{


                document.querySelectorAll(".filtro")
                .forEach(b =>
                    b.classList.remove("filtroativo")
                );


                botao.classList.add("filtroativo");


                const categoria =
                botao.dataset.categoria;


                mostrarSubcategorias(
                    listaDoJson,
                    categoria
                );


                filtrarProdutos(
                    listaDoJson,
                    categoria
                );


            });

        });



        if(pesquisaInput){

            pesquisaInput.addEventListener("input",()=>{

                filtrarProdutos(listaDoJson);

            });

        }



        function filtrarProdutos(lista,categoriaSelecionada="Todos"){


            const texto =
            pesquisaInput
            ? pesquisaInput.value.toLowerCase()
            : "";


            const resultado =
            lista.filter(produto=>{


                const nome =
                produto.nome.toLowerCase();


                const pesquisa =
                nome.includes(texto);


             const categoria =
categoriaSelecionada === "Todos"
||
(
    Array.isArray(produto.categoria)
        ? produto.categoria.includes(categoriaSelecionada)
        : produto.categoria === categoriaSelecionada
);


                return pesquisa && categoria;


            });


            mostrarProdutos(resultado);


        }



        function mostrarSubcategorias(lista,categoria){


            subfiltros.innerHTML = "";


            const subcategorias = [
    ...new Set(

        lista

        .filter(produto =>
            Array.isArray(produto.categoria)
    ? produto.categoria.includes(categoria)
    : produto.categoria === categoria
        )

        .flatMap(produto =>
            Array.isArray(produto.subcategoria)
                ? produto.subcategoria
                : [produto.subcategoria]
        )

    )
];



            subcategorias.forEach(sub=>{


                subfiltros.innerHTML += `

                <button 
                class="filtro subfiltro"
                data-subcategoria="${sub}"
                data-categoria="${categoria}">

                    ${sub}

                </button>

                `;


            });



            document.querySelectorAll(".subfiltro")
            .forEach(botao=>{


                botao.addEventListener("click",()=>{


                    const resultado =
lista.filter(produto =>

(
    Array.isArray(produto.categoria)
        ? produto.categoria.includes(botao.dataset.categoria)
        : produto.categoria === botao.dataset.categoria
)

&&

(
    Array.isArray(produto.subcategoria)
        ? produto.subcategoria.includes(botao.dataset.subcategoria)
        : produto.subcategoria === botao.dataset.subcategoria
)

);

                    mostrarProdutos(resultado);


                });


            });


        }


    });

}



function mostrarProdutos(produtos){


    listaProdutos.innerHTML = "";


    produtos.forEach(produto=>{


        listaProdutos.innerHTML += `

        <div class="produto-card">

            <div class="produto-img">

                <img 
                src="${produto.imagem || 'assets/sem-imagem.jpg'}"
                alt="${produto.nome}">

            </div>


            <a 
            href="produto.html?id=${produto.id}"
            class="btn-card">

                Ver Produto

            </a>

        </div>

        `;


    });


}

// =========================
// PÁGINA DO PRODUTO
// =========================


const imagemProduto = document.getElementById("imagemProduto");

console.log("IMAGEM PRODUTO:", imagemProduto);

if(imagemProduto){


    const parametros =
    new URLSearchParams(window.location.search);



    const idProduto =
    Number(parametros.get("id"));



    fetch("produtos.json")

    .then(res => res.json())

    .then(listaDoJson => {

    console.log("JSON CHEGOU:", listaDoJson);

    const produto =
    listaDoJson.find(
        item => item.id === idProduto
    );

    console.log("PRODUTO ENCONTRADO:", produto);
    console.log("DESCRIÇÃO:", produto.descricao);

        if(!produto) return;



        document.getElementById("imagemProduto").src =
        produto.imagem;



        document.getElementById("nomeProduto").textContent =
        produto.nome;



        document.getElementById("precoProduto").textContent =
        produto.preco;

        console.log("DESCRIÇÃO:", produto.descricao);
        console.log("PRODUTO COMPLETO:", produto);

        document.getElementById("descricaoProduto").textContent =
        produto.descricao;

        document.querySelector(".orcamento").href =
        produto.whatsapp || "#";


        document.querySelector(".personalizar").href =
        produto.instagram || "#";


        document.querySelector(".mercado").href =
        produto.mercadolivre || "#";


        document.querySelector(".shopee").href =
        produto.shopee || "#";


        document.querySelector(".amazon").href =
        produto.amazon || "#";


        document.querySelectorAll(".botoes-compra a")
        .forEach(botao => {

            botao.target = "_blank";

});

    });



}




// =========================
// HEADER SCROLL
// =========================

const header = document.querySelector("header");

if(header){

    const isHome = document.querySelector("#hero");

    function atualizarHeader(){

        // Página inicial
        if(isHome){

            if(window.scrollY > 50){
                header.classList.add("scrolled");
            }else{
                header.classList.remove("scrolled");
            }

        }

        // Outras páginas
        else{

            header.classList.add("scrolled");

        }

    }


    window.addEventListener("scroll", atualizarHeader);

    atualizarHeader();

}


// =========================
// CARROSSEL CATEGORIAS HOME
// =========================


const categoriasHome =
document.querySelector(".grid-categorias");


const setaEsquerda =
document.querySelector(".esquerda");


const setaDireita =
document.querySelector(".direita");



if(
categoriasHome &&
setaEsquerda &&
setaDireita
){


    setaDireita.addEventListener("click",()=>{


        categoriasHome.scrollLeft += 320;


    });



    setaEsquerda.addEventListener("click",()=>{


        categoriasHome.scrollLeft -= 320;


    });


}




// =========================
// CARROSSEL PRODUTOS HOME
// =========================


const produtosCarrossel =
document.querySelector(".produtos-grid");


const esquerdaProduto =
document.querySelector(".esquerda-produto");


const direitaProduto =
document.querySelector(".direita-produto");



if(
produtosCarrossel &&
esquerdaProduto &&
direitaProduto
){


    direitaProduto.addEventListener("click",()=>{


        produtosCarrossel.scrollLeft += 330;


    });



    esquerdaProduto.addEventListener("click",()=>{


        produtosCarrossel.scrollLeft -= 330;


    });



}




// =========================
// CARROSSEL GALERIA
// =========================


const galeria =
document.querySelector(".galeria-grid");


const esquerdaGaleria =
document.querySelector(".esquerda-galeria");


const direitaGaleria =
document.querySelector(".direita-galeria");



if(
galeria &&
esquerdaGaleria &&
direitaGaleria
){


    direitaGaleria.addEventListener("click",()=>{


        galeria.scrollLeft += 330;


    });



    esquerdaGaleria.addEventListener("click",()=>{


        galeria.scrollLeft -= 330;


    });


}




// =========================
// PÁGINA DE CATEGORIA
// =========================


const listaCategoria = document.getElementById("lista-categoria");


if(listaCategoria){


    const parametros = 
    new URLSearchParams(window.location.search);


    const categoriaAtual =
    parametros.get("categoria");



    fetch("produtos.json")

    .then(res => res.json())

    .then(listaProdutos => {



       const produtosCategoria =
listaProdutos.filter(produto =>
    produto.categoria === categoriaAtual
);


if(produtosCategoria.length === 0) return;

const subcategorias = [
    ...new Set(
        produtosCategoria.flatMap(produto =>
            Array.isArray(produto.subcategoria)
                ? produto.subcategoria
                : [produto.subcategoria]
        )
    )
];

       



        document.getElementById("titulo-categoria").textContent =
categoriaAtual;


        listaCategoria.innerHTML = "";

subcategorias.forEach((subcategoria,index)=>{

    const produtosDaSubcategoria =
    listaProdutos.filter(produto =>

        produto.categoria === categoriaAtual &&

        (
            Array.isArray(produto.subcategoria)
                ? produto.subcategoria.includes(subcategoria)
                : produto.subcategoria === subcategoria
        )

    );

    listaCategoria.innerHTML += `

    <section class="subcategoria-bloco">

        <h2>${subcategoria}</h2>

    `;

    if(produtosDaSubcategoria.length === 0){

        listaCategoria.innerHTML += "<p>Produtos em breve</p>";

    }else{

        for(let i=0;i<produtosDaSubcategoria.length;i+=5){

            const grupo =
            produtosDaSubcategoria.slice(i,i+5);

            const idCarrossel =
            `${index}-${i}`;

            listaCategoria.innerHTML += `

            <div class="categoria-wrapper">

                <button
                class="seta-categoria esquerda-cat"
                data-id="${idCarrossel}">

                    ‹

                </button>

                <div
                class="categoria-carrossel"
                id="categoria-${idCarrossel}">

                    ${grupo.map(produto=>`

                        <div class="produto-card">

                            <div class="produto-img">

                                <img
                                src="${produto.imagem}"
                                alt="${produto.nome}">

                            </div>

                            <a
                            href="produto.html?id=${produto.id}"
                            class="btn-card">

                                Ver Produto

                            </a>

                        </div>

                    `).join("")}

                </div>

                <button
                class="seta-categoria direita-cat"
                data-id="${idCarrossel}">

                    ›

                </button>

            </div>

            `;

        }

    }

       listaCategoria.innerHTML += `</section>`;

});

    });

}




        // =========================
        // BOTÕES DO CARROSSEL
        // =========================



       document.querySelectorAll(".direita-cat")
.forEach(botao=>{

    botao.addEventListener("click",()=>{

        document
        .getElementById(`categoria-${botao.dataset.id}`)
        .scrollLeft += 350;

    });

});

document.querySelectorAll(".esquerda-cat")
.forEach(botao=>{

    botao.addEventListener("click",()=>{

        document
        .getElementById(`categoria-${botao.dataset.id}`)
        .scrollLeft -= 350;

    });

});

