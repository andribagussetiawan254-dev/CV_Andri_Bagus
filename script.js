const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");
const revealElements = document.querySelectorAll(".reveal");
const progressBars = document.querySelectorAll(".progress-bar");
const counters = document.querySelectorAll(".counter");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const introLoader = document.getElementById("introLoader");
const introSkills = document.querySelectorAll(".intro-skill");

document.body.classList.add("loading");

let introIndex = 0;

const playIntro = () => {
  if (introIndex < introSkills.length) {
    introSkills.forEach((skill) => {
      skill.classList.remove("active");
    });

    introSkills[introIndex].classList.add("active");
    introIndex++;

    setTimeout(playIntro, 1900);
  } else {
    setTimeout(() => {
      introLoader.classList.add("hide");
      document.body.classList.remove("loading");
    }, 500);
  }
};

window.addEventListener("load", () => {
  setTimeout(playIntro, 400);
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
});

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
});

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        progressBars.forEach((bar) => {
          const width = bar.getAttribute("data-width");
          bar.style.width = `${width}%`;
        });
      }
    });
  },
  {
    threshold: 0.4,
  }
);

const skillsSection = document.getElementById("skills");

if (skillsSection) {
  skillObserver.observe(skillsSection);
}

let counterStarted = false;

const startCounter = () => {
  counters.forEach((counter) => {
    const target = Number(counter.getAttribute("data-target"));
    let current = 0;
    const speed = 80;

    const updateCounter = () => {
      if (current < target) {
        current++;
        counter.textContent = current;
        setTimeout(updateCounter, speed);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !counterStarted) {
        startCounter();
        counterStarted = true;
      }
    });
  },
  {
    threshold: 0.5,
  }
);

const heroSection = document.querySelector(".hero");

if (heroSection) {
  counterObserver.observe(heroSection);
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    formMessage.textContent = "Semua field wajib diisi.";
    formMessage.style.color = "#ef4444";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    formMessage.textContent = "Format email belum valid.";
    formMessage.style.color = "#ef4444";
    return;
  }

  formMessage.textContent = "Pesan berhasil divalidasi. Terima kasih!";
  formMessage.style.color = "#7c3aed";

  contactForm.reset();
});

const walkingBuddies = document.getElementById("walkingBuddies");
const buddyBubble = document.getElementById("buddyBubble");

let isDraggingBuddy = false;
let buddyOffsetX = 0;
let buddyOffsetY = 0;

const bubbleTexts = ["Hallo!", "Hai!", "Welcome!", "Semangat!"];

if (walkingBuddies && buddyBubble) {
  setInterval(() => {
    const randomText = bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)];
    buddyBubble.textContent = randomText;
  }, 5000);

  document.addEventListener("mousemove", (event) => {
    if (isDraggingBuddy) return;

    const rect = walkingBuddies.getBoundingClientRect();
    const buddyCenterX = rect.left + rect.width / 2;
    const buddyCenterY = rect.top + rect.height / 2;

    const distanceX = event.clientX - buddyCenterX;
    const distanceY = event.clientY - buddyCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < 120) {
      const moveX = distanceX > 0 ? -38 : 38;
      const moveY = distanceY > 0 ? -14 : 14;

      walkingBuddies.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
      walkingBuddies.style.transform = "translate(0, 0)";
    }
  });

  walkingBuddies.addEventListener("pointerdown", (event) => {
    isDraggingBuddy = true;
    walkingBuddies.classList.add("paused");

    const rect = walkingBuddies.getBoundingClientRect();
    buddyOffsetX = event.clientX - rect.left;
    buddyOffsetY = event.clientY - rect.top;

    walkingBuddies.style.left = `${rect.left}px`;
    walkingBuddies.style.top = `${rect.top}px`;
    walkingBuddies.style.bottom = "auto";
    walkingBuddies.style.animation = "none";
    walkingBuddies.setPointerCapture(event.pointerId);
  });

  walkingBuddies.addEventListener("pointermove", (event) => {
    if (!isDraggingBuddy) return;

    walkingBuddies.style.left = `${event.clientX - buddyOffsetX}px`;
    walkingBuddies.style.top = `${event.clientY - buddyOffsetY}px`;
  });

  walkingBuddies.addEventListener("pointerup", (event) => {
    isDraggingBuddy = false;
    walkingBuddies.classList.remove("paused");
    walkingBuddies.releasePointerCapture(event.pointerId);
  });
}