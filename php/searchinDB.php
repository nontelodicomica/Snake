<?php
    session_start();

    function connectionToDatabase(){
        $db_connection = mysqli_connect('localhost','root','','account');
            if(mysqli_connect_errno())
                echo '<script>alert("Connessione con il DB non riuscita! Errore"'.mysqli_connect_error().'")</script>';
            else
        return $db_connection;
    }

    function Search($parameter){
        $db_connection = connectionToDatabase();
        $sql = 'SELECT '.$parameter.' FROM login WHERE username = ?';

        $statement = mysqli_prepare($db_connection,$sql);
        $statement->bind_param('s',$_SESSION['username']);
        $statement->execute();
        
        if($parameter !== 'email'){
            $password_found = $statement->get_result();
                if($password_found != null)
                    $row = $password_found->fetch_assoc();
                    return $row['password'];
        }else{
            $result = $statement -> get_result();
            while($row = $result -> fetch_assoc()){
                return $row['email'];
            }
                return null;

        }
    }

    function searchIfExists($table){
        $db = connectionToDatabase();
        $sql = 'SELECT * FROM '.$table.' WHERE username = ?';
        $statement = mysqli_prepare($db,$sql);
        
        if($table == 'login')
            $elem = $_POST['username'];
        else
            $elem = $_SESSION['username'];

        $statement -> bind_param('s', $elem);
        $statement-> execute();
        $result = $statement-> get_result();
            if($result->num_rows > 0){
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