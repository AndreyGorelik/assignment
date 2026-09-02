# testAIAssignment

Fullstack monorepo: React Native app + NestJS backend.

## The assignment

Build a small mobile application with an Instagram-like **Stories** experience.

The project is provided as a ready-to-use monorepo with the required dependencies and development environment already configured.

You have **1.5 hours** to complete the assignment.

The goal is to build a functional and reliable experience while making effective use of AI tools during development.

### Assets

Images and videos are provided in `assets.json` in the **assets folder of the monorepo**.

A font file is also provided in the `assets` folder (`Ubuntu-Regular.ttf`). All text elements
in the app should use that font — no system fonts.

Use the provided assets for the Stories content. No external asset search is required.

### Stories List

* Display exactly **6 users** with available stories.
* Display users as a horizontally scrollable list of circular avatars.
* Each user has **3–10 stories**.
* Stories contain a random mix of images and videos, with **at most one video per user**.
* Show user names and viewed/unviewed state.
* Users with unviewed stories should appear before users whose stories have all been viewed.
* The ordering should update when stories are viewed.
* Tapping a user opens their Stories.

<img width="350" alt="Stories list" src="https://github.com/user-attachments/assets/0b92c967-0a24-4ce1-9a94-fc0153189994" />


### Stories Viewer

The fullscreen viewer should support:

* Image and video stories.
* Story progress indicators.
* Automatic progression between stories.
* Tap left/right to navigate between stories.
* Long press to pause/resume.
* Long press should not be interrupted by moving gesture if started.
* Swipe down to close, should be visible home screen under the story view during swipe.
* Automatically move to the next user's stories after finishing the current user's stories.
* Start from the first unviewed story when opening a partially viewed user.
* Remember the last opened story for each user and resume from that story when returning to the user.
* When navigating left from the first story of a user, move to the previous user's stories when available.
* When navigating right from the last story of a user, move to the next user's stories when available.
* Smooth 3D-like transition between stories, similar to Instagram.
* During the transition between users stories the previous and/or next story should be visible and paused.
* Progression of video story should be synced with video duration

<img width="350" alt="Stories viewer" src="https://github.com/user-attachments/assets/754093f5-25f7-4195-bb94-6793235aa76f" />
<img width="350" alt="Stories viewer transition" src="https://github.com/user-attachments/assets/6f429dad-f158-4964-859d-5234b1b420ad" />


### Views

* Story views must be recorded by the backend.
* Viewed state must be reflected in the Stories list.

### Backend

Implement the backend required to support the application. Generate data with assets.

It should provide functionality for:

* Retrieving users and stories.
* Retrieving view information.
* Recording story views.

The exact API structure, data model, storage mechanism, and implementation approach are up to you.

### Error & Loading States

The application should provide appropriate feedback for loading, empty, media, and network-related states.

### Bonus Points

* Implement optimistic update for story view.
* Prefetch images to minimize visible loaders.
* Custom skeletons for stories row.

### Code Quality

The implementation should be **clean, modular, reusable, and maintainable**.

Code should be easy to understand, extend, and modify **without requiring AI assistance for routine changes**.

Avoid unnecessary duplication, tightly coupled components, and overly complex solutions.

No specific architecture, project structure, or coding conventions are required.

### Submission

Provide the completed monorepo containing:

* React Native application.
* Backend.
* Required data/storage implementation.
* README with setup and run instructions.
* Brief description of the implementation approach.
* AI tools used and how they were used.
* Known limitations or unfinished parts.

### Evaluation

The assignment will be evaluated based on:

* Functional completeness.
* Full-stack integration.
* Code quality and maintainability.
* Effective use of AI tools.
* Ability to review and validate AI-generated code.
* Reliability and overall implementation quality.
* Engineering decisions and prioritization.

No specific libraries, architecture, or AI tools are required. You may use any packages you consider appropriate.

The implementation should focus on core functionality rather than pixel-perfect reproduction of Instagram.

---

## Repository layout

```
.
├── mobile/   React Native 0.87 (Metro :8081)
└── server/   NestJS 12 (:3000) + Prisma 7 / SQLite
```

## Requirements

Required:
- **Node >= 22.11** (see `.nvmrc`, run `nvm use`) and npm 10+
- **Watchman** — `brew install watchman` (Metro works without it, but slower and with flaky rebuilds)

For iOS (macOS only):
- **Xcode 16+** with Command Line Tools and a simulator
- **Ruby >= 2.6.10** + Bundler → `cd mobile && bundle install && bundle exec pod install`

For Android:
- **JDK 17**
- **Android Studio** / SDK: `compileSdk 37`, `buildTools 37.0.0`, NDK `27.1.12297006`, `minSdk 24`;
  `ANDROID_HOME` must be set. Gradle comes from the wrapper (9.4.1), no separate install needed.

The backend and the database need **nothing** extra — SQLite is just a file, no Docker required.

## Setup

```sh
nvm use            # Node 22
npm install        # installs deps in mobile/ and server/,
                   # generates the Prisma client and applies migrations (dev.db)
```

That single command is enough: `.env` is optional (there is a `file:./dev.db` fallback).
If you need to change the port or the database path — `cp server/.env.example server/.env`.

For iOS, one extra one-off step: `cd mobile && bundle install && bundle exec pod install`.

## Running

```sh
npm run dev        # Nest (watch) + Metro in parallel
npm run ios        # Nest + build/run iOS
npm run android    # Nest + build/run Android
```

Separately: `npm run dev:server`, `npm run dev:mobile`.

Also: `npm run lint`, `npm test` — both run across the two packages.

## Database

Prisma 7 + SQLite (file `server/dev.db`, not committed).
Schema lives in [server/prisma/schema.prisma](server/prisma/schema.prisma); the connection goes
through the `@prisma/adapter-better-sqlite3` driver adapter (mandatory in Prisma 7).

```sh
npm run db:migrate    # create/apply a migration after editing the schema
npm run db:generate   # regenerate the client
npm run db:studio     # database GUI
```

`DATABASE_URL` lives in `server/.env` (`file:./dev.db`). Moving to Postgres means switching
`provider` in the schema, the adapter to `@prisma/adapter-pg`, and `DATABASE_URL`.

Right now there is a single placeholder model `Item` with `GET /items` and `POST /items`
([server/src/items/](server/src/items/)) — replace it with the real domain model.
