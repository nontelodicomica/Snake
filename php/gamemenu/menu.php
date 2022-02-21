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
        <link rel='stylesheet' href='../../css/default.css' media='screen' type='text/css'>
        <link rel='stylesheet' href='../../css/defaultform.css' media='screen' type='text/css'>
        <link rel='stylesheet' href='../../css/menu/profilo.css' media='screen' type='text/css'>
        <link rel='stylesheet' href='../../css/menu/matches.css' media='screen' type='text/css'>
        <link rel='stylesheet' href='../../css/menu/test.css' media='screen' type='text/css'>
        <link rel='stylesheet' href='../../css/menu/menu.css' media='screen' type='text/css'>
        <title>Menù</title>
    </head>
    <script>
        function goInfo(){
            location.replace('./menu.php?show=info');
        }

        function goMatches(){
            location.replace('./menu.php?show=matches');
        }

        function goTest(){
            location.replace('./menu.php?show=test');
        }

        function goGame(){
            location.replace('../../game.php');
        }

    </script>
    <body>
        <div id='backgroundmenu'></div>
            <div id='blurredeffect'></div>
            <div id='menucontainer'>
                
                <nav id='multiplechoices'>
                    <a class='choices' onclick= goInfo()>Profilo</a>
                    <a class='choices' onclick= goMatches()>Partite</a>
                    <a class='choices' onclick= goTest()>Campo di prova</a>
                    <a class='choices'onclick= goGame()>Torna al gioco</a>
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