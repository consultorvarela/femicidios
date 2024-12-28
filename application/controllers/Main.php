<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
#[\AllowDynamicProperties]
class Main extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper('url');
        $this->load->model('t_model');
        $this->load->library('session');
		$this->load->library('grocery_CRUD');
	}

	public function main_output($output, $view, $extraData = array())
	{
		// Merge the output array with any extra data
		$data = array_merge((array)$output, $extraData);
	
		// Load the view with the combined data
		$this->load->view($view, $data);
	}

	public function index()
	{
		$this->main_output((object)array('output' => '' , 'js_files' => array() , 'css_files' => array()));
	}

	
	public function modulos()
	{
			$crud = new grocery_CRUD();
			$crud->unset_clone();
			$crud->set_table('modulos');
			$output = $crud->render();
			$title = "Módulos";
			$context = array("title" => $title);
			$view = 'main.php';
			$this->main_output($output,$view,$context);
	}
	public function casos_2()
	{
		$crud = new grocery_CRUD();
		$crud->unset_clone();
		$crud->set_table('casos');
		$crud->set_subject('Caso');
		
		// Configuración de los campos de Casos
		$crud->fields('fecha', 'hora', 'ámbito', 'lugar_específico', 'departamento', 'municipio', 'aldea', 'titulo_caso', 'codigo_caso');
		$crud->required_fields('fecha', 'titulo_caso', 'codigo_caso');
		
		// Agregar un botón personalizado para administrar datos relacionados
		$crud->add_action('Administrar', 's', 's', 'ui-icon-pencil', function ($primary_key) {
			return site_url('main/victimas_crud_data/' . $primary_key);
		});
	
		// Renderizado
		$output = $crud->render();
		$title = "Casos";
		$context = array("title" => $title);
		$view = 'main.php';
		$this->main_output($output, $view, $context);
	}
	// Función para gestionar tablas relacionadas
	public function observaciones_crud_data($id_caso)
	{
		// Cargar subformulario para las observaciones relacionadas
		$observaciones_crud = new grocery_CRUD();
		$observaciones_crud->set_table('observaciones');
		$observaciones_crud->set_subject('Observación');
		$observaciones_crud->where('id_caso', $id_caso);
		
		// Configurar campos
		$observaciones_crud->fields('id_caso', 'agencia', 'numero_crimen', 'foto_disponible', 'fuente', 'enlaces');
		$observaciones_crud->field_type('id_caso', 'hidden', $id_caso);
		// Renombrar columnas para una mejor presentación
		$observaciones_crud->display_as('agencia', 'Agencia Responsable')
						   ->display_as('numero_crimen', 'Número de Crimen')
						   ->display_as('foto_disponible', 'Fotografía')
						   ->display_as('fuente', 'Fuente de Información')
						   ->display_as('enlaces', 'Enlaces Relacionados');
		
		// Configurar campo para subir imágenes
		if (!file_exists('uploads/observaciones')) {
			mkdir('uploads/observaciones', 0777, true);
		}
		$observaciones_crud->set_field_upload('foto_disponible', 'uploads/observaciones');
		// Asignar automáticamente el id_caso antes de la inserción
		$observaciones_crud->callback_before_insert(function ($post_array) use ($id_caso) {
			$post_array['id_caso'] = $id_caso; // Asignar id_caso desde el parámetro
			return $post_array;
		});
			
		// Renderizar el subformulario
		$observaciones_output = $observaciones_crud->render();
	
		// Pasar los datos a la vista
		$title = "Observaciones del Caso";
		$context = array("title" => $title, "id_caso" => $id_caso);
		$view = 'manage_related_data.php';
		$this->main_output($observaciones_output, $view, $context);
	}
	public function victimas_crud_data($id_caso)
	{
		// Cargar subformularios para las tablas relacionadas
		$victimas_crud = new grocery_CRUD();
		$victimas_crud->set_table('victimas');
		$victimas_crud->set_subject('Víctima');
		$victimas_crud->where('id_caso', $id_caso);
		$victimas_crud->fields('id_caso','nombre', 'edad', 'etnia_id', 'ocupación', 'numero_hijos', 'estado_embarazo', 'hubo_violacion', 'tipo_arma_id', 'manera_muerte', 'desaparecida_antes', 'tipo_violencia_id');
		$victimas_crud->set_relation('etnia_id', 'etnia', 'nombre_etnia');
		$victimas_crud->set_relation('tipo_arma_id', 'tipo_de_arma', 'nombre_tipo_arma');
		$victimas_crud->set_relation('tipo_violencia_id', 'tipo_de_violencia', 'nombre_tipo_violencia');
	    // Renombrar columnas para una mejor presentación
		$victimas_crud->field_type('id_caso', 'hidden', $id_caso);
		$victimas_crud->display_as('nombre', 'Nombre Completo')
		->display_as('edad', 'Edad')
		->display_as('etnia_id', 'Etnia')
		->display_as('ocupación', 'Ocupación')
		->display_as('numero_hijos', 'Número de Hijos')
		->display_as('estado_embarazo', 'Estado de Embarazo')
		->display_as('hubo_violacion', '¿Hubo Violación?')
		->display_as('tipo_arma_id', 'Tipo de Arma Utilizada')
		->display_as('manera_muerte', 'Manera de la Muerte')
		->display_as('desaparecida_antes', '¿Desaparecida Antes?')
		->display_as('tipo_violencia_id', 'Tipo de Violencia');

		// Configuración de los campos booleanos para mostrar "Sí" o "No"
		$victimas_crud->field_type('estado_embarazo', 'dropdown', array(1 => 'Sí', 0 => 'No'));
		$victimas_crud->field_type('hubo_violacion', 'dropdown', array(1 => 'Sí', 0 => 'No'));
		$victimas_crud->field_type('desaparecida_antes', 'dropdown', array(1 => 'Sí', 0 => 'No'));
		// Asignar automáticamente el id_caso antes de la inserción
		$victimas_crud->callback_before_insert(function ($post_array) use ($id_caso) {
			$post_array['id_caso'] = $id_caso; // Asignar id_caso desde el parámetro
			return $post_array;
		});
		
		// Renderizar los subformularios
		$victimas_output = $victimas_crud->render();

	
		// Pasar los datos a la vista
	
		$title = "Casos";
		$context = array("title" => $title,"id_caso"=> $id_caso);
		$view = 'manage_related_data.php';
		$this->main_output($victimas_output , $view, $context);
	}
	public function victimarios_crud_data($id_caso)
	{
		$victimarios_crud = new grocery_CRUD();
	
		$victimarios_crud->set_table('victimarios');
		$victimarios_crud->set_subject('Victimario');
		
		// Filtrar registros por el id_caso
		$victimarios_crud->where('id_caso', $id_caso);
	
		// Configurar campos visibles en el formulario
		$victimarios_crud->fields('id_caso','estado', 'multiples', 'relacion_con_agresor');
	    // Hacer que id_caso sea un campo oculto
		$victimarios_crud->field_type('id_caso', 'hidden', $id_caso);
		// Renombrar columnas para una mejor presentación
		$victimarios_crud->display_as('estado', 'Estado del Victimario')
						 ->display_as('multiples', '¿Múltiples Victimarios?')
						 ->display_as('relacion_con_agresor', 'Relación con el Agresor');
	
		// Configuración de dropdown para booleanos
		$victimarios_crud->field_type('multiples', 'dropdown', array(1 => 'Sí', 0 => 'No'));
	
		// Asignar automáticamente el id_caso antes de la inserción
		$victimarios_crud->callback_before_insert(function ($post_array) use ($id_caso) {
			$post_array['id_caso'] = $id_caso; // Asignar id_caso desde el parámetro
			return $post_array;
		});
	
		// Renderizar el formulario
		$victimarios_output = $victimarios_crud->render();
	
		// Pasar los datos a la vista
		$title = "Victimarios del Caso";
		$context = array("title" => $title, "id_caso" => $id_caso);
		$view = 'manage_related_data.php';
		$this->main_output($victimarios_output, $view, $context);
	}
	public function casos()
	{
		$crud = new grocery_CRUD();
		$crud->unset_clone();
		$crud->set_table('casos');
		$crud->set_subject('Caso');
		
		// Opciones de los campos
		$crud->fields('fecha', 'hora', 'ámbito', 'lugar_específico', 'departamento', 'municipio', 'aldea', 'titulo_caso', 'codigo_caso');
		$crud->required_fields('fecha', 'titulo_caso', 'codigo_caso');
		
		// Renderizado
		$output = $crud->render();
		$title = "Casos";
		$context = array("title" => $title);
		$view = 'main.php';
		$this->main_output($output, $view, $context);
	}

	public function victimas()
	{
		$crud = new grocery_CRUD();
		$crud->unset_clone();
		$crud->set_table('victimas');
		$crud->set_subject('Víctima');
		
		// Opciones de los campos
		$crud->fields('id_caso', 'nombre', 'edad', 'etnia_id', 'ocupación', 'numero_hijos', 'estado_embarazo', 'hubo_violacion', 'tipo_arma_id', 'manera_muerte', 'desaparecida_antes', 'tipo_violencia_id');
		$crud->required_fields('id_caso', 'nombre', 'edad');
		
		// Relaciones
		$crud->set_relation('id_caso', 'casos', 'titulo_caso');
		$crud->set_relation('etnia_id', 'etnia', 'nombre_etnia');
		$crud->set_relation('tipo_arma_id', 'tipo_de_arma', 'nombre_tipo_arma');
		$crud->set_relation('tipo_violencia_id', 'tipo_de_violencia', 'nombre_tipo_violencia');
		
		// Configuración de los campos booleanos para mostrar "Sí" o "No"
		$crud->field_type('estado_embarazo', 'dropdown', array(1 => 'Sí', 0 => 'No'));
		$crud->field_type('hubo_violacion', 'dropdown', array(1 => 'Sí', 0 => 'No'));
		$crud->field_type('desaparecida_antes', 'dropdown', array(1 => 'Sí', 0 => 'No'));
		
		// Renderizado
		$output = $crud->render();
		$title = "Víctimas";
		$context = array("title" => $title);
		$view = 'main.php';
		$this->main_output($output, $view, $context);
	}
	public function victimarios()
	{
		$crud = new grocery_CRUD();
		$crud->unset_clone();
		$crud->set_table('victimarios');
		$crud->set_subject('Victimario');
		
		// Opciones de los campos
		$crud->fields('id_caso', 'estado', 'multiples', 'relacion_con_agresor');
		$crud->required_fields('id_caso', 'estado');
		$crud->set_relation('id_caso', 'casos', 'titulo_caso');
		
		// Renderizado
		$output = $crud->render();
		$title = "Victimarios";
		$context = array("title" => $title);
		$view = 'main.php';
		$this->main_output($output, $view, $context);
	}
	public function observaciones()
	{
		$crud = new grocery_CRUD();
		$crud->unset_clone();
		$crud->set_table('observaciones');
		$crud->set_subject('Observación');
		
		// Opciones de los campos
		$crud->fields('id_caso', 'agencia', 'numero_crimen', 'foto_disponible', 'fuente', 'enlaces');
		$crud->required_fields('id_caso');
		$crud->set_relation('id_caso', 'casos', 'titulo_caso');
		
		// Renderizado
		$output = $crud->render();
		$title = "Observaciones";
		$context = array("title" => $title);
		$view = 'main.php';
		$this->main_output($output, $view, $context);
	}
	public function roles(){
		$crud = new grocery_CRUD();
		$crud->unset_clone();
		$crud->set_table('roles');
		$crud->set_relation('id_modulo','modulos','identificador');
		$crud->display_as('id_modulo','Módulo');
		$crud->set_relation('id_sis_user','sisusers','usuario');
		$crud->display_as('id_usuario','Usuario');
		$output = $crud->render();
		$title = "Roles";
		$context = array("title" => $title);
		$view = 'main.php';
		$this->main_output($output,$view,$context);
	}
	public function etnia()
	{
		$crud = new grocery_CRUD();
		$crud->unset_clone();
		$crud->set_table('etnia');
		$crud->set_subject('Etnia');
		
		// Opciones de los campos
		$crud->fields('nombre_etnia');
		$crud->required_fields('nombre_etnia');
		
		// Renderizado
		$output = $crud->render();
		$title = "Etnia";
		$context = array("title" => $title);
		$view = 'main.php';
		$this->main_output($output, $view, $context);
	}
	public function tipo_de_arma()
	{
		$crud = new grocery_CRUD();
		$crud->unset_clone();
		$crud->set_table('tipo_de_arma');
		$crud->set_subject('Tipo de Arma');
		
		// Opciones de los campos
		$crud->fields('nombre_tipo_arma');
		$crud->required_fields('nombre_tipo_arma');
		
		// Renderizado
		$output = $crud->render();
		$title = "Tipo de Arma";
		$context = array("title" => $title);
		$view = 'main.php';
		$this->main_output($output, $view, $context);
	}
	public function tipo_de_violencia()
	{
		$crud = new grocery_CRUD();
		$crud->unset_clone();
		$crud->set_table('tipo_de_violencia');
		$crud->set_subject('Tipo de Violencia');
		
		// Opciones de los campos
		$crud->fields('nombre_tipo_violencia');
		$crud->required_fields('nombre_tipo_violencia');
		
		// Renderizado
		$output = $crud->render();
		$title = "Tipo de Violencia";
		$context = array("title" => $title);
		$view = 'main.php';
		$this->main_output($output, $view, $context);
	}
	public function sisusers (){
		$crud = new grocery_CRUD();
		$crud->unset_clone();
		$crud->set_table('sisusers');
		$crud->columns('usuario');
		$crud->callback_edit_field('password', function ($value, $primary_key) {
			return '<input type="password" name="password" value="" >';
		});
		$output = $crud->render();
		$title = "Usuarios del Sistema";
		$context = array("title" => $title);
		$view = 'main.php';
		$this->main_output($output,$view,$context);
	}


    public function usuarios() {
        $crud = new grocery_CRUD();
        $crud->unset_clone();
        $crud->set_table('usuarios');
        $crud->where('id_usuario !=', 1444); // No listar al usuario con id = 1
        $output = $crud->render();
        $title = "Clientes";
        $context = array("title" => $title);
        $view = 'main.php';
        $this->main_output($output, $view, $context);
    }

    public function usuario_base() {
        $crud = new grocery_CRUD();
        $crud->unset_clone();
        $crud->unset_delete(); // Deshabilitar eliminación
        $crud->unset_add(); // Deshabilitar añadir nuevo
        $crud->set_table('usuarios');
        $crud->where('id_usuario', 1444); // Solo listar al usuario con id = 1
    
        // Mostrar solo los campos seleccionados en la lista y formulario
        $crud->columns('first_name', 'last_name', 'email', 'cell_phone', 'otp');
        $crud->fields('first_name', 'last_name', 'email', 'cell_phone', 'otp');
    
        // Validar que `otp` sea un número entero positivo de 6 dígitos
        $crud->set_rules('otp', 'OTP', 'required|numeric|exact_length[6]|greater_than[0]');
    
        $output = $crud->render();
        $title = "Administrador";
        $context = array("title" => $title);
        $view = 'main.php';
        $this->main_output($output, $view, $context);
    }

	public function dashboard()
	{
		// Cargar vista inicial del dashboard
		$desde = $this->input->get('desde'); // Obtener la fecha "Desde" del filtro
		$hasta = $this->input->get('hasta'); // Obtener la fecha "Hasta" del filtro
	
		$this->load->model('Dashboard_model');
	
		// Consultar datos filtrados
		$data = array(
			'desde' => $desde,
			'hasta' => $hasta,
			'casos' => $this->Dashboard_model->get_casos_por_fecha($desde, $hasta),
			'grafica_datos' => $this->Dashboard_model->get_casos_por_mes($desde, $hasta)
		);
	
		// Cargar la vista
		$this->load->view('dashboard', $data);
	}

}
