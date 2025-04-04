document.addEventListener("DOMContentLoaded", function() {
    const scrollUp = document.getElementById("scroll-up");
    const scrollDown = document.getElementById("scroll-down");

    scrollUp.addEventListener("click", function() {
        window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
    });

    scrollDown.addEventListener("click", function() {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    });
});
