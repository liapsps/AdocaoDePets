
    const modal = document.getElementById("myModal");

    const btn = document.getElementById("myBtn");

    const closeBtns = document.querySelectorAll(".close");

    btn.onclick = function () {
      modal.style.display = "block";
    };

    closeBtns.forEach((btn) => {
      btn.onclick = function () {
        modal.style.display = "none";
      };
    });

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };