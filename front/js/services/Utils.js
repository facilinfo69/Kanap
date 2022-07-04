class Utils {
    //recupere le parametre dans l'url
    static getParameterByName(name) {
        let params = (new URL(document.location)).searchParams;
        let results = params.get(name);
        if (results == null)
            return;
        else
            return results;
    }

    //recuperer la valeur de la couleur selectionnée ou la quantité saisie
    //option : recupere la couleur
    //input : recupere la quantité
    static recupererValeur(id, type) {
        //recupere l'element à récupérer
        let elt = document.getElementById(id);
        //declaration du tableau à retourner
        let data = ["", false];
        switch (type) {
            case 'option':
                //si la valeur n'est pas renseignée
                if (elt.options[elt.selectedIndex].value == "") {
                    //retourne le tableau avec la valeur false si la couleur n'est pas renseigné
                    data = [elt.options[elt.selectedIndex].value, false];
                    return data;
                } else {
                    //retourne le tableau avec la valeur de la couleur et valeur à true
                    data = [elt.options[elt.selectedIndex].value, true]
                    return data;
                };
                break;
            case 'input':
                //retourne le tableau avec la valeur false si quantité inférieur ou égale à 0
                if (elt.value <= 0) {
                    data = [elt.value, false];
                    return data;
                } else {
                    //retourne le tableau avec la quantité et la valeur true 
                    data = [elt.value, true];
                    return data;
                }
                break;
        }
    }

    static verifierPresenceProduit(panier, idProduit, couleur) {
        let i = 0;
        let verifier = false;
        let indexPanier = [i,false];
        //parcours du panier tant que l'id et la couleur ne sont pas trouvés.
        while (i < panier.length && !verifier) {
            //si le produit et la couleur sont déjà présents dans le panier renvoyer vrai et l'index du tableau pour modifier la quantité du panier
            if (idProduit == panier[i][0] && couleur == panier[i][1]) {
                verifier = true;
                indexPanier = [i,verifier];
                return indexPanier;
            } else {
                i++;
            }
        };
        //si l'id et la couleur n'ont pas été trouvés, renvoie l'index et false pour ajouter le produit.
        return indexPanier;
    }

    //permet de controler les champs de saisie du formulaire contact avec le masque de saisie
    static controlerInputText(masque,texteAControler) {
        return texteAControler.match(masque);
    }
}


