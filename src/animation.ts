function animateCounters(counters: NodeListOf<HTMLElement>): void {
    counters.forEach((counter: HTMLElement) => {
      const target = Number(counter.getAttribute('data-target'));
      let count = 0;
      const duration = 1000;
      const startTime = performance.now(); 

  
      function updateCounter(timestamp: number): void {
        const elapsedTime = timestamp - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        count = Math.floor(progress * target);
        counter.innerText = count.toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target.toLocaleString();
        }
      }
  
      requestAnimationFrame(updateCounter);
    });
  }
  
  function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
      const context: ThisParameterType<T> = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }
  
  export function observeCounters(): void {
    const counterSection = document.getElementById('counter-section');
    const counterSection2 = document.getElementById('counter-section2');
    const counters: NodeListOf<HTMLElement> = document.querySelectorAll('.counter');
  
    if (!counterSection || !counterSection2) {
      console.error("counter sections not found");
      return;
    }
  
    const animateCountersDebounced = debounce(() => {
      counters.forEach((counter: HTMLElement) => (counter.innerText = '0'));
      animateCounters(counters);
    }, 300);
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCountersDebounced();
          }
        });
      },
      { threshold: 0.5 }
    );
  
    observer.observe(counterSection);
    observer.observe(counterSection2);
  }