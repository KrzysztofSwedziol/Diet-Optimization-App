# HOW 2 RUN
wszystkie komnedy tutaj są na windowsa  
(poza dockerowymi, bo one wszędzie są takie same )
## 1. Przygotowanie środowiska

#### 1.1 Wolne porty
Żeby uniknąć problemu z zajetymi portami i żeby nie szukać ich po ciemku,
odsyłam do `miscellaneous/devops/README.md`

#### 1.2 Czyszczenie kontenerów

Volumens down
```bash
docker compose down -v
```

Zatrzymanie wszytskich konkenerów ( działających )
```bash
docker stop $(docker ps -aq)
```
Burzenie ich
```bash
docker rm -f $(docker ps -aq)
```

Opcja atomowa, niszczy wszystko, kontenery, volumeny i images z całego systemu  
( ostrożnie )
```bash
docker system prune -a --volumes
```

## 2. Baza danych

Zbudowanie i odpalanie kontenera
```bash

docker compose up -d --build postgres
```

Do weryfkacji czy działa okej odsyłam do `miscellaneous/postgres-database/README.md`

## 3. Ollama

```bash

docker compose up -d ollama
```

Check czy działa
```bash

Invoke-WebRequest "http://localhost:49152/api/version" | Select-Object -ExpandProperty Content
```

Jeśli w terminalu zwróci nam:

```json
{"version":"0.9.0"}
```

To raczej jest okej

## 4. Ollama init

```bash

docker compose up --build --no-deps ollama-init
```

jak wyświetli się na koncu takie coś:
```text

ollama-init exited with code 0
```

To znaczy że raczej jest okej

Dodatkowy check (zważka na to, jaki jest numer portu w docker-compose):
```bash
Invoke-WebRequest -Method POST `
  -Uri "http://localhost:49152/api/generate" `
  -ContentType "application/json" `
  -Body '{"model":"mistral","prompt":"ping"}'
```

Odpowiedź powinna wyglądać mniej więcej tak
```text
StatusCode        : 200
StatusDescription : OK
Content           : {123, 34, 109, 111...}
RawContent        : HTTP/1.1 200 OK
                    Transfer-Encoding: chunked
                    Content-Type: application/x-ndjson
                    Date: Tue, 11 Nov 2025 19:50:16 GMT

                    {"model":"mistral","created_at":"2025-11-11T19:50:16.653034355Z","response":" He...
Headers           : {[Transfer-Encoding, chunked], [Content-Type, application/x-ndjson], [Date, Tue, 11 Nov 2025 19:50:16 GMT]}
RawContentLength  : 25318
```

## 5. Backend

```bash

docker compose --profile dev up -d --build backend-dev
```

## 6. Frontend

```bash
docker compose --profile dev up -d --build frontend-dev
```