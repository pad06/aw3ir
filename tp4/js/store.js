var contactStore = (function () {
    let contactList = JSON.parse(localStorage.getItem("contactList")) || [];

    return {
        add: function (name, firstname, birthdate, address, mail) {
            const contact = { name, firstname, birthdate, address, mail };
            contactList.push(contact);
            localStorage.setItem("contactList", JSON.stringify(contactList));
        },
        getList: function () {
            return contactList;
        },
        reset: function () {
            contactList = [];
            localStorage.setItem("contactList", JSON.stringify(contactList));
        }
    };
})();

function displayContactList() {
    const contactList = contactStore.getList();
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";

    contactList.forEach(contact => {
        tbody.innerHTML += `
            <tr>
                <td>${contact.name}</td>
                <td>${contact.firstname}</td>
                <td>${contact.birthdate}</td>
                <td>${contact.address}</td>
                <td>${contact.mail}</td>
            </tr>`;
    });

    // Mettre à jour le compteur de contacts
    document.getElementById("contact-count").textContent = contactList.length;
}

function addContact() {
    const name = document.getElementById("name").value.trim();
    const firstname = document.getElementById("firstname").value.trim();
    const birthdate = document.getElementById("birthdate").value;
    const address = document.getElementById("address").value.trim();
    const mail = document.getElementById("mail").value.trim();

    if (name.length < 5 || firstname.length < 5 || address.length < 5 || !isValidEmail(mail)) {
        const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
        return;
    }

    contactStore.add(name, firstname, birthdate, address, mail);
    displayContactList();
}

function resetContacts() {
    contactStore.reset();
    displayContactList();
}

function isValidEmail(email) {
    // Validation simple de l'email
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

document.addEventListener("DOMContentLoaded", function () {
    displayContactList(); // Afficher la liste des contacts dès le chargement de la page
});
