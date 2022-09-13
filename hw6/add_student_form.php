<?php
require('database.php');
$coursesQuery = "SELECT * FROM sk_courses";
if (!empty($db)) {
    $courses = $db->query($coursesQuery);
}

?>
<!DOCTYPE html>
<html>

<!-- the head section -->
<head>
    <title>My Course Manager</title>
    <link rel="stylesheet" type="text/css" href="main.css">
</head>

<!-- the body section -->
<body>
    <header><h1>Course Manager</h1></header>

    <main>
        <h1>Add Student</h1>
        <form action="add_student.php" method="post"
              id="add_student_form" style="flex-direction: column; align-items: stretch">

            <label>Course:</label>
            <select name="course_id">
                <?php
                foreach ($courses as $course) {
                    echo "<option value='$course[0]'>$course[0]-$course[1]</option>";
                }
                ?>
            </select><br>
            
            <label>First Name:</label>
            <input type="text" name="first_name"><br>

            <label>Last Name:</label>
            <input type="text" name="last_name"><br>

            <label>Email:</label>
            <input type="email" name="email"><br>


            <label>&nbsp;</label>
            <input type="submit" value="Add Student"><br>
        </form>
        <p><a href="index.php">View Student List</a></p>
    </main>

    <footer>
        <p>&copy; <?php echo date("Y"); ?> Xiaonan Liu</p>
    </footer>
</body>
</html>