<?php
require './mockData.php';

header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");


$jsonParameters =  json_decode($_GET['JSON']);
echo json_encode( 
    array_values(
        array_filter( $testValues, function($el) use ($jsonParameters) {
            foreach( $jsonParameters as $filter => $arr){
                foreach( $arr as $query){
                    $query = trim($query);
                    if( is_string($query) && strpos( strtolower($el[$filter]) , $query) !== false ){
                        return true;
                    }
                }
            }      
            return false;  
        })
    )
);


//OR AND AND NOT IMPLEMENTED WELL