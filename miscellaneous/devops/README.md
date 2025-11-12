## Wyszukiwarka wolnych portów

#### skrypt wyszukuje N wolnych portów efemerycznych
( zakres 49152–65535 ) i wypisuje je w terminalu

#### 1. wersja na windows ( power shell )
```bash

.\free_ports_windows.ps1 -Count 10
```

#### 2. wersja na Mac/Linux ( bash )
```bash

bash free_ports_posix.sh
```

#### Wolne porty zostaą zapisane do pliku `free_ports.txt`

w `docker-compose.yaml` port hosta ( czyli ten na którym nam 
zależy żeby był wolny ) to ten "po lewej"

```yaml
    ports:
      - "127.0.0.1:<PORT_HOSTA>:5432"
```
