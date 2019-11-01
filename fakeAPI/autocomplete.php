<?php
require './mockData.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$jsonParameters =  json_decode($_GET['JSON']);
$filtered = array_filter( $testValues, function($el) use ($jsonParameters) {
    if( is_string($jsonParameters->query) && strpos(strtolower( $el[$jsonParameters->filter]) , $jsonParameters->query) === 0 ){
        return true;
    }
    return false;
});
$mapped = array_map(function($el) use ($jsonParameters){
    return strtolower($el[$jsonParameters->filter]);
}, $filtered);

echo json_encode( array_slice($mapped,0, 10));