<?php
    session_start();
    include './connection.php';
    $db_connection = connectionToDatabase();
    $score = $_POST['score'];
    $sql = 'INSERT INTO partite(username,score) VALUES (?,?)';
    $statement = mysqli_prepare($db_connection,$sql);
    $statement -> bind_param('si',$_SESSION['username'],$score);
    $statement -> execute();
?>