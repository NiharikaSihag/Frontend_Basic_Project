interface serviceTypes{
    image: string,
    title: string,
    p: string
}
export function fetchServicesData(): void{
    fetch("json/services.json")
    .then(response => {
        if(!response.ok){
            throw new Error(`Not found : ${response.status}`);
        }
        return response.json();
    })
    .then((data: serviceTypes[]) => displayServices(data))
    .catch(error => console.error("Error fetching data:", error));
}
function displayServices(posts: serviceTypes[]): void{
    const myContainer = document.getElementById("services-post");
    if(!myContainer){
        console.log('elment not found');
        return;
    }
    myContainer.innerHTML = " " ;
    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.classList.add("box-border", "hover:shadow-lg", "border", "p-4", "rounded-[16px]");
        postElement.innerHTML = `
        <figure >
            <img src="${post.image}" alt="${post.title}" class="rounded-[16px] w-full">
        </figure>
            <figcaption class="mt-3  lg:text-[18px]  sm:text-[13px] font-[500]">${post.title}</figcaption>
            <p class="mt-3 mb-3 text-[13px] font-[400]">${post.p}
          </p>
          <button class="my-5 border border-[#405FF2] hover:bg-[#e3e3fe]  rounded-[12px]  py-[10px] w-full"><a href="#services-post"
              class=" text-[13px] mt-[100px] font-[500]  text-[#405FF2]   ">View <i
                class="fa-solid fa-arrow-right ml-1 -rotate-45 text-[13px]"></i></a></button>
        `;

        myContainer.appendChild(postElement);
    })

}