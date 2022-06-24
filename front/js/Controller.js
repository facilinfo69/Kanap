class Controller {
  //page index.html
  //permet de recupérer le fichier json des produits par l'intermédiaire de l'API
  async afficherListeProduits() {
    let model = new Model();
    let listeProduits = await model.recupererProduits();

    let listeProduitsVue = new ListeProduitsVue();
    listeProduitsVue.creerElement(listeProduits);
  }

  //page product.html
  //permet de recupérer un produit avec son id
  async afficherUnProduit() {
    let model = new Model();
    let idProduit = Utils.getParameterByName("id");
    let produit = await model.recupererUnProduit(idProduit);

    let produitVue = new ProduitVue();
    produitVue.afficherProduit(produit);

    this.ecouterPanier();
  }

  ecouterPanier() {
    const elt = document.getElementById('addToCart');
    let model = new Model();
    //let panier = new Array();
    //recupere les données du localStorage dans un tableau panier
    let panier = model.recupererPanier();

    console.log(panier);
    if (panier == null) {
      panier = new Array();
      console.log(panier);
    }

    elt.addEventListener('click', () => {
      console.log(this);
      let couleur = Utils.recupererValeur("colors", "option");
      let idProduit = Utils.getParameterByName("id");
      let quantite = Utils.recupererValeur("quantity", "input");

      if (!couleur[1] || !quantite[1]) {
        alert("manque une donnée");
      } else {
        console.log("enregistrer");
        if (!Utils.verifierPresenceProduit(panier, idProduit, couleur[0], quantite[0])) {
          //ajoute une ligne dans le panier (dans le tableau)
          panier.push([idProduit, couleur[0], quantite[0]]);
        }


        //ajoute le tableau panier dans le localStorage
        // let objLinea = JSON.stringify(panier);
        // localStorage.setItem("obj", objLinea);
        model.enregistrerPanier(panier);
      };
    }
    )
  }

  //page cart.html (panier)
  //permet de recupérer la liste du panier localStorage
  async afficherListePanier() {
    let model = new Model();
    let listePanier = model.recupererPanier();
    let listeProduits = await model.recupererDetailsPanier(listePanier);
    // console.log(listeProduits);
    let panierVue = new ListePanierVue();
    panierVue.creerElement(listeProduits);
  }

  modiferSupprimerElementPanier(event, action) {
    const articleTag = event.target.closest('article');
    let model = new Model();
    model.modifierSupprimerPanier(articleTag.dataset.id, articleTag.dataset.color, event.target.value, action);
    this.afficherListePanier();
  }

   ecouterFormulaire() {
    const elt = document.getElementById('order');

    elt.addEventListener('click', async (event) => {
      event.preventDefault();
      console.log("controller formulaire");
      let controleFormulaire = new ListePanierVue();
      let masqueTexte = /[Ü-üa-zA-Z\- \']{2,}/g;
      let masqueAdresse = /[Ü-üa-zA-Z0-9\- \'\,.-]{2,}/g;
      let masqueEmail = /[a-zA-Z0-9._]*@[a-zA-Z0-9-]*\.[a-z]*/g;
      let envoyerFormulaire = true, controlePrenom = true, controleNom = true, controleAdresse = true, controleVille = true, controleEmail = true;
      let resultat, idErreur, message;
      let prenom = Utils.recupererValeur("firstName", "input");
      let nom = Utils.recupererValeur("lastName", "input");
      let adresse = Utils.recupererValeur("address", "input");
      let ville = Utils.recupererValeur("city", "input");
      let email = Utils.recupererValeur("email", "input");

      let contact = new Contact(prenom, nom, adresse, ville, email);
      for (const i in contact) {
        console.log(contact[i]);
        idErreur = i + "ErrorMsg";
        if (!contact[i][1]) {
          console.log("manque donnée", i);
          let message = "Champ obligatoire !";
          envoyerFormulaire = controleFormulaire.afficherErreur(idErreur, message, contact[i][1], "test");
        } else {
          switch (i) {
            case 'firstName':
              resultat = Utils.controlerInputText(masqueTexte, prenom[0]);
              message = "erreur prenom vue";
              controlePrenom = controleFormulaire.afficherErreur(idErreur, message, resultat, prenom[0]);
              break;
            case 'lastName':
              resultat = Utils.controlerInputText(masqueTexte, nom[0]);
              message = "erreur nom vue";
              controleNom = controleFormulaire.afficherErreur(idErreur, message, resultat, nom[0]);
              break;
            case 'address':
              resultat = Utils.controlerInputText(masqueAdresse, adresse[0]);
              message = "erreur adresse vue";
              controleAdresse = controleFormulaire.afficherErreur(idErreur, message, resultat, adresse[0]);
              break;
            case 'city':
              resultat = Utils.controlerInputText(masqueTexte, ville[0]);
              message = "erreur ville vue";
              controleVille = controleFormulaire.afficherErreur(idErreur, message, resultat, ville[0]);
              break;
            case 'email':
              resultat = Utils.controlerInputText(masqueEmail, email[0]);
              message = "erreur email vue";
              controleEmail = controleFormulaire.afficherErreur(idErreur, message, resultat, email[0]);
              break;
          }
        }
      }
      if (envoyerFormulaire & controlePrenom & controleNom & controleAdresse & controleVille & controleEmail) {
        console.log("ok form");
        contact.firstName = prenom[0];
        contact.lastName = nom[0];
        contact.address = adresse[0];
        contact.city = adresse[0];
        contact.email = email[0];

        let model = new Model();
        let listePanier = model.recupererPanier();
        let products = [];
        listePanier.forEach(element => {
          products.push(element[0]);
        });
        console.log(listePanier);
        console.log(products);
        let numeroCommande = await model.envoyerPanier(contact,products);
        numeroCommande = numeroCommande.orderId;
        console.log(numeroCommande);
        await model.viderPanier();
        document.location.href = "confirmation.html?id=" + numeroCommande;
        // window.open(`./confirmation.html?id=${numeroCommande}`);
      } else {
        console.log("pas ok forumak");
      }
      console.log(envoyerFormulaire);
      console.log(contact);
    }

    )

  }


  afficherConfirmation() {
    let confirmation = Utils.getParameterByName("id");
    console.log("yes ",confirmation); 
    let confirmationVue = new ConfirmationVue();
    confirmationVue.afficherConfirmation(confirmation);
   }
}



