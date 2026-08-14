/* ========================================
   PÁGINAS SOLTAS
   JAVASCRIPT PRINCIPAL
======================================== */


/* ========================================
   TEXTOS INICIAIS
======================================== */

const textosIniciais = [

  {
    id: "texto-1",

    titulo: "Entre o silêncio e a chuva",

    autor: "Páginas Soltas",

    categoria: "Poesia",

    conteudo:
`Entre o silêncio e a chuva,
há coisas que não sei dizer.

Talvez algumas palavras
tenham nascido para ficar
no espaço entre o peito
e aquilo que a boca
não consegue explicar.`,

    data: "14/08/2026"
  },


  {
    id: "texto-2",

    titulo: "A janela",

    autor: "Páginas Soltas",

    categoria: "Reflexão",

    conteudo:
`Às vezes, tudo o que precisamos
é de uma janela.

Não para fugir,
mas para lembrar
que existe um mundo
além daquilo que estamos vivendo.`,

    data: "14/08/2026"
  },


  {
    id: "texto-3",

    titulo: "Quando a noite chega",

    autor: "Páginas Soltas",

    categoria: "Poesia",

    conteudo:
`Quando a noite chega,
as estrelas não perguntam
quem você foi durante o dia.

Elas apenas
continuam brilhando.`,

    data: "14/08/2026"
  }

];


/* ========================================
   CONFIGURAÇÃO DO STORAGE
======================================== */

const chaveStorage = "paginasSoltasTextos";


/* ========================================
   ELEMENTOS DA PÁGINA
======================================== */

const biblioteca =
  document.getElementById("textLibrary");

const contador =
  document.getElementById("textCount");

const busca =
  document.getElementById("searchInput");

const filtroCategoria =
  document.getElementById("categoryFilter");

const mensagemVazia =
  document.getElementById("emptyMessage");

const formulario =
  document.getElementById("publishForm");

const modal =
  document.getElementById("readerModal");

const tituloLeitor =
  document.getElementById("readerTitle");

const autorLeitor =
  document.getElementById("readerAuthor");

const categoriaLeitor =
  document.getElementById("readerCategory");

const conteudoLeitor =
  document.getElementById("readerContent");

const dataLeitor =
  document.getElementById("readerDate");

const notificacao =
  document.getElementById("toast");

const menuButton =
  document.getElementById("menuButton");

const navigation =
  document.getElementById("navigation");


/* ========================================
   PEGAR TEXTOS SALVOS
======================================== */

function pegarTextos() {

  try {

    const textosSalvos =
      localStorage.getItem(chaveStorage);

    if (textosSalvos) {

      const textos =
        JSON.parse(textosSalvos);

      if (Array.isArray(textos)) {

        return textos;

      }

    }

  } catch (erro) {

    console.error(
      "Erro ao carregar textos:",
      erro
    );

  }


  localStorage.setItem(
    chaveStorage,
    JSON.stringify(textosIniciais)
  );

  return textosIniciais;
}


/* ========================================
   SALVAR TEXTOS
======================================== */

function salvarTextos(textos) {

  try {

    localStorage.setItem(
      chaveStorage,
      JSON.stringify(textos)
    );

  } catch (erro) {

    console.error(
      "Erro ao salvar textos:",
      erro
    );

  }

}


/* ========================================
   SEGURANÇA DO HTML
======================================== */

function escaparHTML(texto) {

  return String(texto).replace(
    /[&<>"']/g,
    function(caractere) {

      const caracteres = {

        "&": "&amp;",

        "<": "&lt;",

        ">": "&gt;",

        '"': "&quot;",

        "'": "&#039;"

      };

      return caracteres[caractere];

    }
  );

}


/* ========================================
   MOSTRAR TEXTOS
======================================== */

function mostrarTextos() {

  const termo =
    busca.value
      .trim()
      .toLowerCase();


  const categoriaSelecionada =
    filtroCategoria.value;


  const todosTextos =
    pegarTextos();


  const textosFiltrados =
    todosTextos.filter(function(texto) {

      const conteudoPesquisa =
        (
          texto.titulo +
          " " +
          texto.autor +
          " " +
          texto.conteudo
        ).toLowerCase();


      const correspondeBusca =
        termo === "" ||
        conteudoPesquisa.includes(termo);


      const correspondeCategoria =
        categoriaSelecionada === "Todos" ||
        texto.categoria === categoriaSelecionada;


      return (
        correspondeBusca &&
        correspondeCategoria
      );

    });


  /* ========================================
     CONTADOR
  ======================================== */

  contador.textContent =
    textosFiltrados.length +
    (
      textosFiltrados.length === 1
        ? " texto"
        : " textos"
    );


  /* ========================================
     LIMPAR BIBLIOTECA
  ======================================== */

  biblioteca.innerHTML = "";


  /* ========================================
     NENHUM RESULTADO
  ======================================== */

  if (textosFiltrados.length === 0) {

    mensagemVazia.classList.remove(
      "hidden"
    );

    return;

  }


  mensagemVazia.classList.add(
    "hidden"
  );


  /* ========================================
     CRIAR CARTÕES
  ======================================== */

  textosFiltrados.forEach(function(texto) {

    const cartao =
      document.createElement("article");


    cartao.className =
      "text-card";


    cartao.dataset.id =
      texto.id;


    cartao.innerHTML = `

      <span class="text-category">
        ${escaparHTML(texto.categoria)}
      </span>


      <h3>
        ${escaparHTML(texto.titulo)}
      </h3>


      <p class="text-excerpt">
        ${escaparHTML(texto.conteudo)}
      </p>


      <div class="text-card-footer">

        <span>
          ${escaparHTML(texto.autor)}
        </span>

        <span>
          ${escaparHTML(texto.data)}
        </span>

      </div>

    `;


    cartao.addEventListener(
      "click",
      function() {

        abrirLeitor(texto.id);

      }
    );


    biblioteca.appendChild(
      cartao
    );

  });

}


/* ========================================
   ABRIR LEITOR
======================================== */

function abrirLeitor(id) {

  const textos =
    pegarTextos();


  const texto =
    textos.find(function(item) {

      return item.id === id;

    });


  if (!texto) {

    return;

  }


  categoriaLeitor.textContent =
    texto.categoria;


  tituloLeitor.textContent =
    texto.titulo;


  autorLeitor.textContent =
    "por " + texto.autor;


  conteudoLeitor.textContent =
    texto.conteudo;


  dataLeitor.textContent =
    "Publicado em " + texto.data;


  modal.classList.remove(
    "hidden"
  );


  document.body.style.overflow =
    "hidden";

}


/* ========================================
   FECHAR LEITOR
======================================== */

function fecharLeitor() {

  modal.classList.add(
    "hidden"
  );


  document.body.style.overflow =
    "";

}


/* ========================================
   BOTÕES DE FECHAR
======================================== */

const botoesFechar =
  document.querySelectorAll(
    "[data-close-reader]"
  );


botoesFechar.forEach(
  function(botao) {

    botao.addEventListener(
      "click",
      fecharLeitor
    );

  }
);


/* ========================================
   ESC PARA FECHAR
======================================== */

document.addEventListener(
  "keydown",
  function(evento) {

    if (
      evento.key === "Escape" &&
      !modal.classList.contains("hidden")
    ) {

      fecharLeitor();

    }

  }
);


/* ========================================
   PUBLICAR TEXTO
======================================== */

formulario.addEventListener(
  "submit",
  function(evento) {

    evento.preventDefault();


    /* PEGAR VALORES */

    const titulo =
      document
        .getElementById("titleInput")
        .value
        .trim();


    const autor =
      document
        .getElementById("authorInput")
        .value
        .trim();


    const categoria =
      document
        .getElementById("publishCategory")
        .value;


    const conteudo =
      document
        .getElementById("contentInput")
        .value
        .trim();


    /* VERIFICAR */

    if (
      titulo === "" ||
      autor === "" ||
      conteudo === ""
    ) {

      mostrarNotificacao(
        "Preencha todos os campos."
      );

      return;

    }


    /* TEXTOS EXISTENTES */

    const textos =
      pegarTextos();


    /* NOVO TEXTO */

    const novoTexto = {

      id:
        "texto-" +
        Date.now(),

      titulo:
        titulo,

      autor:
        autor,

      categoria:
        categoria,

      conteudo:
        conteudo,

      data:
        new Date()
          .toLocaleDateString(
            "pt-BR"
          )

    };


    /* COLOCAR NO COMEÇO */

    textos.unshift(
      novoTexto
    );


    /* SALVAR */

    salvarTextos(
      textos
    );


    /* LIMPAR FORMULÁRIO */

    formulario.reset();


    /* ATUALIZAR BIBLIOTECA */

    mostrarTextos();


    /* MENSAGEM */

    mostrarNotificacao(
      "Seu texto foi publicado!"
    );


    /* IR PARA BIBLIOTECA */

    window.location.hash =
      "biblioteca";

  }
);


/* ========================================
   NOTIFICAÇÃO
======================================== */

function mostrarNotificacao(
  mensagem
) {

  notificacao.textContent =
    mensagem;


  notificacao.classList.add(
    "show"
  );


  setTimeout(
    function() {

      notificacao.classList.remove(
        "show"
      );

    },
    2500
  );

}


/* ========================================
   BUSCA
======================================== */

busca.addEventListener(
  "input",
  mostrarTextos
);


/* ========================================
   FILTRO
======================================== */

filtroCategoria.addEventListener(
  "change",
  mostrarTextos
);


/* ========================================
   MENU MOBILE
======================================== */

menuButton.addEventListener(
  "click",
  function() {

    navigation.classList.toggle(
      "open"
    );

  }
);


/* ========================================
   FECHAR MENU AO CLICAR
======================================== */

const linksMenu =
  navigation.querySelectorAll(
    "a"
  );


linksMenu.forEach(
  function(link) {

    link.addEventListener(
      "click",
      function() {

        navigation.classList.remove(
          "open"
        );

      }
    );

  }
);


/* ========================================
   INICIAR SITE
======================================== */

mostrarTextos();
