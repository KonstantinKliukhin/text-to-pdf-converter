# Text to PDF converter

## [Priview link](https://text-to-pdf-converter-xi.vercel.app/)

## Notice
This repository is built based on [Next FSD template](https://github.com/KonstantinKliukhin/next-fsd-template).


## Setup

1. Create .env file in project root
2. Fill .env file like described in .env.example file
3. Use Node.Js of version `22.13.1`
4. Install dependencies by running ```npm install```
5. Run ```npm run build``` and then ```npm start```

## Architecture

Used architecture is [FSD](https://feature-sliced.design/docs/get-started/overview) because it is universal architecture which suits for huge enterprise projects same as for logicless landings.

## Libs 

- dexie - for indexed DB.
- zod - for validation.
- react-hook-form just to write faster validation logic and to look more clear
- react-pdf - to show pdf.
- @headlessui/react - to follow tailwind components docs
- date-fns to work with dates
- axios for API requests


# Overview

- `src/pages-layer/home`. It imports 2 main components:
    - TransformTextToPdfForm which is feature. It does form logic and makes api request.
    - PdfView which is stupid component from `shared/ui` and just show pdf view by provided URL

- `widgets/pdf-history-list`. It is component that gets history from storage and shows all history items as cards list.

- `entities/pdf-history`. It is the only business entity existing in the project. There we have interface of history storage and implementation of this interface for indexedDB. We can create new class of storage with another implementation (e.g. localstorage) following same interface.

- `shared/ui` contains all stupid UI components of the app.

- `shared/api` contains api configuration. In case of this app it is axios configuration.

- `shared/config` contains app configuration constants.

- `shared/lib` contains all utility functions including hooks without any business logic.