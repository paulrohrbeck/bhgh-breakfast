<?php

// composer autoload:
require 'vendor/autoload.php';

// prepare post data:
$data = $_POST['data'];

// Create the message
$message = Swift_Message::newInstance()

    // Give the message a subject
    ->setSubject('Your subject')

    // Set the From address with an associative array
    ->setFrom(array('john@doe.com' => 'John Doe'))

    // Set the To addresses with an associative array
    ->setTo(array('paul@infielddesign.com'))

    // Give it a body
    ->setBody('Here is the message itself' . serialize($data))

;

