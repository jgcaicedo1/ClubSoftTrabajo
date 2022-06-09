// JavaScript Document

const inputs = document.querySelectorAll('#formulario input');
function valideKey(evt){
    
    // code is the decimal ASCII representation of the pressed key.
    var code = (evt.which) ? evt.which : evt.keyCode;
    
    if(code==8) { // backspace.
      return true;
    } else if(code>=48 && code<=57) { // is a number.
      return true;
    } else{ // other keys.
      return false;
    }
}
function soloLetras(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = " Ã¡Ã©Ã­Ã³ÃºabcdefghijklmnÃ±opqrstuvwxyz";
       especiales = "8-37-39-46";

       tecla_especial = false
       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
            return false;
        }
    }

function ValidarCedula(){
	var expCedula=/^\d+$/gi;
	var cad = document.getElementById("cedula");
	if(!cad.value){
		let button = document.querySelector("#btn-add");
		button.disabled = true;
		alert("La Cedula es requerida");
     	cad.focus();
     	return false;
	}
 	if (!expCedula.exec(cad.value)){
		let button = document.querySelector("#btn-add");
		button.disabled = true;
   		alert("La Cedula solo admite numeros y sin espaciados.");
		cad.focus();
    	return false;
    }
	if(cad.value.length!=10){
		let button = document.querySelector("#btn-add");
		button.disabled = true;
   		alert("La Cedula debe tener 10 numeros.");
		cad.focus();
    	return false;
	}
	cad = document.getElementById("cedula").value.trim();
	var total = 0;
	var longitud = cad.length;
	var longcheck = longitud - 1;
	if (cad !== "" && longitud === 10){
		for(i = 0; i < longcheck; i++){
			if (i%2 === 0) {
				var aux = cad.charAt(i) * 2;
				if (aux > 9) aux -= 9;
				total += aux;
            }else{
				total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
            }
        }
       	total = total % 10 ? 10 - total % 10 : 0;
		if (cad.charAt(longitud-1) == total) {
			let button = document.querySelector("#btn-add");
			button.disabled = false;
			return true;
		}else{
		let button = document.querySelector("#btn-add");
		button.disabled = true;
			alert('Cedula Invalida');
        }
	}
}

function ValidarCorreo(){
	var exp=/^([\da-z_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
	var cad = document.getElementById("correo");
	if(!cad.value){
		let button = document.querySelector("#btn-add");
		button.disabled = true;
		alert("El Correo es requerido");
     	cad.focus();
     	return false;
	}
 	if (!exp.exec(cad.value)){
		let button = document.querySelector("#btn-add");
		button.disabled = true;
   		alert("Ingrese un Correo Existente.");
		cad.focus();
    	return false;
    }else{
		let button = document.querySelector("#btn-add");
		button.disabled = false;
	};
}

function validarUsuario() {     
	var y = document.getElementById("usuario").value;  
	var noValido = / /;  
	if(noValido.test(y)){ // se chequea el regex de que el string no tenga espacio      
		let button = document.querySelector("#btn-add");
		button.disabled = true;
		alert ("El usuario no puede contener espacios en blanco");      
		return false;  }else{
		let button = document.querySelector("#btn-add");
		button.disabled = false;			
		} 
}
function validarContra() {     
	var y = document.getElementById("clave").value;  
	var noValido = / /;  
	if(noValido.test(y)){ // se chequea el regex de que el string no tenga espacio      
		let button = document.querySelector("#btn-add");
		button.disabled = true;
		alert ("La contraseña no puede contener espacios en blanco");      
		return false;  }else{
		let button = document.querySelector("#btn-add");
		button.disabled = false;			
		} 
} 