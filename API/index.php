<?php

// Test array for debug purpose
$userdb = array(
    'type' => 'FeatureCollection', 
    'name' => 'secteurs',
    'features' => array(
                        array(
                            'type' => '1821',
                            'geometry' => '11',
                            'properties' => array(
                                                 'GTh' => '96',
                                                 'Titre' => 'test'
                                            )
                        ),
                        array(
                            'type' => '5465',
                            'geometry' => '22',
                            'properties' => array(
                                                 'GTh' => '97',
                                                 'Titre' => 'test95'
                                            )
                        ),
                        array(
                            'type' => '40489',
                            'geometry' => '33',
                            'properties' => array(
                                                 'GTh' => '97',
                                                 'Titre' => 'test97'
                                            )
                        )
                    )
);



// Get the contents of the JSON file 
$strJsonFileContents = file_get_contents("secteurs.json");

// test show raw dump
// var_dump($strJsonFileContents);  

// Convert to array 
$array = json_decode($strJsonFileContents, true);

// tests print array
// var_dump($array); 
// print_r($array);

// simple echo d'une valeur
// echo $array['features'][1]['properties']['Titre'];

// Build GeoJSON feature collection array for response
$geojson = array(
   'type'      => 'FeatureCollection',
   'features'  => array()
);


if (isset($_GET['RecNum'])) {
    $search = $_GET['RecNum'];
    $Param = 'RecNum';
    $error = '';
}
else{
    $error = "400   Bad Request - wrong or missing parameter";
};
if (isset($_GET['GTh'])) {
    $search = $_GET['GTh'];
    $Param = 'GTh';
    $error = '';
}else{
    $error = "400   Bad Request - wrong or missing parameter";
};

//  Loop through rows to build feature arrays
foreach ($array as $userdbchild) {
        $i=-1;
    foreach ($userdbchild as $userdbchildchild) {
                $i++;
        // foreach ($userdbchildchild as $props ) {

            // foreach ($props as $prop) {

                if ($array['features'][$i]['properties'][$Param] == $search) {              
                    // echo $array['features'][$i]['properties']['Titre'] . $i .'. ';
                    // echo $Param;

                        $marker = array(
                            'type' => 'Feature',
                            'properties' => array(
                              'RecNum' => $array['features'][$i]['properties']['RecNum'],
                              'GTh' => $array['features'][$i]['properties']['GTh'],
                              'Titre' => $array['features'][$i]['properties']['Titre'],
                              'Référenc' => $array['features'][$i]['properties']['Référenc'],
                              'Description' => $array['features'][$i]['properties']['Description'],
                            ),
                            'geometry' => $array['features'][$i]['geometry']
                        );

                      array_push($geojson['features'], $marker); 

                // }
            // }   
        }
    }
}

// GENERIC SEARCH version 
// foreach ($array as $userdbchild) {
//         $i=-1;
//     foreach ($userdbchild as $userdbchildchild) {
//                 $i++;
//         foreach ($userdbchildchild as $props ) {

//             foreach ($props as $prop) {

//                 if ($prop == $search) {              
//                     // echo $userdb['features'][$i]['properties']['Titre'] . $i .'<br>';

//                         $marker = array(
//                             'type' => 'Feature',
//                             'properties' => array(
//                               'RecNum' => $array['features'][$i]['properties']['RecNum'],
//                               'GTh' => $array['features'][$i]['properties']['GTh'],
//                               'Titre' => $array['features'][$i]['properties']['Titre'],
//                               'Référenc' => $array['features'][$i]['properties']['Référenc'],
//                               'Description' => $array['features'][$i]['properties']['Description'],
//                             ),
//                             'geometry' => $array['features'][$i]['geometry']
//                         );

//                       array_push($geojson['features'], $marker); 

//                 }
//             }   
//         }
//     }
// }


header('Content-type: application/json');
if (empty($error)) {
    print json_encode($geojson, JSON_NUMERIC_CHECK);
}
else{
    print $error;
};

?>
