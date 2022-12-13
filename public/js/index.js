//Funcion que verifica si ya se inicio sesion
const btlogin = document.getElementById("login")
window.onload = checkLogged;
  function checkLogged(){
    if(sessionStorage.getItem("logged") == 'true') {
        window.location.assign('home.html')
    } }
let alerta1 = document.getElementById("alerta1")

//Funcion del boton login 
btlogin.addEventListener('click', (e) =>{
let user = document.getElementById('user').value
let password = document.getElementById('contra').value
    login(user,password)
}
)
//Ciclo que revisa el nombre y usuario
function login(user, password){
    for(let i=0; i<cuentas.length; i++){
        if(user == cuentas[i].nombre && password == cuentas[i].password){
            window.location.assign('home.html')
            sessionStorage.setItem('logged', 'true')
            sessionStorage.setItem('usuario', cuentas[i].nombre)
            sessionStorage.setItem('id', i)
            return
        }
    }
    alerta1.style.display = 'block'
}
 
