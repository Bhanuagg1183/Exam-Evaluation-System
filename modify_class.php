<?php 
 include "./connection.php"; 
 session_start(); 
 $tea_id = $_SESSION['teaID']; 
 $classID = $_GET['classID']; 
 $update = 'updateBtn'.$_GET['i']; 
 $delete = 'delete_button'.$_GET['i']; 
 if(isset($_POST[$update])){ 
 $class_name = strtoupper($_POST['class_name']); 
 $full_sub_name = ucwords($_POST['full_sub_name']); 
 $sub_name_words = explode(" ",$full_sub_name); 
 $sub_name = ''; 
 for($i = 0; $i < count($sub_name_words); $i++){ 
 if(ctype_alpha($sub_name_words[$i][0])) 
 $sub_name = $sub_name.$sub_name_words[$i][0]; 
 } 
 $class_id = $class_name."-".$sub_name; 
 $query = mysqli_query($con, "UPDATE `exam_classes` SET `class_id` = '$class_id', `class_name` 
= '$class_name', `full_sub_name` = '$full_sub_name', `sub_name` = '$sub_name' WHERE `tea_id` = 
'$tea_id' AND `class_id` = '$classID'");  
 if($query > 0){ 
 header("location: ../../dashboard/teacher-dashboard/"); 
 } 
 else{ 
 echo "Not Added"; 
 // Failed to add SWAL 
 } 
 } 
 if(isset($_POST[$delete])){ 
 $query = mysqli_query($con, "DELETE FROM `exam_classes` WHERE `class_id` = '$classID' AND 
`tea_id` = '$tea_id'"); 
 if($query > 0){ 
 header("location: ../../dashboard/teacher-dashboard/"); 
 } 
 else{ 
 echo "Not Added"; 
 // Failed to add SWAL 
 } 
 } 
?> 
