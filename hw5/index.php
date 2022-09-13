<?php
require_once('database.php');
$courseID = $_GET["courseID"];
$coursesQuery = "SELECT * FROM sk_courses";
$firstCourseQuery = "SELECT * FROM sk_courses LIMIT 1";

if (!empty($db)) {
    $courses = $db->query($coursesQuery);
    $firstCourse = $db->query($firstCourseQuery);
    if (!isset($courseID)) {
        $courseID=$firstCourse->fetchColumn();
    }
    $studentsQuery="SELECT * FROM sk_students WHERE courseID= '$courseID'";
    $currentCourseQuery = "SELECT * FROM sk_courses WHERE courseID = '$courseID'";
    $students = $db->query($studentsQuery);
    $currentCourse = $db->query($currentCourseQuery)->fetch();
}
?>
<!DOCTYPE html>
<html>

<!-- the head section -->
<head>
    <title>My Course Manager</title>
    <link rel="stylesheet" type="text/css" href="main.css" />
</head>

<!-- the body section -->
<body>
<header><h1>Course Manager</h1></header>
<main>
    <center><h1>Student List</h1></center>

    <aside>
        <!-- display a list of categories -->
        <h2>Courses</h2>
        <nav>
        <ul>
            <?php
            foreach ($courses as $course) {
                echo "<li><a href='index.php?courseID=$course[0]'>$course[0]</a></li>";
            }
            ?>
        </ul>
        </nav>          
    </aside>

    <h2>
        <?php
        echo "$currentCourse[0] - $currentCourse[1]";
        ?>
    </h2>
    <section>
        <table>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>&nbsp;</th>
            </tr>
            <?php
            foreach ($students as $student) {
                echo "<tr><td>$student[2]</td><td>$student[3]</td><td>$student[4]</td><td><button onclick=window.location.href='delete_student.php?id=$student[0]';>Delete</button></td></tr>";
            }
            ?>
            
        </table>

        <p><a href="add_student_form.php">Add Student</a></p>

        <p><a href="course_list.php">List Courses</a></p>    

    </section>
</main>

<footer>
    <p>&copy; <?php echo date("Y"); ?> Xiaonan Liu</p>
</footer>
</body>
</html>
