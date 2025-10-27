let cat = 0

document.getElementById("Calculer").addEventListener("click", (e)=> {
    result()
    });

function result(){
    let taille = 0;
    let poids = 0;
    let imc = 0;
    let limiteMaigreur = 18.5;
    let limiteNormal = 25;
    let limiteSurpoids = 30;
    let limiteModéré = 40;
    
    

    taille = parseFloat(document.getElementById('Taille').value.replace(',', '.'));
    if(parseFloat(taille) > parseFloat(5)){
        taille = taille / 100;
    }
    console.log(taille)
    console.log(parseFloat(taille)/100)

    poids = parseInt(document.getElementById('Poids').value);
    imc = Math.round(poids / (taille * taille)*100) / 100;
    console.log(taille , poids , imc);

    if(taille === 0 || poids === 0){
        return
    }

    if (imc < limiteMaigreur){
        document.getElementById('result').textContent = 'Votre imc est de ' + imc + ' vous êtes en situation de maigreur.';
        cat = 1;
        switchSide(cat)
    }else if( imc > limiteMaigreur && imc < limiteNormal){
        document.getElementById('result').textContent = 'Votre imc est de ' + imc + ' vous êtes en bonne santé.';
        cat = 2;
        switchSide(cat)
    }
    else if( imc > limiteNormal && imc < limiteSurpoids){
        document.getElementById('result').textContent = 'Votre imc est de ' + imc + ' vous êtes en surpoids.';
        cat = 3;
        switchSide(cat)
    }
    else if( imc > limiteSurpoids && imc < limiteModéré){
        document.getElementById('result').textContent = 'Votre imc est de ' + imc + ' vous êtes en obésitée modérée.';
        cat = 4;
        switchSide(cat)
    }
    else if( imc > limiteModéré ){
        document.getElementById('result').textContent = 'Votre imc est de ' + imc + ' vous êtes en obésité sévère.';
        cat = 5;
        switchSide(cat)
    }


}
function switchSide(cat){
    
        document.getElementById('TTaille').style.left = '10%';
        document.getElementById('TPoids').style.left = '10%';
        document.getElementById('Poids').style.left = '15%';
        document.getElementById('Taille').style.left = '15%';
        document.getElementById('Calculer').style.left = '15%';
        document.getElementById('result').style.top = '15%';

        if (cat === 1){
                document.getElementById('link').innerHTML = `
        <p><strong>Maigreur (IMC < 18.5)</strong></p>
        <p>Votre IMC indique une maigreur. Cela peut être lié à divers facteurs comme une alimentation insuffisante, un métabolisme rapide ou des problèmes de santé sous-jacents. Il est important de consulter un professionnel de santé pour en identifier la cause et adapter votre alimentation si nécessaire.</p>
        <p><strong>Liens utiles :</strong></p>
        <ul>
            <li><a href="https://www.ameli.fr/assure/cotisations-et-remboursements/remboursements/remboursements-medicaments-et-dispositifs-medicaux/denutrition-chez-adulte" target="_blank">Conseils nutritionnels pour prendre du poids sainement (Ameli.fr)</a></li>
            <li><a href="https://www.mangerbouger.fr/" target="_blank">Alimentation et équilibre (Manger Bouger)</a></li>
        </ul>`;
       }else if (cat === 2){
                document.getElementById('link').innerHTML = `
        <p><strong>Poids normal (18.5 ≤ IMC < 25)</strong></p>
        <p>Félicitations ! Votre IMC se situe dans la plage de poids normal. Pour maintenir cet équilibre, continuez à adopter une alimentation variée et une activité physique régulière. C’est le meilleur moyen de préserver votre santé sur le long terme.</p>
        <p><strong>Liens utiles :</strong></p>
        <ul>
            <li><a href="https://www.anses.fr/fr/content/les-rep%C3%A8res-de-consommation" target="_blank">Recommandations pour une alimentation équilibrée (ANSES)</a></li>
            <li><a href="https://www.santepubliquefrance.fr/" target="_blank">Activité physique : les bienfaits (Santé Publique France)</a></li>
        </ul>`;}
        else if (cat === 3){
                document.getElementById('link').innerHTML = `
        <p><strong>Surpoids (25 ≤ IMC < 30)</strong></p>
        <p>Votre IMC indique un léger surpoids. Cela peut augmenter le risque de certaines maladies (diabète, maladies cardiovasculaires). Pas de panique : de petits changements dans votre alimentation et votre niveau d’activité physique peuvent faire une grande différence. Consultez un professionnel pour un accompagnement personnalisé.</p>
        <p><strong>Liens utiles :</strong></p>
        <ul>
            <li><a href="https://www.who.int/fr/news-room/fact-sheets/detail/obesity-and-overweight" target="_blank">Prévention du surpoids (OMS)</a></li>
            <li><a href="https://www.sante.fr/cfesb/pnns" target="_blank">Programme national nutrition santé (PNNS)</a></li>
        </ul>
    `;
        }else if (cat === 4){
            document.getElementById('link').innerHTML = `
        <p><strong>Surpoids (30 ≤ IMC < 35)</strong></p>
        <p>Votre IMC se situe dans la catégorie d’obésité modérée. Il est important d’agir pour réduire les risques pour votre santé (hypertension, diabète, etc.). Un suivi médical et nutritionnel est fortement recommandé pour vous accompagner vers un poids plus sain.</p>
        <p><strong>Liens utiles :</strong></p>
        <ul>
            <li><a href="https://www.ameli.fr/assure/remboursements/remboursements-medicaments-dispositifs-medicaux/obesite" target="_blank">Comprendre et agir contre l’obésité (Assurance Maladie) </a></li>
            <li><a href="https://www.reseau-roc.fr/" target="_blank">Réseau de prise en charge de l’obésité (ROC) </a></li>
        </ul>
    `;
        }else if (cat === 5){
              document.getElementById('link').innerHTML = `
        <p><strong>Obésité sévère (IMC ≥ 35)</strong></p>
        <p>Votre IMC indique une obésité sévère. Cela peut avoir des conséquences importantes sur votre santé. Il est essentiel de consulter un médecin ou un spécialiste pour mettre en place un plan d’action adapté, incluant un suivi médical, nutritionnel et éventuellement psychologique.
</p>
        <p><strong>Liens utiles :</strong></p>
        <ul>
            <li><a href="https://www.has-sante.fr/" target="_blank">Prise en charge de l’obésité sévère (HAS) </a></li>
            <li><a href="https://www.cnao.fr/" target="_blank">Association de patients (Collectif National des Associations d’Obèses) </a></li>
        </ul>
    `;
        }
}