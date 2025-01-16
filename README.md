# URL_Shortener Backend and Frontend (2021)

**⚠️ Note: This project is currently not functional due to outdated dependencies. It was originally created in 2021, and many of the packages that were up-to-date at the time are now obsolete. I plan to work on a new version soon, updating all packages and making some improvements.**

**The frontend was primarily used for live visual testing of the URL-shortening functionality.**
**In the future, the application will be redesigned as a standalone backend service.**

## Start Redis in Docker (if not already running).

Check if Docker is already running:

```sh
docker ps
```


```sh
docker run -p 6379:6379 -v ${PWD}/data:/data --name project-redis -d --restart=always redis redis-server
```

## Start Frontend and Backend

```sh
npm run start
```

## Planned Improvements
- Upgrade all dependencies to their latest versions.
- Implement improvements to ensure better stability and performance.
- Change the package manager from npm to pnpm
- Refac the code and watching out for improvements

## Let me know if you need further adjustments!

This project is licensed under the [MIT-License](LICENSE).