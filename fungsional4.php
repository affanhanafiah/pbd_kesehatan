<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Fungsional 4</title>
</head>
<body>
<h1 align="center">Menampilkan penduduk berdasarkan bagian</h1>

<?php
include 'koneksi.php';

?>
<div align="center">
    <form method="POST" action="">
        <label for="bagian">Bagian : </label>
        <select name="bagian" id="bagian">
            <?php
            $querypilih1 = mysqli_query($conn, 'select * from bagian');
            ?>
            <option disabled selected> Pilih</option>
            <?php
            while ($datapilih1 = mysqli_fetch_array($querypilih1)) {
                ?>
                <option
                        value="<?php echo $datapilih1['id_bagian'] ?>"><?php echo $d[] = $datapilih1['bagian'] ?></option>
                <?php
            }
            ?>
        </select>
        <input type="submit" name="simpan" value="Simpan">
    </form>

    <?php
    if (isset($_POST['simpan'])) {
    $bagian = $_POST['bagian'];
    echo "<br>Data yang dipilih : <br>";
    echo $d[$bagian - 1];
    ?>

    <table border="1" class="table">
        <th>NIK</th>
        <th>Nama</th>
        <th>No.Rekam Medis</th>
        <?php
        $sql1 = "select distinct penduduk.nik, penduduk.nama, rekam_medis.id_rm from penduduk left join rekam_medis on penduduk.nik=rekam_medis.nik left join detail_rekam_medis on rekam_medis.id_rm=detail_rekam_medis.id_rm left join bagian on detail_rekam_medis.id_bagian=bagian.id_bagian where bagian.id_bagian='" . $bagian . "'";
        $query1 = mysqli_query($conn, $sql1);
        while ($data1 = mysqli_fetch_array($query1)) {
            ?>
            <tr>
                <td><?php echo $data1['nik']; ?></td>
                <td><?php echo $data1['nama']; ?></td>
                <td><?php echo $data1['id_rm']; ?></td>
            </tr>
            <?php
        }
        }
        ?>
    </table>
</div>
</body>
</html>
