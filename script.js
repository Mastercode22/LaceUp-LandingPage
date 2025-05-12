window.addEventListener("load", event => {

    function productHeading() {
        ////////////////
        // Variables
        ////////////////

        const product = {
            value: 125,
            images: [
                { img: 'image/tel1.png' },
                { img: 'image/tel2.png' },
                { img: 'image/tel3.png' },
                { img: 'image/tel4.png' },
                { img: 'image/tel5.png' },
                { img: 'image/tel6.png' }
            ]
        };

        const btnAdd = document.querySelector('.btn.add'),
            btnContainer = document.querySelector('.btnContainer'),
            wrapper = document.querySelector('.wrapper'),
            itemNumber = document.querySelector('.itemNumber'),
            shoppingQuantity = document.querySelector('.shoppingQuantity'),
            inputQuantity = document.querySelector('.inputQuantity'),
            plus = document.querySelector('.plus'),
            minus = document.querySelector('.minus'),
            arrowDrop = document.querySelector('.arrowDrop'),
            dropdown = document.querySelector('.dropdown'),
            nav = document.querySelector('nav'),
            error = document.querySelector('.error'),
            shoppingIcon = document.querySelector('.shoppingIcon'),
            shoppingMenu = document.querySelector('.shoppingMenu'),
            emptyCart = document.querySelector('.emptyCart');

        let priceFinal = document.querySelector('.priceFinal'),
            priceOriginal = document.querySelector('.priceOriginal'),
            discount = null,
            sizeNumber = document.querySelector('.sizeNumber'),
            dropItem = document.querySelectorAll('.dropItem'),
            maxQuantity = 5,
            newMaxQuantity = maxQuantity;


        ////////////////
        // Events
        ////////////////

        btnAdd.addEventListener('click', addItem);
        plus.addEventListener("click", plusQuantity);
        minus.addEventListener("click", minusQuantity);
        arrowDrop.addEventListener("click", openDrop);
        shoppingIcon.addEventListener("click", openShoppingCart);
        emptyCart.addEventListener("click", cleanCart);

        dropItem.forEach(function (el) {
            el.addEventListener("click", getSize);
        })

        window.addEventListener("resize", resize);

        ////////////////
        // Functions
        //////////////// 

        window.onscroll = function () {
            if (window.pageYOffset >= 60) {
                nav.classList.add("fixed");
            } else {
                nav.classList.remove("fixed");
            }
        };

        function resize() {
            if (window.innerHeight > wrapper.offsetHeight) {
                btnContainer.classList.remove('fixedBtn');
            } else {
                btnContainer.classList.add('fixedBtn');
            }
            parallax();
        }

        function parallax() {
            if (window.innerWidth > 800) {
                var scene = document.querySelectorAll('.scene');
                scene.forEach(pic => {
                    var parallax = new Parallax(pic);
                })
            }
        }

        function getDisccount() {
            product.value = 1500.99;
            discount = 1460.99;

            priceOriginal.innerText = "₵" + product.value.toFixed(2);
            priceFinal.innerText = "₵" + discount.toFixed(2);
        }

        function getPrice() {
            priceFinal.innerText = "₵" + (discount * inputQuantity.value).toFixed(2);
            priceOriginal.innerText = "₵" + (product.value * inputQuantity.value).toFixed(2);

            setTimeout(() => {
                priceFinal.classList.remove('anime');
            }, 400);
        }

        function plusQuantity() {
            if (inputQuantity.value < maxQuantity) {
                inputQuantity.value++;
                priceFinal.classList.add('anime');
            }
            getPrice();
        }

        function minusQuantity() {
            if (inputQuantity.value > 1) {
                inputQuantity.value--;
                priceFinal.classList.add('anime');
            }
            getPrice();
        }

        // ✅ ✅ Add items to shopping cart
        function addItem() {
            let cenas = parseInt(itemNumber.innerText) + parseInt(inputQuantity.value);

            if (cenas <= newMaxQuantity) {
                itemNumber.style.display = "flex";
                itemNumber.innerText = cenas;
                shoppingQuantity.innerText = "x" + cenas;
                itemNumber.classList.add("addItem");
                error.style.display = "none";

                // ✅ Add image and quantity to shopping cart visually
                let cartItemsContainer = document.querySelector('.cartItems');
                if (!cartItemsContainer) {
                    cartItemsContainer = document.createElement('div');
                    cartItemsContainer.classList.add('cartItems');
                    shoppingMenu.appendChild(cartItemsContainer);
                }

                const productImg = product.images[0].img;
                const quantity = parseInt(inputQuantity.value);
                const total = (discount * quantity).toFixed(2);

                let cartItem = `
                    <div class="cartItem" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                        <img src="${productImg}" alt="Product Image" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                        <div>
                            <div><strong>₵${discount.toFixed(2)}</strong> x ${quantity}</div>
                            <div>Total: ₵${total}</div>
                        </div>
                    </div>
                `;

                cartItemsContainer.insertAdjacentHTML('beforeend', cartItem);

            } else {
                error.style.display = "flex";
            }

            setTimeout(() => {
                itemNumber.classList.remove("addItem");
            }, 700);
        }

        function openDrop() {
            dropdown.classList.toggle('open');
        }

        function getSize(e) {
            sizeNumber.innerText = e.currentTarget.innerText;
            openDrop();
        }

        function openShoppingCart() {
            if (itemNumber.innerText != "0") {
                shoppingMenu.classList.toggle('openShopping');
            }
        }

        // ✅ ✅ Clean Shopping Cart
        function cleanCart() {
            shoppingMenu.classList.remove('openShopping');
            itemNumber.style.display = "none";
            itemNumber.classList.remove('addItem');
            itemNumber.innerText = "0";

            // ✅ Clear cart visuals
            let cartItemsContainer = document.querySelector('.cartItems');
            if (cartItemsContainer) {
                cartItemsContainer.innerHTML = "";
            }
        }

        // Populate the images for Swiper
        product.images.forEach(function (el) {
            let template = `
                <div class="swiper-slide">
                    <div class="scene" data-hover-only="false"> 
                        <img src="${el.img}" data-depth="0.5">
                        <img src="${el.img}" data-depth="1" class="shadow">
                    </div>
                </div>`;

            let template2 = `
                <div class="swiper-slide">
                    <img src="${el.img}">
                </div>`;

            document.querySelector('.galleryMain .swiper-wrapper').insertAdjacentHTML('beforeend', template);
            document.querySelector('.galleryThumbs .swiper-wrapper').insertAdjacentHTML('beforeend', template2);
        });

        var galleryThumbs = new Swiper('.galleryThumbs', {
            spaceBetween: 0,
            slidesPerView: 'auto',
            loop: false,
            allowTouchMove: false,
            allowSlidePrev: false,
            allowSlideNext: false,
        });

        var galleryMain = new Swiper('.galleryMain', {
            spaceBetween: 300,
            speed: 500,
            loop: true,
            loopedSlides: 5,
            effect: "coverflow",
            coverflowEffect: {
                rotate: 50,
                slideShadows: false,
                depth: 200,
                stretch: 50,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            thumbs: {
                swiper: galleryThumbs,
            },
        });

        getDisccount();
        parallax();
        resize();
    }

    productHeading();
});
