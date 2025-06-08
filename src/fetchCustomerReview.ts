declare const Swiper:any;
interface slidePosts{
    title: string,
    description: string,
    image: string,
    name: string,
    designation: string
}
export function customersData():void{
    fetch("json/customers.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json(); }
    )
        .then((data: slidePosts[])=> { renderSlides(data);
            initializeSwiper();  // Initialize Swiper after rendering slides
        })
        .catch(error => console.error("Error fetching data: ", error));
}
function renderSlides(posts: slidePosts[]): void {
    const sliderContainer = document.getElementById('customer-slider');
    if(!sliderContainer){
        console.error("customer slider element not found.");
        return;
    }
    sliderContainer.innerHTML = "";
    posts.forEach(post => {
        const slide = document.createElement('article');
        slide.classList.add("swiper-slide", "bg-white", "rounded-[16px]", "hover:shadow-2xl", "px-5", "py-5");
        slide.innerHTML = `
            <div class="flex justify-between mt-1">
                <h1  class="lg:text-[22px] font-[600]">${post.title}</h1>
                <figure class="py-[9px] mr-[20px] lg:text-end md:text-end">
              <svg width="28" height="20" viewBox="0 0 37 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.1 25.8293C6.76667 25.8293 4.66667 24.896 2.8 23.0293C0.933334 21.096 0 18.2626 0 14.5293C0 10.2626 1.13333 6.79596 3.4 4.1293C5.73333 1.39597 9.03333 0.0292969 13.3 0.0292969C14.8333 0.0292969 16.0333 0.129295 16.9 0.329292V4.9293C15.9667 4.79596 14.7667 4.7293 13.3 4.7293C11.0333 4.7293 9.2 5.49596 7.8 7.0293C6.46667 8.36263 5.7 10.1293 5.5 12.3293C6.36667 11.2626 7.76667 10.7293 9.7 10.7293C11.7 10.7293 13.4 11.4293 14.8 12.8293C16.2 14.1626 16.9 15.9293 16.9 18.1293C16.9 20.396 16.1667 22.2626 14.7 23.7293C13.2333 25.1293 11.3667 25.8293 9.1 25.8293ZM29 25.8293C26.6667 25.8293 24.5667 24.896 22.7 23.0293C20.8333 21.096 19.9 18.2626 19.9 14.5293C19.9 10.2626 21.0333 6.79596 23.3 4.1293C25.6333 1.39597 28.9333 0.0292969 33.2 0.0292969C34.7333 0.0292969 35.9333 0.129295 36.8 0.329292V4.9293C35.8667 4.79596 34.6667 4.7293 33.2 4.7293C30.9333 4.7293 29.1 5.49596 27.7 7.0293C26.3667 8.36263 25.6 10.1293 25.4 12.3293C26.2667 11.2626 27.6667 10.7293 29.6 10.7293C31.6 10.7293 33.3 11.4293 34.7 12.8293C36.1 14.1626 36.8 15.9293 36.8 18.1293C36.8 20.396 36.0667 22.2626 34.6 23.7293C33.1333 25.1293 31.2667 25.8293 29 25.8293Z"
                  fill="#050B20" />
              </svg>
            </figure>
            </div>
            <p class="text-[12px] mt-5">${post.description}</p>
            <div class="flex mt-5 gap-5 items-center">
                <figure>
                    <img class="rounded-full" width="60px" src="${post.image}" alt=${post.name}>
                </figure>
                <figcaption class="text-center font-[500] text-[13px] my-1">${post.name}
                    <span class="block text-[12px] text-start font-[400]">${post.designation}</span>
                </figcaption>
            </div>
        `;
        sliderContainer.appendChild(slide);
    });
}

// Customer review slider
 function initializeSwiper(): void {
    const swiper = new Swiper(".swiper", {
      a11y: false, // Disable ARIA roles
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: false,
      allowTouchMove: true,
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });

    console.log(swiper);
  
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
  
    nextButton?.addEventListener('click', () => swiper.slideNext());
    prevButton?.addEventListener('click', () => swiper.slidePrev());
  }