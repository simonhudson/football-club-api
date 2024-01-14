# Football Club API

## Built with
- Node.js
- Express.js
- MongoDB

## Available endpoints

https://football-club-api.vercel.app

-   [`/players`](https://football-club-api.vercel.app/players) returns all players, ordered by `last_name` in ascending order
-   [`/players/:slug`](https://football-club-api.vercel.app/players/james-collins) returns individual player
-   [`/players/captain`](https://football-club-api.vercel.app/players/captain) returns current Team Captain
-   [`/players/vicecaptain`](https://football-club-api.vercel.app/players/vicecaptain) returns current Team Vice-Captain
-   [`/players/loan`](https://football-club-api.vercel.app/players/loan) returns all Loan players
-   [`/players/loan/in`](https://football-club-api.vercel.app/players/loan/in) returns all players loaned into the club from other clubs
-   [`/players/loan/out`](https://football-club-api.vercel.app/players/loan/out) returns all players loaned out of the club to other clubs

## Postman collection

A [Postman](https://www.postman.com/) collection (including tests) can be found at the root.
