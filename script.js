console.log("SCRIPT FUNCIONANDO");


// =========================
// MENU MOBILE
// =========================

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if(menuBtn && nav){

    menuBtn.addEventListener("click",()=>{

        nav.classList.toggle("active");

    });

}



// =========================
// CATÁLOGO
// =========================

const listaProdutos = document.getElementById("lista-produtos");
const subfiltros = document.getElementById("subfiltros");
const pesquisa = document.getElementById("pesquisa");



if(listaProdutos){


    fetch("produtos.json")

    .then(res => res.json())

    .then(produtos => {


        mostrarProdutos(produtos);



        // =========================
        // FILTROS
        // =========================


        document.querySelectorAll(".filtro")

        .forEach(botao=>{


            botao.addEventListener("click",()=>{


                document.querySelectorAll(".filtro")

                .forEach(b=>{

                    b.classList.remove("filtroativo");

                });



                botao.classList.add("filtroativo");



                const categoria =
                botao.dataset.categoria;



                criarSubfiltros(
                    produtos,
                    categoria
                );



                filtrarProdutos(
                    produtos,
                    categoria
                );


            });


        });





        // =========================
        // PESQUISA
        // =========================


        if(pesquisa){


            pesquisa.addEventListener("input",()=>{


                filtrarProdutos(
                    produtos,
                    "Todos"
                );


            });


        }





        function filtrarProdutos(lista,categoria){


            const texto = pesquisa
            ? pesquisa.value.toLowerCase()
            : "";



            const resultado = lista.filter(produto=>{


                const nome =
                produto.nome.toLowerCase();



                const pesquisaOk =
                nome.includes(texto);



                const categoriaOk =

                categoria === "Todos"

                ||

                (

                    Array.isArray(produto.categoria)

                    ?

                    produto.categoria.includes(categoria)

                    :

                    produto.categoria === categoria

                );



                return pesquisaOk && categoriaOk;


            });



            mostrarProdutos(resultado);


        }







        function criarSubfiltros(lista,categoria){


            subfiltros.innerHTML = "";



            if(categoria === "Todos"){

                return;

            }



            const subcategorias = [

                ...new Set(

                    lista

                    .filter(produto=>{


                        return Array.isArray(produto.categoria)

                        ?

                        produto.categoria.includes(categoria)

                        :

                        produto.categoria === categoria;


                    })


                    .flatMap(produto=>{


                        return Array.isArray(produto.subcategoria)

                        ?

                        produto.subcategoria

                        :

                        [produto.subcategoria];


                    })

                )

            ];





            subcategorias.forEach(sub=>{


                subfiltros.innerHTML += `

                    <button

                    class="filtro subfiltro"

                    data-categoria="${categoria}"

                    data-subcategoria="${sub}">

                    ${sub}

                    </button>

                `;


            });




            document.querySelectorAll(".subfiltro")

            .forEach(botao=>{


                botao.addEventListener("click",()=>{


                    const resultado = lista.filter(produto=>{


                        const categoriaOk =

                        Array.isArray(produto.categoria)

                        ?

                        produto.categoria.includes(
                            botao.dataset.categoria
                        )

                        :

                        produto.categoria ===
                        botao.dataset.categoria;





                        const subOk =

                        Array.isArray(produto.subcategoria)

                        ?

                        produto.subcategoria.includes(
                            botao.dataset.subcategoria
                        )

                        :

                        produto.subcategoria ===
                        botao.dataset.subcategoria;



                        return categoriaOk && subOk;


                    });



                    mostrarProdutos(resultado);


                });


            });


        }



    })

    .catch(erro=>{

        console.error(
            "ERRO AO CARREGAR PRODUTOS:",
            erro
        );

    });


}







// =========================
// MOSTRAR PRODUTOS
// =========================


function mostrarProdutos(produtos){

    listaProdutos.innerHTML = "";


    const mobile = window.innerWidth <= 768;


    // =========================
    // PC NORMAL
    // =========================

    if(!mobile){

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


        return;

    }



    // =========================
    // MOBILE - CARROSSEIS DE 6
    // =========================


    for(let i = 0; i < produtos.length; i += 6){


        const grupo = produtos.slice(i, i + 6);



        listaProdutos.innerHTML += `

        <div class="carrossel-produtos-mobile">


            ${grupo.map(produto=>`


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


            `).join("")}


        </div>

        `;


    }

}

window.addEventListener("scroll",()=>{

    const header = document.querySelector("header");

    if(window.scrollY > 50){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});
// =========================
// PÁGINA DO PRODUTO
// =========================

const params = new URLSearchParams(window.location.search);

const idProduto = params.get("id");


if(idProduto){

    fetch("produtos.json")

    .then(res => res.json())

    .then(produtos=>{


        const produto = produtos.find(
            p => p.id == idProduto
        );


        if(!produto){

            console.error("Produto não encontrado");

            return;

        }


        // IMAGEM

        const imagem = document.getElementById("imagemProduto");

        if(imagem){

            imagem.src = produto.imagem;
            imagem.alt = produto.nome;

        }



        // NOME

        const nome = document.getElementById("nomeProduto");

        if(nome){

            nome.innerHTML = produto.nome;

        }



        // DESCRIÇÃO

        const descricao = document.getElementById("descricaoProduto");

        if(descricao){

            descricao.innerHTML = produto.descricao;

        }



        // PREÇO

        const preco = document.getElementById("precoProduto");

        if(preco){

            preco.innerHTML = produto.preco;

        }



        // WHATSAPP

        const whatsapp = document.getElementById("whatsappProduto");

        if(whatsapp){

            whatsapp.href = produto.whatsapp;

        }



        // INSTAGRAM

        const instagram = document.getElementById("instagramProduto");

        if(instagram){

            instagram.href = produto.instagram;

        }


    })

    .catch(erro=>{

        console.error(
            "Erro ao carregar produto:",
            erro
        );

    });

}