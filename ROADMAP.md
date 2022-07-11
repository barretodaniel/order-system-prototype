# Future Improvements

- Make the cart persistent across page reloads
  - In a more real world case, shopping carts typically persist across different pages and subsequent reloads of the website. This could be implemented either using browser storage APIs or communicating with a server to store the information in something like a NoSQL DB.
- Use a more advanced data management library
  - Using a library like `react-query` allows data fetching to be cached and memoized to avoid calls to the server, improving the responsiveness of repeated visits to the menu if this were an app consisting of multiple pages. This would also cut down on server costs.
  - `react-query` would also simplify the data querying. Providing useful states to gracefully manage the data fetching lifecycle.
- More decoupling between the `CartContext` and its storage implementation
  - Ideally, we could take advantage of techniques like dependency injection to which would allow the application to be more resilient to refactors of the cart storage. I would consider moving the `useReducer` call out of the `App` component into a hook that returned an object that adhered to the interface of the `CartContext`.
