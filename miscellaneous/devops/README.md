## Wyszukiwarka wolnych portów

#### skrypt wyszukuje N wolnych portów efemerycznych
( zakres 49152–65535 ) i wypisuje je w terminalu

#### 1. wersja na windows ( power shell )
```bash

.\free_ports_windows.ps1 -Count 10
```

#### Wolne porty zostaą zapisane do pliku `free_ports.txt`

w `docker-compose.yaml` port hosta ( czyli ten na którym nam 
zależy żeby był wolny ) to ten "po lewej"

```yaml
    ports:
      - "127.0.0.1:<PORT_HOSTA>:5432"
```
## Anihilacja dockera

usuwa wszystie volumeny, kontenery, cache itp w celu "czystego" startu

( wersja na windows )
```bash

.\docker_nuke.ps1
```