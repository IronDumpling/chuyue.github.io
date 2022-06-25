<?php
header('Content-Type: text/html; charset=utf-8');
$username1 = $_POST['uname'];
$userPwd1 = $_POST['pwd'];
$reuserPwd1 = $_POST['rpwd'];
// Fill the information of the database.
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "MindVoiceTest";
// Connect to the database.
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection.
if ($conn->connect_error) {
    die("Fail to connect: " . $conn->connect_error);
}
// Check database.
$searchName = "select * from user where username='$username1'";
$searchNameResult = $conn->query($searchName);
$row = $searchNameResult->fetch_row();
$sql="insert into user values('".$username1."','".$userPwd1."')";
if ($username1 == "" or $userPwd1 == ""){
    echo '<script>alert("Please fill in both your username and password.");history.go(-1);</script>';
}
else if ($userPwd1 != $reuserPwd1){
    echo '<script>alert("Your password entries does not match, please check and try again.");history.go(-1);</script>';
}
else if ($row > 0){
    echo '<script>alert("This username is already used, please try another one.");history.go(-1);</script>';
}
else if ($conn->query($sql) === TRUE) {
    echo '<script>alert("You have successfully registered!");</script>';
    header("Refresh:0;url=index.html");
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>
