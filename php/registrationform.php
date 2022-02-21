<html>
    <head>
        <link rel='stylesheet' href='../css/default.css' media='screen' type='text/css'>
        <link rel='stylesheet' href='../css/defaultform.css' media='screen' type='text/css'>
        <title>Register now!</title>
    </head>
<?php 
    session_start();

    include './defaultauth.php';

    $_SESSION['loggedin'] = false;
    $str_error = 'start';

    if(isset($_POST['register']) && $_SERVER['REQUEST_METHOD'] == 'POST'){
        $str_error = '';
        checkValideInput('registration');
    }

    function insertNewUser(){
        $db_connection = connectionToDatabase();
        $sql = 'INSERT INTO account (`username`,`password`,`email`) VALUES (?,?,?)';
        $statement = mysqli_prepare($db_connection,$sql);
        $hash = password_hash($_POST['password'],PASSWORD_BCRYPT);
        $username = $_POST['username'];
        $email = $_POST['email'];
        $statement -> bind_param('sss', $username ,$hash, $email);
        $statement -> execute();
    }
?>

<body class='body_afterstart'>
    <?php
        createBody('registration');
        if($_SESSION['loggedin'] == true){
            insertNewUser();
            $_SESSION['firsttime'] = true;
        }
    ?>
</body>
</html>