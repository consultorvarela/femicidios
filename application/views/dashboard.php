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

    <div class="container">
    <h1>Dashboard de Casos</h1>
    
    <!-- Filtros de Fechas -->
    <form method="get" action="<?php echo site_url('main/dashboard'); ?>">
        <div>
            <label>Desde:</label>
            <input type="date" name="desde" value="<?php echo $desde; ?>">
        </div>
        <div>
            <label>Hasta:</label>
            <input type="date" name="hasta" value="<?php echo $hasta; ?>">
        </div>
        <button type="submit">Filtrar</button>
    </form>

    <!-- Resultados -->
    <h2>Casos</h2>
    <table>
        <thead>
            <tr>
                <th>Código</th>
                <th>Título</th>
                <th>Fecha</th>
                <th>Total de Víctimas</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($casos as $caso): ?>
                <tr>
                    <td><?php echo $caso->codigo_caso; ?></td>
                    <td><?php echo $caso->titulo_caso; ?></td>
                    <td><?php echo $caso->fecha; ?></td>
                    <td><?php echo $caso->total_victimas; ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <!-- Gráfica Mensual -->
    <h2>Casos por Mes</h2>
    <canvas id="grafica"></canvas>
</div>

<!-- Scripts para la Gráfica -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    const ctx = document.getElementById('grafica').getContext('2d');
    const data = {
        labels: [
            <?php foreach ($grafica_datos as $dato): ?>
                '<?php echo date('F', mktime(0, 0, 0, $dato->mes, 10)); ?>',
            <?php endforeach; ?>
        ],
        datasets: [{
            label: 'Número de Casos',
            data: [
                <?php foreach ($grafica_datos as $dato): ?>
                    <?php echo $dato->total_casos; ?>,
                <?php endforeach; ?>
            ],
            borderWidth: 1
        }]
    };
    const config = {
        type: 'bar',
        data: data,
    };
    new Chart(ctx, config);
</script>
  </main>
</body>
<?php include 'footer.php'; ?>
</html>