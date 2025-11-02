const tipos = [
  { nome: "Latinha (269ml)", ml: 269 },
  { nome: "Lata (350ml)", ml: 350 },
  { nome: "Latão (473ml)", ml: 473 },
  { nome: "Garrafinha (300ml)", ml: 300 },
  { nome: "Long Neck (355ml)", ml: 355 },
  { nome: "Garrafa (600ml)", ml: 600 },
  { nome: "Litrão (1000ml)", ml: 1000 }
];

const container = document.getElementById("tipos");
const melhorDiv = document.getElementById("melhor");
const resultados = {};

// Cria campos dinamicamente
tipos.forEach((t, i) => {
  const div = document.createElement("div");
  div.className = "item";
  div.setAttribute("id", `item-${i}`);
  div.innerHTML = `
    <label>${t.nome}</label>
    <input type="number" id="preco-${i}" placeholder="R$" min="0" step="0.01">
    <div id="res-${i}" class="resultado"></div>
  `;
  container.appendChild(div);

  const input = div.querySelector("input");
  input.addEventListener("input", () => calcular(i));
});

function calcular(i) {
  const tipo = tipos[i];
  const preco = parseFloat(document.getElementById(`preco-${i}`).value);
  const resDiv = document.getElementById(`res-${i}`);
  const itemDiv = document.getElementById(`item-${i}`);

  itemDiv.classList.remove("melhor-opcao");
  melhorDiv.textContent = "";

  if (!preco || preco <= 0) {
    resDiv.textContent = "";
    delete resultados[tipo.nome];
    mostrarMelhor();
    return;
  }

  const litro = (preco / (tipo.ml / 1000)).toFixed(2);
  resultados[tipo.nome] = parseFloat(litro);
  resDiv.textContent = `Preço por litro: R$ ${litro}`;

  mostrarMelhor();
}

function mostrarMelhor() {
  const chaves = Object.keys(resultados);
  if (chaves.length < 2) {
    melhorDiv.textContent = "";
    return;
  }

  const menor = chaves.reduce((a, b) =>
    resultados[a] < resultados[b] ? a : b
  );

  melhorDiv.textContent = `💰 A mais em conta é: ${menor} (R$ ${resultados[menor].toFixed(2)}/L)`;

  // Remove destaque anterior
  document.querySelectorAll(".item").forEach(el => el.classList.remove("melhor-opcao"));

  // Adiciona destaque animado ao item vencedor
  const index = tipos.findIndex(t => t.nome === menor);
  const melhorItem = document.getElementById(`item-${index}`);
  if (melhorItem) melhorItem.classList.add("melhor-opcao");
}

/* ======= Alternância de tema ======= */
const btnTema = document.getElementById("toggle-theme");

// Verifica se há tema salvo
if (localStorage.getItem("tema") === "escuro") {
  document.body.classList.add("dark");
  btnTema.textContent = "☀️";
}

btnTema.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const temaAtual = document.body.classList.contains("dark") ? "escuro" : "claro";
  localStorage.setItem("tema", temaAtual);
  btnTema.textContent = temaAtual === "escuro" ? "☀️" : "🌙";
});
