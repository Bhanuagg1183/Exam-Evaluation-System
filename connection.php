<?php 
 $con = mysqli_connect('localhost', 'root', '', "exam_evaluate"); 
 function extractor($url) 
 { 
 if(strpos($url, "drive.google.com") !== false) 
 { 
 $id = explode('/',$url)[5]; 
 return "https://drive.google.com/uc?id=".$id; 
 } 
 else 
 { 
 return $url; 
 } 
 } 
 function getPreview($url) 
 { 
 if(strpos($url, "drive.google.com") !== false) 
 { 
 $id = explode('/',$url)[5]; 
 return "https://drive.google.com/file/d/".$id."/preview"; 
 } 
 else 
 { 
 return $url; 
 } 
 } 
?> 
