<h2 align="center"> Authentication Kit </h1>

This is a generic and reusable implementation of authentication strategies in ReactJS / ExpressJS web apps.

![progress](./docs/current-progress1.jpg)

##### How it works

![howItWorks](./docs/how_it_works.jpg)

A minor difference - the `salt` is not stored as a different column in the  database. It is stored in the hashedPassword column among other parameters as follows:

```sh
$[algorithm]$[cost]$[salt][hash]
```

##### Tech Stack 

- [`TypeScript`](https://www.typescriptlang.org/) - Same language for both the frontend and backend.

Frontend
- [`React`](https://react.dev/) - frontend
- [`TailwindCSS`](https://tailwindcss.com/) - styling
- [`Redux / RTK Query`](https://redux-toolkit.js.org/) - state management, data fetching and caching

Backend
- [`Node / Express`](https://expressjs.com/) - backend framework

Database
- [`MySQL`](https://www.mysql.com/) - Relational database
