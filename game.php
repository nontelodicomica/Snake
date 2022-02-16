<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0">
    <link rel="shortcut icon" href="./img/welcomeicon.ico">
    <link rel="stylesheet" href="./css/default.css?ts=<?=time()?>" media="screen" type="text/css">
    <link rel="stylesheet" href="./css/game.css?ts=<?=time()?>" media="screen" type="text/css">
    <link rel="stylesheet" href="./css/boxes.css?ts=<?=time()?>" media="screen" type="text/css">
    <link rel="stylesheet" href="./css/modaltutorial.css?ts=<?=time()?>" media="screen" type="text/css">
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
        <div id="scores" class="nocursor">
            <div id="boxcurrentscore" class="boxscore">
                <h2>Score: </h2>
                <input id="currentscore" type="text" placeholder="0" readonly/>
            </div>
            <div id="boxbestscore" class="boxscore">
                <div id="title">
                    <h2>Best</h2>
                    <h2>score: </h2>
                </div>
                <input id="bestscore" type="text" readonly/>
            </div>
        </div>
            <div id="content">
                <div id="backgroundgame" class="noborder withcursor"></div>
            </div>
        <div id="boxchangecolor" class="withcursor">
            <h2>Change color: </h2>
            <div id="colorchoices">
                <div id="yellow" class="boxselectioncolor"></div>
                <div id="orange" class="boxselectioncolor"></div>
                <div id="black" class="boxselectioncolor"></div>
                <div id="purple" class="boxselectioncolor"></div>
                <div id="blue" class="boxselectioncolor"></div>
            </div>
        </div>
        <?php
            session_start();
            if($_SESSION['firsttime'] == true){
        ?>
        <div id = "backgroundmodal" class="darkmode" hidden></div>
            <div id="modal" class="modal" hidden>
                <div id ="buttonspace">
                <div id="contentmodal">
                    <div id="description"></div>
                </div>
            </div>
            </div>
        <?php } ?>
        </div>
</body>
</html>