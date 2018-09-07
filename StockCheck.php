<?php
$TickerSymbol = $_GET["t"];
header("Cache-Control: no-cache");
header("Content-Type: application/json");
$Quote = "https://api.iextrading.com/1.0/stock/$TickerSymbol/quote";
$QuoteString = file_get_contents($Quote);
echo $QuoteString;
?>