const loginForm = document.getElementById("loginForm");
const authModal = document.getElementById("authModal");
const authError = document.getElementById("authError");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    const usersDatabase = [
        {
            "username": "developer1234",
            "password": "dev0987"
        }
    ];

    Promise.resolve(usersDatabase)
        .then((users) => {
            const foundUser = users.find(
                (user) =>
                    user.username === usernameInput &&
                    user.password === passwordInput
            );

            if (foundUser) {
                authModal.classList.add("hide");
                authError.textContent = "";
            } else {
                authError.textContent = "Invalid username or password!";
            }
        })
        .catch((err) => {
            console.error("Auth error:", err);
            authError.textContent = "Authentication error occurred.";
        });
});

window.addEventListener("load", function () {
    setTimeout(function () {
        document.getElementById("load").classList.add("hide");
    }, 1200);
});

const bars = document.getElementById("bars");
const menu = document.getElementById("menu");

bars.addEventListener("click", function () {
    menu.classList.toggle("open");
});

menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        menu.classList.remove("open");
    });
});

const profileAvatar = document.getElementById("profileAvatar");
const profileDropdown = document.getElementById("profileDropdown");
const signOutBtn = document.getElementById("signOutBtn");

profileAvatar.addEventListener("click", function (e) {
    e.stopPropagation();
    profileDropdown.classList.toggle("show");
});

window.addEventListener("click", function () {
    profileDropdown.classList.remove("show");
});

signOutBtn.addEventListener("click", function () {
    authModal.classList.remove("hide");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    profileDropdown.classList.remove("show");
});

const filters = document.querySelectorAll(".filters button");
const items = document.querySelectorAll(".item");

filters.forEach(function (button) {
    button.addEventListener("click", function () {
        filters.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const type = button.dataset.type;

        items.forEach(function (item) {
            if (type === "all" || item.dataset.type === type) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});

const toastContainer = document.getElementById("toastContainer");

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2500);
}

const more = document.querySelectorAll(".more");

more.forEach(function (button) {
    button.addEventListener("click", function () {
        const name = button.dataset.name;
        showToast("Успешно добавлено: " + name);

        const product = document.getElementById("product");

        if (
            name === "Minimal Black Tee" ||
            name === "Pure White Crewneck" ||
            name === "Olive Minimalist Tee" ||
            name === "Graphite Slim Fit"
        ) {
            product.value = "Basic Tees";
        } else {
            product.value = "Oversized Fit";
        }

        document.getElementById("message").value =
            "I am interested in ordering the " + name + ". Please provide sizing details.";
    });
});

const quotes = [
    {
        text: "“The fabric quality is unmatched. These t-shirts maintain their fit and shape even after multiple washes.”",
        name: "Alex Morgan",
        place: "Verified Buyer · New York",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
        text: "“Great oversized fit and thick heavyweight cotton. Hands down my favourite tee brand right now.”",
        name: "Jamie Taylor",
        place: "Verified Buyer · London",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
        text: "“Super fast shipping and clean minimal packaging. The stitching details are really impressive.”",
        name: "Casey Williams",
        place: "Verified Buyer · Berlin",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
    }
];

let current = 0;

function showQuote() {
    document.getElementById("quote").textContent = quotes[current].text;
    document.getElementById("person").textContent = quotes[current].name;
    document.getElementById("place").textContent = quotes[current].place;
    document.getElementById("avatarImg").src = quotes[current].avatar;
    document.getElementById("progress").style.width =
        ((current + 1) / quotes.length * 100) + "%";
}

document.getElementById("prev").addEventListener("click", function () {
    current--;

    if (current < 0) {
        current = quotes.length - 1;
    }

    showQuote();
});

document.getElementById("next").addEventListener("click", function () {
    current++;

    if (current >= quotes.length) {
        current = 0;
    }

    showQuote();
});

const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const product = document.getElementById("product").value;
    const message = document.getElementById("message").value.trim();

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        product === "" ||
        message === ""
    ) {
        alert("Please fill in all fields!");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    alert("Thank you, " + name + "! Your enquiry is complete.");

    form.reset();
});