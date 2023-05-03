// รายการสินค้า
const MENU_ITEMS = [
    {
        id: "milk-tea",
        name: "ชานมไข่มุก",
        image: "/../image/chanom.png",
        price: 30,
    },
    {
        id: "iced-milk-tea",
        name: "ชานมเย็น",
        image: "/../image/chanompink.png",
        price: 35,
    },
    {
        id: "green-tea",
        name: "ชานมสตรอเบอร์รี่",
        image: "/../image/chanomstrawberry.png",
        price: 40,
    },
    {
        id: "cha-thai",
        name: "ชาไทย",
        image: "/../image/chathai.png",
        price: 25,
    },
    {
        id: "Cocoa",
        name: "โกโก้",
        image: "/../image/Cocoa.png",
        price: 25,
    },
    {
        id: "darkcocoa",
        name: "ดาร์กโกโก้",
        image: "/../image/darkcocoa.png",
        price: 25,
    },
    {
        id: "greentea",
        name: "ชาเขียว",
        image: "/../image/greentea.png",
        price: 25,
    },
    {
        id: "milk",
        name: "นมสด",
        image: "/../image/milk.png",
        price: 25,
    },
    {
        id: "milkcaramel",
        name: "นมสดคาราเมล",
        image: "/../image/milkcaramel.png",
        price: 25,
    },
    {
        id: "mintchoco",
        name: "มิ้นช็อคโก้",
        image: "/../image/mintchoco.png",
        price: 25,
    },
];

class Cart {
    constructor() {
        this.items = [];
        this.totalPrice = 0;
    }

    addItem(item) {
        const existingItem = this.items.find((i) => i.id === item.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({
                id: item.id,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: 1,
            });
        }
        this.calculateTotalPrice();
    }

    removeItem(itemId) {
        this.items = this.items.filter((i) => i.id !== itemId);
        this.calculateTotalPrice();
    }

    updateItemQuantity(itemId, quantity) {
        const item = this.items.find((i) => i.id === itemId);
        item.quantity = parseInt(quantity);
        this.calculateTotalPrice();
    }

    calculateTotalPrice() {
        this.totalPrice = this.items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    }
    getItemById(itemId) {
        return this.items.find((i) => i.id === itemId);
    }

    clearCart() {
        this.items = [];
        this.totalPrice = 0;

        Swal.fire("Success", "Your order was successful.", "success");
    }
}

class Menu {
    constructor() {
        this.cart = new Cart();
        this.menuItems = MENU_ITEMS;
        this.cartTable = document.querySelector(".cart tbody");
        this.totalPriceDisplay = document.querySelector(".total-price");
        this.clearCartButton = document.querySelector(".clear-cart");
    }
    render() {
        const menuContainer = document.querySelector(".menu");
        menuContainer.innerHTML = "";

        this.menuItems.forEach((item) => {
            const menuItem = document.createElement("div");
            menuItem.classList.add("menu-item");
            menuItem.innerHTML = `
            <button class="add-to-cart" data-item="${item.id}">
                <div class="menu1-image">
                    <img src="${item.image}" />
                </div>
                <div class="menu1-details">
                    <h1 class="menu1-name">${item.name}</h1>
                    <h2 class="menu1-cost">ราคา</h2>
                    <h2 class="cost">${item.price} .-</h2>
                </div>
            </button>
		`;
            menuContainer.appendChild(menuItem);
        });

        this.updateCartTable();
    }

    updateCartTable() {
        this.cartTable.innerHTML = "";

        this.cart.items.forEach((item) => {
            const cartItem = document.createElement("tr");
            cartItem.innerHTML = `
            <div class="cart-content">
                <div class="image-content">
                    <img src="${item.image}"/>
                </div>
                <div>
                    <p class="name">${item.name}</p>
                    <div class="text-content">
                        <p class="quantity"><input type="number" value="${
                            item.quantity
                        }" min="1" max="99"></p>
                        <p class="total">${item.price * item.quantity} บาท</p>
                        <p><button class="remove-item" data-item="${
                            item.id
                        }">-</button></p>
                    </div>
                </div>
                
            </div>
		`;
            this.cartTable.appendChild(cartItem);

            const quantityInput = cartItem.querySelector(".quantity input");
            quantityInput.addEventListener("change", (e) => {
                const quantity = e.target.value;
                this.cart.updateItemQuantity(item.id, quantity);
                this.updateCartTable();
            });

            const removeButton = cartItem.querySelector(".remove-item");
            removeButton.addEventListener("click", () => {
                this.cart.removeItem(item.id);
                this.updateCartTable();
            });
        });

        this.totalPriceDisplay.textContent = `${this.cart.totalPrice} -`;
    }

    init() {
        this.render();

        const addToCartButtons = document.querySelectorAll(".add-to-cart");
        addToCartButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const itemId = button.dataset.item;
                const item = this.menuItems.find((i) => i.id === itemId);
                this.cart.addItem(item);
                this.updateCartTable();
            });
        });

        this.clearCartButton.addEventListener("click", () => {
            this.cart.clearCart();
            this.updateCartTable();
        });
    }
}

const menu = new Menu();
menu.init();
