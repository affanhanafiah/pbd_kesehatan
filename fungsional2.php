<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Fungsional 2</title>
</head>
<body>
<h1 align="center">Menampilkan penduduk berdasarkan cara datang</h1>

<?php
include 'koneksi.php';

?>
<div align="center">
    <form method="POST" action="">
        <label for="cd">Cara Datang : </label>
        <select name="cd" id="cd">
            <?php
            $querypilih1 = mysqli_query($conn, 'select * from cara_datang');
            ?>
            <option disabled selected> Pilih</option>
            <?php
            while ($datapilih1 = mysqli_fetch_array($querypilih1)) {
                ?>
                <option value="<?php echo $datapilih1['id_cd'] ?>"><?php echo $d[] = $datapilih1['cara_datang'] ?></option>
                <?php
            }
            ?>
        </select>
        <input type="submit" name="simpan" value="Simpan">
    </form>

    <?php
    if (isset($_POST['simpan'])) {
    $cd = $_POST['cd'];
    echo "<br>Data yang dipilih : <br>";
    echo $d[$cd - 1];
    ?>

    <table border="1" class="table">
        <th>NIK</th>
        <th>Nama</th>
        <th>No.Rekam Medis</th>
        <?php
        $sql1 = "select distinct penduduk.nik, penduduk.nama, rekam_medis.id_rm from penduduk left join rekam_medis on penduduk.nik=rekam_medis.nik left join detail_rekam_medis on rekam_medis.id_rm=detail_rekam_medis.id_rm left join cara_datang on detail_rekam_medis.id_cd=cara_datang.id_cd where cara_datang.id_cd='" . $cd . "'";
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