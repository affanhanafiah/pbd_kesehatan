var server = window.location.origin + "/pbd_kesehatan/";
var map;
var markersDua = [];
var koordinat = 'null'
var infoposisi = [];
var markerposisi = [];
var centerLokasi;
var markerposisi = [];
var centerBaru;
var cekRadiusStatus = "off";
var circles = [];
var fotosrc = 'image/';
var angkot = [];
var barubana;
var barubana2;
var barubana3;
var barubana4;
var barubana5;
var infoDua = [];
var ikon;
var rad;
var markersimpang = [];
var simpangindustri = [];
var infowindow;
var markers = [];
var centerAwal;
var ja;
var jalurAngkot = [];
var angkot = [];
var rute = []
var arrayangkot = [];


// FIIIIIIIIIIIX Membuat Fungsi Saat Onload
function init() {
    basemap();
    //viewumkm();
    $("#nearbyik").hide();
    viewdigit();
    viewdigit2();
    viewdigit3();
    viewdigit4();
    viewdigit5();
    viewdigitnagari();
}

function lokasimanual() {
    alert('Klik Peta');
    clearroute2();
    // hapusRadius();
    // cekRadius();
    // clearmarker();
    // clearmarkerDkt();
    map.addListener('click', function (event) {
        addMarker(event.latLng);
    });
}

function addMarker(location) {
    for (var i = 0; i < markerposisi.length; i++) {
        markerposisi[i].setMap(null);

        hapusRadius();
        cekRadius();
    }
    marker = new google.maps.Marker({
        icon: "img/biru2.png",
        position: location,
        map: map,
        animation: google.maps.Animation.DROP,
    });
    pos = {
        lat: location.lat(),
        lng: location.lng()
    }
    centerLokasi = new google.maps.LatLng(pos.lat, pos.lng);
    markerposisi.push(marker);
    infowindow = new google.maps.InfoWindow();
    infowindow.setContent("<center><a style='color:black;'>Anda Disini <br> lat : " + pos.lat + " <br> long : " + pos.lng + "</a></center>");
    infowindow.open(map, marker);
    usegeolocation = true;
    markerposisi.push(marker)
    infoposisi.push(infowindow);
}


// FIIIIIIIIIIX Membuat Fungsi Lokasi Manual
// function lokasimanual()
// {
//   $("#filterik").hide();
//   alert('Click On The Map');
//   hapusMarkerTerdekat();
//   //clearroute2();
//   hapusRadius();
//   cekRadius();
//   map.addListener('click', function(event) {

//     icon: "assets/img/now.png",
//     addMarker(event.latLng);

//     });
//   }
function clearroute() {
    for (i in rute) {
        //for (var i = 0; i < angkot.length; i++) {
        rute[i].setMap(null);
    }
    rute = [];
}

function hapusangkot() {
    for (i in angkot) {
        //for (var i = 0; i < angkot.length; i++) {
        angkot[i].setMap(null);
    }
    angkot = [];
}

//   function clearroute2()
// {
//     if(typeof(directionsDisplay) != "undefined" && directionsDisplay.getMap() != undefined)
//   {
//     directionsDisplay.setMap(null);
//       $("#rute").empty(); //hapus box rute
//     }
// }

function nearby() {
    $("#hasilik").hide();
    $("#nearbyik").show();
}


function hapusdata() {
    $("#nearbyik").hide();
    $("#hasilculi").hide();
    $("#hasilmosque").hide();
    $("#hasiltokoh").hide();
    $("#hasilobj").hide();
    $("#hasilwisata").hide();

}

// FIIIIIIIIX Membuat Fungsi Menampilkan Digit


function viewdigit() {
    ik = new google.maps.Data();
    ik.loadGeoJson(server + 'umkm.php');
    ik.setStyle(function (feature) {
            return ({
                fillColor: '#f7d976',
                strokeColor: '#f99ad7 ',
                strokeWeight: 1,
                fillOpacity: 0.5
            });
        }
    );
    ik.setMap(map);
}

//galery
function galeri(a) {
    console.log(a);
    window.open(server + 'galeri.php?id=' + a);
}

function viewdigit2() {
    ik = new google.maps.Data();
    ik.loadGeoJson(server + 'masjid.php');
    ik.setStyle(function (feature) {
            return ({
                fillColor: '#75f7e7',
                strokeColor: '#75f7e7 ',
                strokeWeight: 1,
                fillOpacity: 0.5
            });
        }
    );
    ik.setMap(map);
}

function viewdigit3() {
    ik = new google.maps.Data();
    ik.loadGeoJson(server + 'rumahmakan.php');
    ik.setStyle(function (feature) {
            return ({
                fillColor: '#0750ef',
                strokeColor: '#0750ef ',
                strokeWeight: 1,
                fillOpacity: 0.5
            });
        }
    );
    ik.setMap(map);
}

function viewdigit4() {
    ik = new google.maps.Data();
    ik.loadGeoJson(server + 'tokohbesar.php');
    ik.setStyle(function (feature) {
            return ({
                fillColor: '#00ff11',
                strokeColor: '#00ff11 ',
                strokeWeight: 1,
                fillOpacity: 0.5
            });
        }
    );
    ik.setMap(map);
}

function viewdigit5() {
    ik = new google.maps.Data();
    ik.loadGeoJson(server + 'wisata.php');
    ik.setStyle(function (feature) {
            return ({
                fillColor: '#f97102',
                strokeColor: '#f97102 ',
                strokeWeight: 1,
                fillOpacity: 0.5
            });
        }
    );
    ik.setMap(map);
}

function callRoute(start, end) {
    hapusangkot();
    hapusRadius();
    hapusposisi();
    $('#hasilrute').show();
    $('#detailrute1').show();
    $('#detailrute').empty();
    hapusMarkerTerdekat();
    clearroute2();

    if (koordinat == 'null' || typeof (koordinat) == "undefined") {
        alert('Klik Tombol Posisi Saat ini Dulu');
    } else {
        directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer;
        directionsService.route
        (
            {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            },
            function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Direction request failed due to' + status);
                }
            }
        );
        directionsDisplay.setMap(map);
        map.setZoom(16);

        directionsDisplay.setPanel(document.getElementById('detailrute1'));
    }
}


function clearroute2() {
    if (typeof (directionsDisplay) != "undefined" && directionsDisplay.getMap() != undefined) {
        directionsDisplay.setMap(null);
        $("#rute").remove();
    }

}

// FIX Membuat Fungsi Menampilkan Menampilkan Digitasi Batas Nagari
function viewdigitnagari() {
    ik = new google.maps.Data();
    ik.loadGeoJson(server + 'batasnagari.php');
    ik.setStyle(function (feature) {
            return ({
                // fillColor: '#ffffff',
                strokeColor: '#385aaf',
                strokeWeight: 4,
                fillOpacity: 0.0,
                clickable: false
            });
        }
    );
    ik.setMap(map);
}


// FIX Membuat Fungsi Memberikan Marker
function addMarker(location) {
    for (var i = 0; i < markerposisi.length; i++) {
        markerposisi[i].setMap(null);
        hapusMarkerTerdekat();
        hapusRadius();
        cekRadius();
    }
    marker = new google.maps.Marker
    ({
        icon: "assets/img/now.png",
        position: location,
        map: map,
        animation: google.maps.Animation.DROP,
    });
    koordinat =
        {
            lat: location.lat(),
            lng: location.lng(),
        }
    centerLokasi = new google.maps.LatLng(koordinat.lat, koordinat.lng);
    markerposisi.push(marker);
    infowindow = new google.maps.InfoWindow();
    infowindow.setContent("<center><a style='color:black;'>You're Here <br> lat : " + koordinat.lat + " <br> long : " + koordinat.lng + "</a></center>");
    infowindow.open(map, marker);
    usegeolocation = true;
    markerposisi.push(marker)
    infoposisi.push(infowindow);
}


// FIX Membuat Fungsi Refresh
//function clean()
//{
//$('#hasilcari').empty();
//$('#hasilpencarian').empty();
//$('#hasilpencarian').append("Selamat Datang");
//$('#jarakj').css('display','none');
//$("#filterik").hide();
// hapusgrafik();
//hapusInfo();
//hapusRadius();
//hapusMarkerTerdekat();
//init();
// clearmarkerDkt();
// clearroute2();
//}


// FIIIIIIIIIX Membuat Fungsi Menampilkan Posisi Saat Ini
function posisisekarang() {
    $("#filterik").hide();
    hapusMarkerTerdekat();
    google.maps.event.clearListeners(map, 'click');
    navigator.geolocation.getCurrentPosition(function (position) {
        koordinat =
            {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        console.log(koordinat)

        marker = new google.maps.Marker
        ({
            icon: "assets/img/now.png",
            position: koordinat,
            map: map,
            animation: google.maps.Animation.DROP,
        });

        infowindow = new google.maps.InfoWindow
        ({
            position: koordinat,
            content: "<center><a style='color:black;'>You're Here <br> lat : " + koordinat.lat + " <br> long : " + koordinat.lng + "</a></center>"
        });
        infowindow.open(map, marker);
        markersDua.push(marker);
        infoposisi.push(infowindow);
        map.setCenter(koordinat);
    });
}


// FIIIIIIIIX Membuat Fungsi Menampilkan Peta Google Map
function basemap() {
    map = new google.maps.Map(document.getElementById('map'),
        {
            zoom: 14,
            center: new google.maps.LatLng(-0.914813, 100.458801),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
}


// FIIIIIIIIIIIIIIX Membuat Fungsi Menampilkan Seluruh umkm
function viewall() {

    viewumkm();
    viewmes();
    viewkul();
    viewtok();
    viewwis();
}

function viewumkm() {

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
        url: server + 'viewumkm.php', data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var id = row.id;
                    var name = row.name;
                    var lat = row.lat;
                    var lon = row.lng;
                    //var ik_status = row.ik_status;
                    console.log(name);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    map.setCenter(centerBaru);
                    map.setZoom(15);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/industries.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setCenter(centerBaru);
                    markersDua.push(marker);
                    klikinfoWindow(barubana, id);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfoumkm(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarUMKM(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
                }
            }
        }
    });
}

function klikinfoWindow(barubana, id) {
    hapusdata();
    $('#hasilik').show(id);
    $('#hasilcari1').show(id);
    $('#hasilcari').show(id);
    var marker = new google.maps.Marker
    ({
        position: centerBaru,
        icon: 'assets/img/industries.png',
        animation: google.maps.Animation.DROP,
        map: map

    });

    markersDua.push(marker);
    google.maps.event.addListener(marker, "click", function () {

        detailinfoumkm(id);
    });

}

function klikinfoWindow2(barubana2, id) {
    hapusdata();
    $('#hasilik').show(id);
    $('#hasilcari1').show(id);
    $('#hasilcari').show(id);
    var marker = new google.maps.Marker
    ({
        position: centerBaru,
        icon: 'assets/img/restaurants.png',
        animation: google.maps.Animation.DROP,
        map: map

    });

    markersDua.push(marker);
    google.maps.event.addListener(marker, "click", function () {

        detailinfokul(id);
    });
}

function klikinfoWindow3(barubana3, id) {
    hapusdata();
    var marker = new google.maps.Marker
    ({
        position: centerBaru,
        icon: 'assets/img/religious.png',
        animation: google.maps.Animation.DROP,
        map: map

    });

    markersDua.push(marker);
    google.maps.event.addListener(marker, "click", function () {

        detailinfomes(id);
    });

}

function klikinfoWindow4(barubana4, id) {
    hapusdata();
    var marker = new google.maps.Marker
    ({
        position: centerBaru,
        icon: 'assets/img/museums.png',
        animation: google.maps.Animation.DROP,
        map: map

    });

    markersDua.push(marker);
    google.maps.event.addListener(marker, "click", function () {

        detailinfotok(id);
    });

}

function klikinfoWindow5(barubana5, id) {
    hapusdata();
    var marker = new google.maps.Marker
    ({
        position: centerBaru,
        icon: 'assets/img/msj.png',
        animation: google.maps.Animation.DROP,
        map: map

    });

    markersDua.push(marker);
    google.maps.event.addListener(marker, "click", function () {

        detailinfowis(id);
    });

}

//FIIIIIIIIIIX Membuat Fungsi Hapus Market Terdekat
function hapusMarkerTerdekat() {
    for (var i = 0; i < markersDua.length; i++) {
        markersDua[i].setMap(null);
    }
}

function hapusposisi() {
    for (var i = 0; i < markerposisi.length; i++) {
        markerposisi[i].setMap(null);
    }
    markerposisi = [];
}

//Membuat Fungsi Cari IK Berdasarkan Produk
function viewproduktt() {
    hapusdata();
    hapusposisi();
    clearroute2();
    hapusMarkerTerdekat();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    var cariproduktt = document.getElementById('cariproduktt');
    if (cariproduktt.value == '') {
        alert("Data Did Not Exist satu !");
    } else {
        // $('#tampillistik').empty();
        $('#hasilcari').append;
        var ikkec = document.getElementById('cariproduktt').value;
        console.log(ikkec);
        hapusInfo();
        // clearangkot();
        hapusRadius();
        hapusMarkerTerdekat();
        $.ajax
        ({
            url: server + 'find_produktt.php?cari_produktt=' + ikkec,
            data: "",
            dataType: 'json',
            success: function (rows) {
                if (rows == null) {
                    alert('Data Did Not Exist dua !');
                }
                for (var i in rows) {
                    var row = rows[i];
                    var id = row.id;
                    var name = row.name;
                    var id_produktt = row.id_produktt;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    centerBaru = new google.maps.LatLng(lat, lon);
                    marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        map: map,
                        icon: "assets/img/industries.png",
                    });
                    // console.log(lat);
                    // console.log(lon);
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    map.setZoom(14);
                    console.log(id_produktt);
                    $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfoumkm(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarUMKM(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
                }
            }
        });
    }
}

//FIX Membuat Fungsi Cari UMKM Berdasarkan produk UMKM
function cariprodukumkm() {
    hapusdata();
    hapusposisi();
    clearroute2();
    hapusangkot();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();

    var produkumkm = document.getElementById('produkumkm')
    if (produkumkm.value == '') {
        alert("Data Did Not Exist  !");
    } else {
        // $('#tampillistik').empty();
        $('#hasilcari').append;
        var umkmproduk = document.getElementById('produkumkm').value;
        console.log(umkmproduk);
        hapusInfo();
        // clearangkot();
        hapusRadius();
        hapusMarkerTerdekat();
        $.ajax
        ({
            url: server + 'find_produk.php?cari_product=' + umkmproduk,
            data: "",
            dataType: 'json',
            success: function (rows) {
                if (rows == null) {
                    alert('Data Did Not Exist !');
                }
                for (var i in rows) {
                    var row = rows[i];
                    var id = row.id;
                    var name = row.name;
                    var id_product = row.id_product;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    centerBaru = new google.maps.LatLng(lat, lon);
                    marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        map: map,
                        icon: "assets/img/industries.png",
                    });
                    // console.log(lat);
                    // console.log(lon);
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    klikinfoWindow(barubana, id);
                    map.setZoom(14);
                    console.log(id_product);
                    $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfoumkm(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarUMKM(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
                }
            }
        });
    }
}


//FIIIIIIIIX Membuat Fungsi Cari UMKM Berdasarkan Jenis UMKM
function carijenisumkm() {
    hapusdata();
    hapusposisi();
    clearroute2();
    hapusangkot();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();

    var jenisumkm = document.getElementById('jenisumkm')
    if (jenisumkm.value == '') {
        alert("Data Did Not Exist  !");
    } else {
        // $('#tampillistik').empty();
        $('#hasilcari').append;
        var umkmjns = document.getElementById('jenisumkm').value;
        console.log(umkmjns);
        hapusInfo();
        // clearangkot();
        hapusRadius();
        hapusMarkerTerdekat();
        $.ajax
        ({
            url: server + 'find_jns.php?cari_jenis=' + umkmjns, data: "", dataType: 'json', success: function (rows) {
                if (rows == null) {
                    alert('Data Did Not Exist !');
                }
                for (var i in rows) {
                    var row = rows[i];
                    var id = row.id;
                    var name = row.name;
                    var id_type = row.id_type;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    centerBaru = new google.maps.LatLng(lat, lon);
                    marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        map: map,
                        icon: "assets/img/industries.png",
                    });
                    // console.log(lat);
                    // console.log(lon);
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    klikinfoWindow(barubana, id);
                    map.setZoom(14);
                    console.log(id_type);
                    $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfoumkm(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarUMKM(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
                }
            }
        });
    }
}

function carifasi() {
    hapusdata();
    hapusposisi();
    clearroute2();
    hapusangkot();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();

    var jenisfasi = document.getElementById('jenisfasi')
    if (jenisfasi.value == '') {
        alert("Data Did Not Exist  !");
    } else {
        // $('#tampillistik').empty();
        $('#hasilcari').append;
        var jenisfasi1 = document.getElementById('jenisfasi').value;
        console.log(jenisfasi1);
        hapusInfo();
        // clearangkot();
        hapusRadius();
        hapusMarkerTerdekat();
        $.ajax
        ({
            url: server + 'carifasil.php?carifasil=' + jenisfasi1,
            data: "",
            dataType: 'json',
            success: function (rows) {
                if (rows == null) {
                    alert('Data Did Not Exist !');
                }
                for (var i in rows) {
                    var row = rows[i];
                    var id = row.id;
                    var name = row.name;
                    var id_facility = row.id_facility;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    centerBaru = new google.maps.LatLng(lat, lon);
                    marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        map: map,
                        icon: "assets/img/msj.png",
                    });
                    // console.log(lat);
                    // console.log(lon);
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    klikinfoWindow5(barubana5, id);
                    map.setZoom(14);
                    console.log(id_facility);
                    $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfowis(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarUMKM(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
                }
            }
        });
    }
}


//FIIIIIIIIIIIIIX Membuat Fungsi Mencari UMKM
function find_umkm() {
    hapusdata();
    hapusInfo();
    hapusposisi();
    clearroute2();
    hapusangkot();
    // clearangkot();
    hapusRadius();
    hapusMarkerTerdekat();

    $('#hasilcari').empty();
    $('#tampillistangkotik').empty();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();

    if (ik_name.value == '') {
        alert("Isi kolom pencarian terlebih dahulu !");
    } else {
        //$('#hasilcari').empty();
        $('#hasilcari').append;
        var ikname = document.getElementById('ik_name').value;
        console.log(ikname);
        $.ajax
        ({
            url: server + 'find_umkm.php?cari_name=' + ikname, data: "", dataType: 'json', success: function (rows) {
                if (rows == null) {
                    alert('Data Did Not Exist !');
                }
                for (var i in rows) {
                    var row = rows[i];
                    var id = row.id;
                    var name = row.name;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    centerBaru = new google.maps.LatLng(lat, lon);
                    marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        map: map,
                        icon: "assets/img/industries.png",
                    });
                    // console.log(lat);
                    // console.log(lon);
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    klikinfoWindow(barubana, id);
                    map.setZoom(14);
                    console.log(name);
                    $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfoumkm(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarUMKM(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
                }
            }
        });
    }
}

function hapusmarkersimpang() {
    for (var i = 0; i < markersimpang.length; i++) {
        markersimpang[i].setMap(null);
    }
    markersimpang = [];
}

function clearsimpang() {
    for (i in simpangindustri) {
        //for (var i = 0; i < angkot.length; i++) {
        simpangindustri[i].setMap(null);
    }
    simpangindustri = [];
}

function tampilsimpang(id_angkot, id_umkm) {
    hapusmarkersimpang();
    hapusMarkerTerdekat();
    hapusInfo2();
    hapusdata();
    console.log("simpang");
    console.log(id_umkm);
    console.log(id_angkot);
    $.ajax({
        url: server + '/rutesimpang.php?id_umkm=' + id_umkm + '&id_angkot=' + id_angkot,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                var id_angkot = row.id_angkot;
                var id_umkm = row.id_umkm;
                var lat = row.lat;
                var lng = row.lng;
                var ket = row.ket;
                console.log(lat);
                console.log(lng);
                if (lat != null) {
                    centerAwal = new google.maps.LatLng(lat, lng);
                    directionsService = new google.maps.DirectionsService();
                    var request = {
                        origin: centerAwal,
                        destination: centerBaru,
                        travelMode: google.maps.TravelMode.DRIVING,
                        unitSystem: google.maps.UnitSystem.METRIC,
                        provideRouteAlternatives: true

                    };
                    var marker = new google.maps.Marker({
                        position: centerAwal,
                    });
                    markersDua.push(marker);
                    map.setCenter(centerAwal);
                    infowindow = new google.maps.InfoWindow({
                        position: centerAwal,
                        content: "<bold>" + ket + "",
                        pixelOffset: new google.maps.Size(0, -33)
                    });
                    infoDua.push(infowindow);
                    infowindow.open(map);
                    directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);

                        }
                    });
                    directionsDisplay = new google.maps.DirectionsRenderer({
                        draggable: false,
                        polylineOptions: {
                            strokeColor: "red"
                        }
                    });
                    directionsDisplay.setMap(map);
                }
                /*var info = new google.maps.InfoWindow({
                    content: '<b>Speed:</b> ' + values.inst + ' knots'
                });*/
                detailangkot2(id_angkot, id_umkm)
                markersimpang.push(marker);
                simpangindustri.push(directionsDisplay);
                tampilrute(id_angkot, latitude, longitude);

            }
        }
    });
}


function tampilsimpangrm(id_angkot, id_culinary) {
    hapusmarkersimpang();
    hapusMarkerTerdekat();
    hapusInfo2();
    hapusdata();

    console.log("simpang");
    console.log(id_culinary);
    console.log(id_angkot);
    $.ajax({
        url: server + '/rutesimpangrm.php?id_culinary=' + id_culinary + '&id_angkot=' + id_angkot,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                var id_angkot = row.id_angkot;
                var id_culinary = row.id_culinary;
                var lat = row.lat;
                var lng = row.lng;
                var ket = row.ket;
                console.log(lat);
                console.log(lng);
                if (lat != null) {
                    centerAwal = new google.maps.LatLng(lat, lng);
                    directionsService = new google.maps.DirectionsService();
                    var request = {
                        origin: centerAwal,
                        destination: centerBaru,
                        travelMode: google.maps.TravelMode.DRIVING,
                        unitSystem: google.maps.UnitSystem.METRIC,
                        provideRouteAlternatives: true

                    };
                    var marker = new google.maps.Marker({
                        position: centerAwal,
                    });
                    markersDua.push(marker);
                    map.setCenter(centerAwal);
                    infowindow = new google.maps.InfoWindow({
                        position: centerAwal,
                        content: "<bold>" + ket + "",
                        pixelOffset: new google.maps.Size(0, -33)
                    });
                    infoDua.push(infowindow);
                    infowindow.open(map);
                    directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);

                        }
                    });
                    directionsDisplay = new google.maps.DirectionsRenderer({
                        draggable: false,
                        polylineOptions: {
                            strokeColor: "red"
                        }
                    });
                    directionsDisplay.setMap(map);
                }
                /*var info = new google.maps.InfoWindow({
                    content: '<b>Speed:</b> ' + values.inst + ' knots'
                });*/
                detailangkot(id_angkot)
                markersimpang.push(marker);
                simpangindustri.push(directionsDisplay);
                tampilrute(id_angkot, latitude, longitude);

            }
        }
    });
}

function tampilsimpangmes(id_angkot, id_mosque) {
    hapusmarkersimpang();
    hapusMarkerTerdekat();
    hapusInfo2();
    hapusdata();

    console.log("simpang");
    console.log(id_mosque);
    console.log(id_angkot);
    $.ajax({
        url: server + '/rutesimpangmes.php?id_mosque=' + id_mosque + '&id_angkot=' + id_angkot,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                var id_angkot = row.id_angkot;
                var id_mosque = row.id_mosque
                var lat = row.lat;
                var lng = row.lng;
                var ket = row.ket;
                console.log(lat);
                console.log(lng);
                if (lat != null) {
                    centerAwal = new google.maps.LatLng(lat, lng);
                    directionsService = new google.maps.DirectionsService();
                    var request = {
                        origin: centerAwal,
                        destination: centerBaru,
                        travelMode: google.maps.TravelMode.DRIVING,
                        unitSystem: google.maps.UnitSystem.METRIC,
                        provideRouteAlternatives: true

                    };
                    var marker = new google.maps.Marker({
                        position: centerAwal,
                    });
                    markersDua.push(marker);
                    map.setCenter(centerAwal);
                    infowindow = new google.maps.InfoWindow({
                        position: centerAwal,
                        content: "<bold>" + ket + "",
                        pixelOffset: new google.maps.Size(0, -33)
                    });
                    infoDua.push(infowindow);
                    infowindow.open(map);
                    directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);

                        }
                    });
                    directionsDisplay = new google.maps.DirectionsRenderer({
                        draggable: false,
                        polylineOptions: {
                            strokeColor: "red"
                        }
                    });
                    directionsDisplay.setMap(map);
                }
                /*var info = new google.maps.InfoWindow({
                    content: '<b>Speed:</b> ' + values.inst + ' knots'
                });*/
                detailangkot(id_angkot)
                markersimpang.push(marker);
                simpangindustri.push(directionsDisplay);
                tampilrute(id_angkot, latitude, longitude);

            }
        }
    });
}


function tampilsimpangtok(id_angkot, id_greatcharacter) {
    hapusmarkersimpang();
    hapusMarkerTerdekat();
    hapusInfo2();
    hapusdata();

    console.log("simpang");
    console.log(id_greatcharacter);
    console.log(id_angkot);
    $.ajax({
        url: server + '/rutesimpangtok.php?id_tokoh=' + id_greatcharacter + '&id_angkot=' + id_angkot,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                var id_angkot = row.id_angkot;
                var id_greatcharacter = row.id_greatcharacter
                var lat = row.lat;
                var lng = row.lng;
                var ket = row.ket;
                console.log(lat);
                console.log(lng);
                if (lat != null) {
                    centerAwal = new google.maps.LatLng(lat, lng);
                    directionsService = new google.maps.DirectionsService();
                    var request = {
                        origin: centerAwal,
                        destination: centerBaru,
                        travelMode: google.maps.TravelMode.DRIVING,
                        unitSystem: google.maps.UnitSystem.METRIC,
                        provideRouteAlternatives: true

                    };
                    var marker = new google.maps.Marker({
                        position: centerAwal,
                    });
                    markersDua.push(marker);
                    map.setCenter(centerAwal);
                    infowindow = new google.maps.InfoWindow({
                        position: centerAwal,
                        content: "<bold>" + ket + "",
                        pixelOffset: new google.maps.Size(0, -33)
                    });
                    infoDua.push(infowindow);
                    infowindow.open(map);
                    directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);

                        }
                    });
                    directionsDisplay = new google.maps.DirectionsRenderer({
                        draggable: false,
                        polylineOptions: {
                            strokeColor: "red"
                        }
                    });
                    directionsDisplay.setMap(map);
                }
                /*var info = new google.maps.InfoWindow({
                    content: '<b>Speed:</b> ' + values.inst + ' knots'
                });*/
                detailangkot(id_angkot)
                markersimpang.push(marker);
                simpangindustri.push(directionsDisplay);
                tampilrute(id_angkot, latitude, longitude);

            }
        }
    });
}


function tampilsimpangwis(id_angkot, id) {
    hapusmarkersimpang();
    hapusMarkerTerdekat();
    hapusInfo2();
    hapusdata();

    console.log("simpang");
    console.log(id);
    console.log(id_angkot);
    $.ajax({
        url: server + '/rutesimpangwis.php?id_wis=' + id + '&id_angkot=' + id_angkot,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                var id_angkot = row.id_angkot;
                var id_tourism = row.id_tourism;
                var lat = row.lat;
                var lng = row.lng;
                var ket = row.ket;
                console.log(lat);
                console.log(lng);
                if (lat != null) {
                    centerAwal = new google.maps.LatLng(lat, lng);
                    directionsService = new google.maps.DirectionsService();
                    var request = {
                        origin: centerAwal,
                        destination: centerBaru,
                        travelMode: google.maps.TravelMode.DRIVING,
                        unitSystem: google.maps.UnitSystem.METRIC,
                        provideRouteAlternatives: true

                    };
                    var marker = new google.maps.Marker({
                        position: centerAwal,
                    });
                    markersDua.push(marker);
                    map.setCenter(centerAwal);
                    infowindow = new google.maps.InfoWindow({
                        position: centerAwal,
                        content: "<bold>" + ket + "",
                        pixelOffset: new google.maps.Size(0, -33)
                    });
                    infoDua.push(infowindow);
                    infowindow.open(map);
                    directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);

                        }
                    });
                    directionsDisplay = new google.maps.DirectionsRenderer({
                        draggable: false,
                        polylineOptions: {
                            strokeColor: "red"
                        }
                    });
                    directionsDisplay.setMap(map);
                }
                /*var info = new google.maps.InfoWindow({
                    content: '<b>Speed:</b> ' + values.inst + ' knots'
                });*/
                detailangkot(id_angkot)
                markersimpang.push(marker);
                simpangindustri.push(directionsDisplay);
                tampilrute(id_angkot, latitude, longitude);

            }
        }
    });
}

//Menampilkan Form FilterIK
//function pilihwilayah()
//{
//$("#filterik").show();
//$("#hasilik").hide();
//$("#filterik").hide();
//}

//Menampilkan Form FilterIK
//function pilihwilayahsou()
//{
//$("#filtersou").show();
//$("#hasilik").hide();
//$("#filterik").hide();
//}


//FIIIIIIIX Menampilkan Detail Info UMKM

function galeri() {
    window.open(server + 'galeryumkm.php?idgallery=' + a);
}

function detailinfoumkm(id1) {


    $('#info').empty();
    hapusInfo();
    hapusInfo2();
    hapusdata();
    clearroute2();
    hapusMarkerTerdekat();
    hapusangkot();
    console.log(server + 'detailinfoumkm.php?info=' + id1);
    $.ajax({
        url: server + 'detailinfoumkm.php?info=' + id1, data: "", dataType: 'json', success: function (rows) {
            for (var i in rows) {
                console.log('dd');
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var address = row.address;
                var owner = row.owner;
                var cp = row.cp;
                var latitude = row.latitude;
                ;
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
                map.setZoom(16);
                if (address == null) {
                    address = "tidak ada";
                }
                //if (foto=='null' || foto=='' || foto==null){
                //foto='eror.png';
                //}
                // $('#info').append("name : "+name+" <br> Alamat : "+alamat+" <br> Kapasitas : "+kapasitas+"");
                infowindow = new google.maps.InfoWindow({
                    position: centerBaru,
                    content: "<center><span style=color:black><b>Information</b><table><tr><td><i class=''></i>Name</td><td>:</td><td> " + name + "</td></tr><br><tr><td><i class=''></i>Address</td><td>:</td><td> " + address + "</td></tr><br><tr><td><i class=''></i>Owner</td><td>:</td><td> " + owner + "</td></tr><br><tr><td><i class=''></i>CP</td><td>:</td><td> " + cp + "</td></tr><br><tr><td><i class=''></table><td><a role='button' class='btn btn-success' onclick='allangkot(\"" + latitude + "\",\"" + longitude + "\")'>Near Object</a></td><td><a role='button' class='btn btn-success' onclick='galeri(\"" + id + "\");'>Gallery</a></td></span>",
                    pixelOffset: new google.maps.Size(0, -33)
                });
                infoposisi.push(infowindow);
                hapusInfo();
                infowindow.open(map);

            }

            // ;ow();tampilsekitar()
        }
    });
}


//Menghapus Info
function hapusInfo() {
    for (var i = 0; i < infoposisi.length; i++) {
        infoposisi[i].setMap(null);
    }
}

function hapusInfo2() {
    for (var i = 0; i < infoDua.length; i++) {
        infoDua[i].setMap(null);
    }
}


//Fungsi Filter 3 Tabel
//function tampilikwilayah()
//{
//$("#filterik").hide();
//$('#hasilik').show();
//$('#hasilcari1').show();
//$('#hasilcari').empty();
//var c = document.getElementById('filterjenisindustri').value;
//var b = document.getElementById('filterproduktt').value;
//var cari = document.getElementById('filterstatustempat').value;
//console.log(cari);
//$('#resultCari1').empty();
//     $('#resultInfo1').empty();
// $('#resultCari').empty();
//      $('#resultInfo').empty();
//hapusInfo();
//clearroute2();
//hapusRadius();
//hapusMarkerTerdekat();
//console.log(b);
//console.log(c);
//$.ajax
//({
//url: server+'/filter.php?id11='+c+'&id22='+b+'&cari='+cari, data: "", dataType: 'json', success: function(rows)
//{
//if(rows==null)
//{
//alert('Data Did not Exist!');
//$("#pilih4").hide();
//}
//else
//{
//$('#hasilcari').append;
//for (var i in rows)
//{
//var row = rows[i];
//var id   = row.id;
//var name   = row.name;
//var name_jenis_industri   = row.name_jenis_industri;
//var id_produktt = row.id_produktt;
//var status = row.status;
//var latitude  = row.lat ;
//var longitude = row.lon ;
//console.log(name);
//console.log(latitude,longitude);
//centerBaru = new google.maps.LatLng(latitude, longitude);
//marker = new google.maps.Marker
//({
//position: centerBaru,
//icon: "assets/img/path.png",
//animation: google.maps.Animation.DROP,
//map: map
//});
//markersDua.push(marker);
//map.setCenter(centerBaru);
//map.setZoom(18);

//$('#hasilcari').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-success' onclick='detailinfoumkm(\""+id+"\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='angkotSekitar(\""+latitude+"\",\""+longitude+"\",\""+name+"\",\""+id+"\")'></a></td></tr>");
//}
//$("#pilih4").show();
//}
//}
//});
//}


//Fungsi Filter 3 Tabel Souvenir
//function tampilsouwilayah()
//{
//$("#filterik").hide();
//$('#hasilik').show();
//$('#hasilcari1').show();
//$('#hasilcari').empty();
//var e = document.getElementById('filterjenissouvenir').value;
//var z = document.getElementById('filterprodukttsou').value;
//var carii = document.getElementById('filterstatustempatsou').value;
//console.log(carii);
//$('#resultCari1').empty();
//     $('#resultInfo1').empty();
// $('#resultCari').empty();
//      $('#resultInfo').empty();
//hapusInfo();
//clearroute2();
//hapusRadius();
//hapusMarkerTerdekat();
//console.log(z);
//console.log(e);
//$.ajax
//({
//url: server+'/filtersou.php?id1111='+e+'&id2222='+z+'&carii='+carii, data: "", dataType: 'json', success: function(rows)
//{
//if(rows==null)
//{
//alert('Data Did not Exist!');
//$("#pilih4").hide();
//}
//else
//{
//$('#hasilcari').append;
//for (var i in rows)
//{
//var row = rows[i];
//var id_oleh_oleh   = row.id_oleh_oleh;
//var name_oleh_oleh   = row.name_oleh_oleh;
//var jenis_oleh   = row.jenis_oleh;
//var id_produktt = row.id_produktt;
//var status = row.status;
//var latitude  = row.lat ;
//var longitude = row.lon ;
//console.log(name_oleh_oleh);
//console.log(latitude,longitude);
//centerBaru = new google.maps.LatLng(latitude, longitude);
//marker = new google.maps.Marker
//({
//position: centerBaru,
//icon: "assets/img/path.png",
//animation: google.maps.Animation.DROP,
//map: map
//});
//markersDua.push(marker);
//map.setCenter(centerBaru);
//map.setZoom(15);

//$('#hasilcari').append("<tr><td>"+name_oleh_oleh+"</td><td><a role='button' class='btn btn-success' onclick='detailinfoumkm(\""+id_oleh_oleh+"\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='angkotSekitar(\""+latitude+"\",\""+longitude+"\",\""+name_oleh_oleh+"\",\""+id_oleh_oleh+"\")'></a></td></tr>");
//}
//$("#pilih4").show();
//}
//}
//});
//}

function hapus_kecuali_landmark() {
    hapusRadius();
    hapusMarkerObject();
    hapusInfo();
    clearangkot();
    clearroute();
}

function hapusMarkerObject() {
    for (var i = 0; i < markersDua.length; i++) {
        markersDua[i].setMap(null);
    }
}

function clearangkot() {
    for (i in angkot) {
        angkot[i].setMap(null);
    }
    angkot = [];
}

//fungsi raius near objek
function aktifkanRadiuss2() {
    var koordinat = new google.maps.LatLng(rad_lat, rad_lng);
    map.setCenter(koordinat);
    map.setZoom(16);

    hapus_kecuali_landmark();
    hapusRadius();
    var inputradiuss = document.getElementById("inputradiuss").value;
    console.log(inputradiuss);
    var rad = parseFloat(inputradiuss * 100);
    var circle = new google.maps.Circle({
        center: koordinat,
        radius: rad,
        map: map,
        strokeColor: "blue",
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: "blue",
        fillOpacity: 0.35
    });
    circles.push(circle);
    //TAMPILAN
    // $("#hasilindustry").hide();
    // $("#hasilculi").hide();
    // $("#hasilmosque").hide();
    // $("#hasilsouv").hide();
    // $("#hasilobj").hide();
    // $("#hasilhotel").hide();
    //  $("#hasilrestaurant").hide();

    if (document.getElementById("check_i").checked) {
        wisata_sekitar(rad_lat, rad_lng, rad);
        $("#hasilwisata").show();
    }

    if (document.getElementById("check_k").checked) {
        kuliner_sekitar(rad_lat, rad_lng, rad);
        $("#hasilculi").show();
    }

    if (document.getElementById("check_m").checked) {
        masjid_sekitar(rad_lat, rad_lng, rad);
        $("#hasilmosque").show();
    }

    if (document.getElementById("check_oo").checked) {
        tokoh_sekitar(rad_lat, rad_lng, rad);
        $("#hasiltokoh").show();
    }

    if (document.getElementById("check_tw").checked) {
        tw_sekitar(rad_lat, rad_lng, rad);
        $("#hasilobj").show();
    }

    // if (document.getElementById("check_h").checked) {
    //   h_sekitar(rad_lat,rad_lng,rad);
    //   $("#hasilhotel").show();
    // }
    // if (document.getElementById("check_res").checked) {
    //   restaurant_sekitar(rad_lat,rad_lng,rad);
    //   $("#hasilrestaurant").show();
    // }

}

function kuliner_sekitar(latitude, longitude, rad) { //KULINER SEKITAR

    $('#hasilcariculi').empty();
    $('#hasilcariculi1').show();
    $('#hasilcariculi').append("<thead><th class='centered'>Nama</th><th colspan='3' class='centered'>Action</th></thead>");
    console.log(server + 'ikradiusrm.php?lat=' + latitude + '&long=' + longitude + '&rad=' + rad);
    $.ajax({
        url: server + 'ikradiusrm.php?lat=' + latitude + '&long=' + longitude + '&rad=' + rad,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var lat = row.lat;
                var lon = row.lng;

                //POSISI MAP
                centerBaru = new google.maps.LatLng(lat, lon);
                map.setCenter(centerBaru);
                map.setZoom(16);
                var marker = new google.maps.Marker({
                    position: centerBaru,
                    icon: 'assets/img/restaurants.png',
                    animation: google.maps.Animation.DROP,
                    map: map
                });
                markersDua.push(marker);
                map.setCenter(centerBaru);

                $('#hasilcariculi').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-danger' onclick='detailinfokul(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarrm(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='route_sekitar(\"" + latitude + "\",\"" + longitude + "\",\"" + lat + "\",\"" + lon + "\")'></a></td></tr>");
            }//end for
        }
    });//end ajax
}


function tw_sekitar(latitude, longitude, rad) { //KULINER SEKITAR

    $('#hasilcariobj').empty();
    $('#hasilcariobj1').show();
    $('#hasilcariobj').append("<thead><th class='centered'>Nama</th><th colspan='3' class='centered'>Action</th></thead>");
    console.log(server + 'ikradius.php?lat=' + latitude + '&long=' + longitude + '&rad=' + rad);
    $.ajax({
        url: server + 'ikradius.php?lat=' + latitude + '&long=' + longitude + '&rad=' + rad,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var lat = row.lat;
                var lon = row.lng;

                //POSISI MAP
                centerBaru = new google.maps.LatLng(lat, lon);
                map.setCenter(centerBaru);
                map.setZoom(16);
                var marker = new google.maps.Marker({
                    position: centerBaru,
                    icon: 'assets/img/industries.png',
                    animation: google.maps.Animation.DROP,
                    map: map
                });
                markersDua.push(marker);
                map.setCenter(centerBaru);

                $('#hasilcariobj').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-danger' onclick='detailinfoumkm(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarUMKM(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='route_sekitar(\"" + latitude + "\",\"" + longitude + "\",\"" + lat + "\",\"" + lon + "\")'></a></td></tr>");
            }//end for
        }
    });//end ajax
}

function masjid_sekitar(latitude, longitude, rad) { //Masjid SEKITAR

    $('#hasilcarimosque').empty();
    $('#hasilcarimosque1').show();
    $('#hasilcarimosque').append("<thead><th class='centered'>Nama</th><th colspan='3' class='centered'>Action</th></thead>");
    console.log(server + 'ikradiusmes.php?lat=' + latitude + '&long=' + longitude + '&rad=' + rad);
    $.ajax({
        url: server + 'ikradiusmes.php?lat=' + latitude + '&long=' + longitude + '&rad=' + rad,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var lat = row.lat;
                var lon = row.lng;

                //POSISI MAP
                centerBaru = new google.maps.LatLng(lat, lon);
                map.setCenter(centerBaru);
                map.setZoom(16);
                var marker = new google.maps.Marker({
                    position: centerBaru,
                    icon: 'assets/img/religious.png',
                    animation: google.maps.Animation.DROP,
                    map: map
                });
                markersDua.push(marker);
                map.setCenter(centerBaru);

                $('#hasilcarimosque').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-danger' onclick='detailinfomes(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarmesjid(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='route_sekitar(\"" + latitude + "\",\"" + longitude + "\",\"" + lat + "\",\"" + lon + "\")'></a></td></tr>");
            }//end for
        }
    });//end ajax
}

function tokoh_sekitar(latitude, longitude, rad) { //Tokoh SEKITAR

    $('#hasilcaritokoh').empty();
    $('#hasilcaritokoh1').show();
    $('#hasilcaritokoh').append("<thead><th class='centered'>Nama</th><th colspan='3' class='centered'>Action</th></thead>");
    console.log(server + 'ikradiustobes.php?lat=' + latitude + '&long=' + longitude + '&rad=' + rad);
    $.ajax({
        url: server + 'ikradiustobes.php?lat=' + latitude + '&long=' + longitude + '&rad=' + rad,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var lat = row.lat;
                var lon = row.lng;

                //POSISI MAP
                centerBaru = new google.maps.LatLng(lat, lon);
                map.setCenter(centerBaru);
                map.setZoom(16);
                var marker = new google.maps.Marker({
                    position: centerBaru,
                    icon: 'assets/img/museums.png',
                    animation: google.maps.Animation.DROP,
                    map: map
                });
                markersDua.push(marker);
                map.setCenter(centerBaru);

                $('#hasilcaritokoh').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-danger' onclick='detailinfotok(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitartokoh(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='route_sekitar(\"" + latitude + "\",\"" + longitude + "\",\"" + lat + "\",\"" + lon + "\")'></a></td></tr>");
            }//end for
        }
    });//end ajax
}

function wisata_sekitar(latitude, longitude, rad) { //Tokoh SEKITAR

    $('#hasilcariwisata').empty();
    $('#hasilcariwisata1').show();
    $('#hasilcariwisata').append("<thead><th class='centered'>Nama</th><th colspan='3' class='centered'>Action</th></thead>");
    console.log(server + 'ikradiuswis.php?lat=' + latitude + '&long=' + longitude + '&rad=' + rad);
    $.ajax({
        url: server + 'ikradiuswis.php?lat=' + latitude + '&long=' + longitude + '&rad=' + rad,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var lat = row.lat;
                var lon = row.lng;

                //POSISI MAP
                centerBaru = new google.maps.LatLng(lat, lon);
                map.setCenter(centerBaru);
                map.setZoom(16);
                var marker = new google.maps.Marker({
                    position: centerBaru,
                    icon: 'assets/img/default.png',
                    animation: google.maps.Animation.DROP,
                    map: map
                });
                markersDua.push(marker);
                map.setCenter(centerBaru);

                $('#hasilcariwisata').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-danger' onclick='detailinfowis(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarwisata(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='route_sekitar(\"" + latitude + "\",\"" + longitude + "\",\"" + lat + "\",\"" + lon + "\")'></a></td></tr>");
            }//end for
        }
    });//end ajax
}

//FIIIIIIXXXX Fungsi Aktifkan Radius
function aktifkanRadius() {
    hapusdata();
    hapusMarkerTerdekat();
    hapusInfo();
    clearroute2();
    clearangkot();
    clearroute();
    if (koordinat == 'null') {
        alert('Click the Button of Your Position Beforehand');
    } else {
        hapusRadius();
        var inputradius = document.getElementById("inputradius").value;
        var circle = new google.maps.Circle
        ({
            center: koordinat,
            radius: parseFloat(inputradius * 100),
            map: map,
            strokeColor: "blue",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "blue",
            fillOpacity: 0.35
        });
        map.setZoom(12);
        map.setCenter(koordinat);
        circles.push(circle);
    }
    cekRadiusStatus = 'on';
    tampilradius();
}

function aktifkanRadiusmes() {
    if (koordinat == 'null') {
        alert('Click the Button of Your Position Beforehand');
    } else {
        hapusRadiusmes();
        //hapusgrafik();
        var inputradiusmes = document.getElementById("inputradiusmes").value;
        var circle = new google.maps.Circle
        ({
            center: koordinat,
            radius: parseFloat(inputradiusmes * 100),
            map: map,
            strokeColor: "blue",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "blue",
            fillOpacity: 0.35
        });
        map.setZoom(12);
        map.setCenter(koordinat);
        circles.push(circle);
    }
    cekRadiusStatus = 'on';
    tampilradiusmes();
}

function aktifkanRadiusrm() {
    if (koordinat == 'null') {
        alert('Click the Button of Your Position Beforehand');
    } else {
        hapusRadiusrm();
        //hapusgrafik();
        var inputradiusrm = document.getElementById("inputradiusrm").value;
        var circle = new google.maps.Circle
        ({
            center: koordinat,
            radius: parseFloat(inputradiusrm * 100),
            map: map,
            strokeColor: "blue",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "blue",
            fillOpacity: 0.35
        });
        map.setZoom(12);
        map.setCenter(koordinat);
        circles.push(circle);
    }
    cekRadiusStatus = 'on';
    tampilradiusrm();
}

function aktifkanRadiustobes() {
    if (koordinat == 'null') {
        alert('Click the Button of Your Position Beforehand');
    } else {
        hapusRadiustobes();
        //hapusgrafik();
        var inputradiustobes = document.getElementById("inputradiustobes").value;
        var circle = new google.maps.Circle
        ({
            center: koordinat,
            radius: parseFloat(inputradiustobes * 100),
            map: map,
            strokeColor: "blue",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "blue",
            fillOpacity: 0.35
        });
        map.setZoom(12);
        map.setCenter(koordinat);
        circles.push(circle);
    }
    cekRadiusStatus = 'on';
    tampilradiustobes();
}

function aktifkanRadiuswis() {
    if (koordinat == 'null') {
        alert('Click the Button of Your Position Beforehand');
    } else {
        hapusRadiuswis();
        //hapusgrafik();
        var inputradiuswis = document.getElementById("inputradiuswis").value;
        var circle = new google.maps.Circle
        ({
            center: koordinat,
            radius: parseFloat(inputradiuswis * 100),
            map: map,
            strokeColor: "blue",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "blue",
            fillOpacity: 0.35
        });
        map.setZoom(12);
        map.setCenter(koordinat);
        circles.push(circle);
    }
    cekRadiusStatus = 'on';
    tampilradiuswis();
}

function aktifkanRadius2(latitude, longitude) {

    hapusRadius();
    //hapusgrafik();

    var inputradius = 5;
    var circle = new google.maps.Circle
    ({
        center: koordinat.lat,
        radius: parseFloat(5 * 100),
        map: map,
        strokeColor: "blue",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "blue",
        fillOpacity: 0.35
    });
    map.setZoom(12);
    map.setCenter(koordinat);
    circles.push(circle);
    cekRadiusStatus = 'on';
    tampilradius2();
}


function aktifkanRadiusmes2() {
    if (koordinat == 'null') {

    } else {
        hapusRadiusmes();
        //hapusgrafik();
        var inputradiusmes = document.getElementById("inputradiusmes").value;
        var circle = new google.maps.Circle
        ({
            center: koordinat,
            radius: parseFloat(inputradiusmes * 100),
            map: map,
            strokeColor: "blue",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "blue",
            fillOpacity: 0.35
        });
        map.setZoom(12);
        map.setCenter(koordinat);
        circles.push(circle);
    }
    cekRadiusStatus = 'on';
    tampilradiusmes2();
}

function aktifkanRadiusrm2() {
    if (koordinat == 'null') {
    } else {
        hapusRadiusrm();
        //hapusgrafik();
        var inputradiusrm = document.getElementById("inputradiusrm").value;
        var circle = new google.maps.Circle
        ({
            center: koordinat,
            radius: parseFloat(inputradiusrm * 100),
            map: map,
            strokeColor: "blue",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "blue",
            fillOpacity: 0.35
        });
        map.setZoom(12);
        map.setCenter(koordinat);
        circles.push(circle);
    }
    cekRadiusStatus = 'on';
    tampilradiusrm2();
}

function aktifkanRadiustobes2() {
    if (koordinat == 'null') {

    } else {
        hapusRadiustobes();
        //hapusgrafik();
        var inputradiustobes = document.getElementById("inputradiustobes").value;
        var circle = new google.maps.Circle
        ({
            center: koordinat,
            radius: parseFloat(inputradiustobes * 100),
            map: map,
            strokeColor: "blue",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "blue",
            fillOpacity: 0.35
        });
        map.setZoom(12);
        map.setCenter(koordinat);
        circles.push(circle);
    }
    cekRadiusStatus = 'on';
    tampilradiustobes2();
}

function aktifkanRadiuswis2() {
    if (koordinat == 'null') {

    } else {
        hapusRadiuswis();
        //hapusgrafik();
        var inputradiuswis = document.getElementById("inputradiuswis").value;
        var circle = new google.maps.Circle
        ({
            center: koordinat,
            radius: parseFloat(inputradiuswis * 100),
            map: map,
            strokeColor: "blue",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "blue",
            fillOpacity: 0.35
        });
        map.setZoom(12);
        map.setCenter(koordinat);
        circles.push(circle);
    }
    cekRadiusStatus = 'on';
    tampilradiuswis2();
}

//FIIIIIIX  Menampilkan Data Radius yg dicari pada Hasil Pencarian
function tampilradius() {
    hapusInfo();
    hapusInfo2();
    clearroute2();
    hapusangkot();
    hapusMarkerTerdekat();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    cekRadius();
    $('#hasilcari').append;
    $.ajax
    ({
        url: server + 'ikradius.php?lat=' + koordinat.lat + '&long=' + koordinat.lng + '&rad=' + rad,
        data: "",
        dataType: 'json',
        success: function (rows) {
            console.log(server + 'ikradius.php?lat=' + koordinat.lat + '&long=' + koordinat.lng + '&rad=' + rad);
            for (var i in rows) {
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var latitude = row.lat;
                var longitude = row.lng;
                // centerBaru      = new google.maps.LatLng(latitude, longitude);
                // map.setCenter(centerBaru);
                // map.setCenter(koordinat);
                centerBaru = new google.maps.LatLng(latitude, longitude);
                marker = new google.maps.Marker
                ({
                    position: centerBaru,
                    map: map,
                    icon: "assets/img/industries.png",
                });
                markersDua.push(marker);
                map.setCenter(centerBaru);
                klikinfoWindow(barubana, id);
                map.setZoom(14);
                $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfoumkm(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarUMKM(\"" + latitude + "\",\"" + longitude + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
            }
        }
    });
}

// radius mesjid
function tampilradiusmes() {
    clearroute2();
    hapusangkot();
    hapusInfo();
    hapusMarkerTerdekat();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    cekRadiusmes();
    $('#hasilcari').append;
    $.ajax
    ({
        url: server + 'ikradiusmes.php?lat=' + koordinat.lat + '&long=' + koordinat.lng + '&rad=' + rad,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var latitude = row.lat;
                var longitude = row.lng;
                centerBaru = new google.maps.LatLng(latitude, longitude);
                //map.setCenter(centerBaru);
                // map.setCenter(koordinat);
                centerBaru = new google.maps.LatLng(latitude, longitude);
                marker = new google.maps.Marker
                ({
                    position: centerBaru,
                    map: map,
                    icon: "assets/img/religious.png",
                });
                markersDua.push(marker);
                map.setCenter(centerBaru);
                klikinfoWindow3(barubana3, id);
                map.setZoom(14);
                $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfomes(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarmesjid(\"" + latitude + "\",\"" + longitude + "\",\"" + name + "\",\"" + id + "\")'></a></td><td> <a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
            }
        }
    });
}

function tampilradiusrm() {
    hapusInfo();
    clearroute2();
    hapusangkot();
    hapusMarkerTerdekat();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    cekRadiusrm();
    $('#hasilcari').append;
    console.log(server + 'ikradiusrm.php?lat=' + koordinat.lat + '&long=' + koordinat.lng + '&rad=' + rad);
    $.ajax
    ({
        url: server + 'ikradiusrm.php?lat=' + koordinat.lat + '&long=' + koordinat.lng + '&rad=' + rad,
        data: "",
        dataType: 'json',
        success: function (rows) {

            for (var i in rows) {
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var latitude = row.lat;
                var longitude = row.lng;
                centerBaru = new google.maps.LatLng(latitude, longitude);
                //map.setCenter(centerBaru);
                // map.setCenter(koordinat);
                centerBaru = new google.maps.LatLng(latitude, longitude);
                marker = new google.maps.Marker
                ({
                    position: centerBaru,
                    map: map,
                    icon: "assets/img/restaurants.png",
                });
                markersDua.push(marker);
                map.setCenter(centerBaru);
                klikinfoWindow2(barubana2, id);
                map.setZoom(14);
                $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfokul(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarrm(\"" + latitude + "\",\"" + longitude + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
            }
        }
    });
}

function tampilradiustobes() {
    hapusInfo();
    clearroute2();
    hapusangkot();
    hapusMarkerTerdekat();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    cekRadiustobes();
    $('#hasilcari').append;
    $.ajax
    ({
        url: server + 'ikradiustobes.php?lat=' + koordinat.lat + '&long=' + koordinat.lng + '&rad=' + rad,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var latitude = row.lat;
                var longitude = row.lng;
                centerBaru = new google.maps.LatLng(latitude, longitude);
                //map.setCenter(centerBaru);
                // map.setCenter(koordinat);
                centerBaru = new google.maps.LatLng(latitude, longitude);
                marker = new google.maps.Marker
                ({
                    position: centerBaru,
                    map: map,
                    icon: "assets/img/museums.png",
                });
                markersDua.push(marker);
                map.setCenter(centerBaru);
                klikinfoWindow4(barubana4, id);
                map.setZoom(14);
                $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfotok(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitartokoh(\"" + latitude + "\",\"" + longitude + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
            }
        }
    });
}

function tampilradiuswis() {
    hapusdata();
    hapusInfo();
    hapusposisi();
    clearroute2();
    hapusangkot();
    hapusMarkerTerdekat();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    cekRadiuswis();
    $('#hasilcari').append;
    console.log(server + 'ikradiuswis.php?lat=' + koordinat.lat + '&long=' + koordinat.lng + '&rad=' + rad);
    $.ajax
    ({
        url: server + 'ikradiuswis.php?lat=' + koordinat.lat + '&long=' + koordinat.lng + '&rad=' + rad,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var latitude = row.lat;
                var longitude = row.lng;
                centerBaru = new google.maps.LatLng(latitude, longitude);
                //map.setCenter(centerBaru);
                // map.setCenter(koordinat);
                // console.log("wwkwkkw");
                centerBaru = new google.maps.LatLng(latitude, longitude);
                marker = new google.maps.Marker
                ({
                    position: centerBaru,
                    map: map,
                    icon: "assets/img/default.png",
                });
                markersDua.push(marker);
                map.setCenter(centerBaru);
                klikinfoWindow5(barubana5, id);
                map.setZoom(14);
                $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfowis(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarwisata(\"" + latitude + "\",\"" + longitude + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
            }
        }
    });
}

function viewallrad() {


    aktifkanRadiusmes2();
    aktifkanRadiusrm2();
    aktifkanRadiustobes2();
    aktifkanRadiuswis2();
    aktifkanRadius2();
}

function tampilradius2(latitude, longitude) {
    hapusInfo();
    hapusMarkerTerdekat();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    var rad = "500";
    //var lat=-0.321100;
    //var lng=100.356800;
    $('#hasilcari').append;
    $.ajax
    ({
        url: server + 'ikradius.php?lat=' + latitude + '&lng=' + longitude + '&rad=' + rad,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var latitude = row.latitude;
                var longitude = row.longitude;
                centerBaru = new google.maps.LatLng(latitude, longitude);
                //map.setCenter(centerBaru);
                // map.setCenter(koordinat);
                centerBaru = new google.maps.LatLng(latitude, longitude);
                marker = new google.maps.Marker
                ({
                    position: centerBaru,
                    map: map,
                    icon: "assets/img/industries.png",
                });
                markersDua.push(marker);
                map.setCenter(centerBaru);
                map.setZoom(14);
                $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfoumkm(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarUMKM(\"" + latitude + "\",\"" + longitude + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
            }
        }
    });
}

// radius mesjid
function tampilradiusmes2(latitude, longitude) {
    hapusInfo();
    hapusMarkerTerdekat();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    var rad = "500";
    $('#hasilcari').append;
    $.ajax
    ({
        url: server + 'ikradiusmes.php?lat=' + latitude + '&lng=' + longitude + '&rad=' + rad,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var latitude = row.latitude;
                var longitude = row.longitude;
                centerBaru = new google.maps.LatLng(latitude, longitude);
                //map.setCenter(centerBaru);
                // map.setCenter(koordinat);
                centerBaru = new google.maps.LatLng(latitude, longitude);
                marker = new google.maps.Marker
                ({
                    position: centerBaru,
                    map: map,
                    icon: "assets/img/religious.png",
                });
                markersDua.push(marker);
                map.setCenter(centerBaru);
                map.setZoom(14);
                $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfomes(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarmesjid(\"" + latitude + "\",\"" + longitude + "\",\"" + name + "\",\"" + id + "\")'></a></td><td> <a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
            }
        }
    });
}

function tampilradiusrm2(latitude, longitude) {
    hapusInfo();
    hapusMarkerTerdekat();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    var rad = "700";
    $('#hasilcari').append;
    $.ajax
    ({
        url: server + 'ikradiusrm.php?lat=' + latitude + '&lng=' + longitude + '&rad=' + rad,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var latitude = row.latitude;
                var longitude = row.longitude;
                centerBaru = new google.maps.LatLng(latitude, longitude);
                //map.setCenter(centerBaru);
                // map.setCenter(koordinat);
                centerBaru = new google.maps.LatLng(latitude, longitude);
                marker = new google.maps.Marker
                ({
                    position: centerBaru,
                    map: map,
                    icon: "assets/img/restaurants.png",
                });
                markersDua.push(marker);
                map.setCenter(centerBaru);
                map.setZoom(14);
                $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfokul(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarrm(\"" + latitude + "\",\"" + longitude + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
            }
        }
    });
}

function tampilradiustobes2(latitude, longitude) {
    hapusInfo();
    hapusMarkerTerdekat();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    var rad = "500";
    $('#hasilcari').append;
    $.ajax
    ({
        url: server + 'ikradiustobes.php?lat=' + latitude + '&lng=' + longitude + '&rad=' + rad,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var latitude = row.latitude;
                var longitude = row.longitude;
                centerBaru = new google.maps.LatLng(latitude, longitude);
                //map.setCenter(centerBaru);
                // map.setCenter(koordinat);
                centerBaru = new google.maps.LatLng(latitude, longitude);
                marker = new google.maps.Marker
                ({
                    position: centerBaru,
                    map: map,
                    icon: "assets/img/museums.png",
                });
                markersDua.push(marker);
                map.setCenter(centerBaru);
                map.setZoom(14);
                $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfotok(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitartokoh(\"" + latitude + "\",\"" + longitude + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
            }
        }
    });
}

function tampilradiuswis2(latitude, longitude) {
    hapusInfo();
    hapusMarkerTerdekat();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    var rad = "700";
    $('#hasilcari').append;
    $.ajax
    ({
        url: server + 'ikradiuswis.php?lat=' + latitude + '&lng=' + longitude + '&rad=' + rad,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var latitude = row.latitude;
                var longitude = row.longitude;
                centerBaru = new google.maps.LatLng(latitude, longitude);
                //map.setCenter(centerBaru);
                // map.setCenter(koordinat);
                centerBaru = new google.maps.LatLng(latitude, longitude);
                marker = new google.maps.Marker
                ({
                    position: centerBaru,
                    map: map,
                    icon: "assets/img/default.png",
                });
                markersDua.push(marker);
                map.setCenter(centerBaru);
                map.setZoom(14);
                $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfowis(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarwisata(\"" + latitude + "\",\"" + longitude + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
            }
        }
    });
}

//Cek Radius
function cekRadius() {
    rad = inputradius.value * 100;
}

function cekRadiuss() {
    rad = inputradiuss.value * 100;
}

//cek Radius mesjid
function cekRadiusmes() {
    rad = inputradiusmes.value * 100;
}

//cek radius rm
function cekRadiusrm() {
    rad = inputradiusrm.value * 100;
}

function cekRadiustobes() {
    rad = inputradiustobes.value * 100;
}

function cekRadiuswis() {
    rad = inputradiuswis.value * 100;
}


//FIIIIIIX Fungsi Hapus Radius

function hapusRadius() {
    for (var i = 0; i < circles.length; i++) {
        circles[i].setMap(null);
    }
    circles = [];
    cekRadiusStatus = 'off';
}

function hapusRadiusmes() {
    for (var i = 0; i < circles.length; i++) {
        circles[i].setMap(null);
    }
    circles = [];
    cekRadiusStatus = 'off';
}

function hapusRadiusrm() {
    for (var i = 0; i < circles.length; i++) {
        circles[i].setMap(null);
    }
    circles = [];
    cekRadiusStatus = 'off';
}

function hapusRadiustobes() {
    for (var i = 0; i < circles.length; i++) {
        circles[i].setMap(null);
    }
    circles = [];
    cekRadiusStatus = 'off';
}

function hapusRadiuswis() {
    for (var i = 0; i < circles.length; i++) {
        circles[i].setMap(null);
    }
    circles = [];
    cekRadiusStatus = 'off';
}


function detailinfomosque(id9) {

    $('#info').empty();
    hapusInfo();
    // clearroute2();
    hapusMarkerTerdekat();
    $.ajax({
        url: server + 'detailinfomosque.php?info=' + id9, data: "", dataType: 'json', success: function (rows) {
            for (var i in rows) {
                console.log('dd');
                var row = rows[i];
                var id_masjid = row.id_masjid;
                //var foto = row.foto;
                var name_masjid = row.name_masjid;
                var alamat = row.alamat;
                var kapasitas = row.kapasitas;
                var latitude = row.latitude;
                ;
                var longitude = row.longitude;
                centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
                marker = new google.maps.Marker
                ({
                    position: centerBaru,
                    icon: 'assets/img/msj.png',
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                console.log(latitude);
                console.log(longitude);
                markersDua.push(marker);
                map.setCenter(centerBaru);
                map.setZoom(18);
                infowindow = new google.maps.InfoWindow({
                    position: centerBaru,
                    content: "<center><span style=color:black><b>Information</b><br><table><tr><td><i class='fa fa-home'></i>name Masjid</td><td>:</td><td> " + name_masjid + "</td></tr><br><tr><td><i class='fa fa-map-marker'></i>Alamat</td><td>:</td><td> " + alamat + "</td></tr><br><tr><td><i class='fa fa-building'></i>Kapasitas</td><td>:</td><td> " + kapasitas + "</td></tr></table></span><br><input type='button' class='btn btn-success' value='Gallery' onclick='masjidsekitar(" + latitude + "," + longitude + ",500)'/>",
                    pixelOffset: new google.maps.Size(0, -33)
                });
                infoposisi.push(infowindow);
                hapusInfo();
                infowindow.open(map);

            }
        }
    });
}


//menampilkan obj sekitar ik
function objsekitar(d, e, f) { //menampilkan obj sekitar ik

    // $('#info1').empty();

    //$('#hasilcari').empty();
    //$('#hasilik').empty();

    $('#hasilobj').show();
    $('#hasilcariobj1').show();
    $('#hasilcariobj').empty();
    //hapusInfo();
    // clearroute2();
    // hapusInfo();
    // clearroute2();
    //    $('#info1').append("<thead><th>name</th><th>Harga</th><th colspan='2'>Action</th></thead>");
    //       hapusMarkerTerdekat1();
    //hapusMarkerTerdekat();

    $.ajax({
        url: server + 'objradius.php?lat=' + d + '&lng=' + e + '&rad=' + f,
        data: "",
        dataType: 'json',
        success: function (rows) {
            if (rows == null) {
                alert('Data Objek Wisata Tidak Ada');


            } else {
                for (var i in rows) {

                    var row = rows[i];
                    var id_tempat_wisata = row.id_tempat_wisata;
                    var name_tempat_wisata = row.name_tempat_wisata;
                    var lokasi = row.lokasi;
                    var latitude = row.latitude;
                    var longitude = row.longitude;
                    centerBaru = new google.maps.LatLng(latitude, longitude);
                    marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/tours.png',
                        map: map,
                        animation: google.maps.Animation.DROP,
                    });
                    console.log(latitude);
                    console.log(longitude);
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    map.setZoom(14);

                    $('#hasilcariobj').append("<tr><td>" + name_tempat_wisata + "</td><td><a role='button' class='btn btn-success' onclick='detailinfoobj(\"" + id_tempat_wisata + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='angkotSekitar(\"" + latitude + "\",\"" + longitude + "\",\"" + name_tempat_wisata + "\",\"" + id_tempat_wisata + "\")'></a></td></tr>");
                }
            }
        }
    });
}


function detailinfoobj(id3) {

    $('#info').empty();
    hapusInfo();
    // clearroute2();
    hapusMarkerTerdekat();
    $.ajax({
        url: server + 'detailinfoobj.php?info=' + id3, data: "", dataType: 'json', success: function (rows) {
            for (var i in rows) {
                console.log('dddd');
                var row = rows[i];
                var id_tempat_wisata = row.id_tempat_wisata;
                //var foto = row.foto;
                var name_tempat_wisata = row.name_tempat_wisata;
                var lokasi = row.lokasi;
                var jam_buka = row.jam_buka;
                var jam_tutup = row.jam_tutup;
                var biaya = row.biaya;
                var fasilitas = row.fasilitas;
                var latitude = row.latitude;
                ;
                var longitude = row.longitude;
                centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
                marker = new google.maps.Marker
                ({
                    position: centerBaru,
                    icon: 'assets/img/tours.png',
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                console.log(latitude);
                console.log(longitude);
                markersDua.push(marker);
                map.setCenter(centerBaru);
                map.setZoom(16);
                //   if (alamat==null)
                //           {
                //             alamat="tidak ada";
                //           }
                //           if (foto=='null' || foto=='' || foto==null){
                //   foto='eror.png';
                // }
                // $('#info').append("name : "+name+" <br> Alamat : "+alamat+" <br> Kapasitas : "+kapasitas+"");
                infowindow = new google.maps.InfoWindow({
                    position: centerBaru,
                    content: "<center><span style=color:black><b>Information</b><br><table><tr><td><i class=''></i>name Objek</td><td>:</td><td> " + name_tempat_wisata + "</td></tr><br><tr><td><i class=''></i>Alamat</td><td>:</td><td> " + lokasi + "</td></tr><br><tr><td><i class=''></i>Jam Buka</td><td>:</td><td> " + jam_buka + "</td></tr><br><tr><td><i class=''></i>Jam Tutup</td><td>:</td><td> " + jam_tutup + "</td></tr><br><tr><td><i class=''></i>Biaya</td><td>:</td><td> " + biaya + "</td></tr><br><tr><td><i class=''></i>Fasilitas</td><td>:</td><td> " + fasilitas + "</td></tr></table></span><br><input type='button' class='btn btn-success' value='Gallery' onclick='objsekitar(" + latitude + "," + longitude + ",500)'/>",
                    pixelOffset: new google.maps.Size(0, -33)
                });
                infoposisi.push(infowindow);
                hapusInfo();
                infowindow.open(map);

            }

            // ;ow();tampilsekitar()
        }
    });
}


//FIX Membuat Fungsi Mencari Mesjid
function find_mes() //
{
    hapusposisi();
    clearroute2();
    hapusangkot();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    if (mes_name.value == '') {
        alert("Isi kolom pencarian terlebih dahulu !");
    } else {
        //$('#hasilcari').empty();
        $('#hasilcari').append;
        var mesname = document.getElementById('mes_name').value;
        console.log(mesname);
        hapusInfo();
        // clearangkot();
        hapusRadius();
        hapusMarkerTerdekat();
        $.ajax
        ({
            url: server + 'find_mes.php?cari_name=' + mesname, data: "", dataType: 'json', success: function (rows) {
                if (rows == null) {
                    alert('Data Did Not Exist !');
                }
                for (var i in rows) {
                    var row = rows[i];
                    var id = row.id;
                    var name = row.name;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    centerBaru = new google.maps.LatLng(lat, lon);
                    marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        map: map,
                        icon: "assets/img/religious.png",
                    });
                    // console.log(lat);
                    // console.log(lon);
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    klikinfoWindow3(barubana3, id);
                    map.setZoom(14);
                    console.log(name);
                    $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfomes(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarmesjid(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a></td><td> <a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
                }
            }
        });
    }
}


// FIIIIIIIIIIIIIIIIIX Menampilkan Detail Info Mesjid
function detailinfomes(id14) {

    $('#info').empty();
    hapusInfo();
    // clearroute2();
    hapusMarkerTerdekat();
    $.ajax({
        url: server + 'detailinfomes.php?info=' + id14, data: "", dataType: 'json', success: function (rows) {
            for (var i in rows) {
                console.log('ddd');
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var address = row.address;
                var latitude = row.latitude;
                ;
                var longitude = row.longitude;
                centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
                marker = new google.maps.Marker
                ({
                    position: centerBaru,
                    icon: 'assets/img/religious.png',
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                console.log(latitude);
                console.log(longitude);
                markersDua.push(marker);
                map.setCenter(centerBaru);
                map.setZoom(18);
                if (address == null) {
                    address = "tidak ada";

                }
                // $('#info').append("name : "+name+" <br> Alamat : "+alamat+" <br> Kapasitas : "+kapasitas+"");
                infowindow = new google.maps.InfoWindow({
                    position: centerBaru,
                    content: "<center><span style=color:black><b>Information</b><table><tr><td><i class=''></i>Name</td><td>:</td><td> " + name + "</td></tr><br><tr><td><i class=''></i>Address</td><td>:</td><td> " + address + "</td></tr><br><tr><td></table><td><a role='button' class='btn btn-success' onclick='allangkot(\"" + latitude + "\",\"" + longitude + "\")'>Near Object</a></td><td><a role='button' class='btn btn-success' onclick='galerimes(\"" + id + "\");'>Gallery</a></td></span>",
                    pixelOffset: new google.maps.Size(0, -33)
                });
                infoposisi.push(infowindow);
                hapusInfo();
                infowindow.open(map);

            }

            // ;ow();tampilsekitar()
        }
    });
}


//Membuat Fungsi Cari Souvenir Berdasarkan produktt
function viewprodukttsou() {
    hapusMarkerTerdekat();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    var cariprodukttsou = document.getElementById('cariprodukttsou');
    if (cariprodukttsou.value == '') {
        alert("Data Did Not Exist !");
    } else {
        // $('#tampillistik').empty();
        $('#hasilcari').append;
        var soukec = document.getElementById('cariprodukttsou').value;
        console.log(soukec);
        hapusInfo();
        // clearangkot();
        hapusRadius();
        hapusMarkerTerdekat();
        $.ajax
        ({
            url: server + 'find_kec_sou.php?cari_produktt=' + soukec,
            data: "",
            dataType: 'json',
            success: function (rows) {
                if (rows == null) {
                    alert('Data Did Not Exist !');
                }
                for (var i in rows) {
                    var row = rows[i];
                    var id_oleh_oleh = row.id_oleh_oleh;
                    var name_oleh_oleh = row.name_oleh_oleh;
                    var id_produktt = row.id_produktt;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    centerBaru = new google.maps.LatLng(lat, lon);
                    marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        map: map,
                        icon: "assets/img/industries.png",
                    });
                    // console.log(lat);
                    // console.log(lon);
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    map.setZoom(14);
                    console.log(id_produktt);
                    $('#hasilcari').append("<tr><td>" + name_oleh_oleh + "</td><td><a role='button' class='btn btn-success' onclick='detailinfosou(\"" + id_oleh_oleh + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='angkotSekitar(\"" + lat + "\",\"" + lon + "\",\"" + name_oleh_oleh + "\",\"" + id_oleh_oleh + "\")'></a></td></tr>");
                }
            }
        });
    }
}


//FIX Membuat Fungsi Cari Mesjid Berdasarkan Jenis Mesjid
function carijenismes() {
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();

    var jenismes = document.getElementById('jenismes')
    if (jenismes.value == '') {
        alert("Data Did Not Exist  !");
    } else {
        // $('#tampillistik').empty();
        $('#hasilcari').append;
        var mesjns = document.getElementById('jenismes').value;
        console.log(mesjns);
        hapusInfo();
        // clearangkot();
        hapusRadius();
        hapusMarkerTerdekat();
        $.ajax
        ({
            url: server + 'find_jns_mes.php?cari_jenis=' + mesjns,
            data: "",
            dataType: 'json',
            success: function (rows) {
                if (rows == null) {
                    alert('Data Did Not Exist !');
                }
                for (var i in rows) {
                    var row = rows[i];
                    var id = row.id;
                    var name = row.name;
                    var id_jenis_mesjid = row.id_jenis_mesjid;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    centerBaru = new google.maps.LatLng(lat, lon);
                    marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        map: map,
                        icon: "assets/img/religious.png",
                    });
                    // console.log(lat);
                    // console.log(lon);
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    map.setZoom(14);
                    console.log(id_jenis_mesjid);
                    $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfomes(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarmesjid(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a></td><td> <a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
                }
            }
        });
    }
}


//FIX Membuat Fungsi Menampilkan Seluruh Mesjid
function viewmes() {
    hapusposisi();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    hapusMarkerTerdekat();
    hapusangkot();

    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'viewmes.php', data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var id = row.id;
                    var name = row.name;
                    // var alamat = row.alamat;
                    // var telp = row.telp;
                    var lat = row.lat;
                    var lon = row.lng;
                    //var ik_status = row.ik_status;
                    console.log(name);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    map.setCenter(centerBaru);
                    map.setZoom(15);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/religious.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    klikinfoWindow3(barubana3, id);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfomes(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarmesjid(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a> </td><td> <a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
                }
            }
        }
    });
}


function angkotSekitar(lat, lon, name, id_ik) {
    //$('#tampillistangkotik').empty();
    //clearroute();
    //tampil_angkotik();
    $('#tampilangkotsekitarik ').show();
    $('#tampillistangkotik1').show();
    $('#tampillistangkotik').empty();
    hapusInfo();
    hapusRadius();
    hapusMarkerTerdekat();
    hapusInfo();
    //clearangkot();
    //clearsimpang();
    //hapusmarkersimpang();
    centerBaru = new google.maps.LatLng(lat, lon);
    map.setCenter(centerBaru);
    map.setZoom(15);
    var marker = new google.maps.Marker({
        position: centerBaru,
        //icon:'icon/ik.png',
        animation: google.maps.Animation.DROP,
        map: map
    });
    console.log(name);
    markersDua.push(marker);
    map.setCenter(centerBaru);
    infowindow = new google.maps.InfoWindow({
        position: centerBaru,
        content: "<bold>" + name + "",
        pixelOffset: new google.maps.Size(0, -1)
    });
    infoposisi.push(infowindow);
    infowindow.open(map);

    $('#tampillistangkotik').append("<tr align='center'><td>Transportation</td><td colspan='2'>Action</td></tr>");
    $.ajax({
        url: server + '/tampilangkotSekitar.php?lat=' + lat + '&lon=' + lon,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                console.log("sdzsc");
                var id = row.id;
                var id_angkot = row.id_angkot;
                var jurusan = row.jurusan;
                //var jalur_angkot = row.jalur_angkot;
                var warna = row.warna;
                //var warna = row.warna;
                console.log(id);
                var latitude = row.latitude;
                ar
                var longitude = row.longitude;
                console.log(latitude);
                console.log(longitude);
                $('#tampillistangkotik').append("<tr><td>" + id_angkot + "</td><td><a role='button' class='btn btn-success' onclick='detailangkot(\"" + id + "\",\"" + id + "\")'>Showww</a></td><td><a role='button' class='btn btn-primary' onclick='galeriangkot(\"" + id_angkot + "\")'>Gallereeee</a></td></tr>");

            }

        }
    });
}


function angkotSekitar(lat, lon, name, id_ik) {
    //$('#tampillistangkotik').empty();
    //clearroute();
    //tampil_angkotik();
    $('#tampilangkotsekitarik ').show();
    $('#tampillistangkotik1').show();
    $('#tampillistangkotik').empty();
    hapusInfo();
    hapusRadius();
    hapusMarkerTerdekat();
    hapusInfo();
    //clearangkot();
    //clearsimpang();
    //hapusmarkersimpang();
    centerBaru = new google.maps.LatLng(lat, lon);
    map.setCenter(centerBaru);
    map.setZoom(15);
    var marker = new google.maps.Marker({
        position: centerBaru,
        //icon:'icon/ik.png',
        animation: google.maps.Animation.DROP,
        map: map
    });
    console.log(name);
    markersDua.push(marker);
    map.setCenter(centerBaru);
    infowindow = new google.maps.InfoWindow({
        position: centerBaru,
        content: "<bold>" + name + "",
        pixelOffset: new google.maps.Size(0, -1)
    });
    infoposisi.push(infowindow);
    infowindow.open(map);

    $('#tampillistangkotik').append("<tr align='center'><td>Transportation</td><td colspan='2'>Action</td></tr>");
    $.ajax({
        url: server + '/tampilangkotSekitar.php?lat=' + lat + '&lon=' + lon,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                console.log("sdzsc");
                var id_angkot = row.id_angkot;
                var no_angkot = row.no_angkot;
                var jurusan = row.jurusan;
                //var jalur_angkot = row.jalur_angkot;
                var warna_angkot = row.warna_angkot;
                //var warna = row.warna;
                console.log(id_angkot);
                var latitude = row.latitude;
                var longitude = row.longitude;
                console.log(latitude);
                console.log(longitude);
                $('#tampillistangkotik').append("<tr><td>" + no_angkot + "</td><td><a role='button' class='btn btn-success' onclick='detailangkot(\"" + id_angkot + "\",\"" + id_angkot + "\")'>Show</a></td><td><a role='button' class='btn btn-primary' onclick='galeriangkot(\"" + id_angkot + "\")'>Gallery</a></td></tr>");

            }

        }
    });
}


function angkotSekitarUMKM(lat, lon, name, id) {
    clearroute2();
    $('#tampillistangkotik').empty();
    //clearroute();
    //tampil_angkotik();
    $('#tampilangkotsekitarik ').show();
    $('#tampillistangkotik1').show();
    $('#tampillistangkotik').empty();
    hapusInfo();
    hapusRadius();
    hapusMarkerTerdekat();
    hapusInfo();

    //clearangkot();
    //clearsimpang();
    //hapusmarkersimpang();
    centerBaru = new google.maps.LatLng(lat, lon);
    map.setCenter(centerBaru);
    map.setZoom(15);
    var marker = new google.maps.Marker({
        position: centerBaru,
        //icon:'icon/ik.png',
        animation: google.maps.Animation.DROP,
        map: map
    });
    console.log(name);
    markersDua.push(marker);
    map.setCenter(centerBaru);
    infowindow = new google.maps.InfoWindow({
        position: centerBaru,
        content: "<bold>" + name + "",
        pixelOffset: new google.maps.Size(0, -1)
    });
    infoposisi.push(infowindow);
    infowindow.open(map);

    $('#tampillistangkotik').append("<tr align='center'><td>Transportation</td><td colspan='2'>Action</td></tr>");
    $.ajax({
        url: server + '/tampil_angkot_umkm.php?id_angkot=' + id, data: "", dataType: 'json', success: function (rows) {
            for (var i in rows) {

                var row = rows[i];
                console.log("sdzsc");
                var id_angkot = row.id_angkot;
                var destination = row.destination;
                var track = row.track;
                var cost = row.cost;
                console.log(id_angkot);
                var latitude = row.latitude;
                var longitude = row.longitude;
                var id_umkm = row.id_umkm;
                console.log(id);
                console.log(latitude);
                console.log(longitude);
                $('#tampillistangkotik').append("<tr><td>" + id_angkot + "</td><td><a role='button' class='btn btn-success' onclick='tampilsimpang(\"" + id_angkot + "\",\"" + id_umkm + "\")'>Show</a></td></tr>");
            }

        }
    });
}

function angkotSekitarmesjid(lat, lon, name, id) {
    clearroute2();
    $('#tampillistangkotik').empty();
    //clearroute();
    //tampil_angkotik();
    $('#tampilangkotsekitarik ').show();
    $('#tampillistangkotik1').show();
    $('#tampillistangkotik').empty();
    hapusInfo();
    hapusRadius();
    hapusMarkerTerdekat();
    hapusInfo();
    //clearangkot();
    //clearsimpang();
    //hapusmarkersimpang();
    centerBaru = new google.maps.LatLng(lat, lon);
    map.seantCenter(centerBaru);
    map.setZoom(15);
    var marker = new google.maps.Marker({
        position: centerBaru,
        //icon:'icon/ik.png',
        animation: google.maps.Animation.DROP,
        map: map
    });
    console.log(name);
    markersDua.push(marker);
    map.setCenter(centerBaru);
    infowindow = new google.maps.InfoWindow({
        position: centerBaru,
        content: "<bold>" + name + "",
        pixelOffset: new google.maps.Size(0, -1)
    });
    infoposisi.push(infowindow);
    infowindow.open(map);

    $('#tampillistangkotik').append("<tr align='center'><td>Transportation</td><td colspan='2'>Action</td></tr>");
    $.ajax({
        url: server + '/tampil_angkot_mesjid.php?id_angkot=' + id,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                console.log("sdzsc");
                var id_angkot = row.id_angkot;
                var destination = row.destination;
                var track = row.track;
                var cost = row.cost;
                console.log(id_angkot);
                var latitude = row.latitude;
                var longitude = row.longitude;
                var id_mosque = row.id_mosque;
                console.log(id);
                console.log(latitude);
                console.log(longitude);
                $('#tampillistangkotik').append("<tr><td>" + id_angkot + "</td><td><a role='button' class='btn btn-success' onclick='detailangkot(\"" + id_angkot + "\")'>Show</a></td></tr>");
            }

        }
    });
}

function angkotSekitarrm(lat, lon, name, id) {
    clearroute2();
    $('#tampillistangkotik').empty();
    //clearroute();
    //tampil_angkotik();
    $('#tampilangkotsekitarik').show();
    $('#tampillistangkotik1').show();
    $('#tampillistangkotik').empty();

    clearroute2();
    hapusangkot();
    hapusInfo2;
    hapusRadius();
    hapusMarkerTerdekat();
    hapusInfo();

    //clearangkot();
    clearsimpang();
    hapusmarkersimpang();
    centerBaru = new google.maps.LatLng(lat, lon);
    map.setCenter(centerBaru);
    map.setZoom(15);
    var marker = new google.maps.Marker({
        position: centerBaru,
        //icon:'icon/ik.png',
        animation: google.maps.Animation.DROP,
        map: map
    });
    console.log(name);
    markersDua.push(marker);
    map.setCenter(centerBaru);
    infowindow = new google.maps.InfoWindow({
        position: centerBaru,
        content: "<bold>" + name + "",
        pixelOffset: new google.maps.Size(0, -1)
    });
    infoposisi.push(infowindow);
    infowindow.open(map);

    $('#tampillistangkotik').append("<tr align='center'><td>Transportation</td><td colspan='2'>Action</td></tr>");
    $.ajax({
        url: server + '/tampil_angkot_rm.php?id_angkot=' + id, data: "", dataType: 'json', success: function (rows) {
            for (var i in rows) {

                var row = rows[i];
                console.log("sdzsc");
                var id_angkot = row.id_angkot;
                var destination = row.destination;
                var track = row.track;
                var cost = row.cost;
                console.log(id_angkot);
                var latitude = row.latitude;
                var longitude = row.longitude;
                var id_culinary = row.id_culinary;
                console.log(id_culinary);
                console.log(latitude);
                console.log(longitude);
                $('#tampillistangkotik').append("<tr><td>" + id_angkot + "</td><td><a role='button' class='btn btn-success' onclick='tampilsimpangrm(\"" + id_angkot + "\",\"" + id_culinary + "\")'>Show</a></td></tr>");
            }

        }
    });
}

function angkotSekitarmesjid(lat, lon, name, id) {
    clearroute2();
    $('#tampillistangkotik').empty();
    //clearroute();
    //tampil_angkotik();
    $('#tampilangkotsekitarik').show();
    $('#tampillistangkotik1').show();
    $('#tampillistangkotik').empty();

    clearroute2();
    hapusangkot();
    hapusInfo2;
    hapusRadius();
    hapusMarkerTerdekat();
    hapusInfo();

    //clearangkot();
    clearsimpang();
    hapusmarkersimpang();
    centerBaru = new google.maps.LatLng(lat, lon);
    map.setCenter(centerBaru);
    map.setZoom(15);
    var marker = new google.maps.Marker({
        position: centerBaru,
        //icon:'icon/ik.png',
        animation: google.maps.Animation.DROP,
        map: map
    });
    console.log(name);
    markersDua.push(marker);
    map.setCenter(centerBaru);
    infowindow = new google.maps.InfoWindow({
        position: centerBaru,
        content: "<bold>" + name + "",
        pixelOffset: new google.maps.Size(0, -1)
    });
    infoposisi.push(infowindow);
    infowindow.open(map);

    $('#tampillistangkotik').append("<tr align='center'><td>Transportation</td><td colspan='2'>Action</td></tr>");
    $.ajax({
        url: server + '/tampil_angkot_mesjid.php?id_angkot=' + id,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {

                var row = rows[i];
                console.log("sdzsc");
                var id_angkot = row.id_angkot;
                var destination = row.destination;
                var track = row.track;
                var cost = row.cost;
                console.log(id_angkot);
                var latitude = row.latitude;
                var longitude = row.longitude;
                var id_mosque = row.id_mosque;
                console.log(id_mosque);
                console.log(latitude);
                console.log(longitude);
                $('#tampillistangkotik').append("<tr><td>" + id_angkot + "</td><td><a role='button' class='btn btn-success' onclick='tampilsimpangmes(\"" + id_angkot + "\",\"" + id_mosque + "\")'>Show</a></td></tr>");
            }
        }
    });
}

function angkotSekitartokoh(lat, lon, name, id) {
    clearroute2();
    $('#tampillistangkotik').empty();
    //clearroute();
    //tampil_angkotik();
    $('#tampilangkotsekitarik').show();
    $('#tampillistangkotik1').show();
    $('#tampillistangkotik').empty();

    clearroute2();
    hapusangkot();
    hapusInfo2;
    hapusRadius();
    hapusMarkerTerdekat();
    hapusInfo();

    //clearangkot();
    clearsimpang();
    hapusmarkersimpang();
    centerBaru = new google.maps.LatLng(lat, lon);
    map.setCenter(centerBaru);
    map.setZoom(15);
    var marker = new google.maps.Marker({
        position: centerBaru,
        //icon:'icon/ik.png',
        animation: google.maps.Animation.DROP,
        map: map
    });
    console.log(name);
    markersDua.push(marker);
    map.setCenter(centerBaru);
    infowindow = new google.maps.InfoWindow({
        position: centerBaru,
        content: "<bold>" + name + "",
        pixelOffset: new google.maps.Size(0, -1)
    });
    infoposisi.push(infowindow);
    infowindow.open(map);

    $('#tampillistangkotik').append("<tr align='center'><td>Transportation</td><td colspan='2'>Action</td></tr>");
    $.ajax({
        url: server + '/tampil_angkot_tokoh.php?id_angkot=' + id, data: "", dataType: 'json', success: function (rows) {
            for (var i in rows) {

                var row = rows[i];
                console.log("sdzsc");
                var id_angkot = row.id_angkot;
                var destination = row.destination;
                var track = row.track;
                var cost = row.cost;
                console.log(id_angkot);
                var latitude = row.latitude;
                var longitude = row.longitude;
                var id_greatcharacter = row.id_greatcharacter;
                console.log(id_greatcharacter);
                console.log(latitude);
                console.log(longitude);
                $('#tampillistangkotik').append("<tr><td>" + id_angkot + "</td><td><a role='button' class='btn btn-success' onclick='tampilsimpangtok(\"" + id_angkot + "\",\"" + id_greatcharacter + "\")'>Show</a></td></tr>");
            }
        }
    });
}

function angkotSekitarwisata(lat, lon, name, id) {
    clearroute2();
    $('#tampillistangkotik').empty();
    //clearroute();
    //tampil_angkotik();
    $('#tampilangkotsekitarik ').show();
    $('#tampillistangkotik1').show();
    $('#tampillistangkotik').empty();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    //clearangkot();
    //clearsimpang();
    //hapusmarkersimpang();
    centerBaru = new google.maps.LatLng(lat, lon);
    map.setCenter(centerBaru);
    map.setZoom(15);
    var marker = new google.maps.Marker({
        position: centerBaru,
        //icon:'icon/ik.png',
        animation: google.maps.Animation.DROP,
        map: map
    });
    console.log(name);
    markersDua.push(marker);
    map.setCenter(centerBaru);
    infowindow = new google.maps.InfoWindow({
        position: centerBaru,
        content: "<bold>" + name + "",
        pixelOffset: new google.maps.Size(0, -1)
    });
    infoposisi.push(infowindow);
    infowindow.open(map);

    $('#tampillistangkotik').append("<tr align='center'><td>Transportation</td><td colspan='2'>Action</td></tr>");
    $.ajax({
        url: server + '/tampil_angkot_wisata.php?id_angkot=' + id,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows) {
                var row = rows[i];
                console.log("sdzsc");
                var id = row.id;
                var id_angkot = row.id_angkot;
                var jurusan = row.jurusan;
                //var jalur_angkot = row.jalur_angkot;
                var Warna = row.Warna;
                //var warna = row.warna;
                console.log(id_angkot);
                var latitude = row.latitude;
                var longitude = row.longitude;
                console.log(latitude);
                console.log(longitude);
                $('#tampillistangkotik').append("<tr><td>" + id_angkot + "</td><td><a role='button' class='btn btn-success' onclick='tampilsimpangwis(\"" + id_angkot + "\",\"" + id + "\")'>Show</a></td></tr>");
            }

        }
    });
}


function detailangkot(id_angkot) {
    //clearangkot();
    hapusRadius();
    hapusInfo2();
    hapusInfo();
    hapusMarkerTerdekat();
    hapusangkot();
    clearsimpang();

    $.ajax({
        url: server + '/tampilkanrute.php?id_angkot=' + id_angkot,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows.features) {

                var id_angkot = rows.features[i].properties.id_angkot;
                var destination = rows.features[i].properties.destination;
                var latitude = rows.features[i].properties.latitude;
                var longitude = rows.features[i].properties.longitude;
                //var id=rows.features[i].properties.id_umkm;
                var track = rows.features[i].properties.track;
                var cost = rows.features[i].properties.cost;
                console.log(id_angkot);
                //var id_umkm=id;
                var infowindow = new google.maps.InfoWindow({
                    position: centerBaru,
                    content: "<bold>INFORMATION</bold><br>Angkot Code: " + id_angkot + "<br>Destination: " + destination + "<br>Track: " + track + "<br>Cost: " + cost + "<br>",
                });
                infowindow.open(map);
                //listgeom(id_angkot)
                tampilrute(id_angkot, latitude, longitude)
                //tampilsimpang(id_angkot,latitude, longitude,id_umkm)
            }


        }
    });
}

function detailangkot2(id_angkot, id_umkm) {
    //clearangkot();
    hapusRadius();
    hapusInfo2();
    hapusInfo();
    hapusMarkerTerdekat();
    hapusangkot();
    clearsimpang();

    $.ajax({
        url: server + '/tampilkanrute.php?id_angkot=' + id_angkot + '&id_umkm=' + id_umkm,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows.features) {

                var id_angkot = rows.features[i].properties.id_angkot;
                var destination = rows.features[i].properties.destination;
                var latitude = rows.features[i].properties.latitude;
                var longitude = rows.features[i].properties.longitude;
                var id_umkm = rows.features[i].properties.id_umkm;

                var track = rows.features[i].properties.track;
                var cost = rows.features[i].properties.cost;
                //var id_umkm2='2';
                console.log(id_angkot);
                console.log(id_umkm);

                var infowindow = new google.maps.InfoWindow({
                    position: centerBaru,
                    content: "<bold>INFORMATION</bold><br>Angkot Code: " + id_angkot + "<br>Destination: " + destination + "<br>Track: " + track + "<br>Cost: " + cost + "<br>",
                });
                infowindow.open(map);
                //listgeom(id_angkot)
                tampilrute(id_angkot, latitude, longitude)
                //tampilsimpang(id_angkot,latitude, longitude,id_umkm)
            }


        }
    });
}

function detailangkot3(id_angkot, id_rm) {
    //clearangkot();
    hapusRadius();
    hapusMarkerTerdekat();
    hapusangkot();
    clearsimpang();

    $.ajax({
        url: server + '/tampilkanruterm.php?id_angkot=' + id_angkot + '&id_rm=' + id_rm,
        data: "",
        dataType: 'json',
        success: function (rows) {
            for (var i in rows.features) {

                var id_angkot = rows.features[i].properties.id_angkot;
                var destination = rows.features[i].properties.destination;
                var latitude = rows.features[i].properties.latitude;
                var longitude = rows.features[i].properties.longitude;
                var id_umkm = rows.features[i].properties.id_umkm;

                var track = rows.features[i].properties.track;
                var cost = rows.features[i].properties.cost;
                //var id_umkm2='2';
                console.log(id_angkot);
                console.log(id_umkm);

                var infowindow = new google.maps.InfoWindow({
                    position: centerBaru,
                    content: "<bold>INFORMASI</bold><br>Angkot Code: " + id_angkot + "<br>Destination: " + destination + "<br>Track: " + track + "<br>Cost: " + cost + "<br><input type='button' class='btn btn-primary' value='Gallery Angkot'  onclick='industriAngkot(\"" + id_angkot + "\");'/>",
                });
                infowindow.open(map);
                //listgeom(id_angkot)
                tampilrute(id_angkot, latitude, longitude)
                //tampilsimpang(id_angkot,latitude, longitude,id_umkm)
            }


        }
    });
}

function tampilrute(id_angkot, latitude, longitude) {
    //clearangkot();
    hapusInfo();
    hapusRadius();
    hapusMarkerTerdekat();
    ja = new google.maps.Data();
    //console.log(warna);
    ja.loadGeoJson(server + 'tampilkanrute.php?id_angkot=' + id_angkot);
    ja.setStyle(function (feature) {
        return ({
            fillColor: 'red',
            strokeColor: warna,
            strokeWeight: 2,
            fillOpacity: 0.5
        });
    });
    ja.setMap(map);
    angkot.push(ja);
    map.setZoom(15);
}

function tampilrute2(id_angkot, id_angkot2, latitude, longitude) {
    //clearangkot();
    hapusRadius();
    hapusMarkerTerdekat();
    ja = new google.maps.Data();
    //console.log(warna);
    ja.loadGeoJson(server + 'tampilkanrute2.php?id_angkot=' + id_angkot + id_angkot2);
    ja.setStyle(function (feature) {
        return ({
            fillColor: 'red',
            //strokeColor: warna,
            strokeWeight: 2,
            fillOpacity: 0.5
        });
    });
    ja.setMap(map);
    angkot.push(ja);
    map.setZoom(15);
}

function tampilrute3(id_angkot, id_angkot2, latitude, longitude) {
    //clearangkot();
    hapusRadius();
    hapusMarkerTerdekat();
    ja = new google.maps.Data();
    //console.log(warna);
    ja.loadGeoJson(server + 'tampilkanrute3.php?id_angkot=' + id_angkot + id_angkot2);
    ja.setStyle(function (feature) {
        return ({
            fillColor: 'red',
            //strokeColor: warna,
            strokeWeight: 2,
            fillOpacity: 0.5
        });
    });
    ja.setMap(map);
    angkot.push(ja);
    map.setZoom(15);
}


function allangkot(latitude, longitude) {
    $("#hasilik").hide();
    hapusdata();
    rad_lat = latitude;
    rad_lng = longitude;

    //Hilangkan Button Sekitar
    // $('#view_sekitar').empty();
    // $('#hasilik').hide();
    document.getElementById("inputradius").style.display = "inline";

    // POSISI MARKER
    // centerBaru = new google.maps.LatLng(latitude, longitude);
    // map.setZoom(16);
    //   var marker = new google.maps.Marker({map: map, position: centerBaru,

    //   animation: google.maps.Animation.DROP,
    //   clickable: true});

    //INFO WINDOW
    // marker.info = new google.maps.InfoWindow({
    //   content: "<bold>",
    //   pixelOffset: new google.maps.Size(0, -1)
    //     });
    //   marker.info.open(map, marker);
    //   map.setCenter(centerBaru);

    $("#nearbyik").show();


}

//function pertama
// function allangkot(latitude ,longitude ){

//     window.open('pilih_object.php', 'winpopup', 'toolbar=no,statusbar=no,menubar=no,resizable=yes,scrollbars=yes,width=300,height=400');
//      window.CallParentfunction= function () {
//       tampilradius2(latitude,longitude);

//  }
//     window.CallParentfunction2= function () {
//       tampilradiusmes2(latitude,longitude);
//   }

//     window.CallParentfunction3= function () {
//       tampilradiusrm2(latitude,longitude);
//  }
//     window.CallParentfunction4= function () {
//       tampilradiuswis2(latitude,longitude);
//  }
//     window.CallParentfunction5= function () {
//       tampilradiustobes2(latitude,longitude);
//  }
// }


function galeri(a) {
    window.open(server + 'galeri.php?idgallery=' + a);
}

function galerimes(a) {
    window.open(server + 'galerimes.php?idgallery=' + a);
}

function galerikul(a) {
    window.open(server + 'galerikul.php?idgallery=' + a);
}

function galeritok(a) {
    window.open(server + 'galeritok.php?idgallery=' + a);
}

function galeriwis(a) {
    window.open(server + 'galeriwis.php?idgallery=' + a);
}

function galeriangkot(a) {
    window.open(server + 'galeriangkot.php?idgallery=' + a);
}


//FIX Membuat Fungsi Menampilkan Seluruh Rumah Makan
function viewkul() {
    hapusposisi();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    hapusMarkerTerdekat();
    hapusangkot();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'viewkul.php', data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var id = row.id;
                    var name = row.name;
                    var address = row.address;
                    var lat = row.lat;
                    var lon = row.lng;
                    //var ik_status = row.ik_status;
                    console.log(name);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    map.setCenter(centerBaru);
                    map.setZoom(15);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/restaurants.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    klikinfoWindow2(barubana2, id);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfokul(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarrm(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
                }
            }
        }
    });
}


//FIIIIIIIIIIIIIIIIIIIIiX Menampilkan Detail Info Rumah Makan
function detailinfokul(id144) {

    $('#info').empty();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    hapusMarkerTerdekat();
    hapusangkot();
    //clearangkot();
    clearroute();
    console.log(server + 'detailinfokul.php?info=' + id144);
    $.ajax({
        url: server + 'detailinfokul.php?info=' + id144, data: "", dataType: 'json', success: function (rows) {
            for (var i in rows) {
                console.log('ddd');
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var address = row.address;
                var cp = row.cp;
                var latitude = row.latitude;
                ;
                var longitude = row.longitude;
                centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
                marker = new google.maps.Marker
                ({
                    position: centerBaru,
                    icon: 'assets/img/restaurants.png',
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                console.log(latitude);
                console.log(longitude);
                markersDua.push(marker);
                map.setCenter(centerBaru);
                map.setZoom(18);
                if (address == null) {
                    address = "tidak ada";
                }
                // $('#info').append("name : "+name+" <br> Alamat : "+alamat+" <br> Kapasitas : "+kapasitas+"");
                infowindow = new google.maps.InfoWindow({
                    position: centerBaru,
                    content: "<center><span style=color:black><b>Information</b><table><tr><td><i class=''></i>Name</td><td>:</td><td> " + name + "</td></tr><br><tr><td><i class=''></i>Address</td><td>:</td><td> " + address + "</td></tr><br><tr><td><i class=''></i>CP</td><td>:</td><td> " + cp + "</td></tr><br><tr><td></tr></table><td><a role='button' class='btn btn-success' onclick='allangkot(\"" + latitude + "\",\"" + longitude + "\")'>Near Object</a></td><td><a role='button' class='btn btn-success' onclick='galerikul(\"" + id + "\");'>Gallery</a></td></span>",
                    pixelOffset: new google.maps.Size(0, -33)
                });
                infoposisi.push(infowindow);
                hapusInfo();
                infowindow.open(map);

            }

            // ;ow();tampilsekitar()
        }
    });
}


//FIIIIIIIIIIIIIX Membuat Fungsi Mencari Rumah Makan
function find_kul() {
    hapusdata();
    hapusMarkerTerdekat();
    clearroute();
    hapusposisi();
    clearroute2();
    hapusangkot();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    if (kul_name.value == '') {
        alert("Isi kolom pencarian terlebih dahulu !");
    } else {
        //$('#hasilcari').empty();
        $('#hasilcari').append;
        var kulname = document.getElementById('kul_name').value;
        console.log(kul_name);
        hapusInfo();
        // clearangkot();
        hapusRadius();
        hapusMarkerTerdekat();
        $.ajax
        ({
            url: server + 'find_kul.php?cari_name=' + kulname, data: "", dataType: 'json', success: function (rows) {
                if (rows == null) {
                    alert('Data Did Not Exist !');
                }
                for (var i in rows) {
                    var row = rows[i];
                    var id = row.id;
                    var name = row.name;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    centerBaru = new google.maps.LatLng(lat, lon);
                    marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        map: map,
                        icon: "assets/img/restaurants.png",
                    });
                    // console.log(lat);
                    // console.log(lon);
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    klikinfoWindow2(barubana2, id);
                    map.setZoom(15);
                    console.log(name);
                    $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfokul(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarrm(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
                }
            }
        });
    }
}

function find_menu() {
    hapusposisi();
    clearroute2();
    hapusangkot();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    if (kul_menu.value == '') {
        alert("Isi kolom pencarian terlebih dahulu !");
    } else {
        //$('#hasilcari').empty();
        $('#hasilcari').append;
        var kulmenu = document.getElementById('kul_menu').value;
        console.log(kul_menu);
        hapusInfo();
        // clearangkot();
        hapusRadius();
        hapusMarkerTerdekat();
        $.ajax
        ({
            url: server + 'find_menu.php?cari_menu=' + kulmenu, data: "", dataType: 'json', success: function (rows) {
                if (rows == null) {
                    alert('Data Did Not Exist !');
                }
                for (var i in rows) {
                    var row = rows[i];
                    var id = row.id;
                    var name = row.name;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    centerBaru = new google.maps.LatLng(lat, lon);
                    marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        map: map,
                        icon: "assets/img/restaurants.png",
                    });
                    // console.log(lat);
                    // console.log(lon);
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    klikinfoWindow2(barubana2, id);
                    map.setZoom(15);
                    console.log(name);
                    $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfokul(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarrm(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
                }
            }
        });
    }
}


//Membuat Fungsi Cari Kuliner Berdasarkan produktt
function viewprodukttkul() {
    hapusMarkerTerdekat();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    var cariprodukttkul = document.getElementById('cariprodukttkul');
    if (cariprodukttkul.value == '') {
        alert("Data Did Not Exist !");
    } else {
        // $('#tampillistik').empty();
        $('#hasilcari').append;
        var kulkec = document.getElementById('cariprodukttkul').value;
        console.log(kulkec);
        hapusInfo();
        // clearangkot();
        hapusRadius();
        hapusMarkerTerdekat();
        $.ajax
        ({
            url: server + 'find_kec_kul.php?cari_produktt=' + kulkec,
            data: "",
            dataType: 'json',
            success: function (rows) {
                if (rows == null) {
                    alert('Data Did Not Exist !');
                }
                for (var i in rows) {
                    var row = rows[i];
                    var id_kuliner = row.id_kuliner;
                    var name_kuliner = row.name_kuliner;
                    var id_produktt = row.id_produktt;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    centerBaru = new google.maps.LatLng(lat, lon);
                    marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        map: map,
                        icon: "assets/img/path.png",
                    });
                    // console.log(lat);
                    // console.log(lon);
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    map.setZoom(14);
                    console.log(id_produktt);
                    $('#hasilcari').append("<tr><td>" + name_kuliner + "<  /td><td><a role='button' class='btn btn-success' onclick='detailinfokul(\"" + id_kuliner + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='angkotSekitar(\"" + lat + "\",\"" + lon + "\",\"" + name_kuliner + "\",\"" + id_kuliner + "\")'></a></td></tr>");
                }
            }
        });
    }
}

function hotelsekitar(m, n, o) { //menampilkan msj sekitar ik

    // $('#info1').empty();

    //$('#hasilcari').empty();
    //$('#hasilik').empty();
    //$('#hasilobj').empty();
    $('#hasilhotel').show();
    $('#hasilcarihotel1').show();
    $('#hasilcarihotel').empty();
    //hapusInfo();
    // clearroute2();
    // hapusInfo();
    // clearroute2();
    //    $('#info1').append("<thead><th>name</th><th>Harga</th><th colspan='2'>Action</th></thead>");
    //       hapusMarkerTerdekat1();
    //hapusMarkerTerdekat();

    $.ajax({
        url: server + 'hotelradius.php?lat=' + m + '&lng=' + n + '&rad=' + o,
        data: "",
        dataType: 'json',
        success: function (rows) {
            if (rows == null) {
                alert('Data Hotel Tidak Ada');


            } else {
                for (var i in rows) {

                    var row = rows[i];
                    var id_hotel = row.id_hotel;
                    var name_hotel = row.name_hotel;
                    var alamat = row.alamat;
                    var latitude = row.latitude;
                    var longitude = row.longitude;
                    centerBaru = new google.maps.LatLng(latitude, longitude);
                    marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/hotels.png',
                        map: map,
                        animation: google.maps.Animation.DROP,
                    });
                    console.log(latitude);
                    console.log(longitude);
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    map.setZoom(14);

                    $('#hasilcarihotel').append("<tr><td>" + name_hotel + "</td><td><a role='button' class='btn btn-success' onclick='detailinfohotel(\"" + id_hotel + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='angkotSekitar(\"" + latitude + "\",\"" + longitude + "\",\"" + name_hotel + "\",\"" + id_hotel + "\")'></a></td></tr>");
                }
            }
        }
    });
}


function detailinfohotel(id90) {

    $('#info').empty();
    hapusInfo();
    // clearroute2();
    hapusMarkerTerdekat();
    $.ajax({
        url: server + 'detailinfohotel.php?info=' + id90, data: "", dataType: 'json', success: function (rows) {
            for (var i in rows) {
                console.log('dd');
                var row = rows[i];
                var id_hotel = row.id_hotel
                //var foto = row.foto;
                var name_hotel = row.name_hotel;
                var alamat = row.alamat;
                var fasilitas = row.fasilitas;
                var tipe_kamar = row.tipe_kamar;
                var harga = row.harga;
                var latitude = row.latitude;
                ;
                var longitude = row.longitude;
                centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
                marker = new google.maps.Marker
                ({
                    position: centerBaru,
                    icon: 'assets/img/hotels.png',
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                console.log(latitude);
                console.log(longitude);
                markersDua.push(marker);
                map.setCenter(centerBaru);
                map.setZoom(18);
                //   if (alamat==null)
                //           {
                //             alamat="tidak ada";
                //           }
                //           if (foto=='null' || foto=='' || foto==null){
                //   foto='eror.png';
                // }
                // $('#info').append("name : "+name+" <br> Alamat : "+alamat+" <br> Kapasitas : "+kapasitas+"");
                infowindow = new google.maps.InfoWindow({
                    position: centerBaru,
                    content: "<center><span style=color:black><b>Information</b><br><table><tr><td><i class=''></i>name Hotel</td><td>:</td><td> " + name_hotel + "</td></tr><br><tr><td><i class=''></i>Alamat</td><td>:</td><td> " + alamat + "</td></tr><br><tr><td><i class=''></i>Fasilitas</td><td>:</td><td> " + fasilitas + "</td></tr><br><tr><td><i class=''></i>Tipe Kamar</td><td>:</td><td> " + tipe_kamar + "</td></tr><br><tr><td><i class=''></i>Harga</td><td>:</td><td> " + harga + "</td></tr></table></span><br><input type='button' class='btn btn-success' value='Gallery' onclick='masjidsekitar(" + latitude + "," + longitude + ",500)'/>",
                    pixelOffset: new google.maps.Size(0, -33)
                });
                infoposisi.push(infowindow);
                hapusInfo();
                infowindow.open(map);

            }

            // ;ow();tampilsekitar()
        }
    });
}


//FIIIIIIIIIIIIX Membuat Fungsi Menampilkan Seluruh Tokoh Besar
function viewtok() {
    hapusposisi();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    hapusMarkerTerdekat();
    hapusangkot();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'viewtok.php', data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var id = row.id;
                    var name = row.name;
                    var address = row.address;
                    var lat = row.lat;
                    var lon = row.lng;
                    //var ik_status = row.ik_status;
                    console.log(name);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    map.setCenter(centerBaru);
                    map.setZoom(15);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/museums.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    klikinfoWindow4(barubana4, id);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfotok(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitartokoh(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
                }
            }
        }
    });
}

//FIIIIIIIIIIIIX Menampilkan Detail Tokoh Besar
function detailinfotok(id15) {

    $('#info').empty();
    hapusInfo();
    // clearroute2();
    hapusMarkerTerdekat();
    $.ajax({
        url: server + 'detailinfotok.php?info=' + id15, data: "", dataType: 'json', success: function (rows) {
            for (var i in rows) {
                console.log('dd');
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var address = row.address;
                var latitude = row.latitude;
                ;
                var longitude = row.longitude;
                centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
                marker = new google.maps.Marker
                ({
                    position: centerBaru,
                    icon: 'assets/img/museums.png',
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                console.log(latitude);
                console.log(longitude);
                markersDua.push(marker);
                map.setCenter(centerBaru);
                map.setZoom(18);
                if (address == null) {
                    address = "tidak ada";
                }
                // $('#info').append("name : "+name+" <br> Alamat : "+alamat+" <br> Kapasitas : "+kapasitas+"");
                infowindow = new google.maps.InfoWindow({
                    position: centerBaru,
                    content: "<center><span style=color:black><b>Information</b><table><tr><td><i class=''></i>Name</td><td>:</td><td> " + name + "</td></tr><br><tr><td><i class=''></i>Address</td><td>:</td><td> " + address + "</td></tr><br><tr><td></table><td><a role='button' class='btn btn-success' onclick='allangkot(\"" + latitude + "\",\"" + longitude + "\")'>Near Object</a></td><td><a role='button' class='btn btn-success' onclick='galeritok(\"" + id + "\");'>Gallery</a></td></span>",
                    pixelOffset: new google.maps.Size(0, -33)
                });
                infoposisi.push(infowindow);
                hapusInfo();
                infowindow.open(map);

            }

            // ;ow();tampilsekitar()
        }
    });
}


//FIIIIIIIIIIX Membuat Fungsi Mencari Tokoh Besar
function find_tok() //Tokoh Besar
{
    hapusposisi();
    clearroute2();
    hapusangkot();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    if (tok_name.value == '') {
        alert("Isi kolom pencarian terlebih dahulu !");
    } else {
        //$('#hasilcari').empty();
        $('#hasilcari').append;
        var tokname = document.getElementById('tok_name').value;
        console.log(tok_name);
        hapusInfo();
        // clearangkot();
        hapusRadius();
        hapusMarkerTerdekat();
        $.ajax
        ({
            url: server + 'find_tok.php?cari_name=' + tokname, data: "", dataType: 'json', success: function (rows) {
                if (rows == null) {
                    alert('Data Did Not Exist !');
                }
                for (var i in rows) {
                    var row = rows[i];
                    var id = row.id;
                    var name = row.name;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    centerBaru = new google.maps.LatLng(lat, lon);
                    marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        map: map,
                        icon: "assets/img/museums.png",
                    });
                    // console.log(lat);
                    // console.log(lon);
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    klikinfoWindow4(barubana4, id);
                    map.setZoom(15);
                    console.log(name);
                    $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfotok(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitartokoh(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
                    ;
                }
            }
        });
    }
}


//FIIIIIIX Membuat Fungsi Menampilkan Seluruh Wisata
function viewwis() {
    hapusposisi();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    hapusangkot();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    hapusMarkerTerdekat();
    hapusangkot();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $.ajax
    ({
        url: server + 'viewwis.php', data: "", dataType: 'json', success: function (rows) {
            if (rows == null) {
                alert('Data Did Not Exist!');
            } else {
                $('#hasilcari').append;
                console.log(rows);
                for (var i in rows) {
                    var row = rows[i];
                    var id = row.id;
                    var name = row.name;
                    //var lokasi=row.lokasi;
                    //var keterangan=row.keterangan;
                    var lat = row.lat;
                    var lon = row.lng;
                    //var ik_status = row.ik_status;
                    console.log(name);
                    centerBaru = new google.maps.LatLng(lat, lon);
                    map.setCenter(centerBaru);
                    map.setZoom(15);
                    var marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        icon: 'assets/img/default.png',
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    klikinfoWindow5(barubana5, id);
                    // console.log(name);
                    $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfowis(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarwisata(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
                }
            }
        }
    });
}


//FIIIIIIIX Menampilkan Detail Wisata
function detailinfowis(id16) {

    $('#info').empty();
    hapusMarkerTerdekat();
    hapusRadius();
    hapusInfo();
    hapusInfo2();
    clearroute2();
    clearsimpang();
    hapusmarkersimpang();
    clearroute();
    $.ajax({
        url: server + 'detailinfowis.php?info=' + id16, data: "", dataType: 'json', success: function (rows) {
            for (var i in rows) {
                console.log('dd');
                var row = rows[i];
                var id = row.id;
                var name = row.name;
                var address = row.address;
                var latitude = row.latitude;
                ;
                var longitude = row.longitude;
                centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
                marker = new google.maps.Marker
                ({
                    position: centerBaru,
                    icon: 'assets/img/default.png',
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                console.log(latitude);
                console.log(longitude);
                markersDua.push(marker);
                map.setCenter(centerBaru);
                map.setZoom(16);

                // $('#info').append("name : "+name+" <br> Alamat : "+alamat+" <br> Kapasitas : "+kapasitas+"");
                infowindow = new google.maps.InfoWindow({
                    position: centerBaru,
                    content: "<center><span style=color:black><b>Information</b><br><table><tr><td><i class=''></i>Name</td><td>:</td><td> " + name + "</td></tr><br><tr><td><i class=''></i>Address</td><td>:</td><td> " + address + "</td></tr><br><tr><td></table><td><a role='button' class='btn btn-success' onclick='allangkot(\"" + latitude + "\",\"" + longitude + "\")'>Near Object</a></td><td><a role='button' class='btn btn-success' onclick='galeriwis(\"" + id + "\");'>Gallery</a></td></span>",
                    pixelOffset: new google.maps.Size(0, -33)
                });
                infoposisi.push(infowindow);
                hapusInfo();
                infowindow.open(map);

            }

            // ;ow();tampilsekitar()
        }
    });
}


//FIIIIIIIX Membuat Fungsi Mencari Wisata
function find_wis() //Wisata
{
    hapusposisi();
    clearroute2();
    hapusangkot();
    $("#filterik").hide();
    $('#hasilik').show();
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    if (wis_name.value == '') {
        alert("Isi kolom pencarian terlebih dahulu !");
    } else {
        //$('#hasilcari').empty();
        $('#hasilcari').append;
        var wisname = document.getElementById('wis_name').value;
        console.log(wis_name);
        hapusInfo();
        // clearangkot();
        hapusRadius();
        hapusMarkerTerdekat();
        $.ajax
        ({
            url: server + 'find_wis.php?cari_name=' + wisname, data: "", dataType: 'json', success: function (rows) {
                if (rows == null) {
                    alert('Data Did Not Exist !');
                }
                for (var i in rows) {
                    var row = rows[i];
                    var id = row.id;
                    var name = row.name;
                    var lat = row.latitude;
                    var lon = row.longitude;
                    centerBaru = new google.maps.LatLng(lat, lon);
                    marker = new google.maps.Marker
                    ({
                        position: centerBaru,
                        map: map,
                        icon: "assets/img/default.png",
                    });
                    // console.log(lat);
                    // console.log(lon);
                    markersDua.push(marker);
                    map.setCenter(centerBaru);
                    klikinfoWindow5(barubana5, id);
                    map.setZoom(15);
                    console.log(name);
                    $('#hasilcari').append("<tr><td>" + name + "</td><td><a role='button' class='btn btn-success' onclick='detailinfowis(\"" + id + "\")'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-car' onclick='angkotSekitarwisata(\"" + lat + "\",\"" + lon + "\",\"" + name + "\",\"" + id + "\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='callRoute(centerLokasi,centerBaru);rutetampil();'></a></td></tr>");
                }
            }
        });
    }
}


// function hapusMarkerInfoWindow (){
//   setMapOnAll(null);
//   hapusMarkerTerdekat();
//   centerBaru = 'null' ;
// }

// function setMapOnAll(map){
//   for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(map);
//   }
// }


// function viewproduktt(){
// var cariproduktt = document.getElementById('cariproduktt')
// alert(cariproduktt.value)
//  }

function legenda() {
    $('#tombol').empty();
    $('#tombol').append('<a type="button" id="hidelegenda" onclick="hideLegenda()" class="btn btn-default btn-sm " data-toggle="tooltip"  style="margin-right: 7px;" ><i class="fa fa-eye-slash" style="color:black;"></i></a> ');

    var layer = new google.maps.FusionTablesLayer(
        {
            query: {
                select: 'Location',
                from: '1NIVOZxrr-uoXhpWSQH2YJzY5aWhkRZW0bWhfZw'
            },
            map: map
        });
    var legend = document.createElement('div');
    legend.id = 'legend';
    var content = [];
    content.push('<h4 style="color: white;">Legenda</h4>');
    content.push('<p><div class="color a" style="color: white;">&nbsp;1&nbsp;Route</div></p><br>');
    content.push('<p><div class="color b" style="color: white;">&nbsp;2&nbsp;Line</div></p><br>');
    content.push('<p><div class="color1 class1" style="color: white;">&nbsp;Marker&nbsp;3</div></p>');
    content.push('<p><div class="color1 class2" style="color: white;">&nbsp;Marker&nbsp;4</div></p>');
    content.push('<p><div class="color1 class3" style="color: white;">&nbsp;Marker&nbsp;5</div></p>');
    content.push('<p><div class="color1 class4" style="color: white;">&nbsp;Marker&nbsp;6&nbsp;7</div></p>');
    content.push('<p><div class="color1 class5" style="color: white;">&nbsp;Marker&nbsp;8</div></p>');
    legend.innerHTML = content.join('');
    legend.index = 1;
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
}

function hideLegenda() {
    $('#legend').remove();
    $('#tombol').empty();
    $('#tombol').append('<a type="button" id="showlegenda" onclick="legenda()" class="btn btn-default btn-sm " data-toggle="tooltip"  style="margin-right: 7px;" ><i class="fa fa-eye-slash" style="color:black;"> </i></a> ');
}