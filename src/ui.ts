// ui.ts


// Dropdown Toggle
export function dropdownFunc(menuId: string, arrowUpId: string, arrowDownId: string): void {
  const menu = document.getElementById(menuId);
  const arrowUp = document.getElementById(arrowUpId);
  const arrowDown = document.getElementById(arrowDownId);

  menu?.classList.toggle('hidden');
  arrowUp?.classList.toggle('hidden');
  arrowDown?.classList.toggle('hidden');
}


// Mobile Menu Toggle
export function togglerFunc(): void {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu?.classList.toggle('hidden');
}

// Accordion
export function toggleAccordion(section: number): void {
  const contents = document.querySelectorAll<HTMLElement>('.content');

  contents.forEach((content, index) => {
    if (index + 1 === section) {
      content.classList.toggle('hidden');
    } else {
      content.classList.add('hidden');
    }
  });
}



