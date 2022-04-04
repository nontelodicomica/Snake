<?php
    session_start();

    function connectionToDatabase(){
        $db_connection = mysqli_connect('localhost','root','','603551');
            if(mysqli_connect_errno())
                echo '<script>alert("Connessione con il DB non riuscita! Errore"'.mysqli_connect_error().'")</script>';
            else
        return $db_connection;
    }

    function Search($parameter, $table, $type){
        $db_connection = connectionToDatabase();
        $sql = 'SELECT * FROM '.$table.' WHERE username = ?';
        $statement = mysqli_prepare($db_connection,$sql);

        if($type == 'login')
            $elem = $_POST['username'];
        else
            $elem = $_SESSION['username'];

        $statement->bind_param('s',$elem);
        $statement->execute();
        $result = $statement -> get_result();

            while($row = $result -> fetch_assoc()){
                if($elem === $row['username'])
                    return $row[$parameter];
            }
        }

    function searchIfExists($table,$type){
        if(empty(Search('username',$table,$type)))
            return false;
        return true;
    }

    function searchBestScore(){
        $db_connection = connectionToDatabase();
        $sql = 'SELECT username, score FROM partite WHERE username = ?';
            $statement = mysqli_prepare($db_connection,$sql);
            $statement -> bind_param('s', $_SESSION['username']);
            $statement-> execute();
        $result = $statement-> get_result();
        $max = '0';
            while($row = $result -> fetch_assoc()){
                if( $row['username']=== $_SESSION['username']){
                    if($row['score'] > $max)
                     $max = $row['score'];
                }
            }
    return $max;
    }
?>