interface teamTypes{
    image: string,
    name: string,
    position: string
}
export function fetchTeamData(): void{
    fetch("json/team.json")
    .then(response => {
        if(!response.ok){
            throw new Error(`Data not fetched: ${response.status}`);
        }
        return response.json();
    })
    .then((data: teamTypes[]) => displayTeam(data))
    .catch(error => console.error("Error fetching data: ",error));
}
function displayTeam(posts: teamTypes[]): void{
    const myContainer = document.getElementById('dynamic-team');
    if(!myContainer){
        console.log('Dynamic-team element not found');
        return;
    }
    myContainer.innerHTML =" ";
    posts.forEach(post =>{
        const postElement = document.createElement('article');
        postElement.classList.add("rounded-[16px]");
        postElement.innerHTML = `
        <figure >
            <img class="hover:shadow-2xl rounded-[16px] transition delay-150 duration-300 ease-in-out" src="${post.image}" alt=${post.name}>
          </figure>
          <figcaption class="lg:text-[18px]  sm:text-[13px] font-[500] my-1">${post.name}<span class="block text-[12px]">${post.position}</span> </figcaption>
        `
        myContainer.appendChild(postElement);
    } );
}