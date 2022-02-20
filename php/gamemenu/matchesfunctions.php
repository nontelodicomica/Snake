<?php 
    session_start();
    $partitetot = 0;
    $result = [];
    $averagescore = 0;
    
    function showScoresMatches(){
        global $partitetot;
        global $averagescore;

            $sql = 'SELECT *, AVG(score) OVER()AS media FROM partite WHERE username = ?';
            $db_connection = connectionToDatabase();
            $statement = mysqli_prepare($db_connection,$sql);
            $statement -> bind_param('s', $_SESSION['username']);
            $statement -> execute();
            $result = $statement -> get_result();
            $partitetot = $result -> num_rows;
            while ($row = $result->fetch_assoc()) 
                $averagescore = $row['media'];
            createMatchesContent();
    }

    function createMatchesContent(){?>
        <div id='matchescontent'>
            <div id= 'partitetot'>
                <h3>Partite giocate:</h3>
                <input name='partitetot' value = '<?php 
                                                    global $partitetot;
                                                    echo $partitetot; ?>' readonly/>
            </div>
            <div id="averagescore">
                <h3>Punteggio medio:</h3>
                <input name='averagescore' value = '<?php 
                                                    global $averagescore;
                                                    echo $averagescore; ?>' readonly/>
            </div>
            <?php buildResults();?>
        </div>
    <?php 
    }
    
    function rankingOfBestGamers(){
        global $result;
        $sql = 'SELECT *, ROW_NUMBER() OVER(ORDER BY A.max DESC) AS rank FROM (SELECT username, MAX(score) AS max FROM partite GROUP BY username LIMIT 10) AS A';
        $db_connection = connectionToDatabase();
        $statement = mysqli_prepare($db_connection,$sql);
        $statement -> execute();
        $resultset = $statement -> get_result();
        while($row = $resultset-> fetch_assoc()){
            $elem = $row['rank'].','.$row['max'].','.$row['username'];
            array_push($result,$elem);
    }
}
    rankingOfBestGamers();

    function buildResults(){?>
        <div id='resultsbestgamer'>
            <h3>Best gamers: </h3>
    <?php
        global $result;
        foreach($result as $value){
            $row = explode(',',$value);?>
        <p> <strong> <?php echo $row[0]; ?></strong>
            <?php echo $row[1].' '.$row[2];?> 
        </p>
    <?php } ?>
        </div>
<?php } 
?> 