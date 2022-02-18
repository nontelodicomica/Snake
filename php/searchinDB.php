<?php
    session_start();
    include './connection.php';

    function Search($parameter){
        $sql = 'SELECT '.$parameter.' FROM login WHERE username = ?';
        $db_connection = connectionToDatabase();
        $statement = mysqli_prepare($db_connection,$sql);
        $statement->bind_param('s',$_SESSION['username']);
        $statement->execute();
        
        if($parameter != 'email'){
            $password_found = $statement->get_result();
                if($password_found != null)
                    $row = $password_found->fetch_assoc();
                    return $row['password'];
        }else{
            $result = $statement -> get_result();
            if($result != null ){
                $row = $result -> fetch_assoc();
                return $row['email'];;
            }
            else
                return $result;

        }
    };

    function searchIfExists($table){
        $db = connectionToDatabase();
        $sql = 'SELECT * FROM '.$table.' WHERE username = ?';
        $statement = mysqli_prepare($db,$sql);
        $statement -> bind_param('s', $_SESSION['username']);
        $statement-> execute();
        $statement-> store_result();
            if($statement->num_rows > '0'){
                return true;
            }
        return false;
    }

    function searchBestScore(){
        $db_connection = mysqli_connect('localhost','root','','account');
            if(mysqli_connect_errno())
                echo '<script>alert("Connessione con il DB non riuscita! Errore"'.mysqli_connect_error().'")</script>';
        $sql = 'SELECT MAX(score) AS max FROM partite WHERE username = ?';
            $statement = mysqli_prepare($db_connection,$sql);
            $statement -> bind_param('s', $_SESSION['username']);
            $statement-> execute();
        $result = $statement-> get_result();
        $row = $result->fetch_assoc();
        if($row['max'] != null)
            return $row['max'];
    return '0';
    }
?>