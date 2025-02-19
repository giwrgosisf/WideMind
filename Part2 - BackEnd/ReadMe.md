
# **Phase B**

This phase of the project  involves developing a **web application** that interacts with the **LearningHub API**, which provides educational materials (books and lectures). The application  supports navigation, shopping cart management, and user authentication. For this part we used the CSS file that was developed in the first phase with minor changes in order to support and handle the **dynamic content**.


## 📁 Project Structure

```
Part2 - BackEnd/
│
├── 📂 models/  # Data Handling
│   ├── 📂 DAO/  # Data Access Objects and memory managment
│   │   ├── cartDAO.js
│   │   ├── DAOManager.js
│   │   ├── userDAO.js
│   ├── 📂 entities/  # Database/memory Entities
│   │   ├── cart.js
│   │   ├── cartItem.js
│   │   ├── user.js
│   ├── 📂 services/  # Cart and authonication services
│   │   ├── Authentication.js
│   │   ├── CartItemService.js
│
├── 📂 node_modules/  # Dependencies
├── 📂 public/  # Static Files
│
├── 📄 index.js  # Main Server File
├── 📄 package.json  # Dependencies & Scripts
├── 📄 package-lock.json  # Package Lock File
```


##  Functional Requirements

###  **Navigation & Content Browsing**

This  service  provides an **interactive and user-friendly interface** for browsing educational content.

#### **Tasks:**  
1. **Home Page (`index.html`)**  
   - Display a **list of categories** available in the LearningHub API.  
   - Each category  includes a **title, an image**, and a **clickable link** to view subcategories.  
   - Used **Handlebars.js** to generate dynamic HTML templates.  

2. **Category Page (`category.html`)**  
   - When a category is selected, the system fetches and displays all **educational materials** related to that category.  
   - Display items with details like **title, type (Book or Lecture), author, and cost**.  
   - Implement a **"View Details"** button for each item, linking to a detailed page.  

3. **Subcategory Page (`subcategory.html`)**  
   - Display a list of **materials within the selected subcategory**.  
   - Include additional metadata, such as **publication date and key features**.  

4. **Dynamic Data Handling**  
   - Implement **Fetch API calls** to retrieve data dynamically.  
   - Use the **DOM API** to inject fetched data into the HTML structure.  

---

###   Shopping Cart Functionality  
The application must allow authenticated users to **add items to a shopping cart** and prevent unauthorized access.  

#### **Tasks:**  
1. **User Authentication (`login.html`)**  
   - Implement a **login form** that collects a username and password.  
   - Send login credentials to the **Login Service (LS)** using a **POST request**.  
   - Store the returned **session ID** to maintain user authentication.  

2. **Adding Items to Cart**  
   - Display an **"Add to Cart"** button for each item in the category and subcategory pages.  
   - When clicked, send a request to the **Cart Item Service (CIS)** to store the item.  
   - Prevent users from adding **duplicate items** to the cart.  

3. **Security Considerations**  
   - Ensure that only **authenticated users** can add items to their cart.  
   - If a user is not logged in, display a **"Please log in to add items to cart"** message.  
   - Handle failed authentication attempts with appropriate **error messages**.  

---

###  Shopping Cart Management (React.js) 
The shopping cart should be a **dynamic and interactive component** built using React.js.  

#### **Tasks:**  
1. **Shopping Cart Page (`cart.html`)**  
   - Fetch and display **all items** in the user’s shopping cart.  
   - Render a table listing **title, type, and cost** for each item.  
   - Show the **total cost** at the bottom of the cart.  

2. **Item Removal & Updates**  
   - Each item should include a **"Remove" button**.  
   - Clicking the button should trigger a request to the **Cart Update Service (CUS)** to remove the item.  
   - The **total cost** should update dynamically after item removal.  

3. **Dynamic UI with React**  
   - Implement a **React-based component** to manage the shopping cart UI.  
   - Use **state management** to handle cart updates dynamically.  

---

##  Technical Requirements  
- **Frontend:** HTML, CSS, JavaScript, **Handlebars.js**, React.js  
- **Backend:** Node.js, Express.js  
- **API Requests:** Fetch API for data retrieval  
- **Authentication:** Session-based authentication using a login API  
- **Data Storage:** In-memory storage 
- **Development Tools:** Nodemon (for hot-reloading), uuid (for unique session IDs)  

---

#  How to Run the Web Application  

##  Prerequisites  
Before running the project, ensure you have the following installed on your system:  

- **Node.js** (v16 or later) → [Download here](https://nodejs.org/)  
- **npm** (Node Package Manager, comes with Node.js)  
- **nodemon** (debuger for the server)
  

---

##  Step-by-Step Setup  Guide

### 1. Clone the Repository  
If you haven’t already, clone the project from GitHub

### 2 . Change the directory of your system to the cloned project 

Run the following command to install all required dependencies:
```bash
cd (project location)\WideMind\Part2 - BackEnd

```

### 3 . Open the terminal using the directory you are currently on and run:
```bash
nodemon index.js
```
### 4. Open your browser and type:
```bash
http://localhost:8080/
```
### 5. In order to login and view your cart you must go to the categories page

## Sample names and passwords to test login

### Usernames - Passwords

* nikos_papadopoulos, kaliMera2025

* eleni_krivopoulou , paradosi@2023

* giannis_katsaros, secreT!123

* anastasia_papadakis ,omorfh@2024

* kostas_antonopoulos, 1234kalimera!

* maria_kalogeropoulou, kwdikos!2022

* vasilis_tzimas, Xairete!2025

A short video demo of the website can be found [here](https://vimeo.com/1058349113/fbb2bf4a8c)
