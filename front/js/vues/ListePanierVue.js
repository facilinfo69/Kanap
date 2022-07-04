//Créer les éléments html en parcourant le localStorage panier
class ListePanierVue {
  creerElement(listeProduits) {
    var totalLigne = 0;
    var totauxPrix = 0;
    var totauxQuantite = 0;
    let elt = document.getElementById("cart__items");
    elt.innerHTML = "";
    for (const produit of listeProduits) {

      let html = `<article class="cart__item" data-id="${produit._id}" data-color="${produit.color}">
                <div class="cart__item__img">
                  <img src="${produit.imageUrl}" alt="${produit.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${produit.name}</h2>
                    <p>${produit.color}</p>
                    <p>${produit.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" onChange="controller.modiferSupprimerElementPanier(event,'modifier')" name="itemQuantity" min="1" max="100" value="${produit.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" onClick="controller.modiferSupprimerElementPanier(event,'supprimer')">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
            `;

      elt.innerHTML += html;
      //calcul le prix total par ligne de produit : quantité*prix unitaire
      totalLigne = parseInt(produit.quantity * produit.price);
      //total général du panier
      totauxPrix += totalLigne;
      //total de la quantité des produits
      totauxQuantite += parseInt(produit.quantity);
    }
    //selectionne la balise html à modifier
    let eltQuantite = document.getElementById("totalQuantity");
    //affiche le nombre d'article dans le panier
    eltQuantite.innerHTML = totauxQuantite;
    //selectionne la balise html à modifier
    let eltPrix = document.getElementById("totalPrice");
    //affiche le total général de la commande
    eltPrix.innerHTML = totauxPrix;
  }

  //idErreur : element html où afficher le message
  //message : message d'erreur à afficher
  //resultat : valeur retourné par le masque
  //input : valeur dans le champ saisi
  afficherErreur(idErreur, message, resultat, input) {
    //si champ saisi correspond au masque
    if (resultat == input) {
      //aucun message d'erreur à afficher
      message = "";
      //selectionne la balise html à modifier
      const elt = document.getElementById(idErreur);
      elt.innerHTML = message;
      //true : aucune erreur sur le champ controlé
      return true;
    } else {
      //selectionne la balise html à modifier
      const elt = document.getElementById(idErreur);
      //affiche le message d'erreur
      elt.innerHTML = message;
      //false : erreur sur le champ controlé
      return false;
    }
  }
}