# URL_Shortener Backend und Frotend

## Redis im Docker starten (wenn nicht schon geschehen)

prüfen ob docker schon läuft

```sh
docker ps
```


```sh
docker run -p 6379:6379 -v ${PWD}/data:/data --name project-redis -d --restart=always redis redis-server
```

## Frontend und Backend starten

```sh
npm run start
```