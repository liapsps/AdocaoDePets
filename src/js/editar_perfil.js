document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.getElementById("saveButton"); 
    if (!saveButton) {
        console.error("Botão 'Salvar Alterações' não encontrado!");
        return;
    }
  
    saveButton.addEventListener("click", function (e) {
        e.preventDefault(); 
      
        alert("Perfil alterado com sucesso!");
  
        window.location.href = "../pages/perfil_adotante.html"; 
    });
  });
  