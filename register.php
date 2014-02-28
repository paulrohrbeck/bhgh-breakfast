<?php
/**
 *
 *  REGISTER
 *
 *  Simple email sender without going too crazy with including libraries and such
 *  Using Swift Mailer for more complex email functionality that might be used at some point.
 *
 */

// composer autoload:
require 'vendor/autoload.php';

/**
 *  -------------------------------
 *  CONFIG
 *  -------------------------------
 */

$emailConfig = array(
    'subject' => 'Website Registration - Growing Hope Gala',
    'from' => array(
        'no-reply@bhghacademy.org' => 'Growing Hope Gala Website',
    ),
    'to' => array(
        'paul@infielddesign.com' => 'Paul Rohrbeck',
        'anguyen@bhgh.org' => 'Anne Nguyen',
    ),
);


/**
 *  -------------------------------
 *  COMPOSE EMAIL
 *  -------------------------------
 */

// prepare post data:
$data = !empty($_POST['levelInput']) ? $_POST : '';

// if honey pot value is set, die :) might need a little more spam protection than this some day..
if(empty($data) || (isset($data['honeypotInput']) && !empty($data['honeypotInput']))) die();

// set up vars for the body
$emailBody = array(
    'level' => sanitize($data['levelInput']),
    'amount' => sanitize($data['amountInput']),
    'name' => sanitize($data['nameInput']),
    'email' => sanitize($data['emailInput']),
    'address' => sanitize($data['addressInput']),
    'city' => sanitize($data['cityInput']),
    'daytimePhone' => sanitize($data['daytimePhoneInput']),
    'eveningPhone' => sanitize($data['eveningPhoneInput']),
);

// put it all together (really this should be in a template..):
$emailConfig['body'] = "
Hello Anne,

the following registration was sent via the Growing Hope website form:

------------------------------
Level: ".$emailBody['level']."
Amount Pledged (if cannot attend): ".$emailBody['amount']."
Name: ".$emailBody['name']."
Email: ".$emailBody['email']."
Address: ".$emailBody['address']."
City: ".$emailBody['city']."
Daytime Phone: ".$emailBody['daytimePhone']."
Evening Phone: ".$emailBody['eveningPhone']."
------------------------------

Best regards,
your website
";


/**
 *  -------------------------------
 *  SETUP AND SEND EMAIL
 *  -------------------------------
 */

// Create the Transport (using standard mail for now)
$transport = Swift_MailTransport::newInstance();

// Create the Mailer using your created Transport
$mailer = Swift_Mailer::newInstance($transport);

// Create the message
$message = Swift_Message::newInstance()

    // Give the message a subject
    ->setSubject($emailConfig['subject'])

    // Set the From address with an associative array
    ->setFrom($emailConfig['from'])

    // Set the To addresses with an associative array
    ->setTo($emailConfig['to'])

    // Give it a body
    ->setBody($emailConfig['body'])

;

// Send the message
$result = $mailer->send($message);

// Success?
echo json_encode(array('success' => $result > 0));


/**
 * Sanitize
 *
 * @param $input
 * @return string
 */
function sanitize ($input) {
    return htmlspecialchars(strip_tags(trim($input)));
}