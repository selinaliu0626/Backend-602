<?php
    
    require_once('database.php');

// Get the student form data
$courseID = $_POST["course_id"];
$firstName = $_POST["first_name"];
$lastName = $_POST["last_name"];
$email = $_POST["email"];

// Add the student to the database  
$query = "INSERT INTO sk_students (courseID, firstName, lastName, email) VALUES ('$courseID', '$firstName', '$lastName', '$email')";

$db->query($query);

    // Display the Student List page
    include('index.php');

?>