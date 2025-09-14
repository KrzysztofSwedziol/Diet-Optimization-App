## Krok po kroku

### 1. 

w katalogu `\Diet-Optimization-App\miscellaneous\postgres-databse`

```bash
docker compose build
```
### 2.
```bash
docker compose up -d
```

### 3. ( dla testu czy sie nie wyjebało )
wchodzenie do kontenera na windowsie:
```bash
docker exec -it $(docker ps -q -f "name=dyeti-postgres") bash
```

i na linuxie / macu:
```bash
docker exec -it "$(docker ps -q -f name=dyeti-postgres)" bash
```

### 4. łączenie sie z Intelij

kliknąć tu:  

![db_where](screenshots/db_gdzie.png)

I następnie tak uzupełnić:

![db_where](screenshots/db_config.png)

### tak uzupełnić

| Klucz    | Wartość                 |
|----------|--------------------------|
| Host     | 127.0.0.1                |
| User     | dyeti                    |
| Password | dyeti_pass               |
| Port     | 55433                    |
| Database | dyeti_db                 |
| URL      | automatycznie się wygeneruje |

---
Note:
- 127.0.0.1 (nie localhost, bo zinterpretuje po swojemu i się wysra)
- 55433 (taki duży, bo na mniejszych Bóg wie czemu nie chce działać)

### 5. query
**plusik → Query Console**
 
```sql
select * from products
```

Powinno się ładnie wypisać. Jak nie to chuj wam w dupe