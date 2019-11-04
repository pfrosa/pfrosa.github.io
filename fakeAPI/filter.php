<?php
function doFilter($jsonParameters, $filters, $values){
    $filterFunction = function($el) use ($jsonParameters, $filters) {
        $filterChecks = array();
        foreach( $jsonParameters as $filter => $arr){
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
    
    return array_values( count((array)$jsonParameters) > 0 ? array_filter( $values, $filterFunction ) : $values);
}    