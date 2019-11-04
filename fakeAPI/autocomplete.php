<?php
require_once './filter.php';

function doAutoComplete($jsonParameters,$filters, $values){
    $currentFilters = doFilter($jsonParameters->currentFilters,$filters, $values);
    $autoCompletable = array_filter( $currentFilters, function($el) use ($jsonParameters) {
        if( is_string($jsonParameters->query) && strpos(strtolower( $el[$jsonParameters->filter]) , $jsonParameters->query) === 0 ){
            return true;
        }
        return false;
    });
    $mapped = array_map(function($el) use ($jsonParameters){
        return strtolower($el[$jsonParameters->filter]);
    }, $autoCompletable);
    
    return array_slice($mapped,0, 10);
}