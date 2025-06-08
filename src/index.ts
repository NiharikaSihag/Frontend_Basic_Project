
import { fetchBrandData } from './fetchBrandData';
import { observeCounters } from './animation';
import { fetchServicesData } from './serviceData';
import { fetchFaqData } from './fetchFaq';
import { fetchTeamData } from './fetchTeamData';
import { customersData } from './fetchCustomerReview';
import { fetchFeatures } from './fetchFeatureListing';
import { handleChatBotToggle } from './chatbot';
import { searchFilter } from './filterFetch';
import { openModal, closeModal, handleSignup } from './signIn';



document.addEventListener("DOMContentLoaded", () => {
  observeCounters();
  fetchFeatures();
  fetchBrandData();
  fetchServicesData();
  fetchFaqData();
  fetchTeamData();
  customersData();
  handleChatBotToggle();
  searchFilter();


  const signupBtns = document.querySelectorAll<HTMLButtonElement>('[id^="signup-btn"]');
  const closeSignupBtn = document.getElementById('close-signup-btn') as HTMLButtonElement | null;
  const closeSignedInBtn = document.getElementById('close-signed-in') as HTMLButtonElement | null;

  signupBtns.forEach(button => {
    button?.addEventListener('click', () => {
      openModal('signup-modal', 'signup-popup');
    });
  });

  closeSignupBtn?.addEventListener('click', () => {
    closeModal('signup-modal', 'signup-popup');
  });

  closeSignedInBtn?.addEventListener('click', () => {
    closeModal('signed-in-modal', 'signed-in-popup');
  });

  handleSignup('signup-form', 'signup-modal', 'signup-popup', 'signed-in-modal', 'signed-in-popup');
});

// (window as any).dropdownFunc = dropdownFunc;
// (window as any).togglerfunc = togglerFunc;
// (window as any).saveData = saveData;
// (window as any).toggleAccordion = toggleAccordion;
// (window as any).fetchExtraBrandData = fetchExtraBrandData;

// Footer date
const currentYear: number = new Date().getFullYear();
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = currentYear.toString();
}

// Navbar
const menu = document.getElementById("mobile-menu") as HTMLElement;
const menuBtn = document.getElementById("menu-btn") as HTMLButtonElement;
const closeBtn = document.getElementById("close-btn") as HTMLButtonElement;
const overlay = document.getElementById("overlay") as HTMLElement;

// Open Menu
menuBtn.addEventListener("click", () => {
  menu.classList.remove("translate-x-full");
  menu.classList.add("translate-x-0");
  overlay.classList.remove("hidden");
});

// Close Menu
closeBtn.addEventListener("click", () => {
  menu.classList.remove("translate-x-0");
  menu.classList.add("translate-x-full");
  overlay.classList.add("hidden");
});

overlay.addEventListener("click", () => {
  menu.classList.add("translate-x-full");
  overlay.classList.add("hidden");
});