class Controller {
  //permet de recupérer le fichier json des produits par l'intermédiaire de l'API
  async afficherListeProduits() {

    let model = new Model();
    let listeProduits = await model.recupererProduits();
    
    let listeProduitsVue = new ListeProduitsVue();
    listeProduitsVue.creerElement(listeProduits);
  }

  //permet de recupérer un produit avec son id
  async afficherUnProduit() {
    

    let model = new Model();
    let idProduit = await model.getParameterByName("id");
    let produit = await model.recupererUnProduit(idProduit);
    
    let produitVue = new ProduitVue();
    produitVue.afficherProduit(produit);
  }
}


