# Assessment Setup
Before beginning the in-person exam, please make sure your environment is properly setup by creating a copy of this repository locally. You may look over the code and become familiar with it ahead of time if you desire, but it is not necessary. The instructions for the assessment will be provided at the start of the exam.

## Prerequisites
### Node
Please ensure your Node version is 14+.
### Github Gists
In this assessment, you'll be using [Github Gists](https://docs.github.com/en/rest/reference/gists) which will require user authentication. To get started, generate a Personal Access Token by going to (https://github.com/settings/tokens) and do the following:
1. Click on “Personal Access Tokens” from the left sidebar and click on the “Generate new token” button on the top right.
2. Enter `DISQO Test` as the `Token Description` and in the `Select scopes` area check the checkbox for `gist - Create gists`. An access token will then be generated for you.
3. Copy the access token and you will use this access token for the remainder of the test. Please note the access token should be placed in the header of all the requests that are sent to the gists API. You will not be able to view this token again so make sure it is stored somewhere where you can access it at the beginning of the test.
### Git
Since this is an in person assessment, it is not necessary to use git for committing your work. However, if you would like to use git to you are more than welcome to set that up ahead of time and use it during the assessment.

## Setup
1. From the root directory, run `npm install` to install dependencies
2. Run `npm start` and open [http://localhost:3000](http://localhost:3000) to view the app in your browser
