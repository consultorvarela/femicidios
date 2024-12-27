<!DOCTYPE html>
<html>
<?php include 'header.php'; ?>
<script>
     localStorage.apiurl = "https://dash.myferby.com/fondamkt/dash/api/ws.php;";
     localStorage.base = "https://dash.myferby.com/fondamkt/dash/"; 
    </script>
 <body  style="background-image:url(<?php echo base_url(); ?>bg.png);background-repeat: no-repeat;background-size: cover" class="h-100">
    <div class="login-form-bg h-100">
        <div  class="container h-100"> 
            <div class="row justify-content-center h-100">
                <div class="col-xl-6">
                    <div class="form-input-content" style="margin-top:20vh">
                        <div class="card login-form ">
                            <div class="card-body ">
                                <a class="text-center" > 
                                <!-- logo base href in root logo.png -->
                                    <img src="<?php echo base_url(); ?>logofull.png" alt="logo" style="width: 33%;margin-left:33%"></a>
                                </a>
                                <form action = "<?php echo base_url(); ?>autenticacion.php" method = "post" class=login-input">
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Usuario" name = "txtUsuario" id="txtUsuario">
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" placeholder="Contraseña" type="password" name = "txtPassword" id = "txtPassword">
                                    </div>
                                    <button type="submit"  style="background:#00bce4;color:white" class="btn login-form__btn submit w-100">Iniciar Sesión</button>
                                </form>
                          
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>    
</body>
</html>