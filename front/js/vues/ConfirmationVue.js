//Afficher le numero de commande sur la page confirmation
class ConfirmationVue {
    afficherConfirmation(order) {
        let elt = document.getElementById("orderId");
        elt.innerHTML = order;
    }
}
