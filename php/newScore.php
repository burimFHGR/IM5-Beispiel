<?php

require('config.php');

$username = $_POST["username"];
$score = $_POST["score"];

// $username = "koloko";
// $score = "124";

$sql = "INSERT INTO leaderboard (username, score) VALUES (:Username, :Score)";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute(array('Username' => $username, 'Score' => $score));

if ($erfolg) {

    print_r('Score Eintrag erfolgreich.');
} else {

    print_r($erfolg);
};
