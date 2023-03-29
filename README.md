# Angular - Generics

Example how you can implement generics to your Angular application.
Generics allow creating 'type variables' which can be used to create classes, functions & type aliases that don't need to explicitly define the types that they use.
Generics makes it easier to write reusable code.

Some benefits: 
- Type safety
- Less code and code is more easily reused

In this project you will see examples:
- generic data(CRUD) service
- generic BaseFormComponent and BaseIndexComponent

## Generic data(CRUD) service
On a path **"src/app/utility/data-models/responses/"** they are data models that refer to a standardized response from the backend service.

On a path **"src/app/utility/services/data.service.ts"** is generic service that implement generic interface **IDataService**.

On a path **"src/app/features/currency/services/currency.service.ts"** is generic service that implements generic ICurrencyService interface.
Interface ICurrencyService extends interface IDataService. Implementation of IDataService is completed at **DataService** and this service  **CurrencyService** extends this service.
On this way we are sure tha a currency service implements all methods from generic interface **IDataService** without adding extra code.

## Generic BaseFormComponent and BaseIndexComponent
Extending BaseFormComponent and BaseIndexComponent easily with little code, you can add new pages.
CurrencyFormComponent and CurrencyIndexComponent are simple implementations just for demonstration and getting ideas.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
