window.onload = function () {
  console.log("DOM ready!");

  document.querySelector("form").addEventListener("submit", function (event) {
      event.preventDefault();
      const form = event.target;

      // Récupération des valeurs des champs
      const nom = document.getElementById("nom").value;
      const prenom = document.getElementById("prenom").value;
      const dateNaissance = document.getElementById("dateNaissance").value;
      const adresse = document.getElementById("adresse").value;
      const email = document.getElementById("email").value;

      let isValid = true;
      let errorMessages = [];

      // Validation des champs texte
      if (nom.length < 5) {
          isValid = false;
          errorMessages.push("Le nom doit contenir au moins 5 caractères.");
      }

      if (prenom.length < 5) {
          isValid = false;
          errorMessages.push("Le prénom doit contenir au moins 5 caractères.");
      }

      if (adresse.length < 5) {
          isValid = false;
          errorMessages.push("L'adresse doit contenir au moins 5 caractères.");
      }

      // Validation de l'email
      if (!validateEmail(email)) {
          isValid = false;
          errorMessages.push("Veuillez saisir une adresse mail valide.");
      }

      // Validation de la date de naissance
      const birthdayDate = new Date(dateNaissance);
      const nowTimestamp = Date.now();
      if (birthdayDate.getTime() > nowTimestamp) {
          isValid = false;
          errorMessages.push("La date de naissance ne peut pas être dans le futur.");
      }

      // Si les champs ne sont pas valides, afficher la modal d'erreur avec les messages
      if (!isValid) {
          const errorModalBody = document.querySelector("#errorModal .modal-body");
          errorModalBody.innerHTML = errorMessages.join("<br>");
          var errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
          errorModal.show();
      } else {
          // Si tout est valide, afficher la modale de confirmation avec la carte statique
          document.getElementById("modalContent").innerHTML = `
              <p><strong>Nom :</strong> ${nom}</p>
              <p><strong>Prénom :</strong> ${prenom}</p>
              <p><strong>Date de naissance :</strong> ${dateNaissance}</p>
              <p><strong>Adresse :</strong> ${adresse}</p>
              <p><strong>Email :</strong> ${email}</p>
          `;

          const mapImageSrc = `https://maps.googleapis.com/maps/api/staticmap?markers=${encodeURIComponent(adresse)}&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`;
          const mapLink = `http://maps.google.com/maps?q=${encodeURIComponent(adresse)}`;
          document.getElementById("mapImage").src = mapImageSrc;
          document.getElementById("mapLink").href = mapLink;

          // Affichage de la modal de confirmation
          var confirmationModal = new bootstrap.Modal(document.getElementById("confirmationModal"));
          confirmationModal.show();
      }
  });
};

// Fonction de validation d'email
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
