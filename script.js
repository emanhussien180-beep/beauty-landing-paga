/* ==============================
   ÉLORA — WEBSITE INTERACTIONS
================================= */

// Product information
const products = {
  serum: {
    name: "Radiance Serum",
    category: "THE GLOW EDIT",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1000&q=85",
    description: "A lightweight skincare essential designed to complement your daily beauty ritual.",
    about: "Radiance Serum is presented as a lightweight addition to a skincare routine, with a focus on a fresh and radiant-looking appearance.",
    ingredients: "Example ingredients: Hyaluronic Acid, Vitamin E and botanical extracts. Actual ingredients should be confirmed from the product packaging.",
    usage: "Apply a small amount to clean skin and gently spread over the face. Follow with your preferred moisturizer. Always follow the actual product instructions."
  },

  moisturizer: {
    name: "Velvet Moisturizer",
    category: "THE HYDRATION EDIT",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1000&q=85",
    description: "A comforting skincare step created for a soft and nourishing daily ritual.",
    about: "Velvet Moisturizer is presented as a daily moisturizing step designed to complement your personal skincare routine.",
    ingredients: "Example ingredients: Glycerin, Shea Butter and Vitamin E. Actual ingredients should be confirmed from the product packaging.",
    usage: "Apply an appropriate amount to clean skin and gently massage until absorbed. Follow the actual product instructions."
  },

  cleanser: {
    name: "Pure Skin Cleanser",
    category: "THE DAILY ESSENTIAL",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=1000&q=85",
    description: "A gentle cleansing step to refresh your skin and complete your daily routine.",
    about: "Pure Skin Cleanser is presented as an everyday cleansing essential for a simple and refreshing skincare ritual.",
    ingredients: "Example ingredients: Aloe Vera, Glycerin and gentle cleansing agents. Actual ingredients should be confirmed from the product packaging.",
    usage: "Apply to damp skin, gently massage, then rinse with water. Follow the actual product instructions."
  }
};


// Elements
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

const productModal = document.getElementById("productModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalAbout = document.getElementById("modalAbout");
const modalIngredients = document.getElementById("modalIngredients");
const modalUsage = document.getElementById("modalUsage");


// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});


// Close mobile menu after clicking a link
navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});


// Open product details
function showProduct(productId) {
  const product = products[productId];

  if (!product) return;

  modalImage.src = product.image;
  modalImage.alt = product.name;

  modalCategory.textContent = product.category;
  modalTitle.textContent = product.name;
  modalDescription.textContent = product.description;
  modalAbout.textContent = product.about;
  modalIngredients.textContent = product.ingredients;
  modalUsage.textContent = product.usage;

  productModal.classList.add("active");
  productModal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
  modalClose.focus();
}


// Close product details
function closeProductModal() {
  productModal.classList.remove("active");
  productModal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}


// Product buttons
document.querySelectorAll(".discover-button").forEach(button => {
  button.addEventListener("click", () => {
    showProduct(button.dataset.product);
  });
});


// Close button
modalClose.addEventListener("click", closeProductModal);


// Click outside the product details
modalBackdrop.addEventListener("click", closeProductModal);


// Close with Escape key
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && productModal.classList.contains("active")) {
    closeProductModal();
  }
});


// Reveal elements on scroll
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => {
    observer.observe(element);
  });

} else {
  revealElements.forEach(element => {
    element.classList.add("visible");
  });
}


// Smooth navigation fallback
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


// Initial page setup
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");
});