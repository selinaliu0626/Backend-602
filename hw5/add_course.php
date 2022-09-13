<?php
    require_once('database.php');

// Get the course form data
    $courseID = $_POST["course_id"];
    $courseName = $_POST["course_name"];

    $query = "INSERT INTO sk_courses VALUES ('$courseID','$courseName')";



    // Add the course to the database  

    $db->query($query);
   
    // Display the Course List page
    include('course_list.php');

?>