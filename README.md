# CloeBlanchard_7_09072021
## Prérequis :
*	Sous environnement Windows 10
*	Disposer d’un serveur WAMP x64 en dernière version avec :  
   * MySQL version 8.x.x
* Disposer d’un compte root, sans mot de passe, étant admin du serveur MySQL et phpMyAdmin
*	Disposer de la dernière version de NodeJs x64
*	Cloner le repository sur le poste W10
*	Récupérer le chemin du clone sur le poste de travail (ex : C:\Temp\RepoP7)

## Installation
### 1ère partie : base de données
*	Démarrage du serveur WAMP
*	Accéder à l’interface phpMyAdmin à l’adresse : http://localhost/phpmyadmin
*	Créer une base de données de nom « db_projet7 » et d’interclassement « utf8mb4_unicode_ci »
*	Une fois la base créer, cliquer sur « Importer »
*	Sélectionner le fichier se trouvant au chemin :
	  	`* Chemin_du_clone\backend\BDD\db_projet7.sql`
*	Laissez les options d’importation par défaut dans phpMyAdmin, cliquer sur « Exécuter »
 
### 2ème partie : fichier .ENV & préparation serveur
*	Créer un fichier avec l’extension .ENV à l’emplacement chemin_du_clone\backend et dont le contenue est le suivant :
	  	`* host=localhost`
	  	`* user=root`
	  	`* db=db_projet7`
	  	`* Token=qsdkhglkdfghjd3`
*	Lancer un terminal PowerShell, déplacez-vous dans le dossier backend grâce à la commande :
	  	`* cd chemin_du_repo\backend\`
*	Une fois présent dans le dossier backend, exécuter la commande suivante :
	  	`* npm install`
*	Puis, exécuter la commande d’installation de nodemon :
	  	`* npm install -g nodemon`
*	Le backend est initialisé, vous pouvez démarrer l’api grâce à la commande :
	  	`* nodemon server`
*	Démarrer un nouveau terminal PowerShell, déplacez-vous dans le dossier frontend grâce à la commande :
	  	`* cd chemin_du_repo\frontend`
*	Une fois dans le dossier frontend, exécuter la commande :
	  	`* npm install`
*	Exécuter la commande suivante pour l’installation de vue, axios et vue-router :
		`* npm install -g @vue/cli`  
		`* npm install axios`
		`* npm install vue-router`
*	Le frontend est initialisé, déplacer-vous dans le dossier groupomania avec la commande :
	  	`* cd .\groupomania\`
*	Vous pouvez maintenant démarrer le serveur Web avec la commande :
		`* npm run serve`
  
    
Vous pouvez accéder au site depuis l’adresse : http://localhost:8080/
Le compte d’administration du site web est le suivant :
	`* @mail : compte.admin@groupomania.com`
	`* Mdp : 123`
