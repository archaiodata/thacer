ThaCER API documentation

Webservice Type : REST /JSON 
returns selected sectors, all pottery items in GEOJSON format. returns also list of images related to single items


Resource descriptions
---------------------
“sectors” dataset :

Sectors dataset structure :
RecNum : Thacer sector UID
GTh : "Guide de Thasos" number if exist
Titre : Placename
Ref : Bibliography
Description : Description 
Coordinates : Polygons CRS84


Endpoints and methods
---------------------
Endpoint Url : https://thacer.archaiodata.com/API/
Method GET

Parameters
----------
RecNum, GTh, CERAM, INV, ANA

Request example for sector:
----------------
https://thacer.archaiodata.com/API/?GTh=9

Response example:
-----------------
{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"RecNum":71,"GTh":9,"Titre":"Propyl\u00e9es","R\u00e9f\u00e9renc":"B. HOLTZMANN, O. PICARD,\nBCH 95 (1971), 777-780\u00b7 BCH 96 (1972), 914-918\u00b7 BCH 97 (1973), 536-541\u00b7 BCH 98\n(1974), 789-793.","Description":null},"geometry":{"type":"MultiPolygon","coordinates":[[[[24.71247835876,40.77987635789],[24.712450870377,40.779846435073],[24.712448492715,40.779843594834],[24.712385747874,40.779880973789],[24.71242750798,40.779920332246],[24.71247835876,40.77987635789]]]]}}]}

Request example for pottery:
----------------
https://thacer.archaiodata.com/API/?CERAM

Response:
-----------------
return all pottery items in Geojson format

Request example for images:
----------------
https://thacer.archaiodata.com/API/?INV=YAN3038&ANA=THA25

    // Return a json object with 3 lists of image urls. Example :
// {
//    "PHOTO":[
//        "https:\/\/thacer.archaiodata.com\/API/IMAGES\/PHOTO\/YAN3038.JPG",
//        "https:\/\/thacer.archaiodata.com\/API/IMAGES\/PHOTO\/YAN3038_02.JPG",
//        "https:\/\/thacer.archaiodata.com\/API/IMAGES\/PHOTO\/YAN3038_03.JPG"
//    ],
//    "THA_MACRO_PHOTO":[
//        "https:\/\/thacer.archaiodata.com\/API/IMAGES\/THA_MACRO_PHOTO\/THA25_xpl_1.25x.JPG"
//    ],
//    "Profils":[
//    ]
//}



Errors
------
Errors are returned using standard HTTP error code syntax. Depending on the status code, the response body may be in JSON or plaintext.

400
Bad input parameter






