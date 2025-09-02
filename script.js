const form = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// Render contacts on screen
function renderContacts() {
  contactList.innerHTML = "";
  contacts.forEach((c, index) => {
    const card = document.createElement("div");
    card.className = "contact-card";
    card.innerHTML = `
      <div class="contact-info">
        <strong>${c.name}</strong><br>
        📞 ${c.phone}<br>
        ✉️ ${c.email}
      </div>
      <div class="actions">
        <button onclick="editContact(${index})">✏️ Edit</button>
        <button onclick="deleteContact(${index})">🗑️ Delete</button>
      </div>
    `;
    contactList.appendChild(card);
  });
}

// Save contacts to localStorage
function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Handle form submission
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const editIndex = document.getElementById("editIndex").value;

  if (editIndex) {
    contacts[editIndex] = { name, phone, email };
    document.getElementById("editIndex").value = "";
  } else {
    contacts.push({ name, phone, email });
  }

  saveContacts();
  renderContacts();
  form.reset();
});

// Edit contact
window.editContact = function(index) {
  const c = contacts[index];
  document.getElementById("name").value = c.name;
  document.getElementById("phone").value = c.phone;
  document.getElementById("email").value = c.email;
  document.getElementById("editIndex").value = index;
};

// Delete contact
window.deleteContact = function(index) {
  if (confirm("Are you sure you want to delete this contact?")) {
    contacts.splice(index, 1);
    saveContacts();
    renderContacts();
  }
};

// Initial render
renderContacts();
