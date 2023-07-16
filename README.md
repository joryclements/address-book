# How to Deploy and Run
1. Clone the repository to your local machine.
2. Navigate to the project directory (`address-book`).
3. Run `npm install` to install the dependencies.
4. Run `npm start` to start the application.
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
6. To run the tests, run `npm test`.

# Project Details
### Overall Approach
I approached the assignment by first understanding the requirements and what the application should accomplish. Then I designed the components that would be needed - the Address Book view, the Detailed Person view, and a Settings view.
Next, I worked on fetching the data from the Random User API and storing it locally in the browser so that the list remains consistent across page reloads.
I then built the list view and the detailed view using this data. For the list view, I used Bootstrap cards to present the persons' data in an appealing way. For the detailed view, I used React Router to create a separate route for each person.
Lastly, I worked on the Settings view, allowing the user to fetch a new list of persons from the API and to manually add a person to the address book.

### Implemented Features
1. List view of persons from the address book.
2. Detailed view of a selected person.
3. Fetch a new list of persons from the Random User API.
4. Add a new person to the address book manually.
5. All data is persistent across page reloads due to local storage usage.
6. The application is fully responsive.

### Given more time, what else would I have liked to complete
With more time, I would have liked to implement the following:

1. Full CRUD operations: Allow users to not only add persons but also update and delete existing ones.
2. Improved error handling: While the application currently handles API request errors, it could be more robust, especially in handling user input errors.
3. Search and filter functionality: Enable users to find a person quickly by searching or filtering the list.
4. Sorting: Allow users to sort the list by various fields, such as by name or location.
5. Cloud deployment: Deploy the application to a distributed cloud platform such as AWS or Azure.

Each of these features would likely take an hour to implement and test. I would have liked to implement all of them, but I decided to focus on the core features first.

### Given more time, what else would I have done to make the project more robust
1. Testing: I would have added unit tests and end-to-end tests to ensure the application works as expected and prevent regressions in the future.
2. Improve UX: Although the UX is quite straightforward, it could always be improved. For example, adding loading spinners to indicate when the app is fetching data, or tooltips to explain certain features to the user.
3. Optimize for performance: For a longer list, I would consider implementing pagination, infinite scroll, or virtualized list for a better user experience and app performance, especially if the user request a large number of people from the API.
