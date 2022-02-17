<html>
    <head>
        <link rel='stylesheet' href='../css/default.css' media='screen' type='text/css'>
        <link rel='stylesheet' href='../css/defaultform.css' media='screen' type='text/css'>
    </head>
<body class='body_afterstart'>
    <?php
        session_start();
        require './defaultauth.php';

        global $str_error;
        $str_error = 'start';

        if(isset($_POST['login'])){
                $str_error = '';
                checkPassword('password');
                checkUsername('login');
                if(!SearchAccount('password'))
                    $str_error.= 'Password e/o username incorretti!;';
        }

            createBody('login'); 
    ?>
</body>
</html>