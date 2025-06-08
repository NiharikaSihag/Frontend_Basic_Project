export function openModal(modalId: string, popupId: string): void {
    document.getElementById(modalId)?.classList.remove('hidden');
    document.getElementById(popupId)?.classList.remove('hidden');
  }
  
  export function closeModal(modalId: string, popupId: string): void {
    document.getElementById(modalId)?.classList.add('hidden');
    document.getElementById(popupId)?.classList.add('hidden');
  }
  export function handleSignup(
    formId: string,
    signupModalId: string,
    signupPopupId: string,
    signedInModalId: string,
    signedInPopupId: string
  ): void {
    const form = document.getElementById(formId) as HTMLFormElement | null;
    if (form) {
      form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const passwordInput = document.getElementById('password') as HTMLInputElement | null;
        const passwordError = document.getElementById('password-error') as HTMLDivElement | null;
  
        if (!passwordInput || !passwordError) {
          console.error('Password input or error element not found.');
          return;
        }
  
        const password = passwordInput.value;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[\d\W]).{6,}$/;
  
        if (!passwordRegex.test(password)) {
          passwordError.classList.remove('hidden');
          return; // Stop further submission
        } else {
          passwordError.classList.add('hidden');
          closeModal(signupModalId, signupPopupId);
          openModal(signedInModalId, signedInPopupId);
  
          // You can add your actual form submission logic here (e.g., fetch request)
          console.log('Form submitted successfully!');
          form.reset(); // Optionally reset the form after successful submission
        }
      });
    } else {
      console.error('Form element not found!');
    }
  }