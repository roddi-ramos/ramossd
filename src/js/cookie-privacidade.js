document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup-privacidade");
    const btnAceitar = document.getElementById("btn-aceitar-privacidade");

    // Verifica se o usuário já aceitou
    if (!localStorage.getItem("aceitouPrivacidade")) {

        setTimeout(() => {
            popup.style.opacity = "1";
        }, 300);
    } else {
        popup.style.display = "none";
    }

    // Quando clicar em "Entendi"
    btnAceitar.addEventListener("click", function () {
        localStorage.setItem("aceitouPrivacidade", "true");
        popup.style.opacity = "0";
        popup.style.transform = "translateY(20px)";
        setTimeout(() => {
            popup.style.display = "none";
        }, 300);
    });
});