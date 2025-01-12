
const url = "https://learning-hub-1whk.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    initCategory();
    const loginButton = document.getElementById('login-button');
    const loginFormContainer = document.querySelector('.lform-container');
    const overlay = document.getElementById('overlay');

    const closeFormButton = document.getElementById('close-button');

    closeFormButton.addEventListener('click', () => {
        loginFormContainer.classList.toggle('active');
        overlay.classList.toggle('active');
    })

    loginButton.addEventListener('click', () => {
        loginFormContainer.classList.toggle('active');
        overlay.classList.toggle('active');
    });


    const submitButton = document.getElementById('lsubmit');
    submitButton.addEventListener('click', handleLogin);
   
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

       
        

       
    } catch (error) {
        console.error("Error loading category page:", error);
        document.getElementById("upper-page").innerHTML =
            "<p>Failed to load the items for this category. Please try again later.</p>";
    }


    let addToCartButtons = document.querySelectorAll('.add-button');
    addToCartButtons.forEach(button => {
    button.addEventListener('click', addItemToCart);
});
}




async function fetchData(url, init) {
    const response = await fetch(url, init);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}




async function handleLogin(event) {
    event.preventDefault();

    const userData = {
        username: document.getElementById("lUsername").value,
        password: document.getElementById("lPassword").value
    };

    try {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("http-session", "true");

        let init = {
            method: "POST",
            "headers": headers,
            body: JSON.stringify(userData)
        }

        const response = await fetch("http://localhost:8080/login", init);

        if (!response.ok) {
            throw new Error(`Login failed with status ${response.status}`);
        }

        const sessionData = await response.json();

        sessionStorage.setItem(
            "user",
            JSON.stringify({
                username: userData.username,
                sessionId: sessionData.sessionId,
            })
        );


        document.querySelector(".lform-container").classList.remove("active");
        document.getElementById("overlay").classList.remove("active");

    } catch (error) {
        console.error("Login error:", error);

    }


   

}


async function addItemToCart(event){

    let user = null;

    if (!sessionStorage.getItem("user")) {
        alert("Παρακαλώ συνδεθείτε για αγορά του εκπαιδευτικού υλικού");
        return;
    }else{ 
         user = JSON.parse(sessionStorage.getItem("user"));
    }


    const cartItemData = {
        id: this.getAttribute("data-id"),
        type: this.getAttribute("data-type"),
        title: this.getAttribute("data-title"),
        price: this.getAttribute("data-price"),
        username: user.username,
        sessionId: user.sessionId
    };

    try{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("http-session", "true");

        let init = {
            method: "POST",
            "headers": headers,
            body: JSON.stringify(cartItemData)      
        }

        const response = await fetch("http://localhost:8080/cart", init);


        if (!response.ok) {
            if (response.status === 409) {
                alert("Item already in cart.");
            }
            throw new Error(`Add to cart failed with status ${response.status}`);
        }

        
        alert("Item added to cart successfully!");


    } catch (error) {
        console.error("Add to cart error:", error);
    }


















    

    

   

}