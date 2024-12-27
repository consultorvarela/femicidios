<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AuthController extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->helper('url');
        $this->load->library('form_validation');
        $this->load->library('email');

        // Aplicar middleware CORS
        $this->handleCors();
    }
  




    private function handleCors() {
        // Allow from any origin
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');    // cache for 1 day
        }

        // Access-Control headers are received during OPTIONS requests
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

            exit(0);
        }
    }



    public function login() {
        // Retrieve the raw POST data
        $jsonData = file_get_contents('php://input');
        // Decode the JSON data into a PHP associative array
        $data = json_decode($jsonData, true);

        // Check if decoding was successful and required fields are set
        if ($data !== null && isset($data['email']) && isset($data['otp'])) {
            $email = $data['email'];
            $otp = $data['otp'];
        } else {
            // JSON decoding failed or required fields not provided
            http_response_code(400); // Bad Request
            echo json_encode(['status' => 'error', 'message' => 'Invalid JSON data or missing fields']);
            return;
        }

        $this->db->where('email', $email);
        $this->db->where('otp', $otp);
        $query = $this->db->get('usuarios');

        if ($query->num_rows() == 1) {
            $user = $query->row();
            echo json_encode(['status' => 'success', 'user' => ['id' => $user->id_usuario,'first_name' => $user->last_name,'last_name' => $user->cell_phone,'cell_phone' => $user->id_usuario,'is_complete' => $user->is_complete, 'email' => $user->email]]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid login credentials']);
        }
    }

}