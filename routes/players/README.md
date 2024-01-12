# Football Club API

## Requirements

-   [Node.js](https://nodejs.org/en)

## Running locally

-   Run `npm install`
-   Run `npm start`

## Postman collection

A [Postman](https://www.postman.com/) collection (including tests) can be found at the root.

## Available endpoints

-   `/players` returns all players, ordered by `last_name` in ascending order
-   `/players/captain` returns current Team Captain
-   `/players/vicecaptain` returns current Team Vice-Captain
-   `/players/loan` returns all Loan players
-   `/players/loan/in` returns all players loaned into the club from other clubs
-   `/players/loan/out` returns all players loaned out of the club to other clubs
