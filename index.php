<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Dashboard">
    <meta name="keyword" content="Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">

    <title>KOTO GADANG</title>
    <script type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNnzxae2AewMUN0Tt_fC3gN38goeLVdVE&sensor=true"></script>

    <link href="gaya.css" rel="stylesheet">
    <!-- Bootstrap core CSS -->
    <link href="assets/css/bootstrap.css" rel="stylesheet">
    <!--external css-->
    <link href="assets/font-awesome/css/font-awesome.css" rel="stylesheet"/>
    <link rel="stylesheet" type="text/css" href="assets/css/zabuto_calendar.css">
    <link rel="stylesheet" type="text/css" href="assets/js/gritter/css/jquery.gritter.css"/>
    <link rel="stylesheet" type="text/css" href="assets/lineicons/style.css">

    <!-- Custom styles for this template -->
    <link href="assets/css/style.css" rel="stylesheet">
    <link href="assets/css/style-responsive.css" rel="stylesheet">

    <script src="assets/js/chart-master/Chart.js"></script>

    <!-- HTML5 shim and Respond.js IE8 suppo rt of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->


</head>
<body onload="init()">
<section id="container">
    <!-- **********************************************************************************************************************************************************
    TOP BAR CONTENT & NOTIFICATIONS
    *********************************************************************************************************************************************************** -->
    <!--header start-->
    <header class="header black-bg">
        <div class="sidebar-toggle-box">
            <div class="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
        </div>
        <!--logo start-->
        <a href="index.html" class="logo"><b>PBD KESEHATAN</b></a>
        <!--logo end-->
        <div class="nav notify-row" id="top_menu">
            <!--  notification start -->
            <ul class="nav top-menu">
                <!-- settings start -->

                <!-- inbox dropdown end -->
            </ul>
            <!--  notification end -->
        </div>
        <div class="top-menu">
            <ul class="nav pull-right top-menu">
                <a href="admin/" class="logo1"><i class="fa fa-sign-in"></i>
                    <span>Login</span></a>
            </ul>
        </div>
    </header>
    <!--header end-->

    <!-- **********************************************************************************************************************************************************
    MAIN SIDEBAR MENU
    *********************************************************************************************************************************************************** -->
    <!--sidebar start-->
    <aside>
        <div id="sidebar" class="nav-collapse ">
            <!-- sidebar menu start-->
            <ul class="sidebar-menu" id="nav-accordion">

                <p class="centered"><a href="#"><img src="assets/img/koto.jpg" class="img-circle" width="160"
                                                     height="130"></a></p>
                <h5 class="centered">Kelompok 9</h5>
                <br>
                <!--****************************Affan*******************************************************-->
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class="fa fa-file"></i>
                        <span>AFFAN HANAFIAH (1611522016)</span>
                    </a>
                    <ul class="sub">
                        <!--****************************Fungsional1*******************************************************-->
                        <li class="sub-menu">
                            <a href="javascript:;">
                                <i class="fa fa-search"></i>
                                <span>Fungsional 1</span>
                            </a>
                            <ul class="treeview-menu">
                                <div class=" form-group"><br>
                                    <label style="color: white;">Based on Vaccination</label>
                                    <select class="form-control select2" style="width: 100%; height: 70%;"
                                            id="pilihimunisasi">
                                        <option value="">-Choose-</option>
                                        <?php
                                        include("koneksi.php");
                                        $imunisasi = mysqli_query($conn, "select * from imunisasi");
                                        while ($rowimunisasi = mysqli_fetch_assoc($imunisasi)) {
                                            echo "<option value=" . $rowimunisasi['id_imunisasi'] . ">" . $rowimunisasi['imunisasi'] . "</option>";
                                        }
                                        ?>
                                    </select>
                                    <!-- </label> -->
                                </div>
                                <div class=" form-group">
                                    <button type="submit" class="btn btn-info btn-block btn-flat" id="pilihimunisasi"
                                            onclick='fungsional1();'>Search
                                    </button>
                                </div>
                            </ul>
                        </li>
                        <!--****************************Fungsional2*******************************************************-->
                        <li class="sub-menu">
                            <a href="javascript:;">
                                <i class="fa fa-search"></i>
                                <span>Fungsional 2</span>
                            </a>
                            <ul class="treeview-menu">
                                <div class=" form-group"><br>
                                    <label style="color: white;">Based on Way to Come</label>
                                    <select class="form-control select2" style="width: 100%; height: 70%;"
                                            id="pilihcd">
                                        <option value="">-Choose-</option>
                                        <?php
                                        $cara_datang = mysqli_query($conn, "select * from cara_datang");
                                        while ($rowcd = mysqli_fetch_assoc($cara_datang)) {
                                            echo "<option value=" . $rowcd['id_cd'] . ">" . $rowcd['cara_datang'] . "</option>";
                                        }
                                        ?>
                                    </select>
                                    <!-- </label> -->
                                </div>
                                <div class=" form-group">
                                    <button type="submit" class="btn btn-info btn-block btn-flat" id="pilihcd"
                                            onclick='fungsional2();'>Search
                                    </button>
                                </div>
                            </ul>
                        </li>
                        <!--****************************Fungsional3*******************************************************-->
                        <li class="sub-menu">
                            <a href="javascript:;">
                                <i class="fa fa-search"></i>
                                <span>Fungsional 3</span>
                            </a>
                            <ul class="treeview-menu">
                                <div class=" form-group"><br>
                                    <label style="color: white;">Based on Triage Scale</label>
                                    <select class="form-control select2" style="width: 100%; height: 70%;"
                                            id="pilihst">
                                        <option value="">-Choose-</option>
                                        <?php
                                        $skala_triase = mysqli_query($conn, "select * from skala_triase");
                                        while ($rowst = mysqli_fetch_assoc($skala_triase)) {
                                            echo "<option value=" . $rowst['id_skala'] . ">" . $rowst['skala_triase'] . "</option>";
                                        }
                                        ?>
                                    </select>
                                    <!-- </label> -->
                                </div>
                                <div class=" form-group">
                                    <button type="submit" class="btn btn-info btn-block btn-flat" id="pilihst"
                                            onclick='fungsional3();'>Search
                                    </button>
                                </div>
                            </ul>
                        </li>
                        <!--****************************Fungsional4*******************************************************-->
                        <li class="sub-menu">
                            <a href="javascript:;">
                                <i class="fa fa-search"></i>
                                <span>Fungsional 4</span>
                            </a>
                            <ul class="treeview-menu">
                                <div class=" form-group"><br>
                                    <label style="color: white;">Based on Divsion</label>
                                    <select class="form-control select2" style="width: 100%; height: 70%;"
                                            id="pilihbagian">
                                        <option value="">-Choose-</option>
                                        <?php
                                        $bagian = mysqli_query($conn, "select * from bagian");
                                        while ($rowbagian = mysqli_fetch_assoc($bagian)) {
                                            echo "<option value=" . $rowbagian['id_bagian'] . ">" . $rowbagian['bagian'] . "</option>";
                                        }
                                        ?>
                                    </select>
                                    <!-- </label> -->
                                </div>
                                <div class=" form-group">
                                    <button type="submit" class="btn btn-info btn-block btn-flat" id="pilihbagian"
                                            onclick='fungsional4();'>Search
                                    </button>
                                </div>
                            </ul>
                        </li>
                        <!--****************************Fungsional5*******************************************************-->
                        <li class="sub-menu">
                            <a href="javascript:;">
                                <i class="fa fa-search"></i>
                                <span>Fungsional 5</span>
                            </a>
                            <ul class="treeview-menu">
                                <div class=" form-group"><br>
                                    <label style="color: white;">Based on Airway</label>
                                    <select class="form-control select2" style="width: 100%; height: 70%;"
                                            id="pilihjalan">
                                        <option value="">-Choose-</option>
                                        <?php
                                        $jn = mysqli_query($conn, "select * from jalan_nafas");
                                        while ($rowjn = mysqli_fetch_assoc($jn)) {
                                            echo "<option value=" . $rowjn['id_jn'] . ">" . $rowjn['jalan_nafas'] . "</option>";
                                        }
                                        ?>
                                    </select>
                                    <!-- </label> -->
                                </div>
                                <div class=" form-group">
                                    <button type="submit" class="btn btn-info btn-block btn-flat" id="pilihjalan"
                                            onclick='fungsional5();'>Search
                                    </button>
                                </div>
                            </ul>
                        </li>
                        <!--****************************Fungsional6*******************************************************-->
                        <li class="sub-menu">
                            <a href="javascript:;">
                                <i class="fa fa-search"></i>
                                <span>Fungsional 6</span>
                            </a>
                            <ul class="treeview-menu">
                                <div class=" form-group" style="color: white;"><br>
                                    <label>Based On Pulse</label><br>
                                    <label for="nadi">Pulse : </label>
                                    <label id="nilainadi">0</label>
                                    <script>
                                        function ceknadi() {
                                            document.getElementById('nilainadi').innerHTML = document.getElementById('nadi').value;
                                        }
                                    </script>
                                    <input type="range" onchange="ceknadi();fungsional1a()" id="nadi"
                                           name="nadi" data-highlight="true" min="0" max="200" value="50">
                                </div>

                            </ul>
                        </li>
                        <!--****************************Fungsional7*******************************************************-->
                        <li class="sub-menu">
                            <a href="javascript:;">
                                <i class="fa fa-search"></i>
                                <span>Fungsional 7</span>
                            </a>
                            <ul class="treeview-menu">
                                <div class=" form-group" style="color: white;"><br>
                                    <label>Based On Tension</label><br>
                                    <label for="sistol">Sistole : </label>
                                    <label id="nilaisistol">0</label>
                                    <script>
                                        function ceksistol() {
                                            document.getElementById('nilaisistol').innerHTML = document.getElementById('sistol').value;
                                        }
                                    </script>
                                    <input type="range" onchange="ceksistol();" id="sistol"
                                           name="sistol" data-highlight="true" min="0" max="200" value="100">
                                    <label for="diastol">Diastole : </label>
                                    <label id="nilaidiastol">0</label>
                                    <script>
                                        function cekdiastol() {
                                            document.getElementById('nilaidiastol').innerHTML = document.getElementById('diastol').value;
                                        }
                                    </script>
                                    <input type="range" onchange="cekdiastol();" id="diastol"
                                           name="sistol" data-highlight="true" min="0" max="200" value="75">
                                </div>
                                <div class=" form-group">
                                    <button type="submit" class="btn btn-info btn-block btn-flat" id="cekdiastol"
                                            onclick='fungsional1b();'>Search
                                    </button>
                                </div>

                            </ul>
                        </li>
                    </ul>
                </li>
                <!--****************************Farel*******************************************************-->
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class="fa fa-file"></i>
                        <span>FAREL MUHAMMAD ALESKI (1611523006)</span>
                    </a>
                    <ul class="sub">
                        <!--****************************Fungsional1*******************************************************-->
                        <li class="sub-menu">
                            <a href="javascript:;">
                                <i class="fa fa-search"></i>
                                <span>Fungsional 1</span>
                            </a>
                            <ul class="treeview-menu">
                                <div class=" form-group"><br>
                                    <label style="color: white;">Based on Registration Date</label>
                                    <input type="date" id="regis" name="registrasi"
                                           value="2020-03-27"
                                           min="2020-01-01" max="2020-12-31">
                                    <!-- </label> -->
                                </div>
                                <div class=" form-group">
                                    <button type="submit" class="btn btn-info btn-block btn-flat" id="regis"
                                            onclick='fungsional6();'>Search
                                    </button>
                                </div>
                            </ul>
                        </li>
                        <!--****************************Fungsional2*******************************************************-->
                        <li class="sub-menu">
                            <a href="javascript:;">
                                <i class="fa fa-search"></i>
                                <span>Fungsional 2</span>
                            </a>
                            <ul class="treeview-menu">
                                <div class=" form-group"><br>
                                    <label style="color: white;">Based on Death on Arrival</label>
                                    <select class="form-control select2" style="width: 100%; height: 70%;"
                                            id="pilihdoa">
                                        <option value="">-Choose-</option>
                                        <?php
                                        $doa = mysqli_query($conn, "select * from d_o_a");
                                        while ($rowdoa = mysqli_fetch_assoc($doa)) {
                                            echo "<option value=" . $rowdoa['id_doa'] . ">" . $rowdoa['ciri_doa'] . "</option>";
                                        }
                                        ?>
                                    </select>
                                </div>
                                <div class=" form-group">
                                    <button type="submit" class="btn btn-info btn-block btn-flat" id="pilihdoa"
                                            onclick='fungsional7();'>Search
                                    </button>
                                </div>
                            </ul>
                        </li>
                        <!--****************************Fungsional3*******************************************************-->
                        <li class="sub-menu">
                            <a href="javascript:;">
                                <i class="fa fa-search"></i>
                                <span>Fungsional 3</span>
                            </a>
                            <ul class="treeview-menu">
                                <div class=" form-group"><br>
                                    <label style="color: white;">Based on Psychology</label>
                                    <select class="form-control select2" style="width: 100%; height: 70%;"
                                            id="pilihpsikologi">
                                        <option value="">-Choose-</option>
                                        <?php
                                        $psikologi = mysqli_query($conn, "select * from psikologi");
                                        while ($rowpsikologi = mysqli_fetch_assoc($psikologi)) {
                                            echo "<option value=" . $rowpsikologi['id_psikologi'] . ">" . $rowpsikologi['ciri_psikologi'] . "</option>";
                                        }
                                        ?>
                                    </select>
                                </div>
                                <div class=" form-group">
                                    <button type="submit" class="btn btn-info btn-block btn-flat" id="pilihpsikologi"
                                            onclick='fungsional8();'>Search
                                    </button>
                                </div>
                            </ul>
                        </li>
                        <!--****************************Fungsional4*******************************************************-->
                        <li class="sub-menu">
                            <a href="javascript:;">
                                <i class="fa fa-search"></i>
                                <span>Fungsional 4</span>
                            </a>
                            <ul class="treeview-menu">
                                <div class=" form-group"><br>
                                    <label style="color: white;">Based on Risk of Transmission</label>
                                    <select class="form-control select2" style="width: 100%; height: 70%;"
                                            id="pilihrisiko">
                                        <option value="">-Choose-</option>
                                        <?php
                                        $risiko = mysqli_query($conn, "select * from risiko_penularan");
                                        while ($rowrisiko = mysqli_fetch_assoc($risiko)) {
                                            echo "<option value=" . $rowrisiko['id_risiko'] . ">" . $rowrisiko['ciri_risiko_penularan'] . "</option>";
                                        }
                                        ?>
                                    </select>
                                </div>
                                <div class=" form-group">
                                    <button type="submit" class="btn btn-info btn-block btn-flat" id="pilihrisiko"
                                            onclick='fungsional9();'>Search
                                    </button>
                                </div>
                            </ul>
                        </li>
                        <!--****************************Fungsional5*******************************************************-->
                        <li class="sub-menu">
                            <a href="javascript:;">
                                <i class="fa fa-search"></i>
                                <span>Fungsional 5</span>
                            </a>
                            <ul class="treeview-menu">
                                <div class=" form-group"><br>
                                    <label style="color: white;">Based on Breathing</label>
                                    <select class="form-control select2" style="width: 100%; height: 70%;"
                                            id="pilihpernafasan">
                                        <option value="">-Choose-</option>
                                        <?php
                                        $pernafasan = mysqli_query($conn, "select * from pernafasan");
                                        while ($rowpernafasan = mysqli_fetch_assoc($pernafasan)) {
                                            echo "<option value=" . $rowpernafasan['id_pernafasan'] . ">" . $rowpernafasan['ciri_pernafasan'] . "</option>";
                                        }
                                        ?>
                                    </select>
                                </div>
                                <div class=" form-group">
                                    <button type="submit" class="btn btn-info btn-block btn-flat" id="pilihpernafasan"
                                            onclick='fungsional10();'>Search
                                    </button>
                                </div>
                            </ul>
                        </li>
                    </ul>
                </li>
                <!--****************************Aqli*******************************************************-->
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class="fa fa-file"></i>
                        <span>AQLI MULIA FIRMAN (1611522002)</span>
                    </a>
                    <ul class="sub">
                        <!--****************************Fungsional1*******************************************************-->
                        <li class="sub-menu">
                            <a href="javascript:;">
                                <i class="fa fa-search"></i>
                                <span>Fungsional 1</span>
                            </a>
                            <ul class="treeview-menu">
                                <div class=" form-group"><br>
                                    <label style="color: white;">Based on Circulation</label>
                                    <select class="form-control select2" style="width: 100%; height: 70%;"
                                            id="pilihsirkulasi">
                                        <option value="">-Choose-</option>
                                        <?php
                                        $sirkulasi = mysqli_query($conn, "select * from sirkulasi");
                                        while ($rowsirkulasi = mysqli_fetch_assoc($sirkulasi)) {
                                            echo "<option value=" . $rowsirkulasi['id_sirkulasi'] . ">" . $rowsirkulasi['ciri_pernafasan'] . "</option>";
                                        }
                                        ?>
                                    </select>
                                    <!-- </label> -->
                                </div>
                                <div class=" form-group">
                                    <button type="submit" class="btn btn-info btn-block btn-flat" id="pilihsirkulasi"
                                            onclick='fungsional11();'>Search
                                    </button>
                                </div>
                            </ul>
                        </li>
                        <!--****************************Fungsional2*******************************************************-->
                        <li class="sub-menu">
                            <a href="javascript:;">
                                <i class="fa fa-search"></i>
                                <span>Fungsional 2</span>
                            </a>
                            <ul class="treeview-menu">
                                <div class=" form-group"><br>
                                    <label style="color: white;">Based on Disability</label>
                                    <select class="form-control select2" style="width: 100%; height: 70%;"
                                            id="pilihdisabilitas">
                                        <option value="">-Choose-</option>
                                        <?php
                                        $disabilitas = mysqli_query($conn, "select * from disabilitas");
                                        while ($rowdisabilitas = mysqli_fetch_assoc($disabilitas)) {
                                            echo "<option value=" . $rowdisabilitas['id_disabilitas'] . ">" . $rowdisabilitas['ciri_disabilitas'] . "</option>";
                                        }
                                        ?>
                                    </select>
                                    <!-- </label> -->
                                </div>
                                <div class=" form-group">
                                    <button type="submit" class="btn btn-info btn-block btn-flat" id="pilihdisabilitas"
                                            onclick='fungsional12();'>Search
                                    </button>
                                </div>
                            </ul>
                        </li>
                        <!--****************************Fungsional3*******************************************************-->
                        <li class="sub-menu">
                            <a href="javascript:;">
                                <i class="fa fa-search"></i>
                                <span>Fungsional 3</span>
                            </a>
                            <ul class="treeview-menu">
                                <div class=" form-group"><br>
                                    <label style="color: white;">Based on Other</label>
                                    <select class="form-control select2" style="width: 100%; height: 70%;"
                                            id="pilihlain">
                                        <option value="">-Choose-</option>
                                        <?php
                                        $lain = mysqli_query($conn, "select * from lain_lain");
                                        while ($rowlain = mysqli_fetch_assoc($lain)) {
                                            echo "<option value=" . $rowlain['id_lain_lain'] . ">" . $rowlain['ciri_lain_lain'] . "</option>";
                                        }
                                        ?>
                                    </select>
                                    <!-- </label> -->
                                </div>
                                <div class=" form-group">
                                    <button type="submit" class="btn btn-info btn-block btn-flat" id="pilihlain"
                                            onclick='fungsional13();'>Search
                                    </button>
                                </div>
                            </ul>
                        </li>
                        <!--****************************Fungsional4*******************************************************-->
                        <li class="sub-menu">
                            <a href="javascript:;">
                                <i class="fa fa-search"></i>
                                <span>Fungsional 4</span>
                            </a>
                            <ul class="treeview-menu">
                                <div class=" form-group"><br>
                                    <label style="color: white;">Based on Arrival & way to come</label>
                                    <select class="form-control select2" style="width: 100%; height: 70%;"
                                            id="aql1">
                                        <option value="">-Choose-</option>
                                        <?php
                                        $aql1 = mysqli_query($conn, "select distinct kedatangan_ke from detail_rekam_medis");
                                        while ($rowaql1 = mysqli_fetch_assoc($aql1)) {
                                            echo "<option value=" . $rowaql1['kedatangan_ke'] . ">" . $rowaql1['kedatangan_ke'] . "</option>";
                                        }
                                        ?>
                                    </select>
                                    <label style="color: white;">Based on Way to Come</label>
                                    <select class="form-control select2" style="width: 100%; height: 70%;"
                                            id="aql2">
                                        <option value="">-Choose-</option>
                                        <?php
                                        $aql2 = mysqli_query($conn, "select distinct * from cara_datang");
                                        while ($rowaql2 = mysqli_fetch_assoc($aql2)) {
                                            echo "<option value=" . $rowaql2['id_cd'] . ">" . $rowaql2['cara_datang'] . "</option>";
                                        }
                                        ?>
                                    </select>

                                    <!-- </label> -->
                                </div>
                                <div class=" form-group">
                                    <button type="submit" class="btn btn-info btn-block btn-flat" id="pilihlain"
                                            onclick='fungsional14();'>Search
                                    </button>
                                </div>
                            </ul>
                        </li>
                        <!--****************************Fungsional5*******************************************************-->
                        <li class="sub-menu">
                            <a href="javascript:;">
                                <i class="fa fa-search"></i>
                                <span>Fungsional 5</span>
                            </a>
                            <ul class="treeview-menu">
                                <div class=" form-group"><br>
                                    <label style="color: white;">Based on Reference</label>
                                    <input type="text" id="rujukan" name="rujukan">
                                    <!-- </label> -->
                                </div>
                                <div class=" form-group">
                                    <button type="submit" class="btn btn-info btn-block btn-flat" id="rujukan"
                                            onclick='fungsional15();'>Search
                                    </button>
                                </div>
                            </ul>
                        </li>


                    </ul>
                </li>


            </ul>

            <!-- sidebar menu end-->
        </div>

    </aside>
    <!--sidebar end-->

    <!-- **********************************************************************************************************************************************************
    MAIN CONTENT
    *********************************************************************************************************************************************************** -->
    <!--main content start--> <!-- <br> -->
    <!-- <div class="col-lg-10 ds"> -->
    <section id="main-content">
        <section class="wrapper">
            <div class="col-lg-9 ds">
                <!--h3 style="font-size:24px" > SISTEM INFORMASI NAGARI KOTO GADANG</h3-->
                <!-- First Action -->
                <div class="panel box-v3">
                    <div class="panel-body">
                        <div class="col-md-12 padding-0 text-center">
                            <div class="row" style="text-align:left">
                                List :
                                <button type="button" onclick="posisisekarang()" class="btn btn-default btn-sm "
                                        data-toggle="tooltip" id="posisinow" title="Posisi Saya"
                                        style="margin-right: 7px" style="margin-right: 7px;"><i
                                            class="fa fa-location-arrow" style="color:black;"> </i>
                                </button>
                                <button type="button" onclick="lokasimanual()" class="btn btn-default btn-sm "
                                        data-toggle="tooltip" id="posmanual" title="Posisi Manual"
                                        style="margin-right: 7px;"><i class="fa fa-map-marker"
                                                                      style="color:black;"> </i>
                                </button>
                                <button type="button" onclick="viewall()" class="btn btn-default btn-sm "
                                        data-toggle="tooltip" title="Melihat Semua Object"
                                        style="margin: 7px" style="margin-right: 7px;"><i class="fa fa-bullseye"
                                                                                          style="color:black;"></i>
                                </button>
                                <label id="tombol">
                                    <a type="button" id="showlegenda" onclick="legenda()"
                                       class="btn btn-default btn-sm " data-toggle="tooltip"
                                       style="margin-right: 7px;"><i class="fa fa-eye" style="color:black;"> </i></a>
                                </label>

                                <!--<button type="button" onclick="clean()" class="btn btn-primary btn-sm " data-toggle="tooltip" title="Refresh" style="margin: 7px"
                                         style="margin-right: 7px;"><i class="fa fa-refresh"> Refresh</i>
                                 </button-->
                                <div class="panel-body text-center">
                                    <div id="map" style="width: 750px; height:600px"></div>
                                </div>


                                <div class="col-lg-3 ds" id="hasilmosque" style="display:none;">
                                    <!-- <div class="col-md-12 padding-0" style="display:none;"> -->
                                    <h3 style="font-size:16px">Mosque Information</h3>
                                    <!-- First Action -->
                                    <div class="box-body" style="max-height:450px;overflow:auto;">
                                        <div class="form-group" id="hasilcarimosque1" style="display:none;">
                                            <table class="table table-bordered" id='hasilcarimosque'></table>
                                        </div>
                                    </div>
                                </div>


                                <div class="col-lg-3 ds" id="hasiltokoh" style="display:none;">
                                    <!-- <div class="col-md-12 padding-0" style="display:none;"> -->
                                    <h3 style="font-size:16px">Great Character Information</h3>
                                    <!-- First Action -->
                                    <div class="box-body" style="max-height:450px;overflow:auto;">
                                        <div class="form-group" id="hasilcaritokoh1" style="display:none;">
                                            <table class="table table-bordered" id='hasilcaritokoh'></table>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-3 ds" id="hasilobj" style="display:none;">
                                    <!-- <div class="col-md-12 padding-0" style="display:none;"> -->
                                    <h3 style="font-size:16px">UMKM Information</h3>
                                    <!-- First Action -->
                                    <div class="box-body" style="max-height:450px;overflow:auto;">
                                        <div class="form-group" id="hasilcariobj1" style="display:none;">
                                            <table class="table table-bordered" id='hasilcariobj'></table>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-3 ds" id="hasilculi" style="display:none;">
                                    <!-- <div class="col-md-12 padding-0"5style="display:none;"> -->
                                    <!-- <h3 style="font-size:16px">Culinary Information</h3> -->
                                    <h3 style="font-size:16px">Culinary Information</h3>
                                    <!-- First Action -->
                                    <div class="box-body" style="max-height:450px;overflow:auto;">
                                        <div class="form-group" id="hasilcariculi1" style="display:none;">
                                            <table class="table table-bordered" id='hasilcariculi'></table>
                                        </div>
                                    </div>
                                </div>


                                <div class="col-lg-3 ds" id="hasilwisata" style="display:none;">
                                    <!-- <div class="col-md-12 padding-0"5style="display:none;"> -->
                                    <!-- <h3 style="font-size:16px">Culinary Information</h3> -->
                                    <h3 style="font-size:16px">Tourism Information</h3>
                                    <!-- First Action -->
                                    <div class="box-body" style="max-height:450px;overflow:auto;">
                                        <div class="form-group" id="hasilcariwisata1" style="display:none;">
                                            <table class="table table-bordered" id='hasilcariwisata'></table>
                                        </div>
                                    </div>
                                </div>
                                <!--custom chart end-->

                                <div class="col-lg-6 ds" id="hasilrute" style="display:none;">
                                    <!-- <div class="col-md-12 padding-0" style="display:none;"> -->
                                    <h3 style="font-size:16px">Rute</h3>
                                    <!-- First Action -->
                                    <div class="box-body" style="max-height:557px;overflow:auto;">
                                        <div class="form-group" id="detailrute1">
                                            <table class="table table-bordered" id='detailrute'></table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- </div>/col-lg-9 END SECTION MIDDLE -->


            <!-- **********************************************************************************************************************************************************
            RIGHT SIDEBAR CONTENT
            *********************************************************************************************************************************************************** -->

            <div class="col-lg-3 ds" id="hasilik">
                <!-- <div class="col-md-12 padding-0" style="display:none;"> -->
                <h3 style="font-size:20px">RESULT</h3>
                <!-- First Action -->
                <div class="box-body" style="max-height:450px;overflow:auto;">

                    <div class="form-group" id="hasilcari1" style="display:none;">
                        <table class="table table-bordered" id='hasilcari'></table>

                    </div>
                </div>
            </div>

            <div id="nearbyik" class="col-lg-3 ds" style="display:none">
                <div class="white-panel pns" style="padding-bottom:5px">
                    <div class="white-header" style="height:40px;margin-bottom:0px;background:white;color:black">
                        <!-- <h4><u><b>Object Arround</b></u></h4> -->
                        <h3 style="font-size:16px">Near Object</h3>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-xs-6"></div>
                    </div>
                    <div style="text-align:left;margin:5px; font-size:12px; color:black;">
                        <!--img src="assets/img/product.png" width="120"-->
                        <br>
                        <br>
                        <label class="container"> UMKM
                            <input id="check_tw" type="checkbox">
                            <span class="checkmark"></span>

                        </label>

                        <label class="container">Culinary
                            <input id="check_k" type="checkbox">
                            <span class="checkmark"></span>

                        </label>

                        <label class="container">Mosque
                            <input id="check_m" type="checkbox">
                            <span class="checkmark"></span>

                        </label>
                        <label class="container">Great Character
                            <input id="check_oo" type="checkbox">
                            <span class="checkmark"></span>

                        </label>
                        <label class="container">Tourism
                            <input id="check_i" type="checkbox">
                            <span class="checkmark"></span>

                        </label>


                        <!--RADIUS-->
                        <label for="inputradiuss">Radius : </label>
                        <label id="nilaiiiii">0</label> m
                        <script>
                            function cek() {
                                document.getElementById('nilaiiiii').innerHTML = document.getElementById('inputradiuss').value * 100
                            }
                        </script>
                        <input type="range" onchange="cek(); aktifkanRadiuss2()" id="inputradiuss" name="inputradiuss"
                               data-highlight="true" min="0" max="15" value="0">

                        <!--BUTTON CARI SEKITAR-->
                        <div id="view_sekitar" class="centered">
                        </div>


                    </div>
                </div>
            </div><!-- /col-md-12 -->

            <div class="col-lg-3 ds" id="tampilangkotsekitarik" style="display:none;">

                <h3 style="font-size:16px">Local Transportation</h3>

                <div class="box-body" style="max-height:450px;overflow:auto;">
                    <div class="form-group" id="tampillistangkotik1" style="display:none;">
                        <table class="table table-bordered" id='tampillistangkotik'></table>
                    </div>
                </div>
            </div>


        </section>

    </section>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

    <script src="skrip.js"></script>
    <script src="fungsi.js"></script>
    <!-- js placed at the end of the document so the pages load faster -->
    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/jquery-1.8.3.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script class="include" type="text/javascript" src="assets/js/jquery.dcjqaccordion.2.7.js"></script>
    <script src="assets/js/jquery.scrollTo.min.js"></script>
    <script src="assets/js/jquery.nicescroll.js" type="text/javascript"></script>
    <script src="assets/js/jquery.sparkline.js"></script>


    <!--common script for all pages-->
    <script src="assets/js/common-scripts.js"></script>
    <script type="text/javascript" src="assets/js/gritter/js/jquery.gritter.js"></script>
    <script type="text/javascript" src="assets/js/gritter-conf.js"></script>

    <!--script for this page-->
    <script src="assets/js/sparkline-chart.js"></script>
    <script src="assets/js/zabuto_calendar.js"></script>

    <script type="application/javascript">
        $(document).ready(function () {
            $("#date-popover").popover({html: true, trigger: "manual"});
            $("#date-popover").hide();
            $("#date-popover").click(function (e) {
                $(this).hide();
            });

            $("#my-calendar").zabuto_calendar
            ({
                action: function () {
                    return myDateFunction(this.id, false);
                },
                action_nav: function () {
                    return myNavFunction(this.id);
                },
                ajax:
                    {
                        url: "show_data.php?action=1",
                        modal: true
                    },
                legend:
                    [
                        {type: "text", label: "Special event", badge: "00"},
                        {type: "block", label: "Regular event",}
                    ]
            });
        });


        function myNavFunction(id) {
            $("#date-popover").hide();
            var nav = $("#" + id).data("navigation");
            var to = $("#" + id).data("to");
            console.log('nav ' + nav + ' to: ' + to.month + '/' + to.year);
        }
    </script>
</body>
</html>