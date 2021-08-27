$(document).ready(function () {
    $.ajax({
        url: "https://api2.covidhospitalsbd.com/api/available", 
        success: function (result) {
            $("#Available_ICU_Beds").html(result.icu);
            $("#icu_hfc").html(result.hfn);
            $("#hdu").html(result.hdu);
            $("#gb").html(result.gb);
        }
    });
});