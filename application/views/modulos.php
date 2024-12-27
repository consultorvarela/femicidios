<!DOCTYPE html>
<html lang="en">
<?php include 'header.php'; ?>
<body class="g-sidenav-show  ">
<?php include 'sidemenu.php'; ?>
  <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
  <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
      <div class="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">Inicio</a></li>
            <li class="breadcrumb-item text-sm text-dark active" aria-current="page">Modulos</li>
          </ol>
          <h6 class="font-weight-bolder mb-0">Modulos</h6>
        </nav>
        
        <?php include 'topnav.php'; ?>
      </div>
    </nav>
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
  </main>
</body>
<?php include 'footer.php'; ?>
</html>