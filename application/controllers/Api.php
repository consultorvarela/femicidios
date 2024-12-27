<?php
defined('BASEPATH') OR exit('No direct script access allowed');

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

class Api extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Model');
    }


    public function get_all() {
        $query = $this->db->query('SELECT * FROM TABLA');
        $result = $query->result();
        echo json_encode($result);
    }
}
