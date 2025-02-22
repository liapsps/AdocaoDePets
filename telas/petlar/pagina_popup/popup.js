    // Obter o modal
    const modal = document.getElementById("myModal");

    // Obter o botão que abre o modal
    const btn = document.getElementById("myBtn");

    // Obter os elementos que fecham o modal
    const closeBtns = document.querySelectorAll(".close");

    // Abrir o modal ao clicar no botão
    btn.onclick = function () {
      modal.style.display = "block";
    };

    // Fechar o modal ao clicar nos elementos de fechamento
    closeBtns.forEach((btn) => {
      btn.onclick = function () {
        modal.style.display = "none";
      };
    });

    // Fechar o modal ao clicar fora dele
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };