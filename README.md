# MyReads Project

Manage your books with MyReads. Books can be organized in three categories:
+ Currently reading
+ Want to read
+ Read

App features:
+ Move a book between categories with the little green selection arrow.
+ Search for new books with the loupe in the lower right corner (only certain search terms will work, see "Important" note below).

## App Setup
* install all project dependencies with `yarn install`.
* start the development server with `yarn start`.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for "Basket Weaving or Bubble Wrap" don't come back with any results.

## Deployment
`yarn deploy`

## Routing on Github Pages
+ General setup instructions I followed:[https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#github-pages](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#github-pages)
+ Configured React Router with a basename, see [index.js](src/index.js) and: [https://github.com/facebook/create-react-app/issues/1765#issuecomment-327615099](https://github.com/facebook/create-react-app/issues/1765#issuecomment-327615099)
+ to get around the fact that Github doesn't offer a catchall route that redirect, e.g. `/search` to [index.html](public/index.html), this app uses a workaround that redirects from a [custom 404 page](public/404.html) to an app URL. Sources:
  - [https://github.com/rafrex/spa-github-pages](https://github.com/rafrex/spa-github-pages)
  - [https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#notes-on-client-side-routing](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#notes-on-client-side-routing)

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Sources
+ Search icon from [Font Awesome](https://fontawesome.com/icons/search?style=solid). Modified fill color.
