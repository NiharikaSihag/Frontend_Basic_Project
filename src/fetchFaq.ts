interface faqType{
    id: number,
    question: string,
    answer: string
}
export function fetchFaqData():void{
    fetch("json/faq.json")
    .then((response) => {
        if(!response.ok){
            throw new Error(`Data is not fetched and response is ${response.status}`);
        }
       return response.json();
    }).then((data: faqType[]) => displayFAQ(data))
    .catch(error => console.error("Error fetching data: ",error));
}
function displayFAQ(posts: faqType[]){
    const myContainer = document.getElementById('faq-dynamic');
    if(!myContainer){
        console.log("faq-dynamic element is not found");
        return;
    }
    myContainer.innerHTML ="";
    posts.forEach(post =>{
        const postElement = document.createElement('article');
        postElement.classList.add("border-b");
        postElement.innerHTML = `
        <button class="w-full text-left p-4   hover:bg-gray-300 transition-all" onclick="toggleAccordion(${post.id})">
                Q.${post.id}   ${post.question}
              </button>
              <div id=${post.id} class="content hidden  bg-gray-100 overflow-hidden transition-all duration-300 py-4 px-5">
           Answer:    ${post.answer}
              </div>
        `
        myContainer.appendChild(postElement);
    } );
}

