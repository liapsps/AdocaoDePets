// Texto que será exibido com o efeito de máquina de escrever
const texto = "Encontre Seu Novo Amigo!";
let indice = 0;
const velocidade = 100; // velocidade em milissegundos

function efeitoMaquinaDeEscrever() {
  if (indice < texto.length) {
    document.getElementById("typewriter").innerHTML += texto.charAt(indice);
    indice++;
    setTimeout(efeitoMaquinaDeEscrever, velocidade);
  }
}

// Inicia o efeito assim que a página for carregada
window.addEventListener("load", efeitoMaquinaDeEscrever);