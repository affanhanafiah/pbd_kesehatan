<?php

include('koneksi.php');
//$imunisasi="01";
$imunisasi = $_GET["imunisasi"];

$sql1 = "select distinct penduduk.nik, penduduk.nama, jenkel.jenkel, imunisasi.imunisasi, st_x(st_centroid(penduduk.geom)) as lng, st_y(st_centroid(penduduk.geom)) as lat
from penduduk 
left join jenkel on penduduk.id_jenkel=jenkel.id_jenkel 
left join detail_imunisasi on penduduk.nik=detail_imunisasi.nik 
left join imunisasi on detail_imunisasi.id_imunisasi=imunisasi.id_imunisasi 
where imunisasi.id_imunisasi='" . $imunisasi . "'";

$hasil = mysqli_query($conn, $sql1);
while ($row = mysqli_fetch_array($hasil)) {
    $nik = $row['nik'];
    $nama = $row['nama'];
    $jenkel = $row['jenkel'];
    $longitude = $row['lng'];
    $latitude = $row['lat'];

    $dataarray[] =
        array('nik' => $nik,
            'nama' => $nama,
            'jenkel' => $jenkel,
            'longitude' => $longitude,
            'latitude' => $latitude,
        );
}
echo json_encode($dataarray);