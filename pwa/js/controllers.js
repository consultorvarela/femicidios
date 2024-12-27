var url = "https://admin.myjobbox.org/api/ws.php?tk=MBA2021&op=";
var urlfoto = "https://admin.myjobbox.org/img/";
// var url = "http://192.168.0.7/Github/Jobbox/dashboard/api/ws.php?tk=MBA2021&op=";
// var urlfoto = "http://192.168.0.7/Github//Jobbox/dashboard/img/";
var U_nombre = "";
var U_apellido = "";
var noti = 0;
var variable = 0;
var verificado = 0;
var proveedor = 0;
var busqueda = 0;
var estrella = 0.0;
var ver = 0;
var perf = 1;
var vperx = 0;
var noti = 0;
angular.module('starter.controllers', [])
.controller('splashCtrl', function($scope,$state) {
  $scope.siguiente=function(){
    $state.go("login")
  }
})

.controller('loginCtrl', function($scope,$state) {

  console.log("entre al control")
  $scope.siguiente2=function(){
    $state.go("verify")
  }

})

.controller('verificationCtrl',function($scope,$state){

  $scope.verificar = function(){
    if($.trim($("#verif").val()) == ""){
      alert("Debes llenar el campo verificación de código")
      return
    }

    op = "validar_codigo";
    id = localStorage.getItem("USUARIO_id");
    codigo = $("#verif").val();
    urlget = url + op + "&id=" + id + "&codigo=" + codigo;
    
    fetch(urlget)
      .then(response => response.json())
      .then(function(result){
        if(result != 0){

          localStorage.setItem("session",1);
          localStorage.setItem("USUARIO_nombre", result["nombre"]);
          localStorage.setItem("USUARIO_apellido", result["apellido"]);
          localStorage.setItem("USUARIO_edad", result["edad"]);
          localStorage.setItem("USUARIO_celular", result["celular"]);
          localStorage.setItem("USUARIO_ciudad", result["ciudad"]);
          localStorage.setItem("USUARIO_correo", result["correo"]);
          $state.go("bienvenida");

        }else{
          document.getElementById("verif").value = "";
          document.getElementById("verif").select();
        }
      })
      .catch(error => console.log('error', error));
    }
})

.controller('bienvenidaCtrl', function($scope,$state) {
  $scope.U_nombre = localStorage.getItem("USUARIO_nombre");
  $scope.U_apellido = localStorage.getItem("USUARIO_apellido");

  setTimeout(function () {
    $('.TamanioBienvenida').animate({"opacity": "100%"}, 700)
    $('.LetraBienvenida').animate({"opacity": "100%"}, 3000)
  }, 100)

  setTimeout(function () {
    $state.go("tab.home")
  }, 4000)

}) 

.controller('enterclientCtrl',function($scope,$state){

  $scope.insertar_usuario = function(){
      // Estos son if para obligar a los usuarios a llenar los campos
      if($.trim($("#ciudad").val()) == "0"){
        alert("Debes llenar el campo ciudad")
        return;
      }

      if($.trim($("#nombre").val()) == ""){
        alert("Debes llenar el campo nombre")
        return;
      }

      if($.trim($("#apellido").val()) == ""){
        alert("Debes llenar el campo apellido")
        return;
      }

      if($.trim($("#edad").val()) == ""){
        alert("Debes llenar el campo edad")
        return;
      }

      if($.trim($("#celular").val()) == ""){
        alert("Debes llenar el campo celular")
        return;
      }
 
      // if($.trim($("#correo").val()) == ""){
      //   alert("Debes llenar el campo correo")
      //   return
      // }
      //Fin de los if
      //consumo de la API
      op = "crear_usuarios";
      var formdata = new FormData();
      formdata.append("nombre", $("#nombre").val());
      formdata.append("apellido", $("#apellido").val());
      formdata.append("edad", $("#edad").val());
      formdata.append("celular", $("#celular").val());
      formdata.append("ciudad", $("#ciudad").val());
      formdata.append("correo", localStorage.getItem("USUARIO_correo"));
      var requestOptions = {
        method: 'POST',
        body: formdata,
      };
      fetch(url + op, requestOptions)
      .then(response => response.json())
      .then(function(result){
        localStorage.setItem("USUARIO_id", result)
      })
      .catch(error => console.log('error', error));
      $state.go("verification");    
  }
})

.controller("tabCtrl",function($scope,$state,$rootScope){

$scope.perx = function(x){
  vperx = x;
  $rootScope.$emit('peremit');
}

 $scope.plan = localStorage.getItem("plan"); 
 var op="ver_area_competencia";
  if(localStorage.getItem("plan") == 1){
    fetch(url + op + "&id_proveedor=" + localStorage.getItem("PERFIL1_id"))
    .then(response => response.json())
    .then(result => $scope.profesion1 = result["area_competencia"])
    .catch(error => console.log('error', error));
  }else if(localStorage.getItem("plan") == 2){
    fetch(url + op + "&id_proveedor=" + localStorage.getItem("PERFIL1_id"))
    .then(response => response.json())
    .then(result => $scope.profesion1 = result["area_competencia"])
    .catch(error => console.log('error', error));
    fetch(url + op + "&id_proveedor=" + localStorage.getItem("PERFIL2_id"))
    .then(response => response.json())
    .then(result => $scope.profesion2 = result["area_competencia"])
    .catch(error => console.log('error', error));
  }else{
    fetch(url + op + "&id_proveedor=" + localStorage.getItem("PERFIL1_id"))
    .then(response => response.json())
    .then(result => $scope.profesion1 = result["area_competencia"])
    .catch(error => console.log('error', error));
    fetch(url + op + "&id_proveedor=" + localStorage.getItem("PERFIL2_id"))
    .then(response => response.json())
    .then(result => $scope.profesion2 = result["area_competencia"])
    .catch(error => console.log('error', error));
  
    fetch(url + op + "&id_proveedor=" + localStorage.getItem("PERFIL3_id"))
    .then(response => response.json())
    .then(result => $scope.profesion3 = result["area_competencia"])
    .catch(error => console.log('error', error));
  }
    
  if(localStorage.getItem("PROVEEDOR_id") != null){
    op="aprovado";
    fetch(url + op + "&id_proveedor=" + localStorage.getItem("PROVEEDOR_id"))
    .then(response => response.json())
    .then(function(result){
      localStorage.setItem("ESTADO", result["aprovado"]);
      $scope.ESTADO = localStorage.ESTADO;
      $scope.$apply();  
    })
    .catch(error => console.log('error', error));
    }else{
      localStorage.setItem("ESTADO", "0");
    }

    $scope.gotouser2 = function(){

      $state.go("tab.user2");
      setTimeout(function(){
        if($(".showprof").css("display") == "none"){
          if(localStorage.ESTADO == 1){
            $(".showprof").show();
          }
  
        }else{
          $(".showprof").hide();
        }
      },200)
    }

    $scope.gotohome = function(){
      $(".showprof").hide();
      $state.go("tab.home");
    }

    $scope.gotosearch = function(){
      $(".showprof").hide();
      $state.go("tab.search");
    }




    
    $scope.gotobell = function(){
      $(".showprof").hide();
      $state.go("tab.bell");
    }
})

.controller('optionCtrl',function($scope,$state){

  $scope.Cerra_Sesion = function(){

    localStorage.removeItem("session");
    localStorage.removeItem("USUARIO_id");
    localStorage.removeItem("USUARIO_nombre");
    localStorage.removeItem("USUARIO_apellido");
    localStorage.removeItem("USUARIO_edad");
    localStorage.removeItem("USUARIO_celular");
    localStorage.removeItem("USUARIO_ciudad");
    localStorage.removeItem("USUARIO_correo");
    localStorage.removeItem("ESTADO");
    localStorage.removeItem("plan");
    localStorage.removeItem("PROVEEDOR_nombre");
    localStorage.removeItem("PROVEEDOR_apellido");
    localStorage.removeItem("PROVEEDOR_edad");
    localStorage.removeItem("PROVEEDOR_Fechanac");
    localStorage.removeItem("PROVEEDOR_celular");
    localStorage.removeItem("PROVEEDOR_ciudad");
    localStorage.removeItem("PROVEEDOR_colonia");
    localStorage.removeItem("PROVEEDOR_civil");
    localStorage.removeItem("PROVEEDOR_identidad");
    localStorage.removeItem("PROVEEDOR_email");
    localStorage.removeItem("PROVEEDOR_facebook");
    localStorage.removeItem("PROVEEDOR_Instagram");
    localStorage.removeItem("PROVEEDOR_WhatsApp");
    localStorage.removeItem("PROVEEDOR_web");
    localStorage.removeItem("PROVEEDOR_titulo");
    localStorage.removeItem("PROVEEDOR_certifica1");
    localStorage.removeItem("PROVEEDOR_certifica2");
    localStorage.removeItem("PROVEEDOR_certifica3");
    localStorage.removeItem("PROVEEDOR_id");
    localStorage.removeItem("PERFIL_p11");
    localStorage.removeItem("PERFIL_p12");
    localStorage.removeItem("PERFIL_p13");
    localStorage.removeItem("PERFIL_p21");
    localStorage.removeItem("PERFIL_p22");
    localStorage.removeItem("PERFIL_p23");
    localStorage.removeItem("PERFIL_p31");
    localStorage.removeItem("PERFIL_p32");
    localStorage.removeItem("PERFIL_p33");
    localStorage.removeItem("PERFIL1_id");
    localStorage.removeItem("PERFIL2_id");
    localStorage.removeItem("PERFIL3_id");
    $state.go('splash');
  }

})

.controller('homeCtrl',function($scope,$state, $ionicSlideBoxDelegate){

 $scope.load = function(){
  setTimeout(function(){$ionicSlideBoxDelegate.update()},500)
 }

  setTimeout(function(){
    var push = PushNotification.init({
      "android": {},
      browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      },
      "ios": { "alert": "true", "badge": "true", "sound": "true" }, "windows": {}
    });
    console.log('push')
    push.on('registration', function (data) {
       //Enviar el data.registrationID al api y asignarselo al usuario
      localStorage.setItem("TOKEN", data.registrationId);
      if(localStorage.getItem("PROVEEDOR_id") != null){
        opp = "actualizar_token_proveedor"; 
        var formdata = new FormData();
        formdata.append("id_proveedor", localStorage.getItem("PROVEEDOR_id"));
        formdata.append("token", localStorage.getItem("TOKEN"));

        var requestOptions = {
          method: 'POST',
          body: formdata
        };

        fetch(url + opp, requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }else{
        opu = "actualizar_token_usuario";
        var formdata = new FormData();
        formdata.append("id_usuario", localStorage.getItem("USUARIO_id"));
        formdata.append("token", localStorage.getItem("TOKEN"));

        var requestOptions = {
          method: 'POST',
          body: formdata
        };

        fetch(url + opu, requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }
    });
    push.on('notification', function (data) {
      //  alert(data.message);
    });
    push.on('error', function (e) {
        console.log(e.message);
      //  alert(e.message);
    });

   }, 4000);
   if(noti == 1){
    op = "notificacion_en_espera";
    fetch(url + op + "&id_proveedor=" + localStorage.getItem("PROVEEDOR_id"))
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    noti = 0;
   } 
   
  $scope.img = urlfoto;
  op = "visualizar_proveedor_destacado";
  fetch(url + op)
  .then(response => response.json())
  .then(function(result){
    console.log(result[0]["estrellas"])
    $scope.destacados = result;
    $scope.$apply();
  })
  .catch(error => console.log('error', error));

  $scope.colorestrella = function(n){
    if(n < 0.5){
      $scope.estrella1 = "#c9c9c9";
      $scope.estrella2 = "#c9c9c9";
      $scope.estrella3 = "#c9c9c9";
      $scope.estrella4 = "#c9c9c9";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 0.5 && n < 1.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#c9c9c9";
      $scope.estrella3 = "#c9c9c9";
      $scope.estrella4 = "#c9c9c9";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 1.5 && n < 2.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#0C375A";
      $scope.estrella3 = "#c9c9c9";
      $scope.estrella4 = "#c9c9c9";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 2.5 && n < 3.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#0C375A";
      $scope.estrella3 = "#0C375A";
      $scope.estrella4 = "#c9c9c9";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 3.5 && n < 4.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#0C375A";
      $scope.estrella3 = "#0C375A";
      $scope.estrella4 = "#0C375A";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 4.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#0C375A";
      $scope.estrella3 = "#0C375A";
      $scope.estrella4 = "#0C375A";
      $scope.estrella5 = "#0C375A";
    }
  }

})

.controller('searchCtrl',function($scope,$state){
  $scope.urlfoto = urlfoto;
  $scope.proveedor = 0; 
  $scope.perf = 1;

  //Boton para buscar proveedor
  $scope.buscar_proveedor = function(){
    op = "buscar_proveedor";
    fetch(url + op + "&ciudad=" + $("#ciudad").val() + "&area_competencia=" + $("#area").val())
    .then(response => response.json())
    .then(function(result){
      if(result == 0){
        console.log(result)
        $scope.proveedor = 0;
        setTimeout(function(){$scope.$apply();},500)        
        return
      }else{
        console.log(result)
        $scope.datos = result;
        $scope.proveedor = 1;
        setTimeout(function(){$scope.$apply();},500) 
        return
      }
    })
    .catch(error => console.log('error', error));
  }

  $scope.destacado = function(n){ 
    $scope.ver = n;
  }

  $scope.colorestrella = function(n){
    if(n < 0.5){
      $scope.estrella1 = "#c9c9c9";
      $scope.estrella2 = "#c9c9c9";
      $scope.estrella3 = "#c9c9c9";
      $scope.estrella4 = "#c9c9c9";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 0.5 && n < 1.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#c9c9c9";
      $scope.estrella3 = "#c9c9c9";
      $scope.estrella4 = "#c9c9c9";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 1.5 && n < 2.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#0C375A";
      $scope.estrella3 = "#c9c9c9";
      $scope.estrella4 = "#c9c9c9";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 2.5 && n < 3.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#0C375A";
      $scope.estrella3 = "#0C375A";
      $scope.estrella4 = "#c9c9c9";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 3.5 && n < 4.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#0C375A";
      $scope.estrella3 = "#0C375A";
      $scope.estrella4 = "#0C375A";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 4.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#0C375A";
      $scope.estrella3 = "#0C375A";
      $scope.estrella4 = "#0C375A";
      $scope.estrella5 = "#0C375A";
    }
  }

  $scope.buscar_proveedor2 = function(){
    if(busqueda == 0){
      op = "buscar_proveedor2";
      busqueda = 1;
    }else{
      op = "buscar_proveedor";
      busqueda = 0;
    }
    fetch(url + op + "&ciudad=" + $("#ciudad").val() + "&area_competencia=" + $("#area").val())
    .then(response => response.json())
    .then(function(result){
      if(result == 0){
        console.log(result)
        $scope.proveedor = 0;
        $scope.$apply();
        return
      }else{
        console.log(result)
        $scope.datos = result;
        $scope.proveedor = 1;
        $scope.$apply();
        return
      }
    })
    .catch(error => console.log('error', error));
  }

  $scope.verperfil = function($id){
    localStorage.setItem("VER_PROVEEDOR", $id);
    $state.go("perfilproveedor");
  }


  //Busca la ciudad en la tabla proveedor
  op = "buscar_ciudad";
  fetch(url + op)
  .then(response => response.json())
  .then(function(result){
    $scope.ciudades = result;
    console.log(result);
    $scope.$apply();
  })
  .catch(error => console.log('error', error));
  //busca profesion en la tabla de area de competicion
  op = "buscar_area";
  fetch(url + op)
  .then(response => response.json())
  .then(function(result){
    $scope.area_competencia = result;
    $scope.$apply();
  })

  .catch(error => console.log('error', error));
})

.controller('user2Ctrl',function($scope,$state,$rootScope){

  $rootScope.$on('peremit', function() {
    $scope.per(vperx);
  });

$scope.urlfoto = urlfoto;
$scope.plan = localStorage.getItem("plan");
$scope.perf = 1;

$scope.solicitar = function(){
  $state.go("solicitarcali");
}

$scope.per = function(n){
  localStorage.setItem("CAMBIA_PERFIL", n);
  $scope.perf = n;
  return
}

op = "ver_proveedor";
fetch(url + op + "&id=" + localStorage.getItem("VER_PROVEEDOR"))
.then(response => response.json())
.then(function(result){
  if(result == 0){
    console.log(result)
    $scope.datosperfil = 0;
    return
  }else{
    console.log(result)
    $scope.datosperfil = result;
    if(result.whatsapp == null){
      $scope.showWa = 0       
    }else{
      $scope.showWa = 1
    }

    
    $scope.$apply();
    return
  }
})
.catch(error => console.log('error', error));

op="ver_area_competencia";
if(localStorage.getItem("plan") == 1){
  fetch(url + op + "&id_proveedor=" + localStorage.getItem("PERFIL1_id"))
  .then(response => response.json())
  .then(result => $scope.profesion1 = result["area_competencia"])
  .catch(error => console.log('error', error));
}else if(localStorage.getItem("plan") == 2){
  fetch(url + op + "&id_proveedor=" + localStorage.getItem("PERFIL1_id"))
  .then(response => response.json())
  .then(result => $scope.profesion1 = result["area_competencia"])
  .catch(error => console.log('error', error));

  fetch(url + op + "&id_proveedor=" + localStorage.getItem("PERFIL2_id"))
  .then(response => response.json())
  .then(result => $scope.profesion2 = result["area_competencia"])
  .catch(error => console.log('error', error));
}else{
  fetch(url + op + "&id_proveedor=" + localStorage.getItem("PERFIL1_id"))
  .then(response => response.json())
  .then(result => $scope.profesion1 = result["area_competencia"])
  .catch(error => console.log('error', error));
  fetch(url + op + "&id_proveedor=" + localStorage.getItem("PERFIL2_id"))
  .then(response => response.json())
  .then(result => $scope.profesion2 = result["area_competencia"])
  .catch(error => console.log('error', error));

  fetch(url + op + "&id_proveedor=" + localStorage.getItem("PERFIL3_id"))
  .then(response => response.json())
  .then(result => $scope.profesion3 = result["area_competencia"])
  .catch(error => console.log('error', error));
}





$scope.irfb = function(){
  window.location.replace(localStorage.getItem("PROVEEDOR_facebook"));
}
$scope.irinsta = function(){
  window.location.replace(localStorage.getItem("PROVEEDOR_Instagram"));
}
$scope.irwha = function(){
  window.location.replace("https://api.whatsapp.com/send?phone=504" + localStorage.getItem("PROVEEDOR_WhatsApp"));
}
$scope.tel = localStorage.getItem("PROVEEDOR_celular");
$scope.irweb = function(){
  window.location.replace(localStorage.getItem("PROVEEDOR_web"));
}

$scope.colorestrella = function(n){
    if(n < 0.5){
      $scope.estrella1 = "#c9c9c9";
      $scope.estrella2 = "#c9c9c9";
      $scope.estrella3 = "#c9c9c9";
      $scope.estrella4 = "#c9c9c9";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 0.5 && n < 1.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#c9c9c9";
      $scope.estrella3 = "#c9c9c9";
      $scope.estrella4 = "#c9c9c9";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 1.5 && n < 2.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#0C375A";
      $scope.estrella3 = "#c9c9c9";
      $scope.estrella4 = "#c9c9c9";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 2.5 && n < 3.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#0C375A";
      $scope.estrella3 = "#0C375A";
      $scope.estrella4 = "#c9c9c9";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 3.5 && n < 4.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#0C375A";
      $scope.estrella3 = "#0C375A";
      $scope.estrella4 = "#0C375A";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 4.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#0C375A";
      $scope.estrella3 = "#0C375A";
      $scope.estrella4 = "#0C375A";
      $scope.estrella5 = "#0C375A";
    }
  }
  
  op = "estrellas";
  fetch(url + op + "&id=" + localStorage.getItem("PROVEEDOR_id"))
  .then(response => response.json())
  .then(function(result){
    console.log(result);
    $scope.estrella = result["estrellas"];
    $scope.foto = result["foto"];
    setTimeout(function (){
      if(result["estrellas"] >= 0.5 && result["estrellas"] < 1.5){
        $("#estrell1").css("color", "#0C375A");

        $("#estrella1").css("color", "#0C375A");
        $scope.$apply();
        return
      }
      if(result["estrellas"] >= 1.5 && result["estrellas"] < 2.5){
        $("#estrella1").css("color", "#0C375A");
        $("#estrella2").css("color", "#0C375A");

        $("#estrell1").css("color", "#0C375A");
        $("#estrell2").css("color", "#0C375A");
        $scope.$apply();
        return
      }
      if(result["estrellas"] >= 2.5 && result["estrellas"] < 3.5){
        $("#estrella1").css("color", "#0C375A");
        $("#estrella2").css("color", "#0C375A");
        $("#estrella3").css("color", "#0C375A");

        $("#estrell1").css("color", "#0C375A");
        $("#estrell2").css("color", "#0C375A");
        $("#estrell3").css("color", "#0C375A");
        $scope.$apply();
        return
      }
      if(result["estrellas"] >= 3.5 && result["estrellas"] < 4.5){
        $("#estrella1").css("color", "#0C375A");
        $("#estrella2").css("color", "#0C375A");
        $("#estrella3").css("color", "#0C375A");
        $("#estrella4").css("color", "#0C375A");

        $("#estrell1").css("color", "#0C375A");
        $("#estrell2").css("color", "#0C375A");
        $("#estrell3").css("color", "#0C375A");
        $("#estrell4").css("color", "#0C375A");
        $scope.$apply();
        return
      }
      if(result["estrellas"] == 5){
        $("#estrella1").css("color", "#0C375A");
        $("#estrella2").css("color", "#0C375A");
        $("#estrella3").css("color", "#0C375A");
        $("#estrella4").css("color", "#0C375A");
        $("#estrella5").css("color", "#0C375A");

        $("#estrell1").css("color", "#0C375A");
        $("#estrell2").css("color", "#0C375A");
        $("#estrell3").css("color", "#0C375A");
        $("#estrell4").css("color", "#0C375A");
        $("#estrell5").css("color", "#0C375A");
        $scope.$apply();
        return
      }
    }, 100)
  })
  .catch(error => console.log('error', error));



  op = "ver_comentarios";
  fetch(url + op + "&id_proveedor=" + localStorage.getItem("PROVEEDOR_id"))
  .then(response => response.json())
  .then(function(result){
    if(result != 0){
      $scope.datos = result;
    }else{
      $scope.datos = 0;
    }
  })
  .catch(error => console.log('error', error));

  op = "verificado_jobbox";
  fetch(url + op + "&id=" + localStorage.getItem("PROVEEDOR_id"))
  .then(response => response.json())
  .then(function(result){
    if(result["verificado_jobbox"] == 1){
      $scope.verificado = 1;
      $scope.$apply();
      return
    }else{
      $scope.verificado = 0;
      $scope.$apply();
      return
    }
  })
  .catch(error => console.log('error', error));


  $scope.PROVEEDOR_certifica1 = localStorage.PROVEEDOR_certifica1
  $scope.PROVEEDOR_titulo = localStorage.PROVEEDOR_titulo
  $scope.PERFIL_p11 = localStorage.PERFIL_p11
  $scope.PERFIL_p12 = localStorage.PERFIL_p12
  $scope.PERFIL_p13 = localStorage.PERFIL_p13

  $scope.PERFIL_p21 = localStorage.PERFIL_p21
  $scope.PERFIL_p22 = localStorage.PERFIL_p22
  $scope.PERFIL_p23 = localStorage.PERFIL_p23

  $scope.PERFIL_p31 = localStorage.PERFIL_p31
  $scope.PERFIL_p32 = localStorage.PERFIL_p32
  $scope.PERFIL_p33 = localStorage.PERFIL_p33

  setTimeout(function () {
    op = "activo"
    fetch(url + op + "&id=" + localStorage.getItem("PROVEEDOR_id"))
    .then(response => response.json())
    .then(function(result){
      if(result["activo"] == 1){
        $("#idactivo").prop('checked', true);
        return
      }else{
        $("#idactivo").prop('checked', false);
        return
      }
    })
    .catch(error => console.log('error', error));
  }, 100)



  $scope.activar = function(){

    if($("#idactivo").prop('checked') == true){
      variable = 1;
    }else{
      variable = 0;
    }
    op = "activar";
    var formdata = new FormData();
    formdata.append("id", localStorage.getItem("PROVEEDOR_id"));
    formdata.append("activo", variable);

    var requestOptions = {
      method: 'POST',
      body: formdata,
    };

    fetch(url + op, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


  if(localStorage.getItem("PROVEEDOR_id") != null){
  op="aprovado";
  fetch(url + op + "&id_proveedor=" + localStorage.getItem("PROVEEDOR_id"))
  .then(response => response.json())
  .then(function(result){
    localStorage.setItem("ESTADO", result["aprovado"]);
    $scope.ESTADO = localStorage.ESTADO;
    $scope.$apply();  
  })
  .catch(error => console.log('error', error));
  }else{
    localStorage.setItem("ESTADO", "0");
    $scope.ESTADO = localStorage.ESTADO;
  }
  
  $scope.PROVEEDOR_nombre = localStorage.PROVEEDOR_nombre;
  $scope.PROVEEDOR_apellido = localStorage.PROVEEDOR_apellido;
  $scope.plan1 = function(){
    localStorage.setItem("plan", "1");
    $scope.plan = localStorage.plan;
    $state.go("enterproveedor");
  }
  $scope.plan2 = function(){
    localStorage.setItem("plan", "2");
    $scope.plan = localStorage.plan;
    $state.go("enterproveedor");
  }
  $scope.plan3 = function(){
    localStorage.setItem("plan", "3");
    $scope.plan = localStorage.plan;
    $state.go("enterproveedor");
  }

  $scope.usarcpon = function(){
    op = "verificar_cupon";
    codigo = $("#codigo").val();
    fetch(url + op + "&codigo=" + codigo)
    .then(response => response.json())
    .then(function(result){
    if(result == 0){
      alert("Código incorrecto");
    }else{
      op2 = "agregar_cupon_usuario";
      var formdata = new FormData();
      formdata.append("id", localStorage.getItem("USUARIO_id"));
      formdata.append("cupon", result[0]["id"]);

      var requestOptions = {
        method: 'POST',
        body: formdata,
      };

      fetch(url + op2, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      alert("Se a guardado tu cupon");
    }
  })
  .catch(error => console.log('error', error));
  }

})

.controller('bellCtrl',function($scope,$state){

    $scope.tod = function(){
      $scope.noti = 2;
      $scope.colorTodo = "background-color: #F0F0F0";
      $scope.colorPlataforma = "background-color: #FFFFFF";
      $scope.colorApp = "background-color: #FFFFFF";
      op = "notificaciones_todo";
      fetch(url + op + "&id_proveedor=0&id_proveedor=" + localStorage.getItem("PROVEEDOR_id"))
      .then(response => response.json())
      .then(function(result){
        console.log(result);
        $scope.todo = result;
        $scope.$apply();
      })
      .catch(error => console.log('error', error));
    }

    $scope.plat = function(){
      $scope.noti = 0;
      $scope.colorTodo = "background-color: #FFFFFF";
      $scope.colorPlataforma = "background-color: #F0F0F0";
      $scope.colorApp = "background-color: #FFFFFF";
      op = "notificaciones_plataforma";
      fetch(url + op + "&id_proveedor=0")
      .then(response => response.json())
      .then(function(result){
        console.log(result);
        $scope.plataforma = result;
        $scope.$apply();
      })
      .catch(error => console.log('error', error));
    }
    

    $scope.App = function(){
      $scope.noti = 1;
      $scope.colorTodo = "background-color: #FFFFFF";
      $scope.colorPlataforma = "background-color: #FFFFFF";
      $scope.colorApp = "background-color: #F0F0F0";
      op = "notificaciones_app";
      fetch(url + op + "&id_proveedor=" + localStorage.getItem("PROVEEDOR_id"))
      .then(response => response.json())
      .then(function(result){
        console.log(result);
        $scope.app = result;
        $scope.$apply();
      })
      .catch(error => console.log('error', error));
    }

    $scope.load = function(){
      $scope.plat();
    }

})

.controller('planesCtrl',function($scope,$state){

  $scope.usarcpon = function(){
    op = "verificar_cupon";
    codigo = $("#codigo").val();
    fetch(url + op + "&codigo=" + codigo)
    .then(response => response.json())
    .then(function(result){
    if(result == 0){
      alert("Código incorrecto");
    }else{
      op2 = "agregar_cupon_usuario";
      var formdata = new FormData();
      formdata.append("id", localStorage.getItem("USUARIO_id"));
      formdata.append("cupon", result[0]["id"]);

      var requestOptions = {
        method: 'POST',
        body: formdata,
      };

      fetch(url + op2, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      alert("Se a guardado tu cupon");
    }
  })
  .catch(error => console.log('error', error));
  }

  
  $scope.plan1 = function(){
    localStorage.setItem("plan", "1");
    $state.go("enterproveedor");
  }
  $scope.plan2 = function(){
    localStorage.setItem("plan", "2");
    $state.go("enterproveedor");
  }
  $scope.plan3 = function(){
    localStorage.setItem("plan", "3");
    $state.go("enterproveedor");
  }
})

.controller('enterproveedorCtrl',function($scope,$state){
  if (localStorage.USUARIO_nombre != null){
   // $scope.nombre = localStorage.getItem("USUARIO_nombre");
  }
  if (localStorage.USUARIO_apellido != null){
   // $scope.apellido = localStorage.getItem("USUARIO_apellido");
  }
  if (localStorage.USUARIO_celular != null){
   // $scope.celular = localStorage.getItem("USUARIO_celular");
  }
  if (localStorage.USUARIO_edad != null){
   // $scope.edad = localStorage.getItem("USUARIO_edad");
  }
  if (localStorage.USUARIO_ciudad != null){
   // $scope.ciudad = localStorage.getItem("USUARIO_ciudad");
  }
  $scope.insertar_proveedor = function(){
      
      if($.trim($("#nombre").val()) == ""){
        alert("Debes llenar el campo nombre")
        return
      }
      if($.trim($("#apellido").val()) == ""){
        alert("Debes llenar el campo apellido")
        return
      }
      if($.trim($("#edad").val()) == ""){
        alert("Debes llenar el campo edad")
        return
      }
      if($.trim($("#Fechanac").val()) == ""){
        alert("Debes llenar el campo fecha de nacimiento")
        return
      }
      if($.trim($("#celular").val()) == ""){
        alert("Debes llenar el campo celular")
        return
      }
      if($.trim($("#ciudad").val()) == ""){
        alert("Debes llenar el campo ciudad")
        return
      }
      if($.trim($("#colonia").val()) == ""){
        alert("Debes llenar el campo recidencial")
        return
      }
      if($.trim($("#civil").val()) == ""){
        alert("Debes llenar el campo estado civil")
        return
      }
      if($.trim($("#id").val()) == ""){
        alert("Debes llenar el campo estado identidad")
        return
      }
      localStorage.setItem("PROVEEDOR_nombre", $("#nombre").val());
      localStorage.setItem("PROVEEDOR_apellido", $("#apellido").val());
      localStorage.setItem("PROVEEDOR_edad", $("#edad").val());
      localStorage.setItem("PROVEEDOR_Fechanac", $("#Fechanac").val());
      localStorage.setItem("PROVEEDOR_celular", $("#celular").val());
      localStorage.setItem("PROVEEDOR_ciudad", $("#ciudad").val());
      localStorage.setItem("PROVEEDOR_colonia", $("#colonia").val());
      localStorage.setItem("PROVEEDOR_civil", $("#civil").val());
      localStorage.setItem("PROVEEDOR_identidad", $("#id").val());
      $state.go("enterproveedor2");
  }
})

.controller('enterproveedor2Ctrl',function($scope,$state){
  if (localStorage.USUARIO_correo != null){
  //  $scope.correo = localStorage.getItem("USUARIO_correo");
  }
  $scope.insertar_proveedor2 = function(){
    if($.trim($("#email").val()) == ""){
        alert("Debes llenar el campo Email")
        return
    }
    localStorage.setItem("PROVEEDOR_email", $("#email").val());
    localStorage.setItem("PROVEEDOR_facebook", $("#facebook").val());
    localStorage.setItem("PROVEEDOR_Instagram", $("#Instagram").val());
    localStorage.setItem("PROVEEDOR_WhatsApp", $("#WhatsApp").val());
    localStorage.setItem("PROVEEDOR_web", $("#web").val());
    $state.go("enterproveedor3");
  }
})

.controller('enterproveedor3Ctrl',function($scope,$state){


  $scope.setpic = function(){
    navigator.camera.getPicture( function(imageData){
      //imageData = "file:///storage/emulated/0/Android/data/io.teayudoappgt.rel/cache/IMG_20201029_144723.jpg"
            var arr = String(imageData).split("?");
            imageData = arr[0];
           
           var filename = imageData.substring(imageData.lastIndexOf('/')+1);
           var path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
    
           $("#propic").attr("src",imageData);
           $("#propic").attr("path",imageData);


            console.log(imageData);


    }, ()=>{}, {
        quality: 90,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,          
        allowEdit: false,
        correctOrientatin: true,
        targetHeight:500,
        targetWidth:500
    });
  }


  $scope.insertar_proveedor3 = function(){

    localStorage.setItem("PROVEEDOR_titulo", $("#titulo").val());
    localStorage.setItem("PROVEEDOR_certifica1", $("#certifica1").val());
    localStorage.setItem("PROVEEDOR_certifica2", $("#certifica2").val());
    localStorage.setItem("PROVEEDOR_certifica3", $("#certifica3").val());
    op = "crear_proveedores";
    var formdata = new FormData();
    formdata.append("id_usuario", localStorage.getItem("USUARIO_id"));
    formdata.append("nombre", localStorage.getItem("PROVEEDOR_nombre"));
    formdata.append("apellido", localStorage.getItem("PROVEEDOR_apellido"));
    formdata.append("edad", localStorage.getItem("PROVEEDOR_edad"));
    formdata.append("fecha_nac", localStorage.getItem("PROVEEDOR_Fechanac"));
    formdata.append("celular", localStorage.getItem("PROVEEDOR_celular"));
    formdata.append("ciudad", localStorage.getItem("PROVEEDOR_ciudad"));
    formdata.append("colonia", localStorage.getItem("PROVEEDOR_colonia"));
    formdata.append("estado_civil", localStorage.getItem("PROVEEDOR_civil"));
    formdata.append("identidad", localStorage.getItem("PROVEEDOR_identidad"));
    formdata.append("email", localStorage.getItem("PROVEEDOR_email"));
    formdata.append("facebook", localStorage.getItem("PROVEEDOR_facebook"));
    formdata.append("instagram", localStorage.getItem("PROVEEDOR_Instagram"));
    formdata.append("whatsapp", localStorage.getItem("PROVEEDOR_WhatsApp"));
    formdata.append("web", localStorage.getItem("PROVEEDOR_web"));
    formdata.append("titulo", $("#titulo").val());
    formdata.append("instit_certifica1", $("#certifica1").val());
    formdata.append("instit_certifica2", $("#certifica2").val());
    formdata.append("instit_certifica3", $("#certifica3").val());
    formdata.append("propuesta", $("#propuesta").val());
    formdata.append("foto", "persona.png");
    formdata.append("plan", localStorage.getItem("plan"));
    var requestOptions = {
      method: 'POST',
      body: formdata,
};

  fetch(url + op, requestOptions)
  .then(response => response.json())
  .then((result) => {
    localStorage.setItem("PROVEEDOR_id", result)
    var imageURI = $("#propic").attr("path");

    console.log(imageURI);
    var urls = url + "updateuserpropic&proveedor=" + localStorage.PROVEEDOR_id ; 
            var options = new FileUploadOptions();
            options.fileKey = "img";
            options.fileName = 'upload.png';
            options.chunkedMode = false;
            var ft = new FileTransfer(); 
              ft.upload(imageURI, urls ,  (result) => {
                console.log(result);
                       $state.go("perfil");
                   },null,options)
                   
  })
  .catch(error => console.log('error', error));

  }

})

.controller('perfilCtrl',function($scope,$state){

  
  //Aqui saca la informacion de la base de datos
  op = "obtener_area_competencia";
  var formdata = new FormData();

  var requestOptions = {
    method: 'POST',
    body: formdata,
  };
  fetch(url + op, requestOptions)
  .then(response => response.json())
  .then(function(result){
    $scope.opciones = result;
    $scope.$apply();
  })
  .catch(error => console.log('error', error));

  $scope.plan = localStorage.getItem("plan");
  var bandera1 = 0;
  var bandera2 = 0;
  var bandera3 = 0;

  $scope.desplegar = function(){
    if(bandera1 == 0){
      $('.perfil1').animate({"height": "45px"}, 500)
      $('.Visibilidad3').animate({"opacity": "0%"}, 500)
      document.getElementById("p1area").disabled = true;
      document.getElementById("p11").disabled = true;
      document.getElementById("p12").disabled = true;
      document.getElementById("p13").disabled = true;
      $('#flecha1').attr("src","./img/derecha.png")
      bandera1 = 1;
    }else{
      bandera1 = 0;
      $('.perfil1').animate({"height": "235px"}, 500)
      $('.Visibilidad3').animate({"opacity": "100%"}, 500)
      document.getElementById("p1area").disabled = false;
      document.getElementById("p11").disabled = false;
      document.getElementById("p12").disabled = false;
      document.getElementById("p13").disabled = false;
      $('#flecha1').attr("src","./img/abajo.png")
    }
  }



  $scope.desplegar2 = function(){
    if(bandera2 == 0){
      $('.perfil2').animate({"height": "235px"}, 500)
      $('.Visibilidad').animate({"opacity": "100%"}, 500)
      document.getElementById("p2area").disabled = false;
      document.getElementById("p21").disabled = false;
      document.getElementById("p22").disabled = false;
      document.getElementById("p23").disabled = false;
      $('#flecha2').attr("src","./img/abajo2.png")
      bandera2 = 1;
    }else{
      bandera2 = 0
      $('.perfil2').animate({"height": "45px"}, 500)
      $('.Visibilidad').animate({"opacity": "0%"}, 500)
      document.getElementById("p2area").disabled = true;
      document.getElementById("p21").disabled = true;
      document.getElementById("p22").disabled = true;
      document.getElementById("p23").disabled = true;
      $('#flecha2').attr("src","./img/derecha3.png")
    }
  }

  $scope.desplegar3 = function(){
    if(bandera3 == 0){
      $('.perfil3').animate({"height": "235px"}, 500)
      $('.Visibilidad2').animate({"opacity": "100%"}, 500)
      document.getElementById("p3area").disabled = false;
      document.getElementById("p31").disabled = false;
      document.getElementById("p32").disabled = false;
      document.getElementById("p33").disabled = false;
      $('#flecha3').attr("src","./img/abajo3.png")
      bandera3 = 1;
    }else{
      bandera3 = 0
      $('.perfil3').animate({"height": "45px"}, 500)
      $('.Visibilidad2').animate({"opacity": "0%"}, 500)
      document.getElementById("p3area").disabled = true;
      document.getElementById("p31").disabled = true;
      document.getElementById("p32").disabled = true;
      document.getElementById("p33").disabled = true;
      $('#flecha3').attr("src","./img/derecha4.png")
    }
  }

  $scope.agregarperfil = function(){

    localStorage.setItem("PERFIL_p11", $("#p11").val());
    localStorage.setItem("PERFIL_p12", $("#p12").val());
    localStorage.setItem("PERFIL_p13", $("#p13").val());

    localStorage.setItem("PERFIL_p21", $("#p21").val());
    localStorage.setItem("PERFIL_p22", $("#p22").val());
    localStorage.setItem("PERFIL_p23", $("#p23").val());

    localStorage.setItem("PERFIL_p31", $("#p31").val());
    localStorage.setItem("PERFIL_p32", $("#p32").val());
    localStorage.setItem("PERFIL_p33", $("#p33").val());

    if($.trim($("#p1area").val()) == ""){
      alert("Debes llenar el campo area de competencia")
      return
    }
    if ($('#terminos').prop('checked') == false) {
      alert("Debe aceptar los terminos y condiciones"); 
      return
    }

    var op2 = "guardar_perfil";
    var formdata = new FormData();
    formdata.append("id_proveedor", localStorage.getItem("PROVEEDOR_id"));
    formdata.append("id_area", $("#p1area").val());
    formdata.append("especialidad1", $("#p11").val());
    formdata.append("especialidad2", $("#p12").val());
    formdata.append("especialidad3", $("#p13").val());

    var requestOptions = {
      method: 'POST',
      body: formdata
    };

    fetch(url + op2, requestOptions)
      .then(response => response.json())
      .then(result => localStorage.setItem("PERFIL1_id", result))
      .catch(error => console.log('error', error));


    if(localStorage.getItem("plan") >= 2){
      if($.trim($("#p2area").val()) == ""){
        alert("Debes llenar el campo area de competencia del perfil 2")
        return
      }
      var formdata = new FormData();
      formdata.append("id_proveedor", localStorage.getItem("PROVEEDOR_id"));
      formdata.append("id_area", $("#p2area").val());
      formdata.append("especialidad1", $("#p21").val());
      formdata.append("especialidad2", $("#p22").val());
      formdata.append("especialidad3", $("#p23").val());

      var requestOptions = {
        method: 'POST',
        body: formdata
      };

      fetch(url + op2, requestOptions)
        .then(response => response.json())
        .then(result => localStorage.setItem("PERFIL2_id", result))
        .catch(error => console.log('error', error));
    }

    if(localStorage.getItem("plan") == 3){
      if($.trim($("#p3area").val()) == ""){
        alert("Debes llenar el campo area de competencia del perfil 3")
        return
      }
      var formdata = new FormData();
      formdata.append("id_proveedor", localStorage.getItem("PROVEEDOR_id"));
      formdata.append("id_area", $("#p3area").val());
      formdata.append("especialidad1", $("#p31").val());
      formdata.append("especialidad2", $("#p32").val());
      formdata.append("especialidad3", $("#p33").val());

      var requestOptions = {
        method: 'POST',
        body: formdata
      };

      fetch(url + op2, requestOptions)
        .then(response => response.json())
        .then(result => localStorage.setItem("PERFIL3_id", result))
        .catch(error => console.log('error', error));
    }
    $state.go("gracias");
  }
})

.controller('graciasCtrl', function($scope,$state) {
  setTimeout(function () {
    $('.mover').animate({"margin-left": "0%"}, 500)
  }, 500)

  setTimeout(function () {
    $('.TamanioBienvenida2').animate({"margin-left": "0%"}, 1500)
  }, 500)

  setTimeout(function () {
    noti = 1
    $state.go("tab.home")
  }, 4000)

})

.controller('perfilproveedorCtrl',function($scope,$state){

  $scope.ir = function(link){
    window.location.replace(link);
  }
  $scope.irw = function(link){
    window.location.replace("https://api.whatsapp.com/send?phone=504" + link);
  }


  $scope.urlfoto = urlfoto;
  $scope.colorestrellas = function(n){
    if(n < 0.5){
      $scope.estrella1 = "#c9c9c9";
      $scope.estrella2 = "#c9c9c9";
      $scope.estrella3 = "#c9c9c9";
      $scope.estrella4 = "#c9c9c9";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 0.5 && n < 1.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#c9c9c9";
      $scope.estrella3 = "#c9c9c9";
      $scope.estrella4 = "#c9c9c9";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 1.5 && n < 2.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#0C375A";
      $scope.estrella3 = "#c9c9c9";
      $scope.estrella4 = "#c9c9c9";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 2.5 && n < 3.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#0C375A";
      $scope.estrella3 = "#0C375A";
      $scope.estrella4 = "#c9c9c9";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 3.5 && n < 4.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#0C375A";
      $scope.estrella3 = "#0C375A";
      $scope.estrella4 = "#0C375A";
      $scope.estrella5 = "#c9c9c9";
    }
    if(n >= 4.5){
      $scope.estrella1 = "#0C375A";
      $scope.estrella2 = "#0C375A";
      $scope.estrella3 = "#0C375A";
      $scope.estrella4 = "#0C375A";
      $scope.estrella5 = "#0C375A";
    }
  }


  op = "estrellas";
  fetch(url + op + "&id=" + localStorage.getItem("VER_PROVEEDOR"))
  .then(response => response.json())
  .then(function(result){
    $scope.estrella = result["estrellas"];
    setTimeout(function (){
      if(result["estrellas"] >= 0.5 && result["estrellas"] < 1.5){
        $("#estrellas1").css("color", "#0C375A");

        $("#e1").css("color", "#0C375A");
        $scope.$apply();
        return
      }
      if(result["estrellas"] >= 1.5 && result["estrellas"] < 2.5){
        $("#estrellas1").css("color", "#0C375A");
        $("#estrellas2").css("color", "#0C375A");

        $("#e1").css("color", "#0C375A");
        $("#e2").css("color", "#0C375A");
        $scope.$apply();
        return
      }
      if(result["estrellas"] >= 2.5 && result["estrellas"] < 3.5){
        $("#estrellas1").css("color", "#0C375A");
        $("#estrellas2").css("color", "#0C375A");
        $("#estrellas3").css("color", "#0C375A");

        $("#e1").css("color", "#0C375A");
        $("#e2").css("color", "#0C375A");
        $("#e3").css("color", "#0C375A");
        $scope.$apply();
        return
      }
      if(result["estrellas"] >= 3.5 && result["estrellas"] < 4.5){
        $("#estrellas1").css("color", "#0C375A");
        $("#estrellas2").css("color", "#0C375A");
        $("#estrellas3").css("color", "#0C375A");
        $("#estrellas4").css("color", "#0C375A");

        $("#e1").css("color", "#0C375A");
        $("#e2").css("color", "#0C375A");
        $("#e3").css("color", "#0C375A");
        $("#e4").css("color", "#0C375A");
        $scope.$apply();
        return
      }
      if(result["estrellas"] == 5){
        $("#estrellas1").css("color", "#0C375A");
        $("#estrellas2").css("color", "#0C375A");
        $("#estrellas3").css("color", "#0C375A");
        $("#estrellas4").css("color", "#0C375A");
        $("#estrellas5").css("color", "#0C375A");

        $("#e1").css("color", "#0C375A");
        $("#e2").css("color", "#0C375A");
        $("#e3").css("color", "#0C375A");
        $("#e4").css("color", "#0C375A");
        $("#e5").css("color", "#0C375A");
        $scope.$apply();
        return
      }
    }, 100)
  })
  .catch(error => console.log('error', error));

  
  op = "ver_comentarios";
  fetch(url + op + "&id_proveedor=" + localStorage.getItem("VER_PROVEEDOR"))
  .then(response => response.json())
  .then(function(result){
    if(result != 0){
      $scope.datos = result;
    }else{
      $scope.datos = 0;
    }
  })
  .catch(error => console.log('error', error));

  op = "ver_proveedor";
    fetch(url + op + "&id=" + localStorage.getItem("VER_PROVEEDOR"))
    .then(response => response.json())
    .then(function(result){
      if(result == 0){
        console.log(result)
        $scope.datosperfil = 0;
        return
      }else{
        console.log(result)
        $scope.datosperfil = result;
        if(result.whatsapp == null){
          $scope.showWa = 0       
        }else{
          $scope.showWa = 1
        } 
        $scope.$apply();
        return
      }
    })
    .catch(error => console.log('error', error));

  $scope.cerrar = function(){
    $state.go("tab.search");
  }
})

.controller('calificarCtrl',function($scope,$state){

$scope.img = urlfoto;
function getParameterByName(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


var provId = getParameterByName("id_proveedor");
var usurId = getParameterByName("id_usuario");

    op = "ver_proveedor";
    fetch(url + op + "&id=" + provId)
    .then(response => response.json())
    .then(function(result){
      if(result == 0){
        console.log(result)
        return
      }else{
        console.log(result)
        $scope.datosperfil = result;
        $scope.$apply();
        return
      }
    })
    .catch(error => console.log('error', error));
    

    $scope.calificar = function(){
      $scope.comentario_realizado = 0;
      op = "ver_comentarios_realizado";
      fetch(url + op + "&id_proveedor=" + provId + "&id_cliente=" + usurId)
      .then(response => response.json())
      .then(function(result){
        console.log(result);
        $scope.prueba = result;
        if($scope.prueba == 0){
          op = "califica";
          var formdata = new FormData();
          formdata.append("estrellas", localStorage.getItem("ESTRELLAS"));
          formdata.append("comentario", $("#comentario").val());
          formdata.append("id_proveedor", provId);
          formdata.append("id_cliente", usurId);

          var requestOptions = {
            method: 'POST',
            body: formdata
          };

          fetch(url + op, requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
          $state.go("graciasxenviar");
        }else{
          alert("Ya calificaste a este proveedor");
        } 
        $scope.$apply();
      })
      .catch(error => console.log('error', error));
    }
    $scope.valoracion = 0;
    $scope.star1 = "stargray";
    $scope.star2 = "stargray";
    $scope.star3 = "stargray";
    $scope.star4 = "stargray";
    $scope.star5 = "stargray";
    $scope.touchstar = (value) => {
      localStorage.setItem("ESTRELLAS", value);
      $scope.valoracion = value;
      switch (value) {
        case 1:
          $scope.star1 = "staryellow";
          $scope.star2 = "stargray";
          $scope.star3 = "stargray";
          $scope.star4 = "stargray";
          $scope.star5 = "stargray";
          break;
        case 2:
          $scope.star1 = "staryellow";
          $scope.star2 = "staryellow";
          $scope.star3 = "stargray";
          $scope.star4 = "stargray";
          $scope.star5 = "stargray";
          break;
        case 3:
          $scope.star1 = "staryellow";
          $scope.star2 = "staryellow";
          $scope.star3 = "staryellow";
          $scope.star4 = "stargray";
          $scope.star5 = "stargray";
          break;
        case 4:
          $scope.star1 = "staryellow";
          $scope.star2 = "staryellow";
          $scope.star3 = "staryellow";
          $scope.star4 = "staryellow";
          $scope.star5 = "stargray";
          break;
        case 5:
          $scope.star1 = "staryellow";
          $scope.star2 = "staryellow";
          $scope.star3 = "staryellow";
          $scope.star4 = "staryellow";
          $scope.star5 = "staryellow";
          break;
      }
    }
})

.controller('solicitarcaliCtrl',function($scope,$state){
  $scope.btnenviar = function(){
    if($.trim($("#nombre").val()) == ""){
      alert("Debes llenar el campo nombre")
      return
    }
    if($.trim($("#apellido").val()) == ""){
      alert("Debes llenar el campo apellido")
      return
    }
    if($.trim($("#correo").val()) == ""){
      alert("Debes llenar el campo correo")
      return
    }

    op = "crear_solicitud";
    var formdata = new FormData();
    formdata.append("nombre", $("#nombre").val());
    formdata.append("apellido", $("#apellido").val());
    formdata.append("correo", $("#correo").val());
    formdata.append("id_proveedor", localStorage.getItem("PROVEEDOR_id"));

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(url + op, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      $state.go("solicitgracias");
  }
})

.controller('solicitgraciasCtrl',function($scope,$state){
  setTimeout(function () {
    $('.TamanioBienvenida').animate({"opacity": "100%"}, 700)
    $('.LetraBienvenida').animate({"opacity": "100%"}, 3000)
    }, 100)

    setTimeout(function () {
      $state.go("tab.user2")
    }, 4000)
})

.controller('graciasxenviarCtrl',function($scope,$state){
  setTimeout(function () {
    $('.mover').animate({"margin-left": "0%"}, 500)
  }, 500)

  setTimeout(function () {
    $('.TamanioBienvenida2').animate({"margin-left": "0%"}, 1500)
  }, 500)

  setTimeout(function () {
    noti = 1
  }, 4000)
})

.controller('autenticarCtrl',function($scope,$state){
  $scope.Ver_Usuario = function(){
    op = "ver_usuario";
    fetch(url + op + "&correo=" + $('#Correo').val())
    .then(response => response.json())
    .then(function(result){
      console.log(result)
      if(result == 0){
        localStorage.setItem("USUARIO_correo", $('#Correo').val());
        $state.go('enterclient');
      }else{
        localStorage.setItem("USUARIO_id", result['id']);
        localStorage.setItem("USUARIO_nombre", result['nombre']);
        localStorage.setItem("USUARIO_apellido", result['apellido']);
        localStorage.setItem("USUARIO_edad", result['edad']);
        localStorage.setItem("USUARIO_celular", result['celular']);
        localStorage.setItem("USUARIO_ciudad", result['ciudad']);
        localStorage.setItem("USUARIO_correo", result['correo']);

        //======================================================================
        op = "visualizar_proveedor";
        fetch(url + op + "&id_usuario=" + localStorage.getItem("USUARIO_id"))
        .then(response => response.json())
        .then(function(result){
          console.log(result)
          if(result == 0){
            $state.go('verification');
          }else{
            localStorage.setItem("ESTADO", result['aprovado']);
            localStorage.setItem("plan", result['plan']);
            localStorage.setItem("PROVEEDOR_nombre", result['nombre']);
            localStorage.setItem("PROVEEDOR_apellido", result['apellido']);
            localStorage.setItem("PROVEEDOR_edad", result['edad']);
            localStorage.setItem("PROVEEDOR_Fechanac", result['fecha_nac']);
            localStorage.setItem("PROVEEDOR_celular", result['celular']);
            localStorage.setItem("PROVEEDOR_ciudad", result['ciudad']);
            localStorage.setItem("PROVEEDOR_colonia", result['colonia']);
            localStorage.setItem("PROVEEDOR_civil", result['estado_civil']);
            localStorage.setItem("PROVEEDOR_identidad", result['identidad']);
            localStorage.setItem("PROVEEDOR_email", result['email']);
            localStorage.setItem("PROVEEDOR_facebook", result['facebook']);
            localStorage.setItem("PROVEEDOR_Instagram", result['instagram']);
            localStorage.setItem("PROVEEDOR_WhatsApp", result['whatsapp']);
            localStorage.setItem("PROVEEDOR_web", result['web']);
            localStorage.setItem("PROVEEDOR_titulo", result['titulo']);
            localStorage.setItem("PROVEEDOR_certifica1", result['instit_certifica1']);
            localStorage.setItem("PROVEEDOR_certifica2", result['instit_certifica2']);
            localStorage.setItem("PROVEEDOR_certifica3", result['instit_certifica3']);
            localStorage.setItem("PROVEEDOR_id", result['id']);
            //=====================================================================
            op = "ver_perfil";
            fetch(url + op + "&id_proveedor=" + localStorage.getItem("PROVEEDOR_id"))
            .then(response => response.json())
            .then(function(result){

              if(localStorage.plan > 2){
                localStorage.setItem("PERFIL_p31", result[2]['especialidad1']);
                localStorage.setItem("PERFIL_p32", result[2]['especialidad2']);
                localStorage.setItem("PERFIL_p33", result[2]['especialidad3']);
                localStorage.setItem("PERFIL3_id", result[2]['id']);
              }

              if(localStorage.plan > 1){
                localStorage.setItem("PERFIL_p21", result[1]['especialidad1']);
                localStorage.setItem("PERFIL_p22", result[1]['especialidad2']);
                localStorage.setItem("PERFIL_p23", result[1]['especialidad3']);
                localStorage.setItem("PERFIL2_id", result[1]['id']);
              }

                localStorage.setItem("PERFIL_p11", result[0]['especialidad1']);
                localStorage.setItem("PERFIL_p12", result[0]['especialidad2']);
                localStorage.setItem("PERFIL_p13", result[0]['especialidad3']);
                localStorage.setItem("PERFIL1_id", result[0]['id']);

            })
            .catch(error => console.log('error', error));
            $state.go('verification');
          }
        })
        .catch(error => console.log('error', error));
        
      }
    })
    .catch(error => console.log('error', error));
  }
})