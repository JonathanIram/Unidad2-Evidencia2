class Nodo{
    constructor(valor){
        this.valor=valor
        this.derecha=null
        this.izquierda=null
        this.level = 0
    }
}

class Arbol{
    constructor(){
        this.ruta=null

    }
    //Metodos
    // Método para comprobar si el arbol esta vacio

    isEmpty(){
        return this.ruta===null
    };
    // Método para añadir un nodo al arbol
    add(valor) {
        if (this.isEmpty()) {
            this.ruta = new Nodo(valor)
            this.dibujar()
            return
        }

        let aux = this.ruta
        let count = 0

        while (aux) {
            if (valor < aux.valor) {
                if (aux.izquierda) {
                    aux = aux.izquierda
                    count++
                } else {
                    aux.izquierda = new Nodo(valor)
                    aux.izquierda.level = ++count
                    this.dibujar()
                    return
                }
            } else {
                if (aux.derecha) {
                    aux = aux.derecha
                    count++
                } else {
                    aux.derecha = new Nodo(valor)
                    aux.derecha.level = ++count
                    this.dibujar()
                    return
                }
            }
        }
    }

    // Método para dibujar el árbol
    dibujar() {
        let contenedor = document.getElementById('arbolGrafico')
        contenedor.innerHTML = ''; // Limpiar el contenedor
        this.dibujarNivel(this.ruta, contenedor, 0)
    }
    // Método para dibujar los niveles del arbol
    dibujarNivel(nodo, contenedor, nivel) {
        if (!nodo){ 
            return
        }
    

        let divNivel = contenedor.querySelector(`.nivel[data-nivel="${nivel}"]`)
        if (!divNivel) {
            divNivel = document.createElement('div')
            divNivel.className = ('nivel')
            divNivel.setAttribute('data-nivel', nivel)
    
 
            let etiquetaNivel = document.createElement('label')

            etiquetaNivel.className = 'etiqueta-nivel'
            etiquetaNivel.innerText = `Nivel ${nivel}`
            divNivel.appendChild(etiquetaNivel)
    
            contenedor.appendChild(divNivel)
        }
    

        let divNodo = document.createElement('div')
        divNodo.className = 'nodo'
        divNodo.innerText = nodo.valor
        divNivel.appendChild(divNodo)
    
        this.dibujarNivel(nodo.izquierda, contenedor, nivel + 1)
        this.dibujarNivel(nodo.derecha, contenedor, nivel + 1)
    }
    

    // Método para remover los nodos
    RemoveData(dato){
        let aux = this.ruta
        let branch = null
        while(aux !== null && aux.valor !== dato){
            branch = aux
            if (dato < aux.valor) {
                aux = aux.izquierda
            } else {
                aux = aux.derecha
            }
        }
        if (aux === null){
            alert(`No se en contro ${dato} en el arbol`)
        }
        if (aux.izquierda === null && aux.derecha === null) {
            if (aux === this.ruta) {
                this.ruta = null
            } else if (branch.izquierda === aux) {
                branch.izquierda = null
            } else {
                branch.derecha = null
            }
        }else if (aux.izquierda === null || aux.derecha === null) {
            let sheet = aux.izquierda || aux.derecha
            if (aux === this.ruta) {
                this.ruta = sheet
            } else if (branch.izquierda === aux) {
                branch.izquierda = sheet
            } else {
                branch.derecha = sheet
            }
        }else {
            let minBranch = aux
            let minNode = aux.derecha

            while (minNode.izquierda) {
                minBranch = minNode
                minNode = minNode.izquierda
            }

            aux.valor = minNode.valor

            if (minBranch.izquierda === minNode) {
                minBranch.izquierda = minNode.derecha
            } else {
                minBranch.derecha = minNode.derecha
            }
        }
        this.dibujar()
    }
    // Método para buscar un nodo 
    search(dato){
        let aux = this.ruta
        while(aux !== null && aux.valor !== dato){
            if (dato < aux.valor) {
                aux = aux.izquierda
            } else {
                aux = aux.derecha
            }
        }
        if (aux === null){
            let message = (`El valor  ${dato} no se encuentra en el arbol`)
            return alert(message) 
        }else{
            let message = (`El valor  ${aux.valor} se encuentra en el nivel ${aux.level}`)
        return alert(message)
        }
    }
}
// se instancia la clase arbol y se crean las variables para los botones
let arbol = new Arbol()
let btnagregar = document.getElementById("btnagregar")
let btnbuscar = document.getElementById("btnbuscar")
let btneliminar = document.getElementById("btneliminar")

// Funcionalidad de los botones
btnagregar.addEventListener("click",() =>{
    let valor = document.getElementById("inputValor")
    let a = valor.value
    if(a === ""){
        alert("Ingresa un valor")
    }else if(isNaN(a))  { 
        alert("El valor ingresado no es un número")
    }else{
    arbol.add(Number(a))
    }
})
btnbuscar.addEventListener("click",() =>{
    let valor = document.getElementById("inputValor")
    let a = valor.value
    if(a === ""){
        alert("Ingresa un valor")
    }else if(isNaN(a))  { 
        alert("El valor ingresado no es un número")
    }else{
    arbol.search(Number(a))
    }
})
btneliminar.addEventListener("click",() =>{
    let valor = document.getElementById("inputValor")
    let a = valor.value
    if(a === ""){
        alert("Ingresa un valor")
    }else if(isNaN(a))  { 
        alert("El valor ingresado no es un número")
    }else{
    arbol.RemoveData(Number(a))
    }
})

// Creacion de nodods
arbol.add(50)
arbol.add(25)
arbol.add(75)
arbol.add(10)
arbol.add(60)
arbol.add(80)
arbol.add(7)
arbol.add(15)
arbol.add(30)
arbol.add(28)
arbol.add(35)
arbol.add(55)
arbol.add(70)
arbol.add(76)
arbol.add(90)
