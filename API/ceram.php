<?php
// Return a json object with 3 lists of image urls. Example :
// {
//    "PHOTO":[
//        "https:\/\/thacer.archaiodata.com\/API/IMAGES\/PHOTO\/758Π.JPG",
//        "https:\/\/thacer.archaiodata.com\/API/IMAGES\/PHOTO\/758Π_2.JPG",
//        "https:\/\/thacer.archaiodata.com\/API/IMAGES\/PHOTO\/758Π_3.JPG"
//    ],
//    "THA_MACRO_PHOTO":[
//        "https:\/\/thacer.archaiodata.com\/API/IMAGES\/THA_MACRO_PHOTO\/THA23.JPG"
//    ],
//    "Profils":[
//    ]
//}

$result = [];
$INV = $_GET['INV'];
$ANA = $_GET['ANA'];

$dir = 'IMAGES/PHOTO/*'.$INV.'[Π_ -.]*{jpg,jpeg,JPG,gif,png}';
$files = glob($dir, GLOB_BRACE);
foreach ($files as $image) {
    $result['PHOTO'][] = 'https://thacer.archaiodata.com/API/'.$image;
}

$dir = 'IMAGES/THA_MACRO_PHOTO/*'.$ANA.'*.{jpg,jpeg,JPG,gif,png}';
$files = glob($dir, GLOB_BRACE);
foreach ($files as $image) {
    $result['THA_MACRO_PHOTO'][] = 'https://thacer.archaiodata.com/API/'.$image;
}

$dir = 'IMAGES/Profils/*'.$INV.'[Π_ -.]*{jpg,jpeg,JPG,gif,png}';
$files = glob($dir, GLOB_BRACE);
foreach ($files as $image) {
    $result['Profils'][] = 'https://thacer.archaiodata.com/API/'.$image;
}

header("Content-Type: application/json");

if ($result === []) {
    echo '{}'; // If no images at all, return an empty object (and not an empty array)
} else {
    echo json_encode($result, JSON_UNESCAPED_UNICODE);
}

exit();