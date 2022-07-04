//Créer les éléments html en parcourant les produits
//Array listeProduits : {colors : Array ["blue","white","red"]
    //                   _id
    //                   name
    //                   price
    //                   description
    //                   imageUrl
    //                   altTxt}
class ListeProduitsVue {
    creerElement(listeProduits) {
        for (const i in listeProduits) {
            let html = `<a href="./product.html?id=${listeProduits[i]._id}">
                            <article>
                                <img src="${listeProduits[i].imageUrl}" alt="${listeProduits[i].altTxt}">
                                <h3 class="productName">${listeProduits[i].name}</h3>
                                <p class="productDescription">${listeProduits[i].description}</p>
                            </article>
                        </a>`;
            let elt = document.getElementById("items");
            elt.innerHTML += html;
        }
    }
}
