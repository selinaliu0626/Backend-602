<?php
require_once('database.php');
// function defination to convert array to xml
function array_to_xml( $data, &$xml_data, $category ) {
    foreach( $data as $key => $value ) {
        if( is_array($value) ) {
            $subnode = $xml_data->addChild($category);
            array_to_xml($value, $subnode, $category);
        } else {
            $xml_data->addChild("$key",htmlspecialchars("$value"));
        }
     }
}
$action = $_GET['action'];
$format = $_GET['format'];
$courseID = $_GET['course'];
if ($action == 'courses') {
    $coursesQuery = "SELECT * FROM sk_courses";
    if (!empty($db)) {
        $courses = $db->query($coursesQuery)->fetchAll(PDO::FETCH_ASSOC);
        if ($format == 'json') {
            echo json_encode($courses);
        } else {
            $xml = new SimpleXMLElement('<?xml version="1.0"?><courses></courses>');
            array_to_xml($courses,$xml, 'course');
            $dom = dom_import_simplexml($xml)->ownerDocument;
            $dom->formatOutput = true;
            echo "<pre>".htmlspecialchars($dom->saveXML())."</pre>";
        }
    }
} else if ($action == 'students') {
    $studentQuery = "SELECT * FROM sk_students WHERE courseID= '$courseID'";
    if (!empty($db)) {
        $students = $db->query($studentQuery)->fetchAll(PDO::FETCH_ASSOC);
        if ($format == 'json') {
            echo json_encode($students);
        } else {
            $xml = new SimpleXMLElement('<?xml version="1.0"?><students></students>');
            array_to_xml($students,$xml, 'student');
            $dom = dom_import_simplexml($xml)->ownerDocument;
            $dom->formatOutput = true;
            echo "<pre>".htmlspecialchars($dom->saveXML())."</pre>";
        }
    }
}
?>