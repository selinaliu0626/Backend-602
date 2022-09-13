<?php
$courses = simplexml_load_file('courses.xml');
foreach($courses->course as $course) {
    echo "<p>".$course[0]."</p>";
}
?>