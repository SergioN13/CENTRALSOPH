const form = document.getElementById("formPedido");
const historicoDiv = document.getElementById("historicoPedidos");

let contador = Number(localStorage.getItem("contadorPedidos")) || 1;
let historico = JSON.parse(localStorage.getItem("historicoPedidos")) || [];

// 🔴 TROQUE PELO SEU NÚMERO
const numeroWhatsApp = "5591991431664";

// RENDERIZA HISTÓRICO
function renderizarHistorico() {
  historicoDiv.innerHTML = "";

  if (historico.length === 0) {
    historicoDiv.innerHTML = "<p>💭 Nenhum pedido ainda.</p>";
    return;
  }

  historico.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = `item-historico ${p.status}`;

    div.innerHTML = `
      <h4>🆔 Pedido #${p.numero}</h4>
      <small>🕒 ${p.dataHora}</small>
      <p><strong>📝</strong> ${p.titulo}</p>
      <p><strong>⚡</strong> ${p.prioridade}</p>
      <p><strong>📅</strong> ${p.prazo}</p>

      <div class="acoes">
        <button onclick="toggleStatus(${index})">
          ${p.status === "concluido" ? "↩️ Marcar como pendente" : "✅ Marcar como concluído"}
        </button>

        <button class="reenviar" onclick="reenviarPedido(${index})">
          🔁 Reenviar pedido
        </button>
      </div>
    `;

    historicoDiv.appendChild(div);
  });
}

// ALTERA STATUS
function toggleStatus(index) {
  historico[index].status =
    historico[index].status === "concluido" ? "pendente" : "concluido";

  localStorage.setItem("historicoPedidos", JSON.stringify(historico));
  renderizarHistorico();
}

// 🔁 REENVIAR PEDIDO
function reenviarPedido(index) {
  const p = historico[index];

  const textoMensagem = `
Pedido #*${p.numero}*

Feito em: ${p.dataHora}
*Pedido:* ${p.titulo}
*Prioridade:* ${p.prioridade}
Prazo:${p.prazo}

Reenvio do pedido
  `;

  window.open(
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoMensagem)}`,
    "_blank"
  );
}

// SUBMIT NOVO PEDIDO
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim() || "Sem detalhes";
  const prioridade = document.getElementById("prioridade").value;
  const prazo = document.getElementById("prazo").value;

  if (!titulo || !prazo) return;

  const dataHora = new Date().toLocaleString("pt-BR");
  const numeroPedido = String(contador).padStart(2, "0");

  const textoMensagem = `
Pedido N°#*${numeroPedido}*

Feito em: ${dataHora}
*Pedido:* ${titulo}
Detalhe: ${descricao}
*Prioridade:* ${prioridade}
Prazo: ${prazo}
  `;


  window.open(
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoMensagem)}`,
    "_blank"
  );

  historico.unshift({
    numero: numeroPedido,
    dataHora,
    titulo,
    prioridade,
    prazo,
    status: "pendente"
  });

  localStorage.setItem("historicoPedidos", JSON.stringify(historico));

  contador++;
  localStorage.setItem("contadorPedidos", contador);

  form.reset();
  renderizarHistorico();
});

// INIT
renderizarHistorico();


  const textoMensagem = `
    Pedido N°#${numeroPedido}

Feito em: ${dataHora}
*Pedido:* ${titulo}
Detalhe: ${descricao}
*Prioridade:* ${prioridade}
Prazo: ${prazo}
  `;


