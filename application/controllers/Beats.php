<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require(APPPATH.'libraries/REST_Controller.php');
class Assets extends REST_Controller {

	/*
	This is a 'rest service'
	*/

    // public function feesByRsID_get(){
    //     checkRequiredParams('rsID', 'get', $this);
    //     $rsID = $this->get('rsID');

    //     $this->load->model('feemodel');
        
    //     $result = $this->feemodel->getFeesByRsID($rsID);
                
    //     if($result){
    //         $this->response($result, 200);
    //     }else{
    //         $this->response(array(), 200);
    //     }

    // }

    public function beats_get(){

        // $this->load->model('AssetsModel');
        
        // $result = $this->AssetsModel->getAssets();
                
        // if($result){
        //     $this->response($result, 200);
        // }else{
        //     $this->response(array(), 200);
        // }
        
        echo('got it');

    }

    

}
