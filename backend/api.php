<?php
require_once __DIR__ . '/vendor/autoload.php';

use GuzzleHttp\Client;

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$config = include(__DIR__ . '/../config.php');
$bearerToken = $config['api_key'];
$client = new Client();

if (isset($_GET['details']) && $_GET['details'] === 'true' && isset($_GET['id'])) {
    $movieId = $_GET['id'];
    $url = "https://api.themoviedb.org/3/movie/$movieId";
    try {
        $response = $client->request('GET', $url, [
            'headers' => [
                'Authorization' => "Bearer $bearerToken",
                'accept' => 'application/json',
            ],
        ]);
        echo $response->getBody();
    } catch (Exception $e) {
        echo json_encode(['error' => 'Failed to fetch movie details']);
    }
    exit;
}

if (isset($_GET['query']) && !empty($_GET['query'])) {
    $query = urlencode($_GET['query']);
    $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
    $itemsPerPage = isset($_GET['itemsPerPage']) ? intval($_GET['itemsPerPage']) : 10;

    $url = "https://api.themoviedb.org/3/search/movie?query=$query&page=$page";
    try {
        $response = $client->request('GET', $url, [
            'headers' => [
                'Authorization' => "Bearer $bearerToken",
                'accept' => 'application/json',
            ],
        ]);

        $responseData = json_decode($response->getBody(), true);
        $results = $responseData['results'] ?? [];
        $slicedResults = array_slice($results, 0, $itemsPerPage);
        $responseData['results'] = $slicedResults;

        echo json_encode($responseData);
    } catch (Exception $e) {
        echo json_encode(['error' => 'Failed to fetch movies']);
    }
    exit;
}


echo json_encode(['error' => 'No valid action provided']);
