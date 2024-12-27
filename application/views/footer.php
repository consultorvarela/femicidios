  <script src="<?php echo base_url(); ?>theme/assets/js/core/popper.min.js"></script>
  <script src="<?php echo base_url(); ?>theme/assets/js/core/bootstrap.min.js"></script>

  <script src="<?php echo base_url(); ?>theme/assets/js/plugins/chartjs.min.js"></script>
  <script src="<?php echo base_url(); ?>theme/assets/js/soft-ui-dashboard.min.js?v=1.0.3"></script>

  <script>


  $(document).ready(function(){
    function toggleNav() {
      const bodyClassList = document.body.classList;
      if (bodyClassList.contains('g-sidenav-show') && bodyClassList.contains('g-sidenav-pinned')) {
        bodyClassList.remove('g-sidenav-pinned');
      } else {
        bodyClassList.add('g-sidenav-show', 'g-sidenav-pinned');
      }
    }

    // Call toggleNav() when your toggle button or trigger is clicked
    // For example, assuming you have a button with id="toggleButton":
    const toggleButton = document.getElementById('toggler');
    toggleButton.addEventListener('click', toggleNav);

  })


</script>