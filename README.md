# Intro To IPA

## Overview

This is a simple sample project designed to get someone familiar with the standard structure and code patterns in use across IPA Applications Group.

There are 3 Goals:

1. Create a Table on Page One to display demo person information + Create API for getting information to populate the table
2. Create a Form on Page Two to show a person object's information and allow edits + Create API for editing database records with new information
3. Style pages with Tailwind + Add in filters of the table + input validation

## Backend

### Setup

[Install uv](https://docs.astral.sh/uv/getting-started/installation/)

[Create db user and pass](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e)

Install dependencies

```bash
uv sync
```
Create tables

```bash
uv run manage.py migrate
```

Run script to add some data

```bash
uv run manage.py seedapp
```

Start backend

```bash
uv run manage.py runserver
```

Lint

```bash
uv run ruff check
```

Typecheck

```bash
uv run ty check
```

It's often helpful to check the database's structure and verify the data in its tables which is easily done using PGAdmin's UI:

[Desktop Database management tool](https://www.pgadmin.org/download/pgadmin-4-apt/)

#### Understanding the Django and Django REST Framework

[Django](https://docs.djangoproject.com/en/5.2/)
[Django w3 schools](https://www.w3schools.com/django/)
[Django youtube video](https://www.youtube.com/watch?v=1u9RNr9SaxI)
[DRF](https://www.django-rest-framework.org/)

## Frontend

### Setup

[Install nvm](https://github.com/nvm-sh/nvm)
[Install node lts](https://github.com/nvm-sh/nvm?tab=readme-ov-file#long-term-support)
[Install pnpm](https://pnpm.io/installation)

Install dependencies

```bash
pnpm i --ignore-scripts
```

Start frontend

```bash
pnpm run start
```

Lint

```bash
pnpm run oxlint
pnpm run lint
```

Format

```bash
pnpm run prettier
```

Types

```bash
pnpm run types
```

#### Understanding react and typescript

- [codeacademy REACT](https://www.codecademy.com/learn/react-101)
- [Codeacademy Typescript](https://www.codecademy.com/learn/learn-typescript)
- [Typescript](https://github.com/gibbok/typescript-book)

## Objectives

### (This is designed to take between 1 and 3 months, feel free to reach out to fellow apps team members for help!)

### Level 1 Objectives

- Add Page 2 to the Navigation bar and ensure it correctly navigates between the home page, page 1, and page 2

- Create a table on Page 1 that displays all the demoperson records stored in the back end

- Upon clicking the name of a record in the table navigate to page 2 and display all the record's values

### Level 2 Objectives

- Add a create button to page 1 that opens a blank form that creates along with a save button, correctly create a demoperson in the database on save

- Add a delete button to the table that sends a request to the backend, deletes a demoperson, and refreshes the table

- Change page 2 to allow edits to the record with a save button that updates the backend

### Level 3 Objectives

- Make the table sortable and searchable

- Add input validation to page 2 so age can only be set to numbers >= 0 and non-blank names

### Once you have the project working

Try adding more to the pages so they're easier to use; examples of polish

- convert styling to TailwindCSS
- additional styling and colors
- format the data tables
- improve error handling and validation in the form/APIs
- clean and refactor code

#### VSCode Extensions are very helpful, here are the most important

- dbaeumer.vscode-eslint (must use)
- ckolkman.vscode-postgres (must use)
- esbenp.prettier-vscode (must use)
- rvest.vs-code-prettier-eslint (must use)
- charliermarsh.ruff (must use)
- astral-sh.ty (must use)
- oxc.oxc-vscode (must use)
- WallabyJs.console-ninja

(find these by searching in the 'extensions' menu on the left)

#### Extra

[ZSH](https://itslinuxfoss.com/how-to-install-zsh-in-ubuntu-22-04/)
