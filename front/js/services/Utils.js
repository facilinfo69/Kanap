class Utils {
    static getParameterByName(name) {
        let params = (new URL(document.location)).searchParams;
        let results = params.get(name);
        if (results == null)
            return;
        else
            return results;
    }

    static recupererValeur(id, type) {
        let elt = document.getElementById(id);
        let data = ["", false];
        switch (type) {
            case 'option':
                if (elt.options[elt.selectedIndex].value == "") {
                    data = [elt.options[elt.selectedIndex].value, false];
                    return data;
                } else {
                    data = [elt.options[elt.selectedIndex].value, true]
                    return data;
                };
                break;
            case 'input':
                if (elt.value == 0) {
                    data = [elt.value, false];
                    return data;
                } else {
                    data = [elt.value, true];
                    return data;
                }
                break;
        }
    }

    static verifierPresenceProduit(panier, idProduit, couleur, quantite) {
        let i = 0;
        let verifier = false;
        while (i < panier.length && !verifier) {
            console.log(panier[i][0]);
            console.log(panier[i][1]);
            if (idProduit == panier[i][0] && couleur == panier[i][1]) {
                let calcul = parseInt(panier[i][2]);
                calcul += parseInt(quantite);
                panier[i][2] = calcul;
                verifier = true;
                return true;
            } else {
                i++;
            }
        };
    }

    static controlerInputText(masque,texteAControler) {
        console.log(masque, texteAControler);
        return texteAControler.match(masque);
    }
}


