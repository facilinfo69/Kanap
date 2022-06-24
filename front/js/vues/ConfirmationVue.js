//Créer les éléments html en parcourant les produits
class ConfirmationVue {
    afficherConfirmation(order) {
        let elt = document.getElementById("orderId");
        elt.innerHTML = order;
    }
}
