<?php
    session_start(); 
    $_SESSION['firsttime'] = false;
    $_SESSION['test'] = false;
?>

<html>
    <head>
        <link rel='stylesheet' href='../css/default.css?ts=<?=time()?>' media='screen' type='text/css'>
        <link rel='stylesheet' href='../css/accountinfo.css?ts=<?=time()?>' media='screen' type='text/css'>
    </head>
    <body>
        <div id='infocontainer'>
            <div id='multiplechoices'>
                <a onclick='location.replace("./account.php?show=info")'>Profilo</a>
                <a onclick='location.replace("./account.php?show=classifica")'>Classifica</a>
                <a onclick='location.replace("./account.php?show=prova")'>Campo di prova</a>
            </div>
            <div id='contentaccountpages'>
                <?php
                    session_start();
                    $case = $_GET['show'];
                    switch($case){
                    case 'info': printInfo();
                                    break;
                    case 'prova': showTest();
                                    break;
                    }
                ?>
            </div>
        </div>
    </body>
</html>

<?php
    function searchEmail(){
        $sql = 'SELECT email FROM login WHERE username = ?';
        $db_connection = mysqli_connect('localhost','root','','account');
            if(mysqli_connect_errno())
                echo '<script>alert("Connessione con il DB non riuscita! Errore"'.mysqli_connect_error().'")</script>';
        $statement = mysqli_prepare($db_connection,$sql);
        $statement -> bind_param('s', $_SESSION['username']);
        $statement -> execute();
        
        $result = $statement -> get_result();
            if($result != null ){
                $row = $result -> fetch_assoc();
                return $row['email'];;
            }
            else
                return $result;
    }

    function checkOldPassword(){
        if(checkPassword('oldpassword') !== '' && checkIfIsOld() !== '')
            return $_POST['oldpassword'];
        return '';
    }

    function checkIfIsOld(){
        global $str_error;
            if(!SearchAccount('oldpassword')){
                $str_error.= 'La password attuale inserita non è corretta;';
                return '';
            }
            return $_POST['oldpassword'];
    }

    function changePassword(){
        $sql = 'UPDATE login SET password = ? WHERE username = ?';
        $db_connection = mysqli_connect('localhost','root','','account');
            if(mysqli_connect_errno())
                echo '<script>alert("Connessione con il DB non riuscita! Errore"'.mysqli_connect_error().'")</script>';
        $statement = mysqli_prepare($db_connection,$sql);
        $newpassword = password_hash($_POST['newpassword'],PASSWORD_BCRYPT);
        $statement -> bind_param('ss', $newpassword, $_SESSION['username']);
        $statement -> execute();
    }

    function printInfo(){?>
        <h3> Informazioni personali inserite al momento della registrazione: </h3>
        <div>
            <p>Username</p>
            <em> <?php echo $_SESSION['username'] ?></em>
            <p>Indirizzo e-mail</p>
            <em><?php echo searchEmail(); ?></em>
            <p>Reimposta la password</p>

            <div id='result'>
                <?php
                    require './defaultauth.php';

                    if($_SERVER['REQUEST_METHOD'] == 'POST'){
                            global $str_error;
                            $str_error = '';
                            checkPassword('newpassword');
                            checkOldPassword();
                            if($str_error !== ''){
                                $print = explode(';', $str_error);
                                foreach($print as $value){?>
                                    <p><?php echo $value;?></p>
                                
                             <?php }
                         } else { 
                             changePassword();
                             $_POST['oldpassword']='';
                             $_POST['newpassword']='';
                             ?>
                            <p> Password aggiornata! </p>
                <?php }
        }?>
            </div>
                <form action='./account.php?<?php echo $_SERVER['QUERY_STRING'];?>' method='post'>
                    <input name='oldpassword' type='password' placeholder='oldpassword' value='<?php echo checkIfIsOld();?>'/>
                    <input name='newpassword' type='password' placeholder='newpassword' value='<?php echo checkPassword('newpassword');?>'/>
                    <button name='changepassword' type='submit'>Change</button>
                </form>
        <?php } ?>
        </div>

        <?php 
        function showTest(){?>
            <div>
                <strong> Vuoi iniziare una partita di prova?</strong>
                <p>Nota: il punteggio conseguito in questa non sarà salvato!</p>
                <button onclick='location.replace("./account.php")'>No</button>
                <button onclick='location.replace("../game.php")'>OK</button>
            </div>
        <?php 
            $_SESSION['firsttime'] = true;
            $_SESSION['test'] = true;
        }?>