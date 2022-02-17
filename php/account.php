<html>
    <head>
        <link rel="stylesheet" href="../css/default.css?ts=<?=time()?>" media="screen" type="text/css">
        <link rel="stylesheet" href="../css/accountinfo.css?ts=<?=time()?>" media="screen" type="text/css">
    </head>
    <body>
        <div id="infocontainer">
            <div id="multiplechoices">
                <a href="./account.php?show=info">Profilo</a>
                <a href="./account.php?show=classifica">Classifica</a>
                <a href="./account.php?show=prova">Campo di prova</a>
            </div>
            <div id="contentaccountpages">
                <?php
                    session_start();
                    $case = $_GET['show'];
                    switch($case){
                    case 'info': printInfo();
                    }
                ?>
            </div>
        </div>
    </body>
</html>

<?php
    session_start();

    require './defaultauth.php';
    
    function searchElem($elem){
        $sql = 'SELECT '.$elem.' FROM login WHERE username = ?';
        $db_connection = mysqli_connect('localhost','root','','account');
            if(mysqli_connect_errno())
                echo '<script>alert(\"Connessione con il DB non riuscita! Errore "'.mysqli_connect_error().')</script>';
        $statement = mysqli_prepare($db_connection,$sql);
        $statement -> bind_param('s', $_SESSION['username']);
        $statement -> execute();
        
        $result = $statement -> get_result();
            if($result != null ){
                $row = $result -> fetch_assoc();
                return $row[$elem];;
            }
    }
        $old = $_POST['checkold'];
        if($old != ''){
            checkPassword();
            printErrors();
        }

    function printInfo(){
        ?>
        <h3> Informazioni personali inserite al momento della registrazione: </h3>
        <div>
            <em>Username</em>
            <p> <?php echo $_SESSION['username'] ?></p>
            <em>Indirizzo e-mail</em>
            <p><?php echo searchElem('email'); ?></p>
            <em>Reimposta la password</em>

                <form action="./account.php?<?php echo $_SERVER['QUERY_STRING'];?>" method="POST">
                    <input name="checkold" type="password"/>
                    <button id="checkpassword" type="submit">CHECK</button>
                </form>
                <input name="newpassword" type="password"/>
        </div>
    <?php } ?>