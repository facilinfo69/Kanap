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

      totalLigne = parseInt(produit.quantity * produit.price);
      totauxPrix += totalLigne;
      totauxQuantite += parseInt(produit.quantity);
    }

    let eltQuantite = document.getElementById("totalQuantity");
    eltQuantite.innerHTML = totauxQuantite;
    let eltPrix = document.getElementById("totalPrice");
    eltPrix.innerHTML = totauxPrix;
  }

  afficherErreur(idErreur, message, resultat, input) {
    console.log(resultat, input);
    if (resultat == input) {
      message = "";
      const elt = document.getElementById(idErreur);
      elt.innerHTML = message;
      return true;
    } else {
      const elt = document.getElementById(idErreur);
      elt.innerHTML = message;
      return false;
    }
  }
}