
const perfis = [
    {
        id: 1,
        nome: "Engenheiro de Sistemas",
        categoria: "Construção",
        descricao: "Transforma problemas em soluções.",
        recomendacao: "Você deve liderar a manutenção de estruturas, reparar equipamentos e criar soluções rápidas para garantir a estabilidade da missão.",
        imagem: "img/perfil-1.jpg"
    },
    {
        id: 2,
        nome: "Explorador Planetário",
        categoria: "Exploração",
        descricao: "Descobre novos lugares.",
        recomendacao: "Você deve ir à frente da equipe para mapear terrenos, localizar rotas seguras e descobrir novos pontos de interesse no planeta.",
        imagem: "img/perfil-2.jpg"
    },
    {
        id: 3,
        nome: "Cientista Xenobiólogo",
        categoria: "Pesquisa",
        descricao: "Investiga o planeta e seus mistérios.",
        recomendacao: "Você deve conduzir estudos científicos, analisar vida alienígena e coletar dados cruciais para compreender o ambiente do planeta.",
        imagem: "img/perfil-3.jpg"
    },
    {
        id: 4,
        nome: "Comandante de Missão",
        categoria: "Liderança",
        descricao: "Organiza a equipe e planeja estratégias.",
        recomendacao: "Você deve coordenar a equipe, distribuir responsabilidades e manter o planejamento estratégico para o sucesso da expedição.",
        imagem: "img/perfil-4.jpg"
    }
];

function redefinirTeste() {
    formulario.reset();
    resultado.innerHTML = "";
    formulario.style.display = "block";
}
function renderizarResultadoPerfil(perfil, nome, idade) {
    formulario.style.display = "none";
    resultado.innerHTML = `
        <div class="resultado-card">
            <h2>Seu perfil foi identificado!</h2>
            <p>Nome informado:</p> ${nome}
            <p>Idade:</p> ${idade}
            <h3>${perfil.nome}</h3>
            <p>Categoria: ${perfil.categoria}</p>
            <p>Descrição:</p>${perfil.descricao}
            <p>Recomendação para a missão:</p> ${perfil.recomendacao}
            <img src="${perfil.imagem}" alt="${perfil.nome}" width="200">
            <button type="button" id="refazerTeste" class="btn-refazer">Refazer Teste</button>
        </div>
    `;
    document.getElementById("refazerTeste").addEventListener("click", redefinirTeste);
}
function renderizarResultadoEmpate(vencedor, nome, idade) {
    formulario.style.display = "none";

    resultado.innerHTML = `
        <div class="resultado-card">
            <h2>Empate de perfis!</h2>
            <p>Olá, ${nome}! Você tem ${idade} anos.</p>
            <p>Seus perfis são:</p>
            ${vencedor.map(perfil => `<p>${perfil.nome} (${perfil.categoria})</p>`).join("")}
            <button type="button" id="refazerTeste" class="btn-refazer">Refazer Teste</button>
        </div>
    `;
    document.getElementById("refazerTeste").addEventListener("click", redefinirTeste);
}
formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    let nome = formulario.elements.nome.value.trim();
    let data = formulario.elements.data.value;
    if (nome === "" || data === "") {
        resultado.textContent = "Preencha todos os campos!";
        return;
    }
    let nascimento = new Date(data);
    let hoje = new Date();
    if (nascimento > hoje) {
        resultado.textContent = "A data não pode ser futura!";
        return;
    }
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    if (
        hoje.getMonth() < nascimento.getMonth() ||
        (hoje.getMonth() === nascimento.getMonth() &&
         hoje.getDate() < nascimento.getDate())
    ) {
        idade--;
    }
    let pontos = [0, 0, 0, 0];
    for (let i = 1; i <= 4; i++) {
        let resposta = formulario.querySelector('input[name="pergunta' + i + '"]:checked');
        if (resposta === null) {
            resultado.textContent = "Responda todas as perguntas!";
            return;
        }
        pontos[Number(resposta.value) - 1]++;
    }
    let maior = Math.max(...pontos);
    let vencedor = [];
    for (let i = 0; i < pontos.length; i++) {
        if (pontos[i] === maior) {
            vencedor.push(perfis[i]);
        }
    }
    if (vencedor.length > 1) {
        renderizarResultadoEmpate(vencedor, nome, idade);
        return;
    }
    let perfil = vencedor[0];
    renderizarResultadoPerfil(perfil, nome, idade);
});
