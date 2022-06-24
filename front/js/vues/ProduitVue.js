//Créer les éléments html en parcourant les produits
class ProduitVue {
    afficherProduit(produit) {
        let html = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
        let elt = document.getElementsByClassName("item__img");
        elt[0].innerHTML = html;
      
        let nomProduit = document.querySelector("#title");
        nomProduit.innerText = produit.name;

        let prixProduit = document.querySelector("#price");
        prixProduit.innerText = produit.price;

        let descriptionProduit = document.querySelector("#description");
        descriptionProduit.innerText = produit.description;

        produit.colors.forEach(element => {
            let html = `<option value="${element}">${element}</option>`;
            let couleursProduit = document.querySelector("#colors");
            couleursProduit.innerHTML += html;
        });
    }
}
