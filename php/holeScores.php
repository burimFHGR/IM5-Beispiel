<?php

require('config.php');

$sql = "SELECT username, score FROM leaderboard ORDER BY score DESC";


$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}

