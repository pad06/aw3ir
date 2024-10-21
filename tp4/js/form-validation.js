// Gestionnaire d'envoi du formulaire
document.getElementById("contactForm").onsubmit = function (event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    // Appel de la fonction addContact
    addContact();
};

// Fonction pour valider et ajouter un contact
function addContact() {
    const name = document.getElementById("name").value.trim();
    const firstname = document.getElementById("firstname").value.trim();
    const birthdate = document.getElementById("birthdate").value;
    const address = document.getElementById("address").value.trim();
    const mail = document.getElementById("mail").value.trim();

    // Vérification de la validité du formulaire
    if (name.length < 5 || firstname.length < 5 || !isValidDate(birthdate) || address.length < 5 || !isValidEmail(mail)) {
        // Affichage du modal d'erreur
        const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
        return;
    }

    // Ajouter le contact
    contactStore.add(name, firstname, birthdate, address, mail);

    // Afficher le contact dans la liste
    displayContactList();

    // Afficher le modal de confirmation
    document.getElementById("modalContent").textContent = `${name} ${firstname}, né(e) le ${birthdate}, adresse: ${address}, email: ${mail}`;
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();

    // Réinitialiser le formulaire
    document.getElementById("contactForm").reset();
    calcNbChar('name');
    calcNbChar('firstname');
    calcNbChar('birthdate');

}

// Validation de la date
function isValidDate(date) {
    const today = new Date();
    const dob = new Date(date);
    return dob <= today; // La date ne peut pas être dans le futur
}

// Validation de l'email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Afficher le nombre de caractères saisis
function calcNbChar(id) {
    document.querySelector(`#${id} + span`).textContent = document.querySelector(`#${id}`).value.length;
}

// Afficher la liste des contacts
function displayContactList() {
    const contactListString = localStorage.getItem('contactList');
    const contactList = contactListString ? JSON.parse(contactListString) : [];
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = ""; // Réinitialise le corps du tableau

    for (const contact of contactList) {
        tbody.innerHTML += `
            <tr>
                <td>${contact.name}</td>
                <td>${contact.firstname}</td>
                <td>${contact.date}</td>
                <td>${contact.address}</td>
                <td>${contact.mail}</td>
                <td><button class="btn btn-danger" onclick="removeContact('${contact.mail}')">Supprimer</button></td>
            </tr>`;
    }
}

// Fonction pour supprimer un contact
function removeContact(email) {
    let contactList = contactStore.getList();
    contactList = contactList.filter(contact => contact.mail !== email);
    localStorage.setItem("contactList", JSON.stringify(contactList));
    displayContactList(); // Met à jour la liste
}

// Charger la liste des contacts à l'ouverture de la page
window.onload = function () {
    displayContactList();
};

// Fonction pour réinitialiser la liste des contacts
function resetContacts() {
    contactStore.reset(); // Réinitialise les contacts
    alert("Tous les contacts ont été supprimés !"); // Alerte de confirmation
    displayContactList(); // Met à jour l'affichage
}
