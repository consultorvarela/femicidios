<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class T_model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database();
    }
  
    public function get__by_id($activity_id) {
        $query = $this->db->get_where('model', array('id' => $activity_id));
        return $query->row_array();
    }
}