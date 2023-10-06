<?php





    //expect()->

$url = '../../backend/controllers/User.php';

    $curl = curl_init();
    curl_setopt($curl,CURLOPT_URL, $url);
    curl_setopt($curl,CURLOPT_POST, true);
    curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);


    $headers = array(
        "Accept: application/json",
        "Content-Type: application/json",
     );

     curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);



     
     $data = <<<DATA
{
  
  
  
  "action": "getAll"
}
DATA;

curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

$resp = curl_exec($curl);
curl_close($curl);

echo $resp;

    

        

    






