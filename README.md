# PolyStocks

Search and store beautiful stock photos from three different sources: Unsplash, Pexels, Pixabay.

**ALL FREE!!!** photos that can be used for your marketing projects, websites, etc.

## Clone Application

To run a copy of this application, run the following command in the desired folder in your terminal (MacOS) or bash (Windows):

`git clone https://github.com/rebecalvarez/Project2.git`

Navigate to the created folder in your terminal.

## Setup Application

Once you have cloned repository above, go into your terminal and run the following command to install all the application's dependencies:

`npm install`

You will get some errors depending on the local server you are running. To test this application on your local server, we used MAMP server.

**PLease check `config/config.json` to make sure your development environment variables are setup correctly based on your local server.

The next error will be a SQL error due to not having a database titled `polystocks`. Go ahead and load the file from `models/schema.sql` to your SQL workbench to get the database created.

That should be all of the errors that you need to resolve in order to work on your local environment.

Once setup, visit your application on [http://localhost:3000/](http://localhost:3000/).
