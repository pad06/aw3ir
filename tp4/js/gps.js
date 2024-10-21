// demande de la localisation à l'utilisateur
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.querySelector("#map").innerHTML =
            "La géolocalisation n'est pas supportée par ce navigateur.";
    }
}

// Si l'utilisateur l'autorise, on récupère les coordonnées dans l'objet "position"
function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Afficher les coordonnées dans le champ d'adresse
    document.getElementById("address").value = `Lat: ${latitude}, Lon: ${longitude}`;

    var img_url = `https://maps.googleapis.com/maps/api/staticmap?markers=${latitude},${longitude}&zoom=14&size=400x300&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`;
    document.querySelector("#map").innerHTML = `<img src='${img_url}'>`;
}

// Au cas où l'utilisateur refuse ou si une erreur arrive
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.querySelector("#map").innerHTML =
                "L'utilisateur a refusé la demande de géolocalisation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.querySelector("#map").innerHTML =
                "Les informations de localisation ne sont pas disponibles.";
            break;
        case error.TIMEOUT:
            document.querySelector("#map").innerHTML =
                "Le temps de demande de localisation a expiré.";
            break;
        case error.UNKNOWN_ERROR:
            document.querySelector("#map").innerHTML = "Une erreur inconnue est survenue.";
            break;
    }
}
