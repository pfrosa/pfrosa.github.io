<?php
require_once './mockData.php';
require_once './autocomplete.php';
require_once './filter.php';

header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");

class TypesEnum {
    const NUMBER = 0;
    const TEXT = 1;
    const DATE = 2;
};

$filters = [
    "idade" => TypesEnum::NUMBER,
    "cod" => TypesEnum::NUMBER,
    "nome" => TypesEnum::TEXT,
    "dataNasc" => TypesEnum::DATE,
];

$action = $_GET["action"];
$json = json_decode($_GET["json"]);

switch($action){
    case "filter":
        echo json_encode(doFilter($json, $filters, $testValues));
        break;
    case "autocomplete":
        echo json_encode(doAutoComplete($json, $filters, $testValues));
        break;
}