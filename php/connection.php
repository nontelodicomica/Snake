<?php
    session_start();
    function connectionToDatabase(){
        $db_connection = mysqli_connect('localhost','root','','account');
            if(mysqli_connect_errno())
                echo '<script>alert(\"Connessione con il DB non riuscita! Errore "'.mysqli_connect_error().')</script>';
        return $db_connection;
    }
?>