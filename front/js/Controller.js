class Controller {
  //page index.html
  //permet de recupérer le fichier json des produits par l'intermédiaire de l'API
  async afficherListeProduits() {
    //déclaration de la classe Model
    let model = new Model();
    //appel de la fonction recupererProduits qui va renvoyer un tableau avec la liste des produits
    //Array : {colors : Array ["blue","white","red"]
    //        _id
    //        name
    //        price
    //        description
    //        imageUrl
    //        altTxt}
    let listeProduits = await model.recupererProduits();

    //declaration de la classe ListeProduitsVue
    let listeProduitsVue = new ListeProduitsVue();
    //appel de la fonction listeProduitsVue qui va afficher les produits issus du tableau récupéré sur la page index.html
    listeProduitsVue.creerElement(listeProduits);
  }

  //page product.html
  //permet de recupérer un produit avec son id
  async afficherUnProduit() {
    let model = new Model();
    //recupere l'id du produit dans l'url après le parametre id
    let idProduit = Utils.getParameterByName("id");
    //recuperer les données correspondant au produit selectionné en parametre l'id du produit
    //renvoie un objet produit
    let produit = await model.recupererUnProduit(idProduit);
    //declaration de la classe ProduitVue
    let produitVue = new ProduitVue();
    //fonction qui affiche les données correspondant au produit selectionné.
    produitVue.afficherProduit(produit);
    //Ecouter l'evenement click sur le bouton "ajouter au panier"
    this.ecouterAjouterAuPanier();
  }

  ecouterAjouterAuPanier() {
    //recupere l'element bouton "ajouter au panier"
    const elt = document.getElementById('addToCart');
    let model = new Model();
    //recupere les données du localStorage dans un tableau panier
    //tableau panier : 0:id, 1:couleur, 2:quantite
    let panier = model.recupererPanier();
    //si le panier est vide
    if (panier == null) {
      panier = new Array();
    }

    elt.addEventListener('click', () => {
      //recupere les données de la page produit : la couleur, l'id du produit et la quantité saisie
      // recupererValeur a besoin de l'id de l'élément, ainsi que de son type de données et retourne un tableau de deux valeurs : la valeur, vrai ou faux (vrai si la donnée est renseignée sinon faux)
      //tableau avec deux valeurs : la couleur, true ou false
      let couleur = Utils.recupererValeur("colors", "option");
      //recupere l'id du produit
      let idProduit = Utils.getParameterByName("id");
      //tableau avec deux valeurs : la quantité, true ou false
      let quantite = Utils.recupererValeur("quantity", "input");

      //si couleur ou quantité non renseigné, afficher message d'erreur
      if (!couleur[1] || !quantite[1]) {
        alert("La couleur ou la quantité n'est pas renseignée correctement!");
      } else {
        //sinon verifier si l'id et la couleur sont déjà dans le panier. retourne un tableau avec deux valeurs : index du tableau à modifier si id/couleur trouvé, true si id/couleur trouvé sinon false
        let produitExistant = Utils.verifierPresenceProduit(panier, idProduit, couleur[0]);
        //si deuxieme valeur du tableau est false (Id/couleur non trouvé), ajouter le produit dans le panier.
        if (!produitExistant[1]) {
          //ajoute une ligne dans le panier (dans le tableau)
          panier.push([idProduit, couleur[0], quantite[0]]);
          alert("Le canapé est ajouté dans le panier");
        } else {
          //si deuxieme valeur du tableau est true (Id/couleur trouvé), modifier la quantité du produit dans le panier.
          //recupere la quantité déjà présente dans le panier
          let calcul = parseInt(panier[produitExistant[0]][2]);
          //ajoute la nouvelle quantité
          calcul += parseInt(quantite[0]);
          //modifie la quantité avec la nouvelle quantité ajoutée dans le tableau panier
          panier[produitExistant[0]][2] = calcul;
          alert("La quantité du produit a été modifiée dans le panier");
        }

        //ajoute le tableau panier dans le localStorage
        model.enregistrerPanier(panier);
        //redirige vers la page du panier
        document.location.href = "cart.html";
      };
    }
    )
  }

  //page cart.html (panier)
  //permet de recupérer la liste du panier localStorage
  async afficherListePanier() {
    let model = new Model();
    //recupere les données du localStorage (id, couleur, quantité)
    let listePanier = model.recupererPanier();
    //recupere les données détaillées de chaque produit du panier (name,description,price...)
    let listeProduits = await model.recupererDetailsPanier(listePanier);
    //afficher chaque produit du panier dans la page cart.html
    let panierVue = new ListePanierVue();
    panierVue.creerElement(listeProduits);
  }

  //fonction appelée au click sur le changement de quantité (action = modifier), et au click de supprimer (action = supprimer)
  //Ecouteur onClick ajouté dans ListePanierVue au moment de créer les éléments html du panier.
  modiferSupprimerElementPanier(event, action) {
    //permet de trouver l'element concerné par le click
    const articleTag = event.target.closest('article');
    let model = new Model();
    //appel de la fonction qui modifiera ou supprimera le produit du panier selon l'action (modifier ou supprimer).
    //envoi id, couleur, quantité (pour modifier), action = modifier ou supprimer
    model.modifierSupprimerPanier(articleTag.dataset.id, articleTag.dataset.color, event.target.value, action);
    //réafficher la page panier en tenant compte des modifications.
    this.afficherListePanier();
  }

  ecouterFormulaire() {
    //recupere l'element bouton commander
    const elt = document.getElementById('order');
    //sur le click du bouton commander faire :
    elt.addEventListener('click', async (event) => {
      //ne pas exécuter le comportement par défaut de l'element 'submit"
      event.preventDefault();
      //declaration des variables
      let controleFormulaire = new ListePanierVue();
      // declaration des masques pour controler les champs de saisie avec regexp
      let masqueTexte = /[Ü-üa-zA-Z\- \']{2,}/g;
      let masqueAdresse = /[Ü-üa-zA-Z0-9\- \'\,.-]{2,}/g;
      let masqueEmail = /[a-zA-Z0-9._]+@[a-zA-Z0-9-]+\.[a-z]+/g;
      //variables par défaut à true Si tout est vrai le formulaire pourra être envoyé
      let envoyerFormulaire = true, controlePrenom = true, controleNom = true, controleAdresse = true, controleVille = true, controleEmail = true;
      let resultat, idErreur, message;
      //recupere les valeurs des champs de saisie. retourne un tableau (0:valeur, 1:vrai ou faux)
      let prenom = Utils.recupererValeur("firstName", "input");
      let nom = Utils.recupererValeur("lastName", "input");
      let adresse = Utils.recupererValeur("address", "input");
      let ville = Utils.recupererValeur("city", "input");
      let email = Utils.recupererValeur("email", "input");

      //crée un objet contact aves les valeurs du formulaire
      // .firstName
      // .lastName
      // .address 
      // .city
      // .email 
      let contact = new Contact(prenom[0], nom[0], adresse[0], ville[0], email[0]);
      //parcourir l'objet contact
      for (const i in contact) {
        //variable avec l'id de la balise p pour afficher le message d'erreur exemple <p id="firstNameErrorMsg">
        idErreur = i + "ErrorMsg";
        //si le champ est vide
        if (contact[i] == "") {
          let message = "Champ obligatoire !";
          //idErreur : element html où afficher le message
          //message : message d'erreur à afficher
          //resultat : valeur retourné par le masque
          //input : valeur dans le champ saisi
          //retourne faux à envoyerFormulaire 
          envoyerFormulaire = controleFormulaire.afficherErreur(idErreur, message, "null", "");
        } else {
          switch (i) {
            case 'firstName':
              resultat = Utils.controlerInputText(masqueTexte, contact.firstName);
              message = "Les caractères spéciaux ne peuvent être utilisés";
              //retourne vrai à controlePrenom si champ valide par rapport au masque de saisie
              //retourne faux et affiche le message d'erreur si champ invalide par rapport au masque de saisie
              controlePrenom = controleFormulaire.afficherErreur(idErreur, message, resultat, contact.firstName);
              break;
            case 'lastName':
              resultat = Utils.controlerInputText(masqueTexte, contact.lastName);
              message = "Les caractères spéciaux ne peuvent être utilisés";
              controleNom = controleFormulaire.afficherErreur(idErreur, message, resultat, contact.lastName);
              break;
            case 'address':
              resultat = Utils.controlerInputText(masqueAdresse, contact.address);
              message = "Les caractères spéciaux ne peuvent être utilisés";
              controleAdresse = controleFormulaire.afficherErreur(idErreur, message, resultat, contact.address);
              break;
            case 'city':
              resultat = Utils.controlerInputText(masqueTexte, contact.city);
              message = "Les caractères spéciaux ne peuvent être utilisés";
              controleVille = controleFormulaire.afficherErreur(idErreur, message, resultat, contact.city);
              break;
            case 'email':
              resultat = Utils.controlerInputText(masqueEmail, contact.email);
              message = "Indiquez un email valide";
              controleEmail = controleFormulaire.afficherErreur(idErreur, message, resultat, contact.email);
              break;
          }
        }
      }

      //recuperer le panier pour préparer le tableau de idProduit (products) à envoyer pour l'API
      let model = new Model();
      let listePanier = model.recupererPanier();
      //controler si panier n'est pas vide
      if (listePanier.length > 0) {
        //si controle du formulaire est ok envoyer les informations pour valider la commmande
        if (envoyerFormulaire & controlePrenom & controleNom & controleAdresse & controleVille & controleEmail) {
          //declaration du tableau products à vide
          let products = [];
          //parcourir le panier pour recuperér l'idProduit de chaque ligne du panier et remplir le tableau products
          listePanier.forEach(element => {
            products.push(element[0]);
          });
          //envoyer les données à l'API : object contact + tableau products avec la liste des idProduits
          //recupere le retour de l'API : objet contact, tableau products + orderId
          let numeroCommande = await model.envoyerPanier(contact, products);
          //recuepre l'orderId (numero de commande)
          numeroCommande = numeroCommande.orderId;
          //commande validée on vide donc le panier
          await model.viderPanier();
          //ouvre la page confirmation.html avec le numero de commande
          document.location.href = "confirmation.html?commande=" + numeroCommande;
        }
      } else {
        //si panier vide
        alert("Votre panier est vide !")
      }
    })
  }


  afficherConfirmation() {
    //recuperer le numero de commande dans l-url
    let confirmation = Utils.getParameterByName("commande");
    //afficher le numero de commande 
    let confirmationVue = new ConfirmationVue();
    confirmationVue.afficherConfirmation(confirmation);
  }
}



