
const url = "https://learning-hub-1whk.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    initCategory();
    const loginButton = document.getElementById('login-button');
    const loginFormContainer = document.querySelector('.lform-container');
    const overlay = document.getElementById('overlay');
    
    loginButton.addEventListener('click', () => {
    loginFormContainer.classList.toggle('active');
    overlay.classList.toggle('active');
    });
});


async function initCategory() {
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    let init = {
        method: "GET",
        headers: myHeaders
    }
    try {

        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('id');

        if (!categoryId) {
            document.getElementById("subcat-main").innerHTML =
                "<p>Error: No category ID provided in the URL.</p>";
            return;
        }


        const fetchedCategories = await fetchData(url + "/categories");
        // console.log("Fetched Categories:", fetchedCategories);
        const category = fetchedCategories.find((obj) => obj.id == categoryId);

        const items = await fetchData(url + "/learning-items?category=" + categoryId, init);
        const books = items.filter(item => item.type === "Book");
        const lectures = items.filter(item => item.type === "Lecture");


        const templateSource = document.getElementById("category-template").textContent;
        const template = Handlebars.compile(templateSource);


        const htmlData = {
            books: books,
            lectures: lectures,
        };


        const contentOfTemplate = template(htmlData);
        document.getElementById("subcat-main").innerHTML = contentOfTemplate;



        const templateSourceIntro = document.getElementById("category-title-template").textContent;
        const templateIntro = Handlebars.compile(templateSourceIntro);


        const htmlDataIntro = {
            categoryTitle: category.title,
        };


        const contentOfTemplateIntro = templateIntro(htmlDataIntro);
        document.getElementById("upper-page").innerHTML = contentOfTemplateIntro;


        

    } catch(error) {
        console.error("Error loading category page:", error);
        document.getElementById("upper-page").innerHTML =
          "<p>Failed to load the items for this category. Please try again later.</p>";
    }

    

}




async function fetchData(url, init) {
    const response = await fetch(url, init);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}