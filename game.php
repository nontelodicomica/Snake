<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0">
    <link rel="shortcut icon" href="./img/welcomeicon.ico">
    <link rel="stylesheet" href="./css/game.css?ts=<?=time()?>" media="screen" type="text/css">
    <link rel="stylesheet" href="./css/boxes.css?ts=<?=time()?>" media="screen" type="text/css">
    <link rel="stylesheet" href="./css/modaltutorial.css?ts=<?=time()?>" media="screen" type="text/css">
    <link rel="stylesheet" href="./css/default.css?ts=<?=time()?>" media="screen" type="text/css">
    <script type="text/javascript" src="./js/intervals.js"></script>
    <script type="text/javascript" src="./js/snakeelement.js"></script>
    <script type="text/javascript" src="./js/snake.js"></script>
    <script type="text/javascript" src="./js/otherelements.js"></script>
    <script type="text/javascript" src="./js/modaltutorial.js"></script>
    <script type="text/javascript" src="./js/game.js"></script>
    <script type="text/javascript" src="./js/start.php"></script>
    <title>Welcome to Snake</title>
</head>

<body onload="begin()">
<?php
    session_start();
    if($_SESSION['loggedin'] == true){ ?>

    <div id="menu">
        <ul>
            <li> <a href='./php/account.php'> Account </a></li>
            <li> <a href='./php/logout.php'> Logout </a></li>
        </ul>
    </div>
        <div id="scores" class="nocursor">
            <div id="boxcurrentscore" class="boxscore">
                <h3>Score: </h3>
                <input id="currentscore" type="text" placeholder="0" readonly/>
            </div>
            <div id="boxbestscore" class="boxscore">
                <div id="title">
                    <h3>Best</h3>
                    <h3>score: </h3>
                </div>
                <input id="bestscore" type="text" readonly/>
            </div>
        </div>
            <div id="content">
                <div id="backgroundgame" class="noborder withcursor"></div>
            </div>
        <div id="boxchangecolor" class="withcursor">
            <h3>Change color: </h3>
            <div id="colorchoices">
                <div id="yellow" class="boxselectioncolor"></div>
                <div id="orange" class="boxselectioncolor"></div>
                <div id="black" class="boxselectioncolor"></div>
                <div id="purple" class="boxselectioncolor"></div>
                <div id="blue" class="boxselectioncolor"></div>
            </div>
        </div>

        <?php if($_SESSION['firsttime'] == true){ ?>
        <div id = "backgroundmodal" class="darkmode"></div>
            <div id="modal" class="modal">
                <div id ="buttonspace">
                <div id="contentmodal">
                    <div id="description"></div>
                </div>
            </div>
            </div>
        <?php } ?>
        </div>

    <?php } else 
            header('Location: ./php/loginform.php');?>
</body>
</html>