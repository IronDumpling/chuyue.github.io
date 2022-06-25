<?php
header('Content-Type: text/html; charset=utf-8');
$username1 = $_POST['uname'];
$userPwd = $_POST['pwd'];
// Fill the information of the database.
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "MindVoiceTest";
// Connect to the database.
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection.
if ($conn->connect_error){
    die("Fail to connect: ".$conn->connect_error);
}
// Check database.
$sql = "select password from user where username='".$username1."'";
$allSql = "select * from user where username='".$username1."'";
$result = $conn->query($sql);
$allResult = $conn->query($allSql);
if ($username1 == "" or $userPwd == ""){
    echo '<script>alert("Please fill in both your username and password.");history.go(-1);</script>';
}
else if($result->num_rows > 0){
    $row = $result->fetch_row();
    $db_userpwd = $row[0];
    if($db_userpwd==$userPwd){
        echo 'Welcome, '.$username1.'.';
    }else{
        echo '<script>alert("Your username or password may be incorrect, please check again."); history.go(-1);</script>';
    }
}else {
    echo '<script>alert("This account does not exist."); history.go(-1);</script>';
}
$conn->close();
?>
