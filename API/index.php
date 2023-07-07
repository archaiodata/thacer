<?php
// Test array for debug purpose
$test = array(
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
if (isset($_GET['GTh'])) {
    // Get the contents of the JSON file 
    $strJsonFileContents = file_get_contents("./geojson/secteurs.geojson");

    // Convert to array 
    $array = json_decode($strJsonFileContents, true);

    // Build GeoJSON feature collection array for response
    $geojson = array(
        'type' => 'FeatureCollection',
        'features' => array()
    );

    if (isset($_GET['RecNum'])) {
        $search = $_GET['RecNum'];
        $Param = 'RecNum';
        $error = '';
    } else {
        $error = "400   Bad Request - wrong or missing parameter";
    }
    ;
    if (isset($_GET['GTh'])) {
        $search = $_GET['GTh'];
        $Param = 'GTh';
        $error = '';
    } else {
        $error = "400   Bad Request - wrong or missing parameter";
    }
    ;

    //  Loop through rows to build feature arrays
    foreach ($array as $userdbchild) {
        $i = -1;
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

} elseif (isset($_GET['CERAM'])) {
    # Build GeoJSON feature collection array
    $geojson = array(
        'type' => 'FeatureCollection',
        'features' => array()
    );

    $files = glob("./CSV/*");
    foreach ($files as $filepath) {

        if ($handle = fopen($filepath, "r")) {





            # Loop through rows to build feature arrays
            $header = NULL;
            while (($row = fgetcsv($handle, 0, ',')) !== FALSE) {
                if (!$header) {
                    $header = $row;
                } else {
                    $data = array_combine($header, $row);
                    $properties = $data;
                    # Remove x and y fields from properties (optional)
                    unset($properties[x]);
                    unset($properties[y]);
                    $properties['Corpus'] = basename($filepath, ".txt");
                    $feature = array(
                        'type' => 'Feature',
                        'geometry' => array(
                            'type' => 'Point',
                            'coordinates' => array(
                                $data[x] ? $data[x] : 0,
                                $data[y] ? $data[y] : 0
                            )
                        ),
                        'properties' => $properties
                    );
                    # Add feature arrays to feature collection array
                    array_push($geojson['features'], $feature);
                }
            }
            fclose($handle);
        }
    }

} elseif (isset($_GET['INV'])) {
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

    $result = ['PHOTO' => [], 'THA_MACRO_PHOTO' => [], 'Profils' => [],];
    $INV = $_GET['INV'];
    $ANA = $_GET['ANA'];

    $dir = 'IMAGES/PHOTO/*' . $INV . '[Π_ -.]*{jpg,jpeg,JPG,gif,png}';
    $files = glob($dir, GLOB_BRACE);
    foreach ($files as $image) {
        $result['PHOTO'][] = 'https://thacer.archaiodata.com/API/' . $image;
    }

    if ($ANA != '') {
        $dir = 'IMAGES/THA_MACRO_PHOTO/*' . $ANA . '*.{jpg,jpeg,JPG,gif,png}';
        $files = glob($dir, GLOB_BRACE);
        foreach ($files as $image) {
            $result['THA_MACRO_PHOTO'][] = 'https://thacer.archaiodata.com/API/' . $image;
        }
    }

    $dir = 'IMAGES/Profils/*' . $INV . '[Π_ -.]*{jpg,jpeg,JPG,gif,png}';
    $files = glob($dir, GLOB_BRACE);
    foreach ($files as $image) {
        $result['Profils'][] = 'https://thacer.archaiodata.com/API/' . $image;
    }
    $geojson = $result;
} else {
    $error = '';
    $geojson = "400   Bad Request -  w or missing parameter";
}


header('Content-type: application/json');
if (empty($error)) {
    print json_encode($geojson, JSON_NUMERIC_CHECK);
} else {
    print $error;
}
;

?>