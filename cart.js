$(document).ready(function () {

    disableButton()
    var cart = getCart()
    var total = 0

    for (var i = 0; i < cart.length; i++) {
        var cartItem = cart[i]
        total = cartItem.price * cartItem.quantity + total

        var itemHTML = `<div class="cart-info cart-item-` + i + `">
                        <div class="img-container">
                            <img class="product-img-cart" src="`+ cartItem.photo + `" />
                        </div>
                        <div class="divs-container">
                            <div class="product-name">
                            `+ cartItem.name + `
                            </div>
                            <div class="product-price">
                                $`+ cartItem.price + `
                            </div>
                            <div class="input-container">
                                <input type="number" name="quantity" min="0" value=`+ cartItem.quantity + ` class="product-quantity" onchange="changeItemQuantity('` + cartItem.name + `', this.value)"> 
                            </div>

                            <div class="input-container" style="margin-right: 16px; cursor: pointer" onclick="removeFromCart(`+ i + `, '` + cartItem.name + `')">
                                🞮
                            </div>

                        </div>
                         </div>
                      </div>
                  `
        $('#cart').append(itemHTML)
    }

    $('#total-price').html("Total: $" + total);
})