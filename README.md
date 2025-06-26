# Group Expense Splitter

A simple web application to help groups of people track expenses and calculate how much each person owes or is owed. This app can be easily hosted on GitHub Pages.

## Features

*   Add members to a group.
*   Record expenses, specifying the amount and who paid.
*   Calculate the total expenses and each member's fair share.
*   Display a summary of who owes whom to settle debts.
*   Visualize spending per person (net balance) with a bar chart.

## How to Use

1.  **Open `index.html` in your web browser.**
    *   Alternatively, deploy it to GitHub Pages (see below) and access the provided URL.

2.  **Add Members:**
    *   Enter the name of each person in the group in the "Enter member name" field.
    *   Click "Add Member".
    *   Repeat for all members. Added members will appear in a list.

3.  **Add Expenses:**
    *   In the "Expenses" section, enter a description for the expense (e.g., "Dinner", "Groceries").
    *   Enter the total amount of the expense.
    *   Select who paid for the expense from the dropdown list (this list is populated by the members you added).
    *   Click "Add Expense".
    *   Repeat for all expenses. Added expenses will appear in a list.

4.  **Calculate Split:**
    *   Once all members and expenses are added, click the "Calculate Split" button.

5.  **View Results:**
    *   **Summary:** Shows the total group expenses and the calculated share per member.
    *   **Debts:** Lists who owes money to whom to settle up.
    *   **Spending Chart:** A bar chart visualizing the net balance for each member (amount they paid minus their share). A positive bar means they are owed money; a negative bar means they owe money.

## How it Works

*   **HTML (`index.html`):** Provides the structure of the web page, including input fields, buttons, and areas to display information and the chart.
*   **CSS (`style.css`):** Styles the application for better readability and user experience.
*   **JavaScript (`script.js`):** Contains all the logic:
    *   Manages lists of members and expenses.
    *   Calculates total expenses and individual shares.
    *   Determines who owes whom using a straightforward settlement approach.
    *   Uses Chart.js (via CDN) to render the spending visualization.

## Hosting on GitHub Pages

You can easily host this application for free on GitHub Pages:

1.  **Create a GitHub Repository:**
    *   If you haven't already, create a new repository on GitHub.

2.  **Push Files:**
    *   Add the files (`index.html`, `style.css`, `script.js`) to your repository.
    *   Commit and push them to GitHub.
    ```bash
    git init
    git add index.html style.css script.js README.md
    git commit -m "Initial commit of expense splitter app"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
    git push -u origin main
    ```
    (Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` accordingly.)

3.  **Enable GitHub Pages:**
    *   In your GitHub repository, go to the "Settings" tab.
    *   In the left sidebar, click on "Pages".
    *   Under "Build and deployment", for "Source", select "Deploy from a branch".
    *   Under "Branch", select your main branch (e.g., `main` or `master`) and `/ (root)` for the folder.
    *   Click "Save".

4.  **Access Your Site:**
    *   GitHub Pages will build and deploy your site. This might take a minute or two.
    *   Once deployed, you will see the URL for your live site (e.g., `https://<username>.github.io/<repository-name>/`). You and your friends can use this URL to access the app.

---

Built with HTML, CSS, JavaScript, and Chart.js.
