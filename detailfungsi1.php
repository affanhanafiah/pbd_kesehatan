<?php
require 'koneksi.php';
$info = $_GET["info"];

$querysearch = "select distinct penduduk.nik, penduduk.nama, jenkel.jenkel, rekam_medis.id_rm as rm, st_x(st_centroid(penduduk.geom)) as lng, st_y(st_centroid(penduduk.geom)) as lat
from penduduk 
left join rekam_medis on penduduk.nik=rekam_medis.nik
left join jenkel on penduduk.id_jenkel=jenkel.id_jenkel 
left join detail_imunisasi on penduduk.nik=detail_imunisasi.nik 
where penduduk.nik='" . $info . "'";

$hasil = mysqli_query($conn, $querysearch);

while ($row = mysqli_fetch_array($hasil)) {
    $nik = $row['nik'];
    $nama = $row['nama'];
    $jenkel = $row['jenkel'];
    $rm = $row['rm'];
    $longitude = $row['lng'];
    $latitude = $row['lat'];
    $dataarray[] = array('nik' => $nik, 'nama' => $nama, 'jenkel' => $jenkel, 'rm' => $rm, 'longitude' => $longitude, 'latitude' => $latitude);
}

echo json_encode($dataarray);