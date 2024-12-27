<?php 
if(isset($_GET["id"])){ 
  setcookie("nico_lugar_id", $_GET["id"], time() - 10, "/");
  setcookie("nico_lugar_id", $_GET["id"], time() + (86400 * 30), "/");

 $host= $_SERVER["HTTP_HOST"]; 
$port= $_SERVER["SERVER_PORT"]; 
if($port == 80){
  $host = 'ferby-dbserver';
     $user = 'nicodash';
     $password = 'BVgOEE1p1UD5MWYS';
     $db = 'crud-nico';
}else{
     $host = 'ferby-dbserver';
     $user = 'nicodash';
     $password = 'BVgOEE1p1UD5MWYS';
     $db = 'crud-nico';
}
if($host == "localhost"){ 
     $host = 'localhost';
     $user = 'root';
     $password = '';
     $db = 'nico';
} 

  $conexion =@mysqli_connect($host,$user, $password, $db) or die ("Problema en la conexion");
  $query = mysqli_query($conexion,"SELECT * FROM `lugar` WHERE `id_lugar` = ".$_GET["id"]);
  $fila=$query->fetch_assoc();

  setcookie("nombre", $fila["nombre"], time() - 10, "/");
  setcookie("nombre", $fila["nombre"], time() + (86400 * 30), "/");

  setcookie("foto", $fila['foto'], time() - 10, "/");
  setcookie("foto", $fila['foto'], time() + (86400 * 30), "/");

}

 $host= $_SERVER["HTTP_HOST"]; 
$port= $_SERVER["SERVER_PORT"]; 
if($port == 80){
    header('Location: https://dash.myferby.com/nicodash/nico/index.php/home/show');
}else{
    header('Location: https://dash.myferby.com/nicodash/nico/index.php/home/show');
}
if($host == "localhost"){ 
   header('Location: http://localhost/Github/nicoapp/nico/index.php/home/show');
}
?>