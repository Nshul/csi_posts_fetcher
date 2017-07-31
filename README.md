# csi_posts_fetcher

FB Page posts fetcher for CSI NSIT 

## Pre Requisites

You will need

* [Node.js](https://nodejs.org/) (with NPM)
* Mysql

## For Running

* `git clone <repo-url>` this repo wherever you want
* cd into this repo
* `npm install`
* IN db.js
  * Change `testuser` in `username` to `<your-local-user>` of mysql
  * Change `password` in `password` to `<your-user-password>`
  * Change `csitask1` in `database` to `<your-database>`
  In case you want to use another dialect instead of `Mysql`. Kindly look up in `Sequelize` docs to accomodate for the necessary changes.

This app uses environment variables to configure the Client ID and Secret needed to access Facebook's API. Start the server with those variables set to the appropriate credentials.

`$ CLIENT_ID=__FACEBOOK_CLIENT_ID__ CLIENT_SECRET=__FACEBOOK_CLIENT_SECRET__ node server.js`

Open your favourite browser and go to [http://localhost:5400](http://localhost:5400) to see it in action
