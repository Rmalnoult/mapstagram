<?php
session_start();
require_once("twitteroauth/twitteroauth/twitteroauth.php"); //Path to twitteroauth library
 
$twitteruser = $_GET['username'];
$notweets = 30;
$consumerkey = "QygbBQAk9EB9Mjsec24PrA";
$consumersecret = "G8olXhSfdCmcRwMmKO3HqUPlekKk1QkzJPp5ZchWlA";
$accesstoken = "460978314-cMF0ffLZtZ2p9m3MFCLwjXYLTyJ8YWf5z5APt41P";
$accesstokensecret = "WQhUhlltzTyccVR6FEgYpCNpYo2dDr82DHChFx9SzmvUB";
 
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
 
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
 
$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=".$notweets);
 
echo json_encode($tweets);
?>