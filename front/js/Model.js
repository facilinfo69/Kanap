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
        let lien = "http://localhost:3000/api/products/" + idProduit;
        console.log(lien);
        return fetch(lien)
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

    getParameterByName(name) {
        
       let params = (new URL(document.location)).searchParams;
       let results = params.get(name);
        if (results == null)
            return;
        else
            return results;
    }

}
