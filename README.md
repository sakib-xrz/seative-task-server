# Seative Task Server (Todo Application)

**Live Server Link:** [https://seative-server.vercel.app/](https://seative-server.vercel.app/)

**Base URL:** [https://seative-server.vercel.app/api/v1](https://seative-server.vercel.app/api/v1)

## Endpoints

### Authentication

#### [POST] LOGIN

`/auth/login`

#### [POST] REGISTRATION

`/auth/register`

### User

#### [GET] GET ME

`/me`

#### [GET] GET ALL USERS LIST

`/users`

### Tasks

#### [POST] POST A TASK

`/tasks`

- **Note:** Only `title` is required

#### [POST] POST FAKE TASKS

`/tasks/generate-fake-tasks`

#### [GET] GET ALL TASKS

`/tasks`

**Query Params:**

- **SEARCH BY TITLE:** `/tasks?search=title`
- **SORT BY PRIORITY (asc/desc):** `/tasks?sortBy=priority&order=asc/desc`
- **SORT BY DURATION (asc/desc):** `/tasks?sortBy=duration&order=asc/desc`
- **SORT BY DUE DATE (asc/desc):** `/tasks?sortBy=due_date&order=asc/desc`
- **FILTER BY STATUS:** `/tasks?status=todo/in-progress/completed`
- **FILTER BY PRIORITY:** `/tasks?priority=high/medium/low`
- **FILTER BY DUE DATE:** `/tasks?due_date=06-30-2024`

#### [GET] GET SINGLE TASK

`/tasks/:id`

#### [PATCH] UPDATE A TASK

`/tasks/:id`

#### [DELETE] DELETE A TASK

`/tasks/:id`

## Get Postman API Documentation

[Postman API Documentation](seative-backend.postman_collection.json)
