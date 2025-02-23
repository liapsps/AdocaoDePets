document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  if (!form) {
      console.error("Formulário não encontrado!");
      return;
  }

  form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Perfil alterado com sucesso!");
      form.reset(); 
  });
});
