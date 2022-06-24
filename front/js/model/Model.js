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
                return (value);
            })
            .catch(function (err) {
                // Une erreur est survenue
            });
    }

    recupererUnProduit(idProduit) {
        return fetch(`http://localhost:3000/api/products/${idProduit}`)
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function (value) {
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


    recupererPanier() {
        let panierLocal = localStorage.getItem("obj");
        let panier = JSON.parse(panierLocal);
        return panier;
    }

    enregistrerPanier(panier) {
        //ajoute le tableau panier dans le localStorage
        let objLinea = JSON.stringify(panier);
        localStorage.setItem("obj", objLinea);
    }


    async recupererDetailsPanier(panier) {
        let listeProduits = [];

        for (const item of panier) {
            let produit = await this.recupererUnProduit(item[0]);
            produit.color = item[1];
            produit.quantity = item[2];
            listeProduits.push(produit);
        }
        return listeProduits;
    }


    modifierSupprimerPanier(id, color, qt, action) {
        let panier = this.recupererPanier();
        let i = 0;
        while (i < panier.length) {
            let item = panier[i];
            if (item[0] == id && item[1] == color) {
                switch (action) {
                    case 'modifier':
                        if (qt > 0) {
                            panier[i][2] = qt;
                        } else {
                            panier.splice(i, 1);
                        };
                        break;
                    case 'supprimer':
                        panier.splice(i, 1);
                        break;
                }
                this.enregistrerPanier(panier);
                break;
            }
            i++;
        }
    }

    viderPanier() {
        let panier = this.recupererPanier();
        panier.length = 0;
        this.enregistrerPanier(panier);
    }
}
