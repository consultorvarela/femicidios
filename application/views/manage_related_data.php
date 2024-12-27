<!DOCTYPE html>
<html lang="en">
<?php include 'header.php'; ?>
<body class="g-sidenav-show  ">
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
        <li class="nav-item">
            <a onlick="setactive('x')"  id="x" class="nav-link" href="/index.php/main/victimas_crud_data/<?php echo $id_caso; ?>">
              <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="icy fa fa-arrow-right"></i>
            </div>
              <span class="nav-link-text ms-1">Víctimas</span>
            </a>
          </li>
          <li class="nav-item">
            <a onlick="setactive('x')"  id="x" class="nav-link" href="/index.php/main//victimarios_crud_data/<?php echo $id_caso; ?>">
              <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="icy fa fa-arrow-right"></i>
            </div>
              <span class="nav-link-text ms-1">Victimarios</span>
            </a>
          </li>
          <li class="nav-item">
            <a onlick="setactive('x')"  id="x" class="nav-link" href="/index.php/main/observaciones_crud_data/<?php echo $id_caso; ?>">
              <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="icy fa fa-arrow-right"></i>
            </div>
              <span class="nav-link-text ms-1">Observaciones</span>
            </a>
          </li>
          <li class="nav-item">
            <a onlick="setactive('x')"  id="x" class="nav-link" href="/index.php/main/casos_2/">
              <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="icy fa fa-arrow-left"></i>
            </div>
              <span class="nav-link-text ms-1">Regresar</span>
            </a>
          </li>
      </ul>
    </div>

</aside>
  <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
  <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
  <div class="container-fluid py-4">
      <div class="row mt-4">
        <div class="col-lg-12">
          <div class="card h-100 p-3">
          <div>


                <?php echo $output; ?>
                </div>
                <?php foreach($js_files as $file): ?>
                    <script src="<?php echo $file; ?>"></script>
                <?php endforeach; ?>
                <?php 
              foreach($css_files as $file): ?>
                <link type="text/css" rel="stylesheet" href="<?php echo $file; ?>" />
              <?php endforeach; ?>
          </div>
        </div>
      </div>
    </div>
    </nav>
   
  </main>
</body>
<?php include 'footer.php'; ?>
</html>