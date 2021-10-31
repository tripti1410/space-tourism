document.addEventListener("DOMContentLoaded", function () {
    const el = document.querySelector(".mobile-nav-toggle");
    el.addEventListener("click", function (event){
        const el = event.target;
        const toggled = !(el.getAttribute("aria-expanded") === "true");
        el.setAttribute("aria-expanded", toggled);
    });
});
