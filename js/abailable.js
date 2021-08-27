
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bed_type = urlParams.get('bed_type')






if (bed_type == 'icu_beds') {
    $("#Headtext").html("ICU Beds");
    for (let i = 0; i < 10; i++) {
        $.ajax({
            url: "https://api2.covidhospitalsbd.com/api/available-hospitals?type=" + bed_type+"order_by=nearby",
            success: function (result) {
                const list_item = `<li class="list-group-item m-3" id="{result.hospitals.data[i].id}>
                                        <div class="">
                                            <h4>
                                                <i class="far fa-hospital fs-1 me-2"></i><span class="fw-bold fs-4" id="hospital_name`+ result.hospitals.data[i].id + `">` + result.hospitals.data[i].name + `</span>
                                            </h4>
                                            <p>
                                                <i class="fas fa-map-marker-alt">
                                                </i>`+ result.hospitals.data[i].address + `</span>
                                            </p>
                                            <p class="d-flex justify-content-between">
                                                <span>Available: <span id="abailable">`+ result.hospitals.data[i].icu_beds_available + `</span></span>
                                                <span>Total: <span id="total">`+ result.hospitals.data[i].icu_beds + `</span></span>
                                            </p>
                                        </div>
                                    </li>`
                $("ul").append(list_item);

                // $("#hospital_name").html(result.hospitals.data[0].name);
                // $("#address").html(result.hospitals.data[0].address);
                // $("#abailable").html(result.hospitals.data[0].icu_beds_available);
                // $("#total").html(result.hospitals.data[0].icu_beds);
            }
        });
    }
}
else if (bed_type == 'hfn_beds') {
    $("#Headtext").html("High Flow Nasal Canula Beds");
}
else if (bed_type == 'hdu_beds') {
    $("#Headtext").html("High Dependency Unit Beds");
}
else {
    $("#Headtext").html("General Beds");
}

// $.ajax({
//     url: "https://api2.covidhospitalsbd.com/api/available-hospitals?type=" + bed_type,
//     success: function (result) {
//         $("#hospital_name").html(result.hospitals.data[0].name);
//         $("#address").html(result.hospitals.data[0].address);
//         $("#abailable").html(result.hospitals.data[0].icu_beds_available);
//         $("#total").html(result.hospitals.data[0].icu_beds);
//     }
// });