# Introductions of the Project 

   Our Frontend technology is React JS. And we used Agile framework called Kanban. We used weekly sprints for the framework. Now for the short term we used short sprints called weekly sprints. According to workdays, four days will be the flow of daily tasks called to-dos and to-dos will be maintain by the Devs, after receiving the flow of the weekly sprints to the leads and then after the distribution of the tasks maintained by the leads. That’s means the daily tasks will be maintain in the form to-dos by the Devs. All weekly sprints maintain in Project flow app called Goodday. And Maintain by the Team Leads only.

   On GitHub Organization project name called Dambaru Front-End Devs, all Devs will maintain their to-dos there on it. 

   Reporting by the Devs should be ended between first four working days. Flow should like that, So Devs should maintain their to-dos and take their task through Briefing sessions.

   If there are lot of issues in the daily flow, then rest of two days will be issued as reserved days for issue resolved day.

   The no. of pages we must create Introduction, Dashboard, Subject, Topic, Video. Every page has common component called Header and Footer. But Sidebar component only visible in subject and Topic. And many more components are used in the project. So, on below we have provided the Requirements that means assets and API we have used and the flow of the project also there. So, the Project modules are in the form of components we have created and API fetching part with authentication. 


# Version on GitHub

   We used GitHub for version control. The Project repo mentioned below with the two following branches called Main branch which is used to deployed after reviewed by the superiors, and another branch of the Repo is Development Branche and branches will be mixed with Devs own branch created on repo tree. Every Devs will assigned with their own branch name with their own name on it. Then every branch will be merged with main branch by the leads after reviewed and if reporting is completed.  On GitHub Organization project name called Dambaru Front-End Devs, all Devs will maintain their to-dos there on it. 
   
   ## A. REPOSITORY BRANCHES
        i) Main branch, called as deployment branch.
        ii) Assessment Branch, this branch is called as review branch. 
        iii) Development Branch, this is called as developer's branch.
	
## ISSUE TRACKING AND RESOLVING

   Issues will be tracked through the daily flow from GitHub. Devs Should push their issues in issue branch and mention on the task flows on projects.   

## Reporting of the Project
	
   For Devs you must create your daily To-dos in Dambaru Front-End Devs projects. For the Team leads they maintain the weekly sprints logs on Goodday. Report should be submitted before the next briefing session that is held on every Monday. 


# Project Requirements and Flow


## I.	Introduction Page (app.dambaruu.com)
   The flow starts from Introduction page and follow with background image for the page, logo image and an introduction video. Two components are used in here that are point it below. 

 
 
 

   ## 1. ASSETS USED HERE
        a) Background image in png format for the main body part.
        b) Logo in png format.
        c) Intro video file in mp4 format

   ## 2. COMPONENETS USED HERE
        a) Introduction Video
        b)Login Form to access user dashboard


## II. Dashboard (Standard Page)
   After the Login user should be redirected to the dashboard page. On the Dashboard components like Header and footer are created. On the Header component two more component are that are pointed below. And Footer contains copyrights descripted.
   
   
   
   

   ## 1.ASSETS USED HERE
         a)	Background image in png format for the main body part.
         b)	Logo in png format.
         c)	All content assets fetched from API.
      
   ## 2.	COMPONENETS USED HERE
         a)	Header
            i)	Logos
            ii) Back and forward buttons
            iii) Right logo to hover the Logout modals
         b)	On Body part portrait card component.
         c)	Footer for copyright.

# III. Dashboard (Subject Page)
     On the standard dashboard page every standard card is routed to its own subject dashboard page. On the Dashboard components like Header and footer are common. For   the easy access on this page, we created sidebar component and created subject card in portrait mode.
     
     
     
     

   ## 1. ASSETS USED HERE
        a) Background image in png format for the main body part.
        b) All content assets fetched from API.
   ## 2. COMPONENETS USED HERE
        a) Sidebar
        i) Menus with hover sub menus



# IV. Dashboard (Topic Page)
   On the subject dashboard page every subject card is routed to its own Topic dashboard page. On the Dashboard components like Header and footer are common. For the easy access on this page, we created sidebar component, but it is only showed topic menus and created topic card component in paranormal mode.







   ## 1. ASSETS USED HERE
   	a) Background image in png format for the main body part.
   	b) All content assets fetched from API.
	
   ## 2. COMPONENETS USED HERE
   	a) Sidebar
      	   i) Menus with hover sub menus of Topic and its contents name.



# V.Content (Video Page)

   On the video page first video will be appear in main video player then  next rest of topic videos  will be appear on the side bar panel .and all those videos have  video thumbnail. which is clickable.






   ## 1. ASSETS USED HERE
       a) Background image in png format for the main body part.
       b) All content assets fetched from API.
       c) Video thumbnails are png format.
       
   ## 2. COMPONENETS USED HERE
      a)	Video player
      b)	scrollable video panel


# VI. Quiz Section (Video Page)   

   After the video played quiz will be appeared when the question asked. Which have few types of options for all answers are image (png) format after choosing right/ wrong answer it shows a popup message alert.
   
   
   
   
   
   
   
   

   ## 1. ASSETS USED HERE
	 a) Background image in png format for the main body part.
         b) All content assets fetched from API.
         c) Video thumbnails are png format.
         d) Questions are Text Format which are fetch from Api
         e) Answer are Picture(Png Format)
	 
   ## 2. COMPONENETS USED HERE
      a)	Video player
      b)	Pop up Modal question and Answer


# VII. Folder Structure

   As mentioned above our project is Bootstrapped with Create react app, JavaScript, and Redux toolkit so the major folder structure is below.

   +-- node-modules
   +-- public
   +-- src
   +--.gitignore
   +-- package-lock. json
   +-- package. json
   +-- Readme.md

   For better coding experience our project is integrated with eslint and prettier module. For eslint you must have eslint extension setup in your working editor. So, for working of these two modules (eslint and prettier) we have two config files in our folder structure which contains all the necessary configuration for our project.


   +-- .....
   +-- .eslintrc
   +-- .prettierrc
   +-- ......

   The backend API URL of our project for different environments e.g Development, Stagging, Production, we have setup 3 .env files in our folder structure respectively.

   +-- .....
   +-- .env
   +-- ......

   Till now our folder structure is.

   +-- node-modules
   +-- public
   +-- src
   +-- .env
   +-- .gitignore
   +-- package-lock.json
   +-- package.json
   +-- README.md

   Let’s step forward into our main web app project structure inside src folder. Inside this we have major 4 folders.
   
   +-- node-modules
   +-- public
   +-- src
   |   +-- Asset
   |   +-- Components
   |   +-- utils
   |   +-- App.js
   |   +-- App.test.js
   |   +-- index.css
   |   +-- index.js
   |   +-- ......
   +-- ......

# VIII. Production Scripts

   @CMD: npm start

   Runs the app in the production mode.
   Open http://localhost:3000 to view it in the browser.
   The page will reload if you make edits.
   
   @CMD: npm run build

   Builds the app for production purpose to the build folder.
   It correctly bundles React in production mode and optimizes the build for the best performance.
   The build is minified and the filenames include the hashes.
   Your app is ready to be deployed!
   See the section about deployment for more information.

   The build is minified and the filenames include the hashes.\
   Your app is ready to be deployed!

   See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
   
# Learn More

      You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
      To learn React, check out the [React documentation](https://reactjs.org/).



