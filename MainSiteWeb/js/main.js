// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // =============== ENQUIRY FORM FUNCTIONALITY ===============
  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const service = document.getElementById('service').value;

      if (!name || !email || !service) {
        alert('Please fill the required fields: name, email and service.');
        return;
      }

      // Store locally
      const data = {
        name,
        email,
        phone: document.getElementById('phone')?.value || '',
        service,
        message: document.getElementById('message')?.value || '',
        submittedAt: new Date().toISOString()
      };

      saveEnquiry(data);
      showThankYou();
      enquiryForm.reset();
    });
  }

  function showThankYou() {
    const msg = document.getElementById('thankYouMsg');
    if (msg) {
      msg.style.display = 'block';
      setTimeout(() => msg.style.display = 'none', 7000);
    } else {
      alert("Thank you! Your enquiry has been received.");
    }
  }

  function saveEnquiry(data) {
    const list = JSON.parse(localStorage.getItem('enquiries') || '[]');
    list.unshift(data);
    localStorage.setItem('enquiries', JSON.stringify(list.slice(0, 50))); // keep last 50
  }



  lightbox.addEventListener('click', (e) => {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove('active');
  });

  // =============== SCROLL TO TOP BUTTON ===============
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scrollTop';
  scrollBtn.textContent = '↑';
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ---------------- LIGHTBOX FUNCTIONALITY ---------------- //

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const galleryImages = document.querySelectorAll(".gallery-img");
const closeBtn = document.querySelector(".close-btn");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

let currentIndex = 0;

// open lightbox
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage();
    lightbox.style.display = "block";
  });
});

// show selected image
function showImage() {
  lightboxImg.src = galleryImages[currentIndex].src;
}

// next image
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage();
});

// previous image
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage();
});

// close lightbox
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// close if clicking outside the image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
