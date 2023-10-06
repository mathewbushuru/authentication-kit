<h2 align="center"> Authentication Kit </h1>

This is a generic and reusable implementation of authentication strategies in ReactJS / ExpressJS web apps.

![progress](./docs/current-progress1.jpg)

##### How it works

This app uses token based authentication where we store the JSON Web  Token (JWT) clientside in the browser's local storage. The authentication/authorization process is listed below:

- Client sends login data (username/email, password).
- Server creates a JWT and returns it to client.
- Client sends authenticated request with JWT in the header. I am using RTK Query to automatically inject the token into each request's headers if it exists as shown [here](./react-frontend/src/api/auth.ts).
-  Server validates the JWT and returns the response

The diagram below shows how we store and validate the password in the backend.

<p align="center">
    <img src="./docs/how_it_works.jpg" width="600px" >
</p>

A minor difference - the `salt` is not stored as a different column in the  database. It is stored in the hashedPassword column among other parameters as follows:

```sh
$[algorithm]$[cost]$[salt][hash]
```

##### Testing

Testing in the backend is implemented using `Jest` and `Supertest`. Main reason for using Jest is it provides an all-in-one functionality where I get the test runner, assertion library and mocking capability from the same tool. For Supertest, it provides a high level abstraction for testing http. 

##### Tech Stack 

`Frontend`: React + Vite, TypeScript, TailwindCSS, Redux, RTK Query

`Backend`: NodeJS, ExpressJS, TypeScript, Jest

`Database`: MySQL

##### Roadmap

- [x] Configure MySQL database and express app. Stubbed routes for login and signup
- [x] FE login and signup UI - Combination of Zod and react-hook-form for runtime type checking and optimized forms.
- [x] BE error handling middleware.
- [x] FE error handling - Global error and 404 pages. BE 404 catch-all route.
- [x] FE state management using Redux. Configure Redux-Tookkit
- [x] FE data fetching and caching layer using redux toolkit
- [x] FE `/api-playground` for testing all my custom RTKQ hooks
- [x] Protected frontend routes implemented using React Router and Redux. For example, `/protected` can only be accessed when logged in
- [x] Sign up and log in flow using email and password.
- [x] Hash password functionality using Bcrypt algorithm.
- [x] JSON Web tokens - protected backend routes, verify expired/non-expired JWTs middleware, generate and replace any existing JWTs on successful login ,store in client's local storage.
- [ ] Comprehensive tests for the backend using Jest.
- [ ] Allow user to sign in by entering either their email or username in the same input.