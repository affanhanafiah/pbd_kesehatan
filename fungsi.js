// fungsional1
function fungsional1() {

    var imunisasi = document.getElementById('pilihimunisasi').value;
    console.log(imunisasi);

    hapusposisi();
    hapusdata();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    // viewdigit();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'fungsi1.php?imunisasi=' + imunisasi, data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                // $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var nik = row.nik;
                    var nama = row.nama;
                    // var jenkel = row.jenkel;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    //var ik_status = row.ik_status;
                    console.log(nik);
                    // console.log(lat);
                    // console.log(lon);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    // map.setCenter(centerBaru);
                    map.setZoom(13);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/industries.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setCenter(centerBaru);
                    markersDua.push(marker);
                    klikinfoWindowEdit1(barubana, nik);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + nama + "</td><td><a role='button' class='btn btn-success' onclick='detailinfofungsi1(\"" + nik + "\")'>Show</a></td></tr>");
                }
            }
        }
    });
}

function klikinfoWindowEdit1(barubana, nik) {
    hapusdata();
    $('#hasilik').show(nik);
    $('#hasilcari1').show(nik);
    $('#hasilcari').show(nik);
    var marker = new google.maps.Marker
    ({
        position: centerBaru,
        icon: 'assets/img/industries.png',
        animation: google.maps.Animation.DROP,
        map: map

    });

    markersDua.push(marker);
    google.maps.event.addListener(marker, "click", function () {
        detailinfofungsi1(nik);
    });
}

function detailinfofungsi1(nik1) {

    $('#info').empty();
    hapusInfo();
    hapusInfo2();
    hapusdata();
    clearroute2();
    hapusMarkerTerdekat();
    hapusangkot();
    console.log(server + 'detailfungsi1.php?info=' + nik1);
    $.ajax({
        url: server + 'detailfungsi1.php?info=' + nik1, data: "", dataType: 'json', success: function (rows) {
            for (var i in rows) {
                console.log('dd');
                var row = rows[i];
                var nik = row.nik;
                var nama = row.nama;
                var jenkel = row.jenkel;
                var rm = row.rm;
                var latitude = row.latitude;
                var longitude = row.longitude;
                centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
                marker = new google.maps.Marker
                ({
                    position: centerBaru,
                    icon: 'assets/img/industries.png',
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                console.log(latitude);
                console.log(longitude);
                markersDua.push(marker);
                map.setCenter(centerBaru);
                //map.setZoom(15);
                // if (address==null)
                // {
                //     address="tidak ada";
                // }

                infowindow = new google.maps.InfoWindow({
                    position: centerBaru,
                    content: "<center><span style=color:black><b>Information</b><table><tr><td><i class=''></i>NIK</td><td>:</td><td> " + nik + "</td></tr><br><tr><td><i class=''></i>Nama</td><td>:</td><td> " + nama + "</td></tr><br><tr><td><i class=''></i>Jenis Kelamin</td><td> : </td><td> " + jenkel + "</td></tr><br><tr><td><i class=''></i>Rekam Medis</td><td>:</td><td> " + rm + "</td></tr></table>"
                    // +
                    // "<td><a role='button' class='btn btn-success' onclick='allangkot(\""+latitude+"\",\""+longitude +"\")'>Near Object</a></td><td><a role='button' class='btn btn-success' onclick='galeri(\""+nik+"\");'>Gallery</a></td></span>"
                    ,
                    pixelOffset: new google.maps.Size(0, -33)
                });
                infoposisi.push(infowindow);
                hapusInfo();
                infowindow.open(map);
            }
        }
    });
}

// fungsional2
function fungsional2() {

    var cara_datang = document.getElementById('pilihcd').value;
    console.log(cara_datang);

    hapusposisi();
    hapusdata();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    // viewdigit();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'fungsi2.php?cd=' + cara_datang, data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                // $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var nik = row.nik;
                    var rm = row.rm;
                    var nama = row.nama;
                    // var jenkel = row.jenkel;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    //var ik_status = row.ik_status;
                    console.log(nik);
                    // console.log(lat);
                    // console.log(lon);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    // map.setCenter(centerBaru);
                    map.setZoom(13);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/industries.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setCenter(centerBaru);
                    markersDua.push(marker);
                    klikinfoWindowEdit1(barubana, nik);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + nama + "</td><td><a role='button' class='btn btn-success' onclick='detailinfofungsi1(\"" + nik + "\")'>Show</a></td></tr>");
                }
            }
        }
    });
}

// fungsional3
function fungsional3() {

    var skala_triase = document.getElementById('pilihst').value;
    console.log(skala_triase);

    hapusposisi();
    hapusdata();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    // viewdigit();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'fungsi3.php?st=' + skala_triase, data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                // $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var nik = row.nik;
                    var rm = row.rm;
                    var nama = row.nama;
                    // var jenkel = row.jenkel;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    //var ik_status = row.ik_status;
                    console.log(nik);
                    // console.log(lat);
                    // console.log(lon);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    // map.setCenter(centerBaru);
                    map.setZoom(13);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/industries.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setCenter(centerBaru);
                    markersDua.push(marker);
                    klikinfoWindowEdit1(barubana, nik);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + nama + "</td><td><a role='button' class='btn btn-success' onclick='detailinfofungsi1(\"" + nik + "\")'>Show</a></td></tr>");
                }
            }
        }
    });
}

// fungsional4
function fungsional4() {

    var bagian = document.getElementById('pilihbagian').value;
    console.log(bagian);

    hapusposisi();
    hapusdata();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    // viewdigit();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'fungsi4.php?bagian=' + bagian, data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                // $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var nik = row.nik;
                    var rm = row.rm;
                    var nama = row.nama;
                    // var jenkel = row.jenkel;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    //var ik_status = row.ik_status;
                    console.log(nik);
                    // console.log(lat);
                    // console.log(lon);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    // map.setCenter(centerBaru);
                    map.setZoom(13);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/industries.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setCenter(centerBaru);
                    markersDua.push(marker);
                    klikinfoWindowEdit1(barubana, nik);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + nama + "</td><td><a role='button' class='btn btn-success' onclick='detailinfofungsi1(\"" + nik + "\")'>Show</a></td></tr>");
                }
            }
        }
    });
}

// fungsional5
function fungsional5() {
    var jalan = document.getElementById('pilihjalan').value;
    console.log(jalan);

    hapusposisi();
    hapusdata();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    // viewdigit();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'fungsi5.php?jalan=' + jalan, data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                // $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var nik = row.nik;
                    var rm = row.rm;
                    var nama = row.nama;
                    // var jenkel = row.jenkel;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    //var ik_status = row.ik_status;
                    console.log(nik);
                    // console.log(lat);
                    // console.log(lon);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    // map.setCenter(centerBaru);
                    map.setZoom(13);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/industries.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setCenter(centerBaru);
                    markersDua.push(marker);
                    klikinfoWindowEdit1(barubana, nik);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + nama + "</td><td><a role='button' class='btn btn-success' onclick='detailinfofungsi1(\"" + nik + "\")'>Show</a></td></tr>");
                }
            }
        }
    });
}

//fungsional6
function fungsional6() {
    var regis = document.getElementById('regis').value;
    console.log(regis);

    hapusposisi();
    hapusdata();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    // viewdigit();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'fungsi6.php?regis=' + regis, data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                // $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var nik = row.nik;
                    var rm = row.rm;
                    var nama = row.nama;
                    // var jenkel = row.jenkel;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    //var ik_status = row.ik_status;
                    console.log(nik);
                    // console.log(lat);
                    // console.log(lon);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    // map.setCenter(centerBaru);
                    map.setZoom(13);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/industries.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setCenter(centerBaru);
                    markersDua.push(marker);
                    klikinfoWindowEdit1(barubana, nik);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + nama + "</td><td><a role='button' class='btn btn-success' onclick='detailinfofungsi1(\"" + nik + "\")'>Show</a></td></tr>");
                }
            }
        }
    });
}

//fungsional7
function fungsional7() {
    var doa = document.getElementById('pilihdoa').value;
    console.log(doa);

    hapusposisi();
    hapusdata();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    // viewdigit();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'fungsi7.php?doa=' + doa, data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                // $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var nik = row.nik;
                    var rm = row.rm;
                    var nama = row.nama;
                    // var jenkel = row.jenkel;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    //var ik_status = row.ik_status;
                    console.log(nik);
                    // console.log(lat);
                    // console.log(lon);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    // map.setCenter(centerBaru);
                    map.setZoom(13);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/industries.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setCenter(centerBaru);
                    markersDua.push(marker);
                    klikinfoWindowEdit1(barubana, nik);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + nama + "</td><td><a role='button' class='btn btn-success' onclick='detailinfofungsi1(\"" + nik + "\")'>Show</a></td></tr>");
                }
            }
        }
    });
}

//fungsional8
function fungsional8() {
    var psikologi = document.getElementById('pilihpsikologi').value;
    console.log(psikologi);

    hapusposisi();
    hapusdata();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    // viewdigit();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'fungsi8.php?psikologi=' + psikologi, data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                // $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var nik = row.nik;
                    var rm = row.rm;
                    var nama = row.nama;
                    // var jenkel = row.jenkel;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    //var ik_status = row.ik_status;
                    console.log(nik);
                    // console.log(lat);
                    // console.log(lon);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    // map.setCenter(centerBaru);
                    map.setZoom(13);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/industries.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setCenter(centerBaru);
                    markersDua.push(marker);
                    klikinfoWindowEdit1(barubana, nik);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + nama + "</td><td><a role='button' class='btn btn-success' onclick='detailinfofungsi1(\"" + nik + "\")'>Show</a></td></tr>");
                }
            }
        }
    });
}

//fungsional9
function fungsional9() {
    var risiko = document.getElementById('pilihrisiko').value;
    console.log(risiko);

    hapusposisi();
    hapusdata();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    // viewdigit();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'fungsi9.php?risiko=' + risiko, data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                // $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var nik = row.nik;
                    var rm = row.rm;
                    var nama = row.nama;
                    // var jenkel = row.jenkel;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    //var ik_status = row.ik_status;
                    console.log(nik);
                    // console.log(lat);
                    // console.log(lon);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    // map.setCenter(centerBaru);
                    map.setZoom(13);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/industries.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setCenter(centerBaru);
                    markersDua.push(marker);
                    klikinfoWindowEdit1(barubana, nik);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + nama + "</td><td><a role='button' class='btn btn-success' onclick='detailinfofungsi1(\"" + nik + "\")'>Show</a></td></tr>");
                }
            }
        }
    });
}

//fungsional10
function fungsional10() {
    var pernafasan = document.getElementById('pilihpernafasan').value;
    console.log(pernafasan);

    hapusposisi();
    hapusdata();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    // viewdigit();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'fungsi10.php?pernafasan=' + pernafasan, data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                // $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var nik = row.nik;
                    var rm = row.rm;
                    var nama = row.nama;
                    // var jenkel = row.jenkel;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    //var ik_status = row.ik_status;
                    console.log(nik);
                    // console.log(lat);
                    // console.log(lon);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    // map.setCenter(centerBaru);
                    map.setZoom(13);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/industries.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setCenter(centerBaru);
                    markersDua.push(marker);
                    klikinfoWindowEdit1(barubana, nik);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + nama + "</td><td><a role='button' class='btn btn-success' onclick='detailinfofungsi1(\"" + nik + "\")'>Show</a></td></tr>");
                }
            }
        }
    });
}

//fungsional10
function fungsional11() {
    var sirkulasi = document.getElementById('pilihsirkulasi').value;
    console.log(sirkulasi);

    hapusposisi();
    hapusdata();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    // viewdigit();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'fungsi11.php?sirkulasi=' + sirkulasi, data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                // $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var nik = row.nik;
                    var rm = row.rm;
                    var nama = row.nama;
                    // var jenkel = row.jenkel;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    //var ik_status = row.ik_status;
                    console.log(nik);
                    // console.log(lat);
                    // console.log(lon);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    // map.setCenter(centerBaru);
                    map.setZoom(13);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/industries.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setCenter(centerBaru);
                    markersDua.push(marker);
                    klikinfoWindowEdit1(barubana, nik);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + nama + "</td><td><a role='button' class='btn btn-success' onclick='detailinfofungsi1(\"" + nik + "\")'>Show</a></td></tr>");
                }
            }
        }
    });
}

//fungsional13
function fungsional12() {
    var disabilitas = document.getElementById('pilihdisabilitas').value;
    console.log(disabilitas);

    hapusposisi();
    hapusdata();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    // viewdigit();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'fungsi12.php?disabilitas=' + disabilitas, data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                // $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var nik = row.nik;
                    var rm = row.rm;
                    var nama = row.nama;
                    // var jenkel = row.jenkel;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    //var ik_status = row.ik_status;
                    console.log(nik);
                    // console.log(lat);
                    // console.log(lon);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    // map.setCenter(centerBaru);
                    map.setZoom(13);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/industries.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setCenter(centerBaru);
                    markersDua.push(marker);
                    klikinfoWindowEdit1(barubana, nik);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + nama + "</td><td><a role='button' class='btn btn-success' onclick='detailinfofungsi1(\"" + nik + "\")'>Show</a></td></tr>");
                }
            }
        }
    });
}

//fungsional13
function fungsional13() {
    var lain = document.getElementById('pilihlain').value;
    console.log(lain);

    hapusposisi();
    hapusdata();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    // viewdigit();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'fungsi13.php?lain=' + lain, data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                // $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var nik = row.nik;
                    var rm = row.rm;
                    var nama = row.nama;
                    // var jenkel = row.jenkel;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    //var ik_status = row.ik_status;
                    console.log(nik);
                    // console.log(lat);
                    // console.log(lon);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    // map.setCenter(centerBaru);
                    map.setZoom(13);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/industries.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setCenter(centerBaru);
                    markersDua.push(marker);
                    klikinfoWindowEdit1(barubana, nik);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + nama + "</td><td><a role='button' class='btn btn-success' onclick='detailinfofungsi1(\"" + nik + "\")'>Show</a></td></tr>");
                }
            }
        }
    });
}

//fungsional14
function fungsional14() {
    var aql1 = document.getElementById('aql1').value;
    var aql2 = document.getElementById('aql2').value;
    console.log(aql1);

    hapusposisi();
    hapusdata();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    // viewdigit();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'fungsi14.php?nilai1=' + aql1 + '&nilai2=' + aql2,
        data: "",
        dataType: 'json',
        success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                // $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var nik = row.nik;
                    var rm = row.rm;
                    var nama = row.nama;
                    // var jenkel = row.jenkel;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    //var ik_status = row.ik_status;
                    console.log(nik);
                    // console.log(lat);
                    // console.log(lon);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    // map.setCenter(centerBaru);
                    map.setZoom(13);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/industries.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setCenter(centerBaru);
                    markersDua.push(marker);
                    klikinfoWindowEdit1(barubana, nik);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + nama + "</td><td><a role='button' class='btn btn-success' onclick='detailinfofungsi1(\"" + nik + "\")'>Show</a></td></tr>");
                }
            }
        }
    });
}

//fungsional14
function fungsional15() {
    var rujukan = document.getElementById('rujukan').value;
    console.log(aql1);

    hapusposisi();
    hapusdata();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    // viewdigit();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'fungsi15.php?rujukan=' + rujukan, data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                // $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var nik = row.nik;
                    var rm = row.rm;
                    var nama = row.nama;
                    // var jenkel = row.jenkel;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    //var ik_status = row.ik_status;
                    console.log(nik);
                    // console.log(lat);
                    // console.log(lon);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    // map.setCenter(centerBaru);
                    map.setZoom(13);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/industries.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setCenter(centerBaru);
                    markersDua.push(marker);
                    klikinfoWindowEdit1(barubana, nik);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + nama + "</td><td><a role='button' class='btn btn-success' onclick='detailinfofungsi1(\"" + nik + "\")'>Show</a></td></tr>");
                }
            }
        }
    });
}

//fungsional1a
function fungsional1a() {
    var nadi = document.getElementById('nadi').value;
    console.log(nadi);

    hapusposisi();
    hapusdata();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    // viewdigit();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'fungsi1a.php?nadi=' + nadi, data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                // $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var nik = row.nik;
                    var rm = row.rm;
                    var nama = row.nama;
                    // var jenkel = row.jenkel;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    //var ik_status = row.ik_status;
                    console.log(nik);
                    // console.log(lat);
                    // console.log(lon);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    // map.setCenter(centerBaru);
                    map.setZoom(13);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/industries.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setCenter(centerBaru);
                    markersDua.push(marker);
                    klikinfoWindowEdit1(barubana, nik);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + nama + "</td><td><a role='button' class='btn btn-success' onclick='detailinfofungsi1(\"" + nik + "\")'>Show</a></td></tr>");
                }
            }
        }
    });
}

//fungsional1b
function fungsional1b() {
    var sistol = document.getElementById('sistol').value;
    var diastol = document.getElementById('diastol').value;
    console.log(sistol & diastol);

    hapusposisi();
    hapusdata();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    // viewdigit();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'fungsi1b.php?sistol=' + sistol + '&diastol=' + diastol,
        data: "",
        dataType: 'json',
        success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                // $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var nik = row.nik;
                    var rm = row.rm;
                    var nama = row.nama;
                    // var jenkel = row.jenkel;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    //var ik_status = row.ik_status;
                    console.log(nik);
                    // console.log(lat);
                    // console.log(lon);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    // map.setCenter(centerBaru);
                    map.setZoom(13);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/industries.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setCenter(centerBaru);
                    markersDua.push(marker);
                    klikinfoWindowEdit1(barubana, nik);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + nama + "</td><td><a role='button' class='btn btn-success' onclick='detailinfofungsi1(\"" + nik + "\")'>Show</a></td></tr>");
                }
            }
        }
    });
}