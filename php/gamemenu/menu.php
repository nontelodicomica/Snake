<?php
    session_start(); 
    include './infofunctions.php';
    include './testfunctions.php';
    include './matchesfunctions.php';

    $_SESSION['firsttime'] = false;
    $_SESSION['test'] = false;
?>

<html>
    <head>
        <link rel='stylesheet' href='../../css/default.css?ts=<?=time()?>' media='screen' type='text/css'>
        <link rel='stylesheet' href='../../css/defaultform.css?ts=<?=time()?>' media='screen' type='text/css'>
        <link rel='stylesheet' href='../../css/menu/profilo.css?ts=<?=time()?>' media='screen' type='text/css'>
        <link rel='stylesheet' href='../../css/menu/matches.css?ts=<?=time()?>' media='screen' type='text/css'>
        <link rel='stylesheet' href='../../css/menu/test.css?ts=<?=time()?>' media='screen' type='text/css'>
        <link rel='stylesheet' href='../../css/menu/menu.css?ts=<?=time()?>' media='screen' type='text/css'>
    </head>
    <body class='bodymenu'>
        <div id='menucontainer'>
            
            <nav id='multiplechoices'>
                <a class='choices' onclick='location.replace("./menu.php?show=info")'>Profilo</a>
                <a class='choices' onclick='location.replace("./menu.php?show=matches")'>Partite</a>
                <a class='choices' onclick='location.replace("./menu.php?show=test")'>Campo di prova</a>
                <a class='choices'onclick='location.replace("../../game.php")'>Torna al gioco</a>
            </nav>

            <div id='contentaccountpages'>
            <?php
                $case = $_GET['show'];
                    switch($case){
                    case 'info': printInfo();
                                 break;
                    case 'test': showTest();
                                 break;
                    case 'matches': showScoresMatches ();
                                    break;
                    }
                ?>
            </div>
        </div>
    </body>
</html>