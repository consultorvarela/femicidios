<?php

class Dashboard_model extends CI_Model
{
    // Obtener casos y cantidad de víctimas por caso
    public function get_casos_por_fecha($desde, $hasta)
    {
        $this->db->select('c.codigo_caso, c.titulo_caso, c.fecha, COUNT(v.id_victima) as total_victimas');
        $this->db->from('casos c');
        $this->db->join('victimas v', 'v.id_caso = c.id_caso', 'left');
        if ($desde && $hasta) {
            $this->db->where('c.fecha >=', $desde);
            $this->db->where('c.fecha <=', $hasta);
        }
        $this->db->group_by('c.id_caso');
        return $this->db->get()->result();
    }

    // Obtener número de casos por mes
    public function get_casos_por_mes($desde, $hasta)
    {
        $this->db->select('MONTH(c.fecha) as mes, COUNT(c.id_caso) as total_casos');
        $this->db->from('casos c');
        if ($desde && $hasta) {
            $this->db->where('c.fecha >=', $desde);
            $this->db->where('c.fecha <=', $hasta);
        }
        $this->db->group_by('MONTH(c.fecha)');
        return $this->db->get()->result();
    }
}