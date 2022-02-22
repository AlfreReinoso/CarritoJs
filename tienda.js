const Clickbutton = document.querySelectorAll('.addtoCart')
const tbody = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})

function addToCarritoItem(e) {
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent
    const itemPrice = item.querySelector('.precio').textContent
    const itemImg = item.querySelector('.card-img-top').src
    
    const newItem = {
        title : itemTitle,
        precio : itemPrice,
        img: itemImg,
        cantidad: 1
    }
    
    addItemCarrito(newItem)
    
}

function addItemCarrito(newItem){
    
    const alert = document.querySelector('.alert')

    setTimeout(function(){
        alert.classList.add('hide')
    }, 2000)

    alert.classList.remove('hide')

    const InputElemento = tbody.getElementsByClassName('inputElement')
    for(let i= 0; i < carrito.length ; i++){
        if(carrito[i].title.trim() === newItem.title.trim()){
            carrito[i].cantidad ++ ; 
            const inputvalue = InputElemento [i];
            inputvalue.value ++ ;
            CarritoTotal();
            return null;
        }
    }
    carrito.push(newItem)
    renderCarrito()
}

function renderCarrito(){
    tbody.innerHTML  = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `
                <th scope="row">1</th>
                    <td class="table__productos">
                        <img src="${item.img}" width="100" alt="">
                        <h6 class="title">${item.title}</h6></td>
                    <td class="table__precio"><p>$${item.precio}</p></td>
                    <td class="table__cantidad">
                        <input type="number" min="1" value="${item.cantidad}" class="inputElement">
                        <button class="delete btn btn-danger">X</button>
                    </td> 
        `
        tr.innerHTML = Content
        tbody.append(tr)
        tr.querySelector('.delete').addEventListener('click', removeItemcarrito)
        tr.querySelector('.inputElement').addEventListener('change',sumaCantidad)
    })
    CarritoTotal()
}

function CarritoTotal(){
    let total = 0 
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item)=>{
        const precio = Number(item.precio)
        total = total + precio*item.cantidad
    })

    itemCartTotal.innerHTML = `Total $${total}`
    addLocalStorage()
}

function removeItemcarrito(e){

    const alert = document.querySelector('.alerteliminado')

    setTimeout( function(){
        alert.classList.add('hide')
    }, 2000)

    alert.classList.remove('hide')


    const buttondelete = e.target
    const tr = buttondelete.closest('.ItemCarrito')
    const title = tr.querySelector('.title').textContent
    for(let i= 0 ; i< carrito.length ; i ++){

        if(carrito[i].title.trim() === title.trim()){
            carrito.splice(i, 1)
        }
    }
    tr.remove() 
    CarritoTotal()
}

function sumaCantidad(e){
    const sumaInput = e.target
    const tr = sumaInput.closest('.ItemCarrito')
    const title = tr.querySelector('.title').textContent
    carrito.forEach(item=>{

        if(item.title.trim() === title.trim()){
            sumaInput.value < 1 ? (sumaInput.value =1) : sumaInput.value
            item.cantidad = sumaInput.value 
            CarritoTotal()
        }
    })
}

function addLocalStorage(){
    localStorage.setItem('carrito',JSON.stringify(carrito))
}

window.onload = function (){
    const storage = JSON.parse(localStorage.getItem('carrito'))
    if(storage){
        carrito = storage
        renderCarrito()
    }
}
