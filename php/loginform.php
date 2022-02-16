<html>
    <head>
        <link rel="stylesheet" href="../css/default.css" media="screen" type="text/css">
        <link rel="stylesheet" href="../css/defaultform.css" media="screen" type="text/css">
    </head>
<body class="body_afterstart">
    <?php
        session_start();

        require './defaultauth.php';

        $_SESSION['loggedin'] = false;
        global $str_error;
        $str_error = 'start';
   
        function SearchAccount(){
            global $str_error;
            $sql = 'SELECT password FROM login WHERE username = ?';
            $db_connection = mysqli_connect('localhost','root','','account');
            $statement = mysqli_prepare($db_connection,$sql);
            $statement->bind_param('s',$_POST['username']);
            $statement->execute();

            $password_found = $statement->get_result();
                if($password_found != null)
                    $row = $password_found->fetch_assoc();
        
                if(!password_verify($_POST['password'],$row['password']))
                    $str_error.= 'Password e/o username incorretti!;'; 
        }

            if(isset($_POST['login']) && $_SERVER['REQUEST_METHOD'] == 'POST'){
                $str_error = '';
                checkPassword();
                checkUsername('login');
                if($str_error != 'start')
                    SearchAccount();
            }

            createBody('login'); 
            if($_SESSION['loggedin'] == false){
        ?>
        <div id="hyperlink_Registration_wrapper" class="wrapper">
            <p>User for the first time?</p>
            <a href="./registrationform.php" class="default_style_font">Click here to register!</a>
        </div>
        <?php } ?>
</body>
</html>