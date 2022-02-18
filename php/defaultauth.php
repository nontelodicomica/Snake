<?php
session_start();

include './searchinDB.php';

function checkEmail($type){
    global $str_error;
    $check = checkIfIsTheSame(0,$type);

    if(checkIfEmpty('email'))
        return '';
    else if(!filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)){
        $str_error.= 'Email del formato non valido;';  
        return '';
    }else if($check == false && $type == 'registration')
        return '';

    return $_POST['email'];
}

function checkIfIsTheSame($cod, $type){
    global $str_error;

        if ($cod == 1)
            $attribute = 'username';
        else if($cod == 0)
            $attribute = 'email';
    
    $db_connection = connectionToDatabase();
    $sql = 'SELECT * FROM login WHERE '.$attribute.' = ?';
    $statement = mysqli_prepare($db_connection,$sql);
    $statement -> bind_param('s',$_POST[$attribute]);
    $statement -> execute();
    $found = $statement->get_result();
    if($found -> num_rows > 0){
        if($type == 'registration')
            $str_error .= 'E\'già presente un utente registrato con tale '.$attribute.';';
        return false;
    }
    return true;
}

function checkPassword($attribute){
    global $str_error;

    if(checkIfEmpty($attribute))
        return '';

    $pattern = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/';
    if(!preg_match($pattern,$_POST[$attribute])){
        $str_error.= $attribute.' nel formato non valido: deve contenere almeno 5 caratteri dei quali una lettera minuscola, una maiuscola e una lettera;';
        return '';
    }
    return $_POST[$attribute];
}

function printErrors(){
    $print = '';
    global $str_error;

    if($str_error != 'start'){
        if($str_error !== ''){
            $array = explode(';',$str_error);
            foreach($array as $value){
                if($value !== '')
                    $print.='<p>'.$value.'</p>';
            }
        }
        else
            $_SESSION['loggedin'] = true;
    }
    return $print;
}

function checkUsername($type){
    if(checkIfEmpty('username'))
        return '';

    if($type=='registration'){
        if(!checkIfIsTheSame(1,$type))
            return '';
    }

    $_SESSION['username'] = $_POST['username'];
    return $_POST['username'];
}

function checkIfEmpty($attribute){
    global $str_error;
    if(empty($_POST[$attribute])){
        $str_error.= 'Il campo '.$attribute.' non può essere vuoto;';
        return true;
    }
    return false;
}

function checkValideInput($type){
    checkUsername($type);
    checkEmail($type);
    checkPassword('password');
}

function checkcolor(){
    global $str_error;
    if($str_error === '')
        return 'green';
    else if($str_error == 'start')
        return '';
    else
        return 'red';
    }

function checkClass(){
    global $str_error;
    if($str_error == 'start')
        return '';
    else
        return 'addborder';
}

function createBody($type){
    global $str_error;
?>

<img id='imagebody' src= '<?php echo '../img/background'.$type.'.jpg';?>'/>
    <div id='box_wrapper'>
        <div id='box_registration'>
            <div id='img_wrapper'></div>
            
<form action=
    <?php
        $setValues = printErrors($type);
        if($_SESSION['loggedin'] == true)
            echo '\'../game.php\''; 
        else
            echo '\'./'.$type.'form.php\' method=\'post\''; ?> >
<div id='errors_box' class='<?php echo checkClass();?>' style='background-color: <?php echo checkcolor(); ?>;'>
<?php 
    if($setValues == '' && $str_error != 'start'){
        $_SESSION['loggedin'] = true;
        if($type == 'registration')
            $saluto = 'Benvenuto';
        else
            $saluto = 'Bentornato';
        echo '<p class=\'welcome\'>'.$saluto.' '.$_POST['username'].'</p>';
    }else
        echo $setValues;
?>
</div>
    <div class='input_div'>
        <?php 
            if($_SESSION['loggedin'] == true){ 
        ?>  
            <p>Premi per accedere al gioco:</p>
            <input type='submit' name='login' value='START' class='button'/>
        <?php
            }else{
        ?>
            <strong>Username:</strong> 
                <input name='username' type='text' value='<?php echo checkUsername($type);?>' placeholder='username'/>
    </div>
    <div class='input_div'>
            <strong>Password:</strong>
            <input name='password' type='password' value='<?php echo checkPassword('password');?>' placeholder='password'/>
    </div>
        <?php
            if($type == 'registration'){
        ?>
    <div class='input_div'>
        <strong>Email:</strong>
        <input name='email' type='email' value='<?php echo checkEmail($type);?>' placeholder='email'/>
    </div>
        <input type='submit' name='register' value='Avanti' class='button'/>   
    <?php } else {?>
          <input type='submit' name='login' value='LOGIN' id='login' class='button'/>
            <div id='hyperlink_Registration_wrapper' class='wrapper'>
                <p>User for the first time?</p>
                <a href='./registrationform.php' class='default_style_font'>Click here to register!</a>
            </div>
    <?php } ?>
</form>
<?php }
    }?>
