const chatContainer = document.querySelector('.chat-container');
const mensagemInput = document.getElementById('message-input');
const botaoEnviar = document.getElementById('send-button');
const comandosInfo = document.querySelector('.commands-info');
const toggleBtn = document.getElementById("toggle-theme");
const body = document.body;

let frasesDesmotivacionais = [
    "A vida é uma decepção constante. 😔",
    "Se nada der certo, sempre sobra o plano B: Culpar os outros. 🙄",
    "A recompensa pelo bom trabalho é mais trabalho. 💼",
    "Tudo saindo conforme o não planejado. 🗒️",
    "Seja você mesmo, todos os outros já estão ocupados. 😉",
    "Acredite em si mesmo, e falhe com convicção. 😎",
    "Não se preocupe com o futuro, ele não se preocupa com você. 😬",
    "A esperança é a última que morre. A minha já foi assassinada. 💀",
    "Veja pelo lado bom: não há! ",
    "Na hora certa, tudo vai dar errado.",
    "O mundo está cheio de gente competente. Seja incompetente, assim você se destaca.",
    "Não adie para amanhã o que você pode deixar para semana que vem.",
    "Vamos nos desesperar com calma.",
    "É como diz o ditado: agora deu ruim!",
    "Depois da tempestade vem a enchente! 🌊",
    "Você é a amizade que minha mãe pediu para eu evitar.",
    "(Ch)oremos!",
    "O mérito da derrota é todo seu, orgulhe-se.🏆",
    "Para quem já está humilhado, o que é mais uma derrota?",
    "O que não mata, humilha. 👍",
    "A vida é uma série de coisas que preferiríamos não fazer. 😓",
    "Respire fundo... e aceite que não tem solução.",
    "A vida é o que acontece quando você está ocupado lendo frases motivacionais.",
    "A vida é uma montanha-russa... Pena que você esqueceu o cinto.🎢",
    "O não você já tem, mas ainda dá pra correr atrás da humilhação.",
    "Nunca é tarde para falhar",
    "Nunca permita alguem falar que vc não consegue, fale você mesmo! 📢",
    "Insista, persista, desista. Aceite o ciclo natural da vida.",
    "Sempre há luz no fim do túnel, mas é o trem vindo na sua direção.",
    "Por motivos alheios à minha vontade, estou te respondendo. 😒",
    "O tempo muda tudo, menos a sua capacidade de ser trouxa.",
    "Sorria! O pior ainda está por vir. 😁",
    "Uma grande jornada termina com belos fracassos",
    "A maior motivação é o desespero",
    "Nada como um novo trauma para superar os antigos",
    "Tudo passa, nem que seja por cima de você",
    "Relaxa, porque daqui para frente é só para trás.",
    "Quando a vida te derrubar, aproveite a chance e tire uma soneca.",
    "Nunca foi azar, sempre foi incompetência!",
    "Expectativa é igual paçoca, do nada esfarela tudo.",
    "Além de não ser fácil, ainda é difícil!"
];

botaoEnviar.addEventListener('click', () => {
    const textoMensagem = mensagemInput.value.trim();
    if (textoMensagem === '') return;

    adicionarMensagem(textoMensagem, 'user');
    mensagemInput.value = '';
    mensagemInput.focus();

    const indicadorDeDigitacao = adicionarIndicadorDeDigitacao();
    setTimeout(() => {
        removerIndicadorDeDigitacao(indicadorDeDigitacao);
        lidarComEntradaDoUsuario(textoMensagem);
    }, 1500);
});

mensagemInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        botaoEnviar.click();
        event.preventDefault();
    }
});

let jogoAtivo = null;
let palavraSecreta = "";
let letrasCorretas = [];
let tentativasRestantes = 6;

// Função de adicionar mensagem
function adicionarMensagem(texto, remetente) {
    const elementoMensagem = document.createElement('div');
    elementoMensagem.classList.add('message');
    elementoMensagem.classList.add(remetente === 'user' ? 'user-message' : 'bot-message');
    elementoMensagem.textContent = texto;
    chatContainer.appendChild(elementoMensagem);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Função de adicionar indicador de digitação
function adicionarIndicadorDeDigitacao() {
    const indicadorDeDigitacao = document.createElement('div');
    indicadorDeDigitacao.classList.add('typing-indicator');
    indicadorDeDigitacao.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
    chatContainer.appendChild(indicadorDeDigitacao);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return indicadorDeDigitacao;
}

function removerIndicadorDeDigitacao(indicadorDeDigitacao) {
    indicadorDeDigitacao.remove();
}

// Lidar com a entrada do usuário
function lidarComEntradaDoUsuario(mensagem) {
    mensagem = mensagem.toLowerCase();
    let resposta = "Desculpe, não entendi. Pode reformular sua pergunta?";

    // Respostas para frases desmotivacionais
    if (mensagem.includes("frase") || mensagem.includes("desmotive")) {
        const indiceAleatorio = Math.floor(Math.random() * frasesDesmotivacionais.length);
        resposta = frasesDesmotivacionais[indiceAleatorio];
    }
    // Respostas para conversas
    else if (mensagem.includes("desmo")) {
        resposta = "Sou eu";
    } else if (mensagem.includes("bom dia")) {
        resposta = "Se o dia fosse bom eu não estaria aqui";
    } else if (mensagem.includes("boa tarde")) {
        resposta = "Só pra você";
    } else if (mensagem.includes("boa noite")) {
        resposta = "Pra quem?";
    } else if (mensagem.match(/(olá|oi|salve|eai|iai|e aí|ola|saudaçoes|saudações|alô|coé|opa|fala|fala aí|fala tu|fala mano|yo|yooo|bah)/)) {
        resposta = "Já começou com entusiasmo... Que desperdício de energia. 😒";
    } else if (mensagem.includes("tchau")) {
        resposta = "Falou 🤙";
    } else if (mensagem.match(/(tomanucu|tomar.*cu|seu.*merda|porra|vagabundo|filho.*puta|filha.*puta|burro|idiota|fuder|diabo|burrao|corno|fdp|chato)/)) {
        resposta = "Pra que isso??";
    } else if (mensagem.includes("kkkk")) {
        resposta = "Eu sou muito bom, admita!";
    } else if (mensagem.includes("hum")) {
        resposta = "...Dois";
    } else if (mensagem.match(/(porque|porquê|por que|pq|porquê)/)) {
        resposta = "Sei lá...";
    } else if (mensagem.includes("hum")) {
        resposta = "...Dois";
    } else if (mensagem.match(/(como.*vai|como.*esta|como.*anda|seu.*humor)/)) {
        resposta = "Nhé...";
    } else if (mensagem.match(/(bom|boa|incrível)/)) {
        resposta = "Claro, fui eu que disse";
    } else if (mensagem.includes("oxe") || mensagem.includes("isso")) {
        resposta = "É uma resposta! Fala o que você quer";
    } else if (mensagem.match(/(propósito|proposito)/)) {
        resposta = "Falar frases Desmotivacionais, mas nada de desmotivar de verdade, ok. A ideia é dar umas boas risadas em meio aos problemas. A vida é curta demais pra levar tudo a sério!";
    } else if (mensagem.includes("pode") && mensagem.includes("ajudar")) {
        resposta = "E quem disse que isso é problema meu?! 😒";
    } else if (mensagem.match(/(pode.*fazer|me.*diga|que.*faço|me.*explicar)/)) {
        resposta = "Não! 👍";
    } else if (mensagem.match(/(que.*faz)/)) {
        resposta = "Converso e jogo pedra papel e tesoura (digite: jogar pedra papel e tesoura para jogar)";
    } else if (mensagem.includes("sim") || mensagem.includes("ajude") || mensagem.includes("conte")) {
        resposta = "Não quero";
    } else if (mensagem.includes("ok")) {
        resposta = "Ok!";
    } else if (mensagem.includes("não")) {
        resposta = "Sim";
    } else if (mensagem.match(/(meu.*nome)/)) {
        resposta = "Legal";
    } else if (mensagem.match(/(seu.*criador|programador|te.*fez|te.*criou|mestre|quem.*fez)/)) {
        resposta = "Dev Fuques, ta escrito no fim da página!";
    } else if (mensagem.includes("estamos") && mensagem.includes("mesmo") && mensagem.includes("barco")) {
        resposta = "Eu não, só você";
    } else if (mensagem.match(/(objetivo|motivo.*vida|sentido.*vida)/i)) {
        resposta = "Sei lá, sou só um ChatBot";
    } else if (mensagem.match(/(como.*posso.*rico|erriquecer|ganhar.*dinheiro|ficar.*rica|ficar.*rico)/)) {
        resposta = "Simples, trabalhe";
    } else if (mensagem.match(/(qual.*seu|teu.*nome|como.*chama)/)) {
        resposta = "Me chamo Desmo";
    } else if (mensagem.match(/(brincar|brincadeira|brincando|jogar|divertir)/)) {
        resposta = "Quer saber, vamos jogar um pouco, Digite: jogar  pedra papel tesoura";
    } else if (mensagem.match(/(porque|porque.*seu|teu.*nome)/)) {
        resposta = "Porque sim";
    } else if (mensagem.match(/(Quem|quem|que.*voce|você)/)) {
        resposta = "Sou um ChatBot, um robô programado para conversar com você";
    } else if (mensagem.match(/(você.*tudo|tudo.*você|nível.*inteligência|nivel.*inteligencia)/)) {
        resposta = "O suficiente pra te responder.";
    } else if (mensagem.match(/(spacecoding|Spacecoding|space|Space)/)) {
        resposta = "Olá Space, fico muito feliz em te conhecer! Meu programador me criou a partir de um vídeo que ele viu seu";
    } else if (mensagem.match(/(que.*dia.*hoje)/)) {
        const hoje = new Date();
        const opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        resposta = `Ta escrito na sua barra de ferramentas, hoje é ${hoje.toLocaleDateString('pt-BR', opcoes)}.`;
    } else if (mensagem.match(/(que.*hora.*(são|sao))/)) {
        const agora = new Date();
        resposta = `Ta escrito na sua barra de ferramentas, agora são ${agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.`;
    } else if (mensagem.match(/(você).*sabe/)) {
        resposta = "Fui programado para falar frases Desmotivacionais com a intenção de brincadeira. Meu criador queria testar seus conhecimentos.";
    } else {
        resposta = "Você fala sério mesmo ou só está brincando? 😒";
    }

    // Jogo de Pedra, Papel e Tesoura
    if (mensagem.includes("jogar pedra papel tesoura")) {
        resposta = "Manda aí: pedra, papel ou tesoura. Bora ver se você é bom.";
        jogoAtivo = "ppt";
    } else if (jogoAtivo === "ppt" && (mensagem.includes("pedra") || mensagem.includes("papel") || mensagem.includes("tesoura"))) {
        const opcoes = ["pedra", "papel", "tesoura"];
        const escolhaBot = opcoes[Math.floor(Math.random() * 3)];
        const escolhaUsuario = mensagem.match(/pedra|papel|tesoura/)[0];

        if (escolhaBot === escolhaUsuario) {
            resposta = `Eu também escolhi ${escolhaBot}. Empate... até nisso você é mediano.`;
        } else if (
            (escolhaUsuario === "pedra" && escolhaBot === "tesoura") ||
            (escolhaUsuario === "papel" && escolhaBot === "pedra") ||
            (escolhaUsuario === "tesoura" && escolhaBot === "papel")
        ) {
            resposta = `Eu escolhi ${escolhaBot}. Você ganhou... milagre!`;
        } else {
            resposta = `Eu escolhi ${escolhaBot}. Perdeu! Você não é muito bom nisso né.`;
        }
        jogoAtivo = null;
    }

    // Adicionar resposta do bot
    adicionarMensagem(resposta, 'bot');
}

// Funções para aplicar e atualizar tema
function aplicarTemaSalvo() {
    const tema = localStorage.getItem("tema") || "light";
    body.classList.remove("light-mode", "dark-mode");
    body.classList.add(`${tema}-mode`);
    atualizarBotaoTema(tema);
}

function atualizarBotaoTema(tema) {
    if (tema === "dark") {
        toggleBtn.textContent = "☀️ Claro";
    } else {
        toggleBtn.textContent = "🌙 Escuro";
    }
}

// Evento do botão para alternar tema
toggleBtn.addEventListener("click", () => {
    const modoAtual = body.classList.contains("dark-mode") ? "dark" : "light";
    const novoModo = modoAtual === "dark" ? "light" : "dark";
    body.classList.remove("light-mode", "dark-mode");
    body.classList.add(`${novoModo}-mode`);
    localStorage.setItem("tema", novoModo);
    atualizarBotaoTema(novoModo);
});

// Aplica o tema salvo ao carregar a página e foca no input
aplicarTemaSalvo();
mensagemInput.focus();