/* GENERAL */

function getEmail() {
    var email = $("#email").val();
    return email
}
function getPhone() {
    var phone = $("#phone").val();
    return phone
}
function getAddress() {
    var address = $("#address").val();
    return address
}
function getPostalCode() {
    var postalCode = $("#postal-code").val();
    return postalCode
}

function disableButton() {
    var total = getCartTotal()
    var btn = $('#buy-btn')

    if (btn[0]) {
        if (total == 0) {
            btn[0].classList.add("cart-btn-disabled");
        } else {
            btn[0].classList.remove("cart-btn-disabled");
        }
    }
}

function buy() {
    cartInfo = getCartInfo()
    postalCode = getPostalCode()
    adress = getAddress()
    phone = getPhone()
    email = getEmail()

    window.location.assign('https://wa.me/5491161248214?text=' + cartInfo + "%0a%0a" + '%2ACelular:%2A ' + phone +  "%0a" + '%2AEmail:%2A ' + email + "%0a" + '%2ADirección:%2A ' + adress + "%0a" + '%2ACódigo postal:%2A ' + postalCode)
}

function getCartInfo() {
    var cart = getCart()
    var info = ""

    for (var i = 0; i < cart.length; i++) {
        var item = cart[i]
        var linePrice = "$" + (item.quantity * item.price)

        info += item.name + " x " + item.quantity + " = " + linePrice + "%0a"
    }

    info += "%0a"
    info += "*TOTAL: $" + getCartTotal() + "*"

    return info
}

function showProducts() {
    var hiddenProducts = $('.products-container-hidden')
    hiddenProducts.removeClass('products-container-hidden')
    hiddenProducts.addClass('products-container')
    $('.hide-products-btn').css('display', 'none');
}

function changeItemQuantity(name, newQuantity) {
    var itemIndex = getCartIndexWithName(name)
    setCartItemQuantity(itemIndex, newQuantity)
    console.log(getCart())
}

/* CART */

function setCartTotalInHTML(total) {
    $('#total-price').html("Total: $" + total);
    disableButton()
}

function getCartTotal() {
    var cart = getCart()
    var total = 0

    for (var i = 0; i < cart.length; i++) {
        var linePrice = cart[i].price * cart[i].quantity
        total = total + linePrice
    }

    return total
}

function setCartItemQuantity(i, qty) {
    var cart = getCart()
    cart[i].quantity = qty
    saveCart(cart)
}

function getCartIndexWithName(name) {
    var cart = getCart()
    var index = 0

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            index = i
        }
    }

    return index
}

function removeFromCart(i, name) {
    // remove from localStorage
    var cart = getCart()
    var indexToRemove = getCartIndexWithName(name)
    cart.splice(indexToRemove, 1)
    saveCart(cart)

    // remove html element
    $('.cart-item-' + i).remove()
}

function getCart() {
    var cart = localStorage.getItem('cart')

    if (cart === null) {
        cart = []
    } else {
        cart = JSON.parse(cart)
    }

    return cart
}

function saveCart(cart) {
    disableButton()
    localStorage.setItem('cart', JSON.stringify(cart))
    setCartTotalInHTML(getCartTotal())
}

function isProductInsideCart(name) {
    var cart = getCart()

    for (var i = 0; i < cart.length; i++) {
        if (name === cart[i].name) {
            return true
        }
    }

    return false
}

function addToExistingProduct(name) {
    var cart = getCart()

    for (var i = 0; i < cart.length; i++) {
        if (name === cart[i].name) {
            cart[i].quantity = cart[i].quantity + 1
        }
    }

    return cart
}

function addToCart(name, price, photo) {
    var cart = getCart()

    if (isProductInsideCart(name)) {
        cart = addToExistingProduct(name)
    } else {
        var product = { name: name, price: price, photo: photo, quantity: 1 }
        cart.push(product)
    }

    saveCart(cart)
}

function printCart() {
    var cart = getCart()

    for (var i = 0; i < cart.length; i++) {
        alert(cart[i].name)
        alert(cart[i].price)
        alert(cart[i].photo)
    }
}

/* funciones goTo */
function goToHome() {
    window.location.assign("./index.html")
}
function goToSectionA() {
    window.location.assign("./index.html#section-a")
}
function goToSectionB() {
    window.location.assign("./index.html#section-b")
}
function goToSectionC() {
    window.location.assign("./index.html#section-c")
}
function goToCart() {
    window.location.assign("./cart.html")
}
function goToProducts() {
    window.location.assign("./products.html")
}
function goToInstagram() {
    window.open('https://www.instagram.com/frida.accesories/?hl=es-la', '_blank');
}
function goToFacebook() {
    window.open('https://www.facebook.com/frida.accesories.ok', '_blank');
}
function goToWhatsapp() {
    window.open('https://wa.me/5491161248214/?text=Hola!', '_blank').focus()
}