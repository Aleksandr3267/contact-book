let contactsBlock = document.querySelector('.contacts-block');
let contactsList = document.querySelector('.contacts-list');
let localStoreContact = JSON.parse(localStorage.getItem("contactsStor"));
let contactsStor = [];
async function getUsers() {
    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    let data = await response.json();
    let users = data;
    function createContact(a) {
        for (let user of a) {
            let li = document.createElement('li');
            li.classList.add('list-contact');
            let textContact = document.createElement('p');
            textContact.classList.add('text-contact');
            let butEdit = document.createElement('button');
            butEdit.classList.add('but-contact');
            textContact.textContent = user.name;
            butEdit.textContent = 'Редактировать';
            li.appendChild(textContact);
            li.appendChild(butEdit);
            contactsList.appendChild(li);
            contactsStor.push(user);
        }
    }
    if (localStoreContact === null) {
        createContact(users)
    } else {
        createContact(localStoreContact)
    }
    localStorage.setItem("contactsStor", JSON.stringify(contactsStor));
    /* ---------------------------------- edit ---------------------------------- */
    let edit = document.querySelectorAll('.but-contact');
    let text = document.querySelectorAll('.text-contact');
    for (let i = 0; i < edit.length; i++) {
        let editMode = false;
        edit[i].addEventListener('click', function () {
            if (editMode) {
                this.textContent = "Редактировать";
                text[i].removeAttribute('contentEditable');
                listCont[i].classList.remove('edit');
            } else {
                this.textContent = "Применить";
                text[i].setAttribute('contentEditable', true);
                text[i].focus();
                listCont[i].classList.add('edit');
            }
            editMode = !editMode;
            contactsStor[i].name = text[i].textContent;
            localStorage.setItem("contactsStor", JSON.stringify(contactsStor));
        });
    }
    /* --------------------------------- search --------------------------------- */
    let listCont = document.querySelectorAll('.list-contact');
    let input = document.querySelector('.search');
    function search(a, b) {
        var value = b.value.toLowerCase();
        for (var i = 0; i < a.length; i++) {
            var name = a[i].textContent.toLowerCase();
            if (name.includes(value)) {
                a[i].style.display = "";
            } else {
                a[i].style.display = "none";
            }
        }
    }
    input.addEventListener("input", function () {
        search(listCont, input);
    });
    /* ---------------------------------- sort ---------------------------------- */
    var select = document.getElementById("contact-select-sort");
    select.addEventListener("change", function () {
        var value = select.value;
        sortContacts(value);
    });
    function sortContacts(value) {
        var contacts = [...document.querySelectorAll(".list-contact")];
        contacts.sort(function (a, b) {
            if (value === "asc") {
                return a.textContent.localeCompare(b.textContent);
            } else if (value === "desc") {
                return b.textContent.localeCompare(a.textContent);
            }
        });
        contacts.forEach(function (contact, index) {
            contact.style.order = index;
        });
    }
}
getUsers();





