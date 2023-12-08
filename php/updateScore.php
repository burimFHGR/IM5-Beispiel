<?php

require('config.php');

$username = $_POST["username"];
$score = $_POST["score"];

$sql = "UPDATE leaderboard SET score = ? WHERE username = ?";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute([$score, $username]);

if ($erfolg) {
    echo "Score wurde erfolgreich aktualisiert.";
} else {
    print_r($erfolg);
}
?>




