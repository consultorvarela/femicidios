<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper('url');
		$this->load->library('grocery_CRUD');
	}

	public function _example_output($output = null)
	{
		$this->load->view('home.php',(array)$output);
	}

	public function index()
	{
		$this->_example_output((object)array('output' => '' , 'js_files' => array() , 'css_files' => array()));
	}

    public function show()
	{
			$crud = new grocery_CRUD();
			$crud->unset_clone();
			$crud->unset_read();
			$crud->set_table('empti');
			$output = $crud->render();
			$this->_example_output($output);
	}

function autoprimary2($post_array) {
     $post_array['place_id'] = $_COOKIE["frb_place_id"];
    return $post_array;
}

}
