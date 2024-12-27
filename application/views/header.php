<head>

<meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <title>
  Anything Roatan
  </title>
  <?php require 'conexion.php'; mysqli_set_charset($con, "utf8");?>
     
  <!--     Fonts and icons     -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
  <!-- Nucleo Icons -->
  <link href="<?php echo base_url(); ?>/theme/assets/css/nucleo-icons.css" rel="stylesheet" />
  <link href="<?php echo base_url(); ?>/theme/assets/css/nucleo-svg.css" rel="stylesheet" />
  <!-- Font Awesome Icons -->

  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet" />


  <link href="<?php echo base_url(); ?>/theme/assets/css/nucleo-svg.css" rel="stylesheet" />
  <!-- CSS Files -->
  <link id="pagestyle" href="<?php echo base_url(); ?>/theme/assets/css/soft-ui-dashboard.css?v=1.0.3" rel="stylesheet" />
<link src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

<script async defer
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDP-v9BcjAD4P7WMhBsvtnf8N13u173N6A">
</script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="//code.jquery.com/jquery-1.12.4.js"></script>
<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Split the current URL by "/"
    var urlParts = window.location.pathname.split('/');
    
    // Remove empty segments from the array, which might occur due to leading or trailing slashes
    urlParts = urlParts.filter(part => part);

    // Get all elements with the 'nav-link' class (assuming you already have the IDs in an array)
    var navLinks = document.querySelectorAll('.nav-link');

    // Iterate over each URL part
    urlParts.forEach(function(part) {
        // Then iterate over each navLink to find a match
        navLinks.forEach(function(navLink) {
            if(navLink.id === part) {
                // If the ID matches the URL part, add the "active" class
                navLink.classList.add('active');
            }
        });
    });
});

</script>
<style>

@font-face {
  font-family: 'pluto';
  src: url("https://royalcargo.linkdeusuarios.com/font/pluto.otf") format("opentype");
}
body {
  font-family: 'pluto', sans-serif; /* Fallback to a sans-serif font if 'pluto' is not available */
}

.navbar-vertical.bg-white .navbar-nav .nav-link .icon {
  all: unset;
}


.navbar-vertical .navbar-nav>.nav-item .nav-link.active .icon {
  background-image: linear-gradient(310deg, #00bce4 0%, #ff9900  100%);
}

.bg-gradient-primary{
    background-image: linear-gradient(310deg, #00bce4 0%, #ff9900  100%);
}

.nav-link .icy{
    font-size: 20px;
    top: -1px;
    color: white;
}

.table.align-items-center td, .table.align-items-center th {
    vertical-align: top;
}

.glassgos{
  margin-bottom: 132px !important;
}
.navbar-vertical.navbar-expand-xs .navbar-collapse {
    display: block;
    overflow: auto;
    height: 65vh !important;
}
.navbar-vertical.navbar-expand-xs .navbar-nav .nav-link {
    padding-top: 0.675rem;
    padding-bottom: 0.675rem;
    margin: 0 1rem;
    color: white;
} 
.navbar-vertical .navbar-nav .nav-item .nav-link .icon {
    background-color: transparent !important;
    border: 1px solid rgba(256,256,256,0.3);
    border-radius:0px;
    padding-right: 14px;
    padding-left: 14px;
    padding-top: 17px;
    padding-bottom: 14px;
}
.sidenav{
  background: rgb(3,82,152);
  background: linear-gradient(153deg, rgba(3,82,152,1) 0%, rgba(51,131,186,1) 35%, rgba(102,185,229,1) 100%);
    border-radius: 0px 30px 30px 0px;
    color: white !important;
    box-shadow: 0px 0px 48px -1px rgba(0,0,0,0.75) !important;
    -webkit-box-shadow: 0px 0px 48px -1px rgba(0,0,0,0.75) !important;
    -moz-box-shadow: 0px 0px 48px -1px rgba(0,0,0,0.75) !important;
}
.flexigrid .btn-primary{
    background-color: #f3ab7e !important;
}
main{
    background-color: #e6eaf1 !important;
}
nav{
  background-color: #e6eaf1 !important;
}
.main-content {
  min-height: 100vh;
}
.buttonpi{
  unset: all;
  background: linear-gradient(to right, #FF7E5F, #e35f40, #ff3a0b);
    border-radius: 10px;
    color: white;
    width: 100%;
    max-width:150px;
    text-align: center;
    padding-left: 1em;
    padding-right: 1em;
    border: none;
}
h6{
  font-size: 25px;
}
body{
  background-color: #e6eaf1 !important;
}
.logoholder{
  unset:all;
}
div.flexigrid a:hover {
  color:none !important;
  text-decoration: none !important;
}
input{
  max-width: 74vw;
}
select{
  max-width: 74vw;
}
@media screen and (max-width: 600px) {
  .nav{
    background-color: rgba(255, 255, 255, -0.2) !important ;
  }
}
    </style>

</head>