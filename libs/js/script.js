var attempt = 3; 
//Ejecutando funciones
window.addEventListener("resize", anchoPage);

//Declarando variables
var formulario_login = document.querySelector(".formulario__login");
var contenedor_login_register = document.querySelector(".contenedor__login-register");

    //FUNCIONES

function validate(){
	var username = document.getElementById("usua").value;
	var password = document.getElementById("contrasena").value;
	if ( username == "admin" && password == "admin"){
		alert ("Ingreso Exitoso");
		window.location = "libs/html/usuarios.html"; 
		return false;
		}
	else{
		attempt --;
		alert("Le quedan "+attempt+" intentos;");
		if( attempt == 0){
		document.getElementById("usua").disabled = true;
		document.getElementById("contrasena").disabled = true;
		document.getElementById("submit").disabled = true;
		return false;
		}
	}
}

function anchoPage(){

    if (window.innerWidth < 850){
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
    }
}

anchoPage();

function cloneFormularios( $frm1 , $frm2 ) {
	$(':input[name]', $frm2).val(function() {
		return $(':input[name=' + this.name + ']', $frm1).val();});
}
//Al hacer click en un btn copiar
$('#submit').on('click', function(){
	cloneFormularios($('#ingreso'),$('#menu'));});