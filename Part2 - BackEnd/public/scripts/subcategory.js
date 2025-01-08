
  const URL = new URLSearchParams(this.window.location.search);
  const subCatID = URL.get("id");

window.addEventListener('load', async function () {
    try {
        

       
        const subcategoryUrl = `https://learning-hub-1whk.onrender.com/learning-items?subcategory=` + subCatID;
        

        
        let initialize = {
            method: "GET", 
        };

        let response = await fetch(subcategoryUrl, initialize);

        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        Handlebars.registerHelper('eq', function (a, b) {
            return a === b;
        });

        Handlebars.registerHelper('notNull', function (value) {
            return value != undefined; 
        });
        
        
        const products = await response.json();

        response = await fetch(`https://learning-hub-1whk.onrender.com/subcategories`);
        const subcategories = await response.json();
    

        renderSubcateroryMaterial(products , subcategories);
        
       

    } catch (error) {
        console.error('Error fetching subcategories:', error.message);
    }
});


  function renderSubcateroryMaterial(products , subcategories) {

    let template = document.getElementById("subcategory-template").innerHTML;
    const subcategoryTemplate = Handlebars.compile(template);

    template = document.getElementById("subcategory-filters-template").innerHTML;
    const filterTemplate = Handlebars.compile(template);

    template = document.getElementById("key-terms-template").innerHTML
    const  keyTermsTemplate = Handlebars.compile(template);

    const subCatTitle = subcategories.find(subcategory => subcategory.id == subCatID).title;
    
    template = document.getElementById("subcategory-title-template").innerHTML

    const  titleTemplate = Handlebars.compile(template);

    const titleSection = document.getElementById("upper-page");

  
    
    titleSection.innerHTML = titleTemplate({ suBcategoryTitle: subCatTitle });

    const bookSection = document.getElementById("book-section");
   
    const lecturesSection = document.getElementById("lecture-section");

    const books = new Array();
    const lectures = new Array();  

    const authorInstructorFilter  = document.getElementById("authorInstructor-group");
     

    products.forEach(item => {
        const featuresArray = item.features.split(';').map(feature => {
            const [featureName, value] = feature.split(':');

            return { feature: featureName.trim(), value: value.trim() };
        });

        item.features = featuresArray;
        
    })

    products.forEach(item => {
        const renderSubcateroryMaterial = subcategoryTemplate(item);
        const revealedAuthorInstructor = filterTemplate(item);
    
        if (item.type === "Book") {
            books.push(item);
            authorInstructorFilter.innerHTML += revealedAuthorInstructor;
        } else if (item.type === "Lecture") {
            lectures.push(item);
           
        }
    });

    const bookData = { type: "Book", books: books };
    bookSection.innerHTML += subcategoryTemplate(bookData);

    // Render lectures
    const lectureData = { type: "Lecture", lectures: lectures };
    lecturesSection.innerHTML += subcategoryTemplate(lectureData);



    
}




