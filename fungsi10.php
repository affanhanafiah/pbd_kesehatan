<?php

include('koneksi.php');
//$imunisasi="01";
$pernafasan = $_GET["pernafasan"];

$sql1 = "select distinct penduduk.nik, penduduk.nama, rekam_medis.id_rm as rm, st_x(st_centroid(penduduk.geom)) as lng, st_y(st_centroid(penduduk.geom)) as lat 
from penduduk 
left join rekam_medis on penduduk.nik=rekam_medis.nik 
left join detail_rekam_medis on rekam_medis.id_rm=detail_rekam_medis.id_rm 
left join detail_pernafasan on detail_rekam_medis.id_rm=detail_pernafasan.id_rm and detail_rekam_medis.tanggal_regis=detail_pernafasan.tanggal_regis and detail_rekam_medis.kedatangan_ke=detail_pernafasan.kedatangan_ke
left join pernafasan on detail_pernafasan.id_pernafasan=pernafasan.id_pernafasan
where pernafasan.id_pernafasan='" . $pernafasan . "'";

$hasil = mysqli_query($conn, $sql1);

while ($row = mysqli_fetch_array($hasil)) {
    $nik = $row['nik'];
    $nama = $row['nama'];
    //$jenkel = $row['jenkel'];
    $rm = $row['rm'];
    $longitude = $row['lng'];
    $latitude = $row['lat'];

    $dataarray[] =
        array('nik' => $nik,
            'nama' => $nama,
            'rm' => $rm,
            'longitude' => $longitude,
            'latitude' => $latitude,
        );
}
echo json_encode($dataarray);