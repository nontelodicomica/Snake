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
   

            if(isset($_POST['login']) && $_SERVER['REQUEST_METHOD'] == 'POST'){
                $str_error = '';
                checkPassword();
                checkUsername('login');
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