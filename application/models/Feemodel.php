<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class FeeModel extends CI_Model {

	function __construct()
	    {
	        parent::__construct();
	       
	    }

	public function getFeesByRsID($rsID, $includeCredits = NULL){
		$sql = "CALL getFeesByRsID (?, ?)";
		$data = array($rsID, $includeCredits);
		$query = $this->db->query($sql, $data);
		$query->next_result();
		
		return $query->result_array();
	}

}