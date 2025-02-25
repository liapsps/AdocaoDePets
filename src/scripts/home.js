console.log("Script carregado!");

const texto = "Encontre Seu Novo Amigo!";
let indice = 0;
const velocidade = 100;

function efeitoMaquinaDeEscrever() {
  if (indice < texto.length) {
    document.getElementById("typewriter").innerHTML += texto.charAt(indice);
    indice++;
    setTimeout(efeitoMaquinaDeEscrever, velocidade);
  }
}

window.addEventListener("load", efeitoMaquinaDeEscrever);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  if (!form) {
    console.error("Formulário não encontrado!");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    form.reset();
  });
});
