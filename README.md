# coach <img src="public/images/dumbbell_black.png" alt="dumbell" width="36" style="rotate:45deg" />

*A data powered fitness companion to track your workouts, focus your training and give you powerful insights.* 

### Develop 

```zsh
# set the environment, then run in dev mode
nvm use && pnpm i && pnpm dev

# to run checks (also run on commit / push)
pnpm check && pnpm lint

# to run tests
pnpm cy:component 
```

To run the debug profile from VS Code, navigate to `"Run and Debug"` and select the desired profile.

### Tooling Methodology

Every technology used in this project has been intentionally selected. 

##### Code 

[Next (App Router | Tailwind | TypeScript)](https://nextjs.org/docs/app) - clean structure, based on React Server Components, enables Vercel for easy setup and continuous deployments. 
[Zustand](https://github.com/pmndrs/zustand) - simplest way to handle complex client state.
[Drizzle](https://orm.drizzle.team/) - chosen for the focus on performance and its intuitive syntax. 
[Biome JS](https://biomejs.dev/) - elimates the need for all the ESLint, Prettier, etc... and provides a single config to handle it all.
[Lefthook](https://github.com/evilmartians/lefthook) - much easier to setup than husky, and doesn't require lint-staged (also husky refused to run).
[Cypress](https://www.cypress.io/) - handles component and E2E testing, fast

##### Providers 

[Clerk](https://clerk.com/) - never roll your own auth, especially not when Clerk makes it so incredibly easy to do so, on top of managing your users.
[Vercel](https://vercel.com/) - combines the deployment pipeline, hosting, and database layers greatly reducing the overhead for small, solo applications. 
[Shadcn/UI](https://ui.shadcn.com/) - clean, simple UI components that can easily be extended

##### AI Tooling

During this project I also sampled various AI enchancements to my workflow. 

[Codeium](https://codeium.com/vscode_tutorial?extensionName=vscode&access_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImJkMGFlMTRkMjhkMTY1NzhiMzFjOGJlNmM4ZmRlZDM0ZDVlMWExYzEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSmFjayBXaXR0IiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2V4YTItZmIxNzAiLCJhdWQiOiJleGEyLWZiMTcwIiwiYXV0aF90aW1lIjoxNzMwNTk1NjgwLCJ1c2VyX2lkIjoiR09YeEZNeFJGc2FuZTJJZlNXaVVVUWFBRVU1MyIsInN1YiI6IkdPWHhGTXhSRnNhbmUySWZTV2lVVVFhQUVVNTMiLCJpYXQiOjE3MzQwMzAyOTMsImV4cCI6MTczNDAzMzg5MywiZW1haWwiOiJqd2l0dDE0NTJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiandpdHQxNDUyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.AKlbIR0XGvGaRVsBJg5DZqmJng7Pa7P9ODDoi9sZAi1fQ0z8RpVYJYz92lw6TJWDiVwGg5NpfEkSZ1QcZFfegnPdQgAz-1WUjnt-623lmkX_EOGh4E9x8nqTIqxY2-J7bFc3_K5EmP4VIY65itwuglybMl2Ubu53_8ANFjl6EmjxB6f0uYTkCcqYZi-ceoqGirF_ZoiePrQaOen2bCFte8J6hwb0VcsdHkcmpjBaCmE-dlqsXXo-MVRJfZ85M_W3co8TucqvQ-mNIxLSC0F2Vkl6Y_ZfcOGEcTnfjRez5BAjPhX0iU-mH8aKqUzJ_D7WQKWQBCVy6ZF4FCfgPz52lg) - I found this to be a bit intrusive, in terms of generation it's certainly helpful (cut my time spent writing tests and significantly) but the JSDoc feature kept triggering and certain suggestions got in the way. 
[V0.dev](https://v0.dev/) - I absolutely love this, and for personal projects this will be my "UX Developer" from now on. I think there remains a large area where we as devs are responsible for cohesion and debugging but for a personal project this is invaluable. 
