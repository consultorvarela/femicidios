<?php
if (isset($_COOKIE["Usuario"]) && !Empty($_COOKIE["Usuario"])){   
?>

<aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl  fixed-start  " id="sidenav-main">
    <div class="sidenav-header" style="height:auto !important" >
      <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a class="navbar-brand m-0" target="_blank">
        <img src="<?php echo base_url(); ?>logo.png"  style="width:100%; margin-top:0px;margin-bottom:0px;max-height: none;"/>
      </a>
    </div>
    <hr class="horizontal light mt-0">
    <div class="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
      <ul class="navbar-nav">

      <?php 
      if($_COOKIE["Usuario"] == "admin"){
        $sql = "SELECT * FROM `modulos` ORDER BY prioridad" ;

        $result = mysqli_query($con,$sql);
        $roles = array();
        while($row = mysqli_fetch_assoc($result)){
          $roles[] = $row;
        } 
        foreach ($roles as $rol) {
          ?>
          <li class="nav-item">
            <a onlick="setactive('<?php echo $rol["identificador"] ?>')"  id="<?php echo $rol["identificador"] ?>" class="nav-link" href="<?php echo base_url(); ?>index.php/<?php echo $rol["controller"] ?>/<?php echo $rol["identificador"] ?>">
              <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="icy fa fa-arrow-right"></i>
            </div>
              <span class="nav-link-text ms-1"><?php echo $rol["display_name"] ?></span>
            </a>
          </li>
          <?php
        }
      }else{
        $get_sis_user_sql = "SELECT id FROM sisusers WHERE usuario = '".$_COOKIE["Usuario"]."'";
    
        $result = mysqli_query($con,$get_sis_user_sql);
        $row = mysqli_fetch_assoc($result);
        $id_sis_user = $row["id"];

        $sql = "SELECT * FROM `modulos` WHERE id IN (
    
          SELECT id_modulo from roles WHERE id_sis_user =  $id_sis_user
        
        ) ORDER BY prioridad" ;
  

        $result = mysqli_query($con,$sql);
        $roles = array();
        while($row = mysqli_fetch_assoc($result)){
          $roles[] = $row;
        }
        foreach ($roles as $rol) {
          ?>
          <li class="nav-item">
            <a onlick="setactive('<?php echo $rol["identificador"] ?>')"  id="<?php echo $rol["identificador"] ?>" class="nav-link" href="<?php echo base_url(); ?>index.php/<?php echo $rol["controller"] ?>/<?php echo $rol["identificador"] ?>">
              <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="icy fa fa-arrow-right"></i>
            </div>
              <span class="nav-link-text ms-1"><?php echo $rol["display_name"] ?></span>
            </a>
          </li>
          <?php
        }

      }
       
      ?>
        
      </ul>
      <br><br><br><br>
    

  </aside>


  <?php
}else{
   header("Location: ".base_url()."index.php/login/show");
}
?>