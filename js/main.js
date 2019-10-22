(
    function(){
        "use strict"; //creamos el use strict como orden para que se cumpla el codigo
        var regalo = document.getElementById('regalo'); ///esta variable es la que nos permite cargar el id regalo que luego vamos a calcular.
        document.addEventListener('DOMContentLoaded', function(){
            console.log("Listo el add event Listener de main js");

        //codigo de libreria leaflet.js 
        var map = L.map('mapa').setView([48.276587, -4.103767], 11);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([48.276587, -4.103767 ]).addTo(map)
            .bindPopup('Maison Migouron').openPopup()
            .bindTooltip('The home of Pedro').openTooltip();//son fuciones de java script que te permite crear html encima de la ubicacion 

        //Datos de usuarios  reservaciones.html/75
         var nombre = document.getElementById('nombre');
         var apellido = document.getElementById('apellido');
         var email = document.getElementById('email');
        
         //Campus pases o paquetes  reservacion.html/91
        var pase_dia = document.getElementById('paseDia');
        var pase_completo = document.getElementById('paseCompleto');
        var pase_dos_dias = document.getElementById('paseDosDias');

        //Botones y divs o resumen reservaciones.html/216
        var calcular = document.getElementById('calcular');
        var errorDiv = document.getElementById('error');
        var botonRegistro = document.getElementById('btnRegistro');
        var resultado = document.getElementById('listaProductos');

        //Extras
        var camisas = document.getElementById('camiseta_evento');
        var etiquetas = document.getElementById('etiquetas');

        /////////////addEventListenerss/////////////

        calcular.addEventListener('click',calcularMontos);
        pase_dia.addEventListener('blur', mostrarDias); //este evento blur/difuminar o hacerse nubloso es util para cuando elejimos una opcion en nuestro caso boletos, luego en la parte de resumen veremos cuantos boletos tendremos comprados, e muy util para hacer un resumen antes de hacer una peticion.
        pase_completo.addEventListener('blur', mostrarDias); 
        pase_dos_dias.addEventListener('blur', mostrarDias); //gracias a este evento el display none de main.css contenido-dia funcionara
        
        //Registro De Usuarios 
        nombre.addEventListener('blur', validarCampos);
        apellido.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validationEmail);
        
        
        function validarCampos(){
            if(this.value== ''){
                errorDiv.style.display= 'block';
                errorDiv.innerHTML= 'Este campo es obligatorio';
                this.style.border = '1px solid red';
                errorDiv.style.border = '1px solid red';
            }
            else{
                errorDiv.style.display= 'none';
                this.style.border = '1px solid #cccccc';
            }
        }
        function validationEmail(){
            if(this.value.indexOf("@") < 0){
                errorDiv.style.display= 'block';
                errorDiv.innerHTML= 'Debe tener al menos una @';
                this.style.border = '1px solid red';
                errorDiv.style.border = '1px solid red';
            }
            else{
                errorDiv.style.display= 'none';
                this.style.border = '1px solid #cccccc';
            }
        }
        //Registro De Usuarios

        function calcularMontos(event){
            event.preventDefault;
            console.log(regalo.value);
            if(regalo.value === ''){
                alert("Debes elegir un regalo")
                regalo.focus;
            }else{
                console.log('ya elegistes un regalo')
                var boletosDia =parseInt(pase_dia.value, 10) || 0;
                var boletoCompleto =parseInt(pase_completo.value, 10) || 0;
                var boletoDosDias = parseInt(pase_dos_dias.value, 10) || 0;
                var cantCamisas = parseInt(camisas.value, 10) || 0;
                var cantEtiquetas = parseInt(etiquetas.value, 10) || 0;

                
                var totalPagar= (boletosDia*30)+(boletoCompleto*50)+ (boletoDosDias*45)+((cantCamisas*10)*.93)+ (cantEtiquetas *2);

                var listadoProductos = [];

                if(boletosDia>= 1){
                    listadoProductos.push(boletosDia +  'Pase por día');
                } 
                if(boletoDosDias>= 1){
                    listadoProductos.push(boletoDosDias + ' Pase por dos días');
                } 
                if(boletoCompleto>= 1){
                    listadoProductos.push(boletoCompleto + ' Pase completo');
                }
                 if(cantCamisas>= 1){
                    listadoProductos.push(cantCamisas + ' Camisas');
                }
                 if(cantEtiquetas>= 1){
                    listadoProductos.push(cantEtiquetas + ' Producto');
                }

                //imprimimir el codigo de inner a html enlazado con el id
                listaProductos.style.display = "block";
                  listaProductos.innerHTML= '';
                for(var i = 0; i< listadoProductos.length; i++){
                    listaProductos.innerHTML+= listadoProductos[i]+ '<br/>'
                }
                suma.innerHTML = '$ ' + totalPagar.toFixed(2);
                console.log(totalPagar);
            }
        }

        function mostrarDias(){
            console.log(pase_dia.value);
            console.log(pase_completo.value);
            console.log(pase_dos_dias.value);
            var boletosDia =parseInt(pase_dia.value, 10) || 0;
            var boletoCompleto =parseInt(pase_completo.value, 10) || 0;
            var boletoDosDias = parseInt(pase_dos_dias.value, 10) || 0;
            
            var diasElegidos = [];
            if(boletosDia>0){
                diasElegidos.push('viernes');

            }
            if(boletoDosDias>0){
                diasElegidos.push('viernes','sabado')
            }
            if(boletoCompleto>0){
                diasElegidos.push('viernes', 'sabado','domingo')
            }

            for(var i = 0 ; i<diasElegidos.length; i++){
                document.getElementById(diasElegidos[i]).style.display= 'block'; //claro aqui lo que hemos hecho es incrementar los dias por tiquete dentro del array entre comillas que corresponden los nombres de los IDE dias lo que cuando invocamos el document.getElement no hace falta rescribir todo el codigo
            }
        
        }

        }) //hemos realizado este evento para cuando el dom se cargue, nos cargue el codigo siguiente
    
})();//Esta es una función que al haber un evento en este caso un addEventListener se carga solo una vez

