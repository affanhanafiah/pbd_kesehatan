<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Fungsional 1</title>
</head>
<body>
<h1 align="center">Menampilkan penduduk yang telah melaksanakan imunisasi tertentu</h1>

<?php
include 'koneksi.php';

?>
<div align="center">
    <form method="POST" action="">
        <label for="imunisasi">Imunisasi : </label>
        <select name="imunisasi" id="imunisasi">
            <?php
            $sqlpilih1 = "select * from imunisasi";
            $querypilih1 = mysqli_query($conn, $sqlpilih1);
            ?>
            <option disabled selected> Pilih</option>
            <?php
            while ($datapilih1 = mysqli_fetch_array($querypilih1)) {
                ?>
                <option value="<?php echo $datapilih1['id_imunisasi'] ?>"><?php echo $d[] = $datapilih1['imunisasi'] ?></option>
                <?php
            }
            ?>
        </select>
        <input type="submit" name="simpan" value="Simpan">
    </form>

    <?php
    if (isset($_POST['simpan'])) {
    echo "<br>Data yang dipilih:<br>";
    $imunisasi = $_POST['imunisasi'];
    echo $d[$imunisasi - 1];
    ?>

    <table border="1" class="table">
        <th>nik</th>
        <th>nama</th>
        <th>jenkel</th>
        <th>imunisasi</th>
        <?php
        $sql1 = "select distinct penduduk.nik, penduduk.nama, jenkel.jenkel, imunisasi.imunisasi from penduduk left join jenkel on penduduk.id_jenkel=jenkel.id_jenkel left join detail_imunisasi on penduduk.nik=detail_imunisasi.nik left join imunisasi on detail_imunisasi.id_imunisasi=imunisasi.id_imunisasi where imunisasi.id_imunisasi='" . $imunisasi . "'";
        $query1 = mysqli_query($conn, $sql1);
        while ($data1 = mysqli_fetch_array($query1)) {
            ?>
            <tr>
                <td><?php echo $data1['nik']; ?></td>
                <td><?php echo $data1['nama']; ?></td>
                <td><?php echo $data1['jenkel']; ?></td>
                <td><?php echo $data1['imunisasi']; ?></td>
            </tr>
            <?php
        }
        }
        ?>
    </table>
</div>
</body>
</html>