# CS-465 Travlr Getaways Journal

## Architecture

**Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).**

- The Express frontend uses server-side rendering with HTML and Handlebars, where each request reloads a new page. The Angular SPA uses client-side rendering, where the browser updates only parts of the page without reloading. This makes the SPA more interactive and responsive compared to the traditional Express frontend.

**Why did the backend use a NoSQL MongoDB database?**

- MongoDB was used because it stores data in a flexible JSON-like format, which works well with JavaScript-based applications. It allows for easier handling of dynamic data and integrates smoothly with the MEAN stack.

## Functionality

**How is JSON different from JavaScript and how does JSON tie together the frontend and backend development pieces?**

- JSON is a data format used to store and transfer data, while JavaScript is a programming language. JSON connects the frontend and backend by allowing data to be sent between them in a structured and readable format.

**Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.**

- Code was refactored when moving from static JSON files to a MongoDB database and when replacing server-rendered views with Angular components. Reusable UI components improve efficiency by reducing duplicate code and making the application easier to update and maintain.

## Testing

**Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.**

- Methods such as GET and PUT define how data is requested or updated through API endpoints. Testing involves verifying that each endpoint returns the correct data and updates the database properly. Security adds complexity because endpoints may require authentication, meaning requests must include valid tokens to be accepted.

## Reflection

**How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?**

- This course gave me a better understanding of how to design and build a full stack application using the MEAN stack. Throughout the project, I developed skills in both frontend and backend development, along with database integration and API communication. I also strengthened my understanding of security by working with JWT authentication and securing API endpoints. Overall, this experience helped me build a stronger foundation in full stack development and made me feel more confident in my ability to create complete, secure, and real-world applications.
