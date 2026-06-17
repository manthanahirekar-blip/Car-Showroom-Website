 let current = 0;
        let slides = document.querySelectorAll(".slide")

        function showslides(index) {
            slides.forEach(slide => slide.classList.remove("active"));
            slides[index].classList.add("active");
        }

        function prevslide() {
            current = (current - 1 + slides.length) % slides.length;
            showslides(current)
        }

        function nextslide() {
            current = (current + 1) % slides.length;
            showslides(current);
        }

        setInterval(nextslide, 3000)


 