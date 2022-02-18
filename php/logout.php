<html>
<?php   
    session_start();

    include './searchinDB.php';
    
    $rating = $_GET['rating'];
    if($_SESSION['loggedin'] == false)
        header('Location: ./loginform.php');
?>
    <head>
        <link rel='stylesheet' href='../css/logout.css?ts=<?=time()?>' media='screen' type='text/css'>
        <link rel='stylesheet' href='../css/default.css?ts=<?=time()?>' media='screen' type='text/css'>
        <script type='text/javascript' src='../js/endgame.js'></script>
    </head>
<body>
    <div id='thanks'>
        <h2>
            <?php echo 'Thanks for playing '.$_SESSION['username'].'!'?>
        </h2>
        <?php 
            $check = searchIfExists('recensioni');
            if($_SESSION['firsttime'] == true || !$check) { ?>
            <h3>
                <?php echo 'Rate the game before exiting please!' ?>
            </h3>
                <div id='boxstars'>
                    <div id='1' onmouseover='blurstars(event)' onclick='select(event)'></div>
                    <div id='2' onmouseover='blurstars(event)' onclick='select(event)'></div>
                    <div id='3' onmouseover='blurstars(event)' onclick='select(event)'></div>
                    <div id='4' onmouseover='blurstars(event)' onclick='select(event)'></div>
                    <div id='5' onmouseover='blurstars(event)' onclick='select(event)'></div>
                </div>
        <?php } else ?>
            <h3> Press to confirm</h3>
    <input id='exit' name='exit' value='EXIT' class='button' onclick='insertRating()' readonly/>
</body>

<?php
    global $rating, $check;
    $exit = $_GET['exit'];
    if($exit == true){
        if(($_SESSION['firsttime'] == true || !$check)  && $rating != ''){
            $db = connectionToDatabase();
            $sql = 'INSERT INTO recensioni(username,voto) VALUES (?,?)';
            $statement = mysqli_prepare($db,$sql);
            $statement->bind_param('ss',$_SESSION['username'],$rating);
            $statement->execute();
        }
        session_destroy();
        header('Location: ../index.html');
    }
?>
</html>
