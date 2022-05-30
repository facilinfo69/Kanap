//Créer les éléments html en parcourant les produits
class ListeProduitsVue {
    creerElement(value) {
        for (const i in value) {
            //créer les éléments
            const newA = document.createElement("a");
            const newArticle = document.createElement("article");
            const newImg = document.createElement("img");
            const newH3 = document.createElement("h3");
            const newP = document.createElement("p");
            //rattacher les éléments aux parents
            let elt = document.getElementById("items");
            elt.appendChild(newA);
            newA.appendChild(newArticle);
            newArticle.appendChild(newImg);
            newArticle.appendChild(newH3);
            newArticle.appendChild(newP);
        }
        //Remplir les éléments créés avec les données des produits
        this.remplirElement(value);
    }

    //Remplir les éléments créés avec les données des produits
    remplirElement(value) {
        for (const i in value) {
            //selectionner la section items
            let noeudItems = document.querySelector("#items");
            //récuperer les éléments par type
            let listeA = noeudItems.querySelectorAll("a");
            let listeImg = noeudItems.querySelectorAll("img");
            let listeH3 = noeudItems.querySelectorAll("h3");
            let listeP = noeudItems.querySelectorAll("p");

            //renseigner le lien du produit avec son id
            let lienId = "./product.html?id=" + value[i]._id;
            listeA[i].setAttribute("href", lienId);
            //renseigner la source et le alt de l'image du produit
            listeImg[i].setAttribute("src", value[i].imageUrl);
            listeImg[i].setAttribute("alt", value[i].altTxt);
            //renseigner le nom du produit
            listeH3[i].setAttribute("class", "productName");
            listeH3[i].innerText = value[i].name;
            //renseigner la description du produit
            listeP[i].setAttribute("class", "productDescription");
            listeP[i].innerText = value[i].description;
        }
    }
}
