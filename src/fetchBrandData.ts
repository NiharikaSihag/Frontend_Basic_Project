interface BrandPosts{
    title: string,
    image: string,
}
export function fetchBrandData(): void {
    fetch("json/brands.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: BrandPosts[]) => displayBrandPosts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }
function displayBrandPosts(posts: BrandPosts[]): void {
    const container = document.getElementById("brand-container");
    if (!container) {
        console.error("brand-container2 element not found.");
        return;
    }
    container.innerHTML = "";  // Clear existing content
    
    posts.forEach(post => {
        const postElement = document.createElement("article");
        postElement.classList.add("hover:scale-105", "border", "px-5", "py-2", "rounded-[16px]", "blog-post", "transition", "delay-100", "duration-100", "ease-in-out");
        postElement.innerHTML = `
            <figure class="justify-center flex">
                <img src="${post.image}" alt="${post.title}" class="blog-image">
            </figure>
            <figcaption class="text-center text-[13px] my-1">${post.title}</figcaption>
        `;
        container.appendChild(postElement);
    });
}
