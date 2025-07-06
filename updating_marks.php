<?php 
 include "./connection.php"; 
 session_start(); 
 $tea_id = $_SESSION['teaID']; 
 $class_id = $_SESSION['class_id']; 
 $i = 0; 
 foreach($_POST as $k => $v){ 
 ++$i; // note I'm using ++$i instead of $i++, the one I'm using is faster 
 echo $i." - ".$k." - ".$v."<br>"; 
 } 
 if(isset($_POST[$k])){ 
 $query_num_columns = mysqli_query($con, "SELECT count(*) FROM 
information_schema.columns WHERE table_name ='exam_result';"); 
 $fetch_num_columns = mysqli_fetch_array($query_num_columns); 
 if($i <= ($fetch_num_columns[0]-3)){ 
 $query = "UPDATE `exam_result` SET "; 
 for($j = 1; $j < ($i-2); $j++){ 
 $q = "Q".($j); 
11 
 $query .= "`".$q."` = '".$_POST[$q]."', "; 
 } 
 $q = "Q".($j); 
 $query .= "`".$q."` = '".$_POST[$q]."' WHERE `class_id` = '".$class_id."' AND `tea_id` = 
'".$tea_id."' AND `stu_rollNo` = '".$_POST['stu_rollNo']."'"; 
 $result_query = mysqli_query($con,$query); 
 if($result_query > 0){ 
 header("location: ../../marks-evaluator/"); 
 } // update query 
 } 
 else{ 
 $diff = $i - ($fetch_num_columns[0] - 3); 
 echo $diff."<br>".$i."<br>".($fetch_num_columns[0] - 3); 
 $query = "ALTER TABLE `exam_result`"; 
 $store = $fetch_num_columns[0] - 4; 
 for($j = 0; $j < $diff-1; $j++){ 
 $query .= "ADD `Q".$store."` INT NULL DEFAULT '0' AFTER `Q".($store - 1)."`,"; 
 $store++; 
 } 
 $query .= "ADD `Q".$store."` INT NULL DEFAULT '0' AFTER `Q".($store - 1)."`"; 
 $result_query = mysqli_query($con,$query); 
 if($result_query > 0){ 
 $query = "UPDATE `exam_result` SET "; 
 for($j = 1; $j < ($i-2); $j++){ 
 $q = "Q".($j); 
 $query .= "`".$q."` = '".$_POST[$q]."', "; 
 } 
 $q = "Q".($j); 
 $query .= "`".$q."` = '".$_POST[$q]."' WHERE `class_id` = '".$class_id."' AND `tea_id` = 
'".$tea_id."' AND `stu_rollNo` = '".$_POST['stu_rollNo']."'"; 
 $result_query = mysqli_query($con,$query); 
 if($result_query > 0){ 
11 
 header("location: ../../marks-evaluator/"); 
 } 
 } 
 else{ 
 echo "Error"; 
 } 
 // alter table and add columns first 
 } 
 } 
?> 
