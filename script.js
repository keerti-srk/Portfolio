
tsParticles.load("tsparticles", {
  fpsLimit: 60,
  background: { color: "#0b1c30" },
  particles: {
    number: { value: 60 },
    color: { value: ["#00ffd5","#ffaa38","#ff44aa"] },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    move: { enable: true, speed: 2, random: true, direction: "none", outModes: { default: "out" } },
    links: { enable: true, distance: 120, color: "#00ffd5", opacity: 0.4, width: 1 }
  },
  interactivity: {
    events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" } },
    modes: { repulse: { distance: 100 }, push: { quantity: 4 } }
  },
  detectRetina: true
});



  AOS.init({ once: true, duration: 1000 });


// Highlight current page link based on hash (single-page)
function setActiveFromHash(){
  document.querySelectorAll("nav a").forEach(link => link.classList.remove("active"));
  const hash = window.location.hash || "#home";
  const el = document.querySelector('nav a[href="'+hash+'"]');
  if(el) el.classList.add("active");
}
// on load and on hash change
window.addEventListener('load', setActiveFromHash);
window.addEventListener('hashchange', setActiveFromHash);



document.addEventListener("DOMContentLoaded", function () {

  const aboutSection = document.querySelector("#about");
  const fadeItems = aboutSection.querySelectorAll(".fade-item");

  let hasAnimated = false; // Ensures animation runs only once

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        
        fadeItems.forEach(item => {
          item.classList.add("active");
        });

        hasAnimated = true; // Prevents re-animation
      }
    });
  }, { threshold: 0.4 });

  observer.observe(aboutSection);
});





document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".skill-box");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.3
  });

  cards.forEach(card => {
    observer.observe(card);
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".project-box");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});



document.addEventListener("DOMContentLoaded", function () {

  const achievementCards = document.querySelectorAll(".achievement-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  achievementCards.forEach(card => observer.observe(card));
});




const filterButtons = document.querySelectorAll(".filter-btn");
const card1 = document.querySelectorAll(".achievement-card");
const container = document.querySelector(".achievements-container");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        // Remove & add active button style
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const category = btn.getAttribute("data-category");

        // Remove centering first
        container.classList.remove("filtered-center");

        let visibleCount = 0;

        card1.forEach(card => {
            const matches = (category === "all" || card.getAttribute("data-category") === category);

            if (matches) {
                card.style.display = "block";
                setTimeout(() => card.style.opacity = "1", 20);
                visibleCount++;
            } else {
                card.style.opacity = "0";
                setTimeout(() => card.style.display = "none", 200);
            }
        });

        //  Center ONLY Academics & Sports
        if ((category === "academics" || category === "sports") && visibleCount > 0) {
            container.classList.add("filtered-center");
        }

    });
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();  // Stop normal redirect
        const formData = new FormData(form);

        // Send using Fetch
        let response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            // Show success alert
            alert("Your message has been sent successfully!");

            // Reload form (fresh new form)
            form.reset();

            // FULL reload of the whole form section
            setTimeout(() => {
                location.reload();   // This reloads the page
            }, 300);

        } else {
            alert("Failed to send message. Please try again.");
        }
    });
});
