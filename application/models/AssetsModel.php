<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class AssetsModel extends CI_Model {

	function __construct()
	    {
	        parent::__construct();
	       
	    }

	public function getFeesByRsID($rsID, $includeCredits = NULL){
		$sql = "CALL getFeesByRsID (?, ?)";
		$data = array($rsID, $includeCredits);
		$query = $this->db->query($sql, $data);
		
		return $query->result_array();
	}

	public function getAssets(){
		$sql = "select * from assets";
		$query = $this->db->query($sql);

		return $query->result_array();
	}

}