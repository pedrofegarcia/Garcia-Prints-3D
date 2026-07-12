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
                produto.categoria === categoriaSelecionada;


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
                        produto.categoria === categoria
                    )

                    .map(produto =>
                        produto.subcategoria
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

                        produto.categoria === botao.dataset.categoria
                        &&
                        produto.subcategoria === botao.dataset.subcategoria

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

        if(isHome){

            if(window.scrollY > 50){
                header.classList.add("scrolled");
            }else{
                header.classList.remove("scrolled");
            }

        }else{

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
        produtosCategoria.map(produto => produto.subcategoria)
    )
];

       



        document.getElementById("titulo-categoria").textContent =
categoriaAtual;


        listaCategoria.innerHTML = "";



        subcategorias.forEach((subcategoria,index)=>{


            const produtosDaSubcategoria =
            listaProdutos.filter(produto =>

                produto.categoria === categoriaAtual &&

                produto.subcategoria === subcategoria

            );




            listaCategoria.innerHTML += `


            <section class="subcategoria-bloco">


                <h2>${subcategoria}</h2>



                <div class="categoria-wrapper">



                    <button 
                    class="seta-categoria esquerda-cat"
                    data-id="${index}">

                        ‹

                    </button>




                    <div 
                    class="categoria-carrossel"
                    id="categoria-${index}">



                    ${
                    produtosDaSubcategoria.length > 0


                    ?


                    produtosDaSubcategoria.map(produto=>`



                        <div class="produto-card">



                            <div class="produto-img">


                                <img 
                                src="${produto.imagem}"
                                alt="Produto">


                            </div>




                            <a 
                            href="produto.html?id=${produto.id}"
                            class="btn-card">


                                Ver Produto


                            </a>




                        </div>



                    `).join("")



                    :


                    "<p>Produtos em breve</p>"



                    }



                    </div>





                    <button 
                    class="seta-categoria direita-cat"
                    data-id="${index}">


                        ›


                    </button>




                </div>



            </section>



            `;



        });





        // =========================
        // BOTÕES DO CARROSSEL
        // =========================



        document.querySelectorAll(".direita-cat")
        .forEach(botao=>{


            botao.addEventListener("click",()=>{


                const id =
                botao.dataset.id;



                document
                .getElementById(`categoria-${id}`)
                .scrollLeft += 350;



            });



        });





               document.querySelectorAll(".esquerda-cat")
        .forEach(botao=>{

            botao.addEventListener("click",()=>{

                const id =
                botao.dataset.id;

                document
                .getElementById(`categoria-${id}`)
                .scrollLeft -= 350;

            });

        });


    });

}

