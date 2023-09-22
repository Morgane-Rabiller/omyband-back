# projet-06-o-my-band-back

## Installation 
 1. Création de la BDD : 

 ```bash
 psql -U postgres
 ```
 ```sql
 CREATE DATABASE "omyband";
 CREATE USER omyband WITH PASSWORD 'omyband';
 CREATE DATABASE omyband WITH OWNER omyband;
 ```

 2. Remplir la bas de données

```bash
npm run resetDB
```
3. Installer les dépendances

```bash
npm install
```

4. Copier le point env.example puis renseigner les données
```bash
cp .env.example .env
```

5. Lancer l'API
```bash
npm run dev
```