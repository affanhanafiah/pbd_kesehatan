<?php

include('koneksi.php');
//$imunisasi="01";
$rujukan = $_GET["rujukan"];

$sql1 = "select distinct penduduk.nik, penduduk.nama, jenkel.jenkel, rekam_medis.id_rm as rm, st_x(st_centroid(penduduk.geom)) as lng, st_y(st_centroid(penduduk.geom)) as lat 
from penduduk 
left join jenkel on jenkel.id_jenkel=penduduk.id_jenkel
left join rekam_medis on penduduk.nik=rekam_medis.nik 
left join detail_rekam_medis on rekam_medis.id_rm=detail_rekam_medis.id_rm
where detail_rekam_medis.asal_rujukan LIKE '%" . $rujukan . "%' ";

$hasil = mysqli_query($conn, $sql1);

while ($row = mysqli_fetch_array($hasil)) {
    $nik = $row['nik'];
    $nama = $row['nama'];
    $jenkel = $row['jenkel'];
    $rm = $row['rm'];
    $longitude = $row['lng'];
    $latitude = $row['lat'];

    $dataarray[] =
        array('nik' => $nik,
            'nama' => $nama,
            'jenkel' => $jenkel,
            'rm' => $rm,
            'longitude' => $longitude,
            'latitude' => $latitude,
        );
}
echo json_encode($dataarray);