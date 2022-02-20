<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, height=device-height, initial-scale=1.0'>
    <link rel='shortcut icon' href='./img/welcomeicon.ico'>
    <link rel='stylesheet' href='./css/game.css?ts=<?=time()?>' media='screen' type='text/css'>
    <link rel='stylesheet' href='./css/boxes.css?ts=<?=time()?>' media='screen' type='text/css'>
    <link rel='stylesheet' href='./css/modaltutorial.css?ts=<?=time()?>' media='screen' type='text/css'>
    <link rel='stylesheet' href='./css/default.css?ts=<?=time()?>' media='screen' type='text/css'>
    <link rel='stylesheet' href='./css/modalendgame.css?ts=<?=time()?>' media='screen' type='text/css'>
    <link rel='stylesheet' href='./css/menu/menu.css?ts=<?=time()?>' media='screen' type='text/css'>
    <script type='text/javascript' src='./js/intervals.js'></script>
    <script type='text/javascript' src='./js/snakeelement.js'></script>
    <script type='text/javascript' src='./js/snake.js'></script>
    <script type='text/javascript' src='./js/otherelements.js'></script>
    <script type='text/javascript' src='./js/modaltutorial.js'></script>
    <script type='text/javascript' src='./js/game.js'></script>
    <script type='text/javascript' src='./js/score.js'></script>
    <script type='text/javascript' src='./js/start.php'></script>
    <script type='text/javascript' src='./js/menu.js'></script>
    <script type='text/javascript' src='https://code.jquery.com/jquery-3.4.0.min.js'></script>
    <title>Welcome to Snake</title>
</head>

<body onload='begin()'>
<?php
    session_start();
    include './php/searchinDB.php';
    include './php/modaltutorial.php';

if($_GET['test']==true){
    $_SESSION['firsttime'] = true;
    $_SESSION['test'] = true;
}

if($_SESSION['loggedin'] == true){ ?>
    <div id='toggle' onmouseover='openmenu()'>
        <div class='one'></div>
        <div class='two'></div>
        <div class='three'></div>
    </div>
        <div id='menu' onmouseleave='hidemenu()'>
            <?php if($_SESSION['test'] == true) {?>
                    <a onclick= 'youlose()'>Exit</a>
                <?php } else {?>
                    <a href = './php/gamemenu/menu.php'> Account </a>
                    <a onclick='location.replace("./php/logout.php")'> Logout </a>
                <?php } ?>
            </ul>
        </div>
   
        <?php if($_SESSION['test'] == false) {?>
            <div id='scores' class='nocursor'>
                <div id='boxcurrentscore' class='boxscore'>
                    <h3>Score: </h3>
                    <input id='currentscore' type='text' placeholder='0' value='0' readonly/>
                </div>
                <div id='boxbestscore' class='boxscore'>
                    <div id='title'>
                        <h3>Best</h3>
                        <h3>score: </h3>
                    </div>
                    <input id='bestscore' type='text' value='<?php echo searchBestScore();?>' readonly/>
                </div>
            </div>
        <?php } ?>
                <div id='backgroundgame' class='noborder withcursor'></div>
                <div id='boxchangecolor' class='withcursor'>
                    <h3>Change color: </h3>
                    <div id='colorchoices'>
                        <div id='yellow' class='boxselectioncolor'></div>
                        <div id='orange' class='boxselectioncolor'></div>
                        <div id='black' class='boxselectioncolor'></div>
                        <div id='purple' class='boxselectioncolor'></div>
                        <div id='blue' class='boxselectioncolor'></div>
                    </div>
                </div>

        <?php if($_SESSION['firsttime'] == true){ ?>
            <div id = 'backgroundmodaltutorial' class='darkmode'>
                <div id='modaltutorial' class='modal'>
                    <div id ='buttonspace'>
                        <div id='contentmodal'>
                            <div id='description'>
                            </div>
                        </div>
                </div>
            </div>
        <?php } ?>
        </div>

    <?php } else 
            header('Location: ./php/loginform.php');?>

    <div id='endgamemodal' class='endgamemodal'>
            <h4 id='score'></h4>
            <div id='endgamebuttons'>
                <button id='playagain' class='greenbutton' onclick='location.replace("./game.php")'>RIGIOCA</button>
                <button id='exit' class='redbutton'>ESCI</button>
            </div>
    </div>
</body>
</html>