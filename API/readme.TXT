ThaCER API documentation

Webservice Type : REST /JSON 
returns sectors in GEOJSON format

Resource descriptions
---------------------
The first version of the ThaCER API is limited to “sectors” dataset :

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
RecNum, GTh

Request example:
----------------
https://thacer.archaiodata.com/API/?GTh=9

Response example:
-----------------
{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"RecNum":71,"GTh":9,"Titre":"Propyl\u00e9es","R\u00e9f\u00e9renc":"B. HOLTZMANN, O. PICARD,\nBCH 95 (1971), 777-780\u00b7 BCH 96 (1972), 914-918\u00b7 BCH 97 (1973), 536-541\u00b7 BCH 98\n(1974), 789-793.","Description":null},"geometry":{"type":"MultiPolygon","coordinates":[[[[24.71247835876,40.77987635789],[24.712450870377,40.779846435073],[24.712448492715,40.779843594834],[24.712385747874,40.779880973789],[24.71242750798,40.779920332246],[24.71247835876,40.77987635789]]]]}}]}

Errors
------
Errors are returned using standard HTTP error code syntax. Depending on the status code, the response body may be in JSON or plaintext.

400
Bad input parameter






