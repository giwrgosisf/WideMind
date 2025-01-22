const url = "https://learning-hub-1whk.onrender.com";


document.addEventListener("DOMContentLoaded", () => {
    initIndex();

});


async function initIndex() {

    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    let init = {
        method: "GET",
        headers: myHeaders
    }


    try {
        const categories = await fetchData(url + "/categories", init);

        const categoriesWithSubcategories = await Promise.all(
            categories.map(async (category) => {
                const subcategories = await fetchData(url + "/categories/" + category.id + "/subcategories", init);

                return {
                    ...category,
                    subcategories: subcategories,
                };
            })
        );

        const templateSource = document.getElementById("index-template").textContent;

        const template = Handlebars.compile(templateSource);

        const contentOfTemplate = template({ categories: categoriesWithSubcategories });

        document.getElementById("categories").innerHTML = contentOfTemplate;



    } catch (error) {
        console.error("Error fetching categories or subcategories:", error);
        document.getElementById("categories").innerHTML  = "<p>Failed to load categories. Please try again later.</p>";
    }

}

async function fetchData(url, init) {
    const response = await fetch(url, init);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}


