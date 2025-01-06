
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
        const products = await response.json();
        renderSubcateroryMaterial(products);


    } catch (error) {
        console.error('Error fetching subcategories:', error.message);
    }
});


  function renderSubcateroryMaterial(products){

    let template = document.getElementById("subcategory-template").innerHTML;
    const subcategoryTemplate = Handlebars.compile(template);

    template = document.getElementById("subcategory-filters-template").innerHTML;
    const filterTemplate = Handlebars.compile(template);

    template = document.getElementById("key-terms-template").innerHTML
    const  keyTermsTemplate = Handlebars.compile(template);
    


    const bookSection = document.getElementById("book-section");
    const lecturesSection = document.getElementById("lecture-section");

    

    const authorInstructorFilter  = document.getElementById("authorInstructor-group");
     

    products.forEach(item => {
        const featuresArray = item.features.split(';').map(feature => {
            const [featureName, value] = feature.split(':');

            return { feature: featureName.trim(), value: value.trim() };
        });

        item.features = featuresArray;
        
    })

    products.forEach(item => {
        const renderedHTML = subcategoryTemplate(item);
        const revealedAuthorInstructor = filterTemplate(item);
        if (item.type === "Book") {
            bookSection.innerHTML += renderedHTML;
            authorInstructorFilter.innerHTML+= revealedAuthorInstructor;
        } else if (item.type === "Lecture") {
            lecturesSection.innerHTML += renderedHTML;
           
        }

        
    });

    

  
       
    
        
    
    


   
    
}



