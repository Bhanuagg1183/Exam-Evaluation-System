!DOCTYPE html> 
<html lang="en"> 
<head> 
 <meta charset="UTF-8"> 
 <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
 <link rel="stylesheet" href="./dist/css/style.css"> 
 <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
 <link rel="preconnect" href="https://fonts.gstatic.com"> 
 <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script> 
 <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" 
rel="stylesheet"> 
 <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap" 
rel="stylesheet"> 
 <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" 
rel="stylesheet"> 
 <script src="./node_modules/waypoints/lib/noframework.waypoints.min.js"></script> 
 <title>Exam-Evaluator</title> 
</head> 
<body id="body"> 
 <?php 
 if (isset($_GET['email']) === true) { 
 if ($_GET['email'] == "exist") 
 echo ' 
 <script> 
 swal("Error", "Email Already Exist!", "error").then(name => { 
 window.location.href = "./"; 
 }); 
 </script>'; 
 } 
 if (isset($_GET['success']) === true) { 
 if ($_GET['success'] == "data-added") { 
 echo '<script> 
 swal("Success", "You\'re registered sucessfully!", "success").then(name => { 
 window.location.href = "./"; 
 }); 
 </script>'; 
 } 
 } 
 ?> 
 <header> 
 <nav class="nav"> 
 <div class="nav__logo"> 
 <img draggable="false" src="./resources/images/logo.svg" alt="Logo" id="navLogoimg 
draggable="false"" style="display: none;"> 
 <div class="web-name"> 
 <p class="nav__web-name" style="margin-left: 10px;">Exam Evaluator</p> 
 </div> 
 </div> 
 <div class="nav__menu"> 
 <button id="signinBtn" class="white-button nav__button">Sign In</button> 
 <button id="signupBtn" class="primary-button nav__button">Register</button> 
 </div> 
 </nav> 
 </header> 
 <section class="intro"> 
 <div style="height: 1px; width: 100%; margin-bottom: 25px;"></div> 
 <div class="intro__icon"> 
 </div> 
 <div style="height: 4px; width: 100%;" id="waypoint"></div> 
 <div class="intro__head" id="introHeadID">Digital Evaluation of Answer sheets</div> 
 <div class="body-text intro__body">Digital answer sheet evaluation provides many advantages 
for the education institutes to simplify post examination activities leading to result processing.</div> 
 </section> 
 <section class="why-app" style="margin-top: 16px"> 
 <div class="why-app__text" style="text-align: center"> 
 <div class="why-app__text__blue-head" style="background: #fdbf43"> 
 Sign In to continue. 
 </div> 
 </div> 
 </section> 
 <!-- Register Sectiton --> 
 <section class="register" id="register"> 
 <div class="register__overlay"> 
 </div> 
 <div class="register__content"> 
 <div class="register__details"> 
 <img draggable="false" class="register__cancel" id="rContent" 
src="./resources/images/cancel.svg" alt="" srcset=""> 
 <h1>Welcome to Exam Evaluator</h1> 
 <div class="register__forms"> 
 <img draggable="false" src="./resources/images/signup.jpg" alt="Sign Up"> 
 <form action="./resources/php/registration.php" onsubmit="return validateForm()" 
method="POST" class="form"> 
 <input class="form__input" type="text" id="tea_name" name="tea_name" required 
placeholder="Name"> 
 <input class="form__input" type="email" name="tea_email" placeholder="Email ID"> 
 <input class="form__input" type="text" name="tea_picture" 
placeholder="Picture(Google Drive Link)"> 
 <input class="form__input" type="password" id="tea_pass" name="tea_pass" required 
placeholder="Password"> 
 <input class="form__input" type="password" id="tea_con_pass" 
name="tea_con_pass" placeholder="Confirm Password"> 
11 
 <button type="submit" class="primary-button" name="submit">Submit</button> 
 </form> 
 </div> 
 </div> 
 </section> 
 <!-- Teacher Section --> 
 <section class="features"> 
 <div class="features__heading"> 
 <h1>Features</h1> 
 </div> 
 <div class="features__feature"> 
 <div class="features__feature__teacher feature_box"> 
 <h1>Teacher</h1> 
 <ol class="featureList"> 
 <li><strong>Create Class : </strong>Teacher can create a class by specifying Class name & 
Subject.</li> 
 <li><strong>Modify / Delete : </strong>Teacher can modify class details or can even 
delete class.</li> 
 <li><strong>Load Students : </strong>After creating a class, teacher shall upload link of 
Class List. By doing so, all student data will get stored in Database.</li> 
 <li><strong>Export Result : </strong>Compiled result of students can be downloaded in 
PDF format.</li> 
 <li><strong>Examine Answersheets : </strong>Clicking this button answersheet along 
with a small form is displayed. Teacher can enter marks gained in each question. Cumulative marks is 
calculated simultaneously and by clicking on submit button marks get stored in the data base.</li> 
 </ol> 
 </div> 
 <div class="features__feature__teacher feature_box"> 
 <h1 class="yellow">Student</h1> 
 <ol class="featureList"> 
 <li><strong>Upload Answersheet : </strong>Student have to enter the link of the PDF 
uploaded on Google Drive.</li> 
 <li><strong>Show Answersheet : </strong>Student can view the uploaded answersheet to 
verify if he/she uploaded the correct PDF.</li> 
 <li><strong>Result Board : </strong>It displays list of all subjects whose PDFs has been 
uploaded, marks in each question and total marks gained along with the PDF uploaded.</li> 
 <li><strong>Download Marksheet : </strong>Student can download or export the 
marksheet through mail which specifies subject name & the marks gained in respective subject</li> 
 </ol> 
 </div> 
 </div> 
 </section> 
 <script src="./resources/js/script.js"></script> 
 <script src="./resources/js/waypoint.js"></script> 
 <script src="./resources/js/responsive.js"></script> 
</body> 
</html> 
