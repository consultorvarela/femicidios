<?php

use Phppot\DataSource;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;

require_once 'DataSource.php';
$db = new DataSource();
$conn = $db->getConnection();
require_once('./vendor/autoload.php');

if (isset($_POST["import"])) {
    // print_r($_REQUEST);

    $allowedFileType = [ 
        'application/vnd.ms-excel',
        'text/xls',
        'text/xlsx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (in_array($_FILES["file"]["type"], $allowedFileType)) {

        $targetPath = 'uploads/' . $_FILES['file']['name'];
        move_uploaded_file($_FILES['file']['tmp_name'], $targetPath);

        $Reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();

        $spreadSheet = $Reader->load($targetPath);
        $excelSheet = $spreadSheet->getActiveSheet();
        $spreadSheetAry = $excelSheet->toArray();
        $sheetCount = count($spreadSheetAry);

        for ($i = 1; $i <= $sheetCount; $i++) {
        

            if (isset($spreadSheetAry[$i][0])) {
                $str_name = mysqli_real_escape_string($conn, $spreadSheetAry[$i][0]);
                $fecha = $str_name;
            }


            if (isset($spreadSheetAry[$i][1])) {
                $str_name = mysqli_real_escape_string($conn, $spreadSheetAry[$i][1]);
                $at = $str_name;
            }

            if (isset($spreadSheetAry[$i][2])) {
                $str_name = mysqli_real_escape_string($conn, $spreadSheetAry[$i][2]);
                $guia = $str_name;
            }

            if (isset($spreadSheetAry[$i][3])) {
                $str_name = mysqli_real_escape_string($conn, $spreadSheetAry[$i][3]);
                $tracking_de_miami = $str_name;
            }

            if (isset($spreadSheetAry[$i][4])) {
                $str_name = mysqli_real_escape_string($conn, $spreadSheetAry[$i][4]);
                $nombre = $str_name;
            }

            if (isset($spreadSheetAry[$i][5])) {
                $str_name = mysqli_real_escape_string($conn, $spreadSheetAry[$i][5]);
                $pesoxcobrar = $str_name;
            }

            if (isset($spreadSheetAry[$i][6])) {
                $str_name = mysqli_real_escape_string($conn, $spreadSheetAry[$i][6]);
                $pesoacobrar = $str_name;
            }

            if (isset($spreadSheetAry[$i][7])) {
                $str_name = mysqli_real_escape_string($conn, $spreadSheetAry[$i][7]);
                $validacionbodega = $str_name;
            }

            if (isset($spreadSheetAry[$i][8])) {
                $str_name = mysqli_real_escape_string($conn, $spreadSheetAry[$i][8]);
                $valorapagar = $str_name;
            }


            if (isset($spreadSheetAry[$i][9])) {
                $str_name = mysqli_real_escape_string($conn, $spreadSheetAry[$i][9]);
                $correo = $str_name;
            }


            if (isset($spreadSheetAry[$i][10])) {
                $str_name = mysqli_real_escape_string($conn, $spreadSheetAry[$i][10]);
                $ciudad = $str_name;
            }

            if (isset($spreadSheetAry[$i][11])) {
                $str_name = mysqli_real_escape_string($conn, $spreadSheetAry[$i][11]);
                $direccion = $str_name;
            }


            if (isset($spreadSheetAry[$i][12])) {
                $str_name = mysqli_real_escape_string($conn, $spreadSheetAry[$i][12]);
                $usr = $str_name;
            }

            if (isset($spreadSheetAry[$i][13])) {
                $str_name = mysqli_real_escape_string($conn, $spreadSheetAry[$i][13]);
                $numeropaquetes = $str_name;
            }

            if (isset($spreadSheetAry[$i][14])) {
                $str_name = mysqli_real_escape_string($conn, $spreadSheetAry[$i][14]);
                $tipo_de_envio = $str_name;
            }


            
            if(validateusuario($correo,$nombre)){
                    // Check if the user exists or create a new one
                    $query = "SELECT id_usuario FROM usuarios WHERE email = '$correo'";

                    $result = mysqli_query($conn, $query);

                    if (mysqli_num_rows($result) == 0) {

                        //get ciudad
                        $cityuser = getsucursal($ciudad);
                        // User does not exist, create a new user
                        $query = "INSERT INTO usuarios (email,nombre,id_ciudad) VALUES ('$correo','$nombre','$cityuser')";
                        mysqli_query($conn, $query);
                        $id_usuario = mysqli_insert_id($conn);
                    } else {
                        // User exists, get the id
                        $row = mysqli_fetch_assoc($result);
                        $id_usuario = $row['id_usuario'];
                    }
                    
                    // Check if the current peso is zero
                    if ($pesoacobrar != 0) {
                        echo "Cliente ".$nombre . " Peso a cobrar".$pesoacobrar ;
                        $sucursal = getsucursal($ciudad);
                        // Insert into lotes table
                            $fecha = sqldateconverter($fecha);
                            $valorapagar = deletecommanbumberformat($valorapagar);

                            //checkifrowloteexists
                        if(checkifrowloteexists($guia,$pesoxcobrar,$pesoacobrar,$valorapagar,$id_usuario,$tipo_de_envio,$fecha,$conn)){
                                echo "skip duplicate found <br>";
                        }else{  
                            $query = "INSERT INTO `lotes` (`id_lote`, `guia`, `peso`, `pesoacobrar` , `precio`, `id_usuario`, `tipo`, `id_estado`, `id_sucursal`, `pagado`) 
                            VALUES 
                            (NULL, '$guia', '$pesoxcobrar', '$pesoacobrar', '$valorapagar', '$id_usuario', '$tipo_de_envio', '1', '$sucursal', '0')";
                                $result = mysqli_query($conn, $query);

                                //check if insert ocurred 
                                if($result){
                                    echo "Lote insertado"."<br>";
                                }else{
                                    echo "Error ". $query."<br>";
                                }


                            $last_insert_id = mysqli_insert_id($conn);

                            // Insert into paquetes table
                            $query_paq = "INSERT INTO paquetes (id_lote, guia) VALUES ('$last_insert_id', '$tracking_de_miami')";
                            $result_paq = mysqli_query($conn, $query_paq);

                            //check if insert ocurred 
                            if($result_paq){
                                echo "Paquete insertado(1)"."<br>";
                            }else{
                                echo "Error al insertar paquete(1) "."INSERT INTO paquetes (id_lote, guia) VALUES ('$last_insert_id', '$tracking_de_miami')"."<br>";
                            }
                        }
                        
                    }else{
                       if (checkifpaqueteexists($tracking_de_miami,$conn)){
                            echo "Skip Paquete ya existe <br>";
                       }else{
                        // Insert into paquetes table
                        $query_paq_2 = "INSERT INTO paquetes (id_lote, guia) VALUES ('$last_insert_id', '$tracking_de_miami')";
                        $result_paq_2 = mysqli_query($conn, $query_paq_2);

                        //check if insert ocurred 
                        if($result_paq_2){
                            echo "Paquete insertado (2)"."<br>";
                        }else{
                            echo "Error al insertar paquete (2)"."INSERT INTO paquetes (id_lote, guia) VALUES ('$last_insert_id', '$tracking_de_miami')" ."<br>";
                        }
                       }



                    }
            }else{
                echo "Usuario invalido";
            }
        }
    } else {
        $type = "error";
        $message = "Archivo invalido.";
    }

    echo json_encode(array(
        "ok" => "OK"
    ));
}




function sqldateconverter($date ){
    //expected format 29/12/23 01:10 PM
    $date = str_replace('/', '-', $date);
    $date = date('Y-m-d H:i:s', strtotime($date));
    return $date;
}

function checkifrowloteexists($guia,$pesoxcobrar,$pesoacobrar,$valorapagar,$id_usuario,$tipo_de_envio,$fecha,$conn){
    //SELECT * FROM lotes WHERE guia = 'GUIA199' AND precio = '896' AND id_usuario = '1033' AND peso LIKE '6.4';
    $query = "SELECT * FROM lotes WHERE guia = '$guia' AND precio = '$valorapagar' AND id_usuario = '$id_usuario' AND peso LIKE '$pesoxcobrar' AND pesoacobrar LIKE '$pesoacobrar' AND fecha LIKE '$fecha'";    
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) > 0) {
        return true;
    }else{
        return false;
    }
}

function checkifpaqueteexists($tracking_de_miami,$conn){
    $query = "SELECT * FROM paquetes WHERE guia = '$tracking_de_miami'";
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) > 0) {
        return true;
    }else{
        return false;
    }
}

function validateusuario($email,$nombre){
    if($email == ""){
        return false;
    }
    if($nombre == ""){
        return false;
    }
    return true;
}

function getsucursal($str){

    switch ($str) {
        case "TEGUCIGALPA":
        return 1;
        case "CHOLUTECA":
        return 2;
        case "DANLI":
        return 3;
        default:
        return 1;
    }
}

function deletecommanbumberformat($number){
    //expecred format 1,000.00
    $number = str_replace(',', '', $number);
    return $number;

}


//function createoption($nombre_opcion,$grupo_opcion,$estado,$precio_opcion,$id_producto,$sku){
   //en la base de datos hay un campo llamado id_modificador ese puede ser la llave de actualizacion 
//}

//function update_option($nombre_opcion,$grupo_opcion,$estado,$precio_opcion,$sku){
   //en la base de datos hay un campo llamado id_modificador ese puede ser la llave de actualizacion 
//}