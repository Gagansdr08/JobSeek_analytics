<h1>Intelligent Job Analytics Platform</h1>
<p>An innovative web application designed to provide job seekers and analysts with actionable insights into top-paying roles, in-demand skills, and market trends. </p>
<p>This platform bridges the gap between job market data and informed career decisions by leveraging analytics and a user-friendly interface.</p>

<h2>Key Features</h2>
	<p>•	Actionable Insights: Explore high-paying jobs and skill trends across industries.</p>
	<p>•	User Management: Secure user registration, login, and role-based access control for admin and regular users.</p>
	<p>•	Admin Dashboard: CRUD functionality for managing job postings and maintaining an up-to-date job database.</p>
	<p>•	Skill Analytics: Gain insights into essential skills and their relevance to top-paying roles.</p>
	<p>•	Comprehensive Search: Advanced search filters for exploring jobs by title, location, and salary.</p>

<h2>Problem It Solves</h2>
<p>Job seekers often find it hard to access reliable insights about high-paying jobs and important skills, while analysts struggle to keep job data updated.</p>
<p>This platform helps users make better career decisions and makes it easier for organizations to manage job information efficiently.</p>

<h2> How to setup and run the Flask+React application</h2>
<p> To setup and run the react files follow the following steps:</p>
<ul>
<li> Clone the repository from the github link</li>
<li> Run the requirements.txt file by the following: 

pip install -r requirements.txt</li>
<li> Setup the PostgreSQL table structure as given in the sql file. Run the lines given in the file.</li>
<li> Update the database credentials in the app.py file according to the local postgresql server. Load the data from this link:</li>
<li> Install the packages for the React frameworks as well using the node package manager(npm):

npm install React react-router-dom react-chartjs-2 chart.js axios

Check and install the dependancies as you follow in case some packages are missing from the above. </li>
<l1> Setup tailwind CSS using this link as reference: https://tailwindcss.com/docs/installation</li>

<li> Open the frontend file and run the developement server: 
cd frontend
npm start</li>

<li> Run the app.py file for the backend server. Update the api server logic in the apiConfig.js folder accordingly and in other places as required.</li>
<li> Test the application and make changes accordingly.</li>
</ul>


