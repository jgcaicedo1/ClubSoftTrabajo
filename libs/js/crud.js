function mostrar(){
	document.getElementById("form").style.display="inline";
}
function startTime(){
	var today=new Date();
	var h=today.getHours();
	var m=today.getMinutes();
	var s=today.getSeconds();
	m=checkTime(m);
	s=checkTime(s);
	document.getElementById('reloj').innerHTML=h+":"+m+":"+s;
	var t=setTimeout('startTime()',500);}
function checkTime(i){
	if (i<10) {
		i="0" + i;}
	return i;}
function Actual(){
	var today = new Date();
	var m = today.getMonth() + 1;
	var mes = (m < 10) ? '0' + m : m;
		document.getElementById('Fecha').innerHTML="Fecha: "+today.getDate()+"/" +mes+"/"+today.getFullYear();	
}
function Usuario(){
	document.getElementById('Us').innerHTML="Usuario: admin";	
}
function download(filename, text){
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);}
 window.onload = function () {
	 		startTime();
			Actual();
			Usuario();
            var localStorageKeyName = 'data';

            loadFromLocalStorage();

            document.querySelector("#btn-add").addEventListener('click', function () {
                var nombre = document.getElementById("nombre"),
                    cedula = document.getElementById("cedula"),
                    correo = document.getElementById("correo"),
					usuario = document.getElementById("usuario"),
					clave = document.getElementById("clave");
                // Validate
                if (nombre.value.length === 0 || cedula.value.length === 0 || correo.value.length === 0 || usuario.value.length === 0 || clave.value.length === 0) return;

                var user = {
                    nombre: nombre.value,
                    cedula: cedula.value,
                    correo: correo.value,
					usuario: usuario.value,
					clave: clave.value,
					estado: est()
                };

                // Clean data
                nombre.value = '';
                cedula.value = '';
                correo.value = '';
				usuario.value = '';
				clave.value = '';

                // Append to my localStorage
                appendObjectToLocalStorage(user);
            })
            document.getElementById("reporte").addEventListener('click', function () {
                var total="",
				users = [],
                dataInLocalStorage = localStorage.getItem(localStorageKeyName);
                users = JSON.parse(dataInLocalStorage);
				users.forEach(function (x, i) {
					total+=users[i].nombre+" "+users[i].cedula+" "+users[i].correo+" "+users[i].usuario+" "+users[i].clave+" "+users[i].estado+"\n";
				});
                download("Reporte.txt",total);
            })
            document.getElementById("busca").addEventListener('change', function () {
				var n=-1;
				var users = [],
				b=document.getElementById("busca").value,
                dataInLocalStorage = localStorage.getItem(localStorageKeyName),
				gridBody = document.querySelector("#grid tbody");
                users = JSON.parse(dataInLocalStorage);
				gridBody.innerHTML = '';
				users.forEach(function (x, i) {
					if(b==users[i].nombre || b==users[i].cedula || b==users[i].correo || b==users[i].usuario){
                    n=0;
						var tr = document.createElement("tr"),
                        tdNombre = document.createElement("td"),
                        tdCedula = document.createElement("td"),
                        tdCorreo = document.createElement("td"),
						tdUsuario = document.createElement("td"),
						tdClave = document.createElement("td"),
						tdEstado = document.createElement("td");
                    tdNombre.innerHTML = x.nombre;
                    tdCedula.innerHTML = x.cedula;
                    tdCorreo.innerHTML = x.correo;
					tdUsuario.innerHTML = x.usuario;
					tdClave.innerHTML = x.clave;
					tdEstado.innerHTML=x.estado;
                    tr.appendChild(tdNombre);
                    tr.appendChild(tdCedula);
                    tr.appendChild(tdCorreo);
					tr.appendChild(tdUsuario);
					tr.appendChild(tdClave);
					tr.appendChild(tdEstado);
                    gridBody.appendChild(tr);}
				});
				if(n==-1){
					alert("No se encontro algo que coincida con la busqueda");
				}
            })
            function appendObjectToLocalStorage(obj) {
                var users = [],
                    dataInLocalStorage = localStorage.getItem(localStorageKeyName);

                if (dataInLocalStorage !== null) {
                    users = JSON.parse(dataInLocalStorage);
                }
                users.push(obj);
                localStorage.setItem(localStorageKeyName, JSON.stringify(users));
                loadFromLocalStorage();
            }
            function loadFromLocalStorage() {
                var users = [],
                    dataInLocalStorage = localStorage.getItem(localStorageKeyName),
                    gridBody = document.querySelector("#grid tbody");
                if (dataInLocalStorage !== null) {
                    users = JSON.parse(dataInLocalStorage);
                }
                // Draw TR from TBODY
                gridBody.innerHTML = '';
                users.forEach(function (x, i) {
                    var tr = document.createElement("tr"),
                        tdNombre = document.createElement("td"),
                        tdCedula = document.createElement("td"),
                        tdCorreo = document.createElement("td"),
						tdUsuario = document.createElement("td"),
						tdClave = document.createElement("td"),
						tdEstado = document.createElement("td"),
                        tdRemove = document.createElement("td"),
						btnAc = document.createElement("button"),
                        btnRemove = document.createElement("button");
                    tdNombre.innerHTML = x.nombre;
                    tdCedula.innerHTML = x.cedula;
                    tdCorreo.innerHTML = x.correo;
					tdUsuario.innerHTML = x.usuario;
					tdClave.innerHTML = x.clave;
					tdEstado.innerHTML=x.estado;
                    btnRemove.textContent = 'Desactivar';
                    btnRemove.className = 'btn btn-xs btn-danger';
                    btnRemove.addEventListener('click', function(){
                        Desactivar(i);
                    });
					btnAc.textContent = 'Activar';
                    btnAc.className = 'btn btn-xs btn-act';
                    btnAc.addEventListener('click', function(){
                        Activar(i);
                    });
					tdRemove.appendChild(btnAc);
                    tdRemove.appendChild(btnRemove);
                    tr.appendChild(tdNombre);
                    tr.appendChild(tdCedula);
                    tr.appendChild(tdCorreo);
					tr.appendChild(tdUsuario);
					tr.appendChild(tdClave);
					tr.appendChild(tdEstado);
                    tr.appendChild(tdRemove);
                    gridBody.appendChild(tr);
                });
            }
            function Desactivar(index){
                var users = [],
                dataInLocalStorage = localStorage.getItem(localStorageKeyName);
                users = JSON.parse(dataInLocalStorage);
                users[index].estado="Inactivo";
                localStorage.setItem(localStorageKeyName, JSON.stringify(users));
                loadFromLocalStorage();
            }
	 
            function Activar(index){
                var users = [],
                dataInLocalStorage = localStorage.getItem(localStorageKeyName);
                users = JSON.parse(dataInLocalStorage);
                users[index].estado="Activo";
                localStorage.setItem(localStorageKeyName, JSON.stringify(users));
                loadFromLocalStorage();
            }
	 
	 		function est(){
				var combo=document.getElementById("estado");
				var estado=combo.options[combo.selectedIndex].text;
				return estado;
			}
}



