// filtros da galeria
const botoesFiltro = document.querySelectorAll('.filtros button');
const itens = document.querySelectorAll('.mural li');

botoesFiltro.forEach((botao) => {
  botao.addEventListener('click', () => {
    const filtro = botao.dataset.filtro;
    botoesFiltro.forEach((b) => {
      b.classList.toggle('ativo', b === botao);
      b.setAttribute('aria-pressed', b === botao);
    });
    itens.forEach((li) => {
      li.hidden = filtro !== 'todos' && li.dataset.cat !== filtro;
    });
  });
});

// lupa: abre a ilustracao em tamanho grande e navega entre as visiveis
const lupa = document.querySelector('.lupa');
const lupaImg = lupa.querySelector('img');
const lupaLegenda = lupa.querySelector('figcaption');
let atual = null;

function visiveis() {
  return [...document.querySelectorAll('.mural li:not([hidden]) .obra')];
}

function mostrar(obra) {
  const mini = obra.querySelector('img');
  atual = obra;
  lupaImg.src = obra.dataset.src;
  lupaImg.alt = mini.alt;
  lupaLegenda.textContent = mini.alt;
}

function andar(passo) {
  const lista = visiveis();
  const i = lista.indexOf(atual);
  mostrar(lista[(i + passo + lista.length) % lista.length]);
}

document.querySelectorAll('.obra').forEach((obra) => {
  obra.addEventListener('click', () => {
    mostrar(obra);
    lupa.showModal();
  });
});

lupa.querySelector('.lupa-fechar').addEventListener('click', () => lupa.close());
lupa.querySelector('.lupa-ant').addEventListener('click', () => andar(-1));
lupa.querySelector('.lupa-prox').addEventListener('click', () => andar(1));
lupa.addEventListener('click', (e) => { if (e.target === lupa) lupa.close(); });
lupa.addEventListener('close', () => atual?.focus());
document.addEventListener('keydown', (e) => {
  if (!lupa.open) return;
  if (e.key === 'ArrowLeft') andar(-1);
  if (e.key === 'ArrowRight') andar(1);
});

document.getElementById('ano').textContent = new Date().getFullYear();
