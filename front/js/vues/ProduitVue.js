//Créer les éléments html en parcourant les produits
class ProduitVue {

    afficherProduit(produit) {

        const newImg = document.createElement("img");
        let elt = document.getElementsByClassName("item__img");
        elt[0].appendChild(newImg);


        //selectionner la section items
        let imageProduit = document.querySelector("div.item__img > img");
        //renseigner la source et le alt de l'image du produit
        imageProduit.setAttribute("src", produit.imageUrl);
        imageProduit.setAttribute("alt", produit.altTxt);

        let nomProduit = document.querySelector("#title");
        nomProduit.innerText = produit.name;

        let prixProduit = document.querySelector("#price");
        prixProduit.innerText = produit.price;

        let descriptionProduit = document.querySelector("#description");
        descriptionProduit.innerText = produit.description;

        produit.colors.forEach(element => {

            let couleursProduit = document.querySelector("#colors");
            const newOption = document.createElement("option");
            newOption.setAttribute("value", element);
            newOption.innerText = element;
            couleursProduit.appendChild(newOption);


        });

    }
}
