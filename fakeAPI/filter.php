<?php
require './mockData.php';

header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");

class TypesEnum {
    const NUMBER = 0;
    const TEXT = 1;
    const DATE = 2;
};

$filters = [
    "idade" => TypesEnum::NUMBER,
    "nome" => TypesEnum::TEXT,
    "dataNasc" => TypesEnum::DATE,
];

$jsonParameters =  json_decode($_GET['JSON']);

$filterFunction = function($el) use ($jsonParameters, $filters) {
    $filterChecks = array();
    foreach( $jsonParameters as $filter => $arr){
        //acumulate ifs should pass in every filter
        $filterChecks[] =  call_user_func(function() use ($arr, $el, $filter, $filters){
            foreach( $arr as $query){
                $query = trim($query);
                switch ($filters[$filter]){
                    case TypesEnum::NUMBER:
                        if (eval("return " . $el[$filter] . $query . ";")) return true;
                    case TypesEnum::TEXT:
                        if (strpos( strtolower($el[$filter]) , $query) !== false) return true;
                    case TypesEnum::DATE :                    
                        break;
                }
            }
            return false;
        });
    }      
    return array_reduce($filterChecks, function($acc, $el){
        return $acc = $acc && $el;
    }, true);  
};

echo json_encode( 
    array_values(
        count((array)$jsonParameters) > 0 ? array_filter( $testValues, $filterFunction ) : $testValues
    )
);


//OR AND AND NOT IMPLEMENTED WELL