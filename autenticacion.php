<?php
include 'conexion.php';
session_start();//Este codigo inicia session 
    if (isset($_POST['txtUsuario']) && !Empty($_POST['txtUsuario'])&&
       isset($_POST['txtPassword']) && !Empty($_POST['txtPassword'])){
        $usuario = $_POST['txtUsuario'];
        $password = $_POST['txtPassword'];
        $salt = "pae1320lakeside";
        $MD5Password = $password;
        $query2 = "SELECT * FROM sisusers WHERE usuario = '".$usuario."' and password = '".$MD5Password."'";
        $query = mysqli_query($con, $query2); 
        $nr = mysqli_num_rows($query);
        if ($nr == 1){// Si encuentra los 2 datos genera una fila y accesa  a place  
           $_SESSION["Usuario"]=$usuario;
           setcookie("Usuario", $usuario, time() + (86400 * 30), "/");   
           $row = $query -> fetch_assoc();
         //   print_r($row);
           setcookie("user_type", $row["tipo_usuario"], time() + (86400 * 30), "/");
           //set cookie idmodulo
             setcookie("id_modulo", $row["id_modulo"], time() + (86400 * 30), "/");
           if($row["tipo_usuario"] == 2){
            header("Location: index.php/home/show");
           }else{
            header("Location: index.php/home/show");
           }     
         
        }else if ($nr == 0) {//El usuario y el password no se encontro en la data base
         header("Location: index.php/login/show?login=e"); 
        }
   }else{//Los campos de usuario ó password no se encontraron 
      header("Location:  index.php/login/show");
   }
   
?>