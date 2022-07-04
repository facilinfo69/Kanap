class Model {
    //permet de recupérer le fichier json des produits par l'intermédiaire de l'API
    recupererProduits() {
        return fetch("http://localhost:3000/api/products")
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function (value) {
                //retourne le tableau des produits
                return (value);
            })
            .catch(function (err) {
                // Une erreur est survenue
            });
    }

    //permet de recupérer le fichier json du produit selectionné l'intermédiaire de l'API
    recupererUnProduit(idProduit) {
        return fetch(`http://localhost:3000/api/products/${idProduit}`)
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function (value) {
                // retourne un objet produit avec ses données.
                return (value);
            })
            .catch(function (err) {
                // Une erreur est survenue
            });
    }

    envoyerPanier(contact, products) {
        return fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contact, products })
        })
        .then(function(res) {
            if (res.ok) {
              return res.json();
            }
          })
          .then(function(value) {
              return (value);
          });
    }

    //converti le fichier json "panier" en objet "panier"
    recupererPanier() {
        //recupere les données du panier dans le localStorage
        let panierLocal = localStorage.getItem("panier");
        //crée le tableau panier
        let panier = JSON.parse(panierLocal);
        return panier;
    }

    //converti l'objet' "panier" en fichier json "panier"
    enregistrerPanier(panier) {
        //ajoute le tableau panier dans le localStorage
        let objLinea = JSON.stringify(panier);
        localStorage.setItem("panier", objLinea);
    }


    async recupererDetailsPanier(panier) {
        let listeProduits = [];
        //parcours du panier pour récupérer le détail de chaque produit
        for (const item of panier) {
            //item tableau de 3 valeurs 0:id, 1:couleur, 2:quantité
            //recuperer les données du produit(name, description, price...) en envoyant en valeur l'id du produit
            let produit = await this.recupererUnProduit(item[0]);
            //ajoute la couleur selectionnée dans produit pour le produit du panier
            produit.color = item[1];
            //ajoute la quantité selectionnée dans produit pour le produit du panier
            produit.quantity = item[2];
            //ajout du produit complet avec toutes les données pour l'affichage du panier
            listeProduits.push(produit);
        }
        return listeProduits;
    }

    //modifie ou supprime le produit du panier selectionné selon le parametre action
    modifierSupprimerPanier(id, color, qt, action) {
        //recuperer le panier du localStorage pour le modifier
        let panier = this.recupererPanier();
        let i = 0;
        //Parcours du panier (0:id,1:couleur,2:quantité)
        while (i < panier.length) {
            let item = panier[i];
            //si id et couleur matche avec le produit du panier, soit on modifie soit on supprime selon l'action.
            if (item[0] == id && item[1] == color) {
                switch (action) {
                    case 'modifier':
                        //controle que la quantité est une valeur positive
                        if (qt > 0) {
                            //modifier la quantité aves la quantité saisie
                            panier[i][2] = qt;
                            alert("La quantité a été modifiée !")
                        } else {
                            //message d'erreur 
                            alert("La quantité est mal renseignée !")
                        };
                        break;
                    case 'supprimer':
                        //supprime du panier le produit
                        panier.splice(i, 1);
                        alert("Le produit est supprimé du panier !")
                        break;
                }
                //enregistre le panier modifié dans le localStorage
                this.enregistrerPanier(panier);
                break;
            }
            i++;
        }
    }

    //vide le panier du localStorage
    viderPanier() {
        let panier = this.recupererPanier();
        panier.length = 0;
        this.enregistrerPanier(panier);
    }
}
