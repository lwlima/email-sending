<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP; 
require '../vendor/autoload.php';

date_default_timezone_set('America/Sao_Paulo');
$ip = getenv("REMOTE_ADDR");

$nome = utf8_decode($_POST['nome']);
$email = utf8_decode($_POST['email']);
$telefone = utf8_decode($_POST['telefone']);
$mensagem = str_replace("\n",'<br />', addslashes(htmlspecialchars(utf8_decode($_POST['msg']))));
$array = array($nome, $email, $telefone, $mensagem);

$mail = new PHPMailer(true);
$mail->CharSet = "Utf-8";
$mail->isSMTP();
// $mail->SMTPDebug = SMTP::DEBUG_SERVER;
$mail->Host = 'smtp.gmail.com';
$mail->Port = 465;
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
$mail->SMTPAuth = true;
$mail->Username = 'email do serviço de email';
$mail->Password = 'senha do serviço de email';

$mail->setFrom("seu email que vai ser usado para enviar", "Nome que aparecera no email");
$mail->AddAddress("email de destino"); 

$mail->isHTML(true);
$mail->Subject = "Assunto";
$mail->Body = "<p><b>nome:</b> {$nome}</p>
<p><b>Telefone:</b> {$telefone}</p>
<p><b>Email:</b> {$email}</p>
<p><b>Ip:</b> {$ip}</p>
<p><b>Mensagem:</b></p><p>{$mensagem}</p>"; //mensagem do email, pode conter html.

if(validate($array) == true){
  if(!$mail->Send()) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
      echo "Mensagem enviada!";
    } 
  }

function validate($array){
  for($i=0; $i<4; $i++){
    if(isset($array[$i]) == false || empty($array[$i] == true)){
      echo "Error, por favor preencha todos os campos.";
      return false;
    }
  }
  return true;
  }
?>