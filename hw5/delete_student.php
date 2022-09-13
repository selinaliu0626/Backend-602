<?php
require_once('database.php');

// Delete the student from the database
$id = $_GET["id"];
$deleteQuery = "DELETE FROM sk_students WHERE studentID=$id";
$db->query($deleteQuery);

// Display the Home page
include('index.php');
?>