<?php
    session_start();
    include '../searchinDB.php';
    include '../defaultauth.php';

    function checkOldPassword(){
        if(checkPassword('oldpassword') !== '' && checkIfIsOld() !== '')
            return $_POST['oldpassword'];
        return '';
    }

    function checkIfIsOld(){
        global $str_error;
        $passwordfound = Search('password');
            if(!password_verify($_POST['oldpassword'],$passwordfound)){
                $str_error.= 'La password attuale inserita non è corretta;';
                return '';
            }
            return $_POST['oldpassword'];
    }

    function changePassword(){
        $sql = 'UPDATE login SET password = ? WHERE username = ?';
        $db_connection = connectionToDatabase();
        $statement = mysqli_prepare($db_connection,$sql);
        $newpassword = password_hash($_POST['newpassword'],PASSWORD_BCRYPT);
        $statement -> bind_param('ss', $newpassword, $_SESSION['username']);
        $statement -> execute();
    }

    function printInfo(){?>
        <div id= 'infocontainer'>
        <h3> Informazioni personali: </h3>

        <div id = 'contentinfo'>
            <label>Username</label>
            <input type='text' value = '<?php echo $_SESSION['username'] ?>' readonly>
            <label>Indirizzo e-mail</label>
            <input type='text' value = '<?php echo Search('email'); ?> ' readonly>
            <label>Reimposta la password</label>

            <div id='resultchange' class="errors_box">
                <?php
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
                            <p style="background-color: green;"> Password aggiornata! </p>
                    <?php }
                }?>
            </div>
            <form action='./menu.php?<?php echo $_SERVER['QUERY_STRING'];?>' method='post'>
                <input name='oldpassword' type='password' placeholder='oldpassword' value='<?php echo checkIfIsOld();?>'/>
                <input name='newpassword' type='password' placeholder='newpassword' value='<?php echo checkPassword('newpassword');?>'/>
                <button class='changepassword' name='changepassword' type='submit'>Change</button>
            </form>
        </div>
    </div>
<?php }         
?>
