const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bed_type = urlParams.get('bed_type')

if (bed_type == 'icu_beds') {
    $("#Headtext").html("ICU Beds");
    calldata("icu_beds", 1);
}
else if (bed_type == 'hfn_beds') {
    $("#Headtext").html("High Flow Nasal Canula Beds");
    calldata("hfn_beds");
}
else if (bed_type == 'hdu_beds') {
    $("#Headtext").html("High Dependency Unit Beds");
    calldata("hdu_beds");
}
else {
    $("#Headtext").html("General Beds");
    calldata("general_beds", 1);
}

function calldata(bed_type, page) {
    const link = "https://api2.covidhospitalsbd.com/api/available-hospitals?type=" + bed_type + "&page=" + page;
    $.ajax({
        url: link,
        success: function (result) {
            for (let i = 0; i < 10; i++) {
                const hospital_name = result.hospitals.data[i].name;
                if (bed_type == 'icu_beds') {
                    const beds = result.hospitals.data[i].icu_beds;
                    const beds_abalable = result.hospitals.data[i].icu_beds_available;
                    showdata(beds, beds_abalable, hospital_name);
                }
                else if (bed_type == 'hfn_beds') {
                    const beds = result.hospitals.data[i].hfn_beds;
                    const beds_abalable = result.hospitals.data[i].hfn_beds_available;
                    showdata(beds, beds_abalable, hospital_name);
                }
                else if (bed_type == 'hdu_beds') {
                    const beds = result.hospitals.data[i].hdu_beds;
                    const beds_abalable = result.hospitals.data[i].hdu_beds_available;
                    showdata(beds, beds_abalable, hospital_name);
                }
                else {
                    const beds = result.hospitals.data[i].general_beds;
                    const beds_abalable = result.hospitals.data[i].general_beds_available;
                    showdata(beds, beds_abalable, hospital_name);
                }
            }
        }
    });

}

function showdata(beds, beds_abalable, hospital_name) {
    const list_item = `<li class="list-group-item m-3 border-0 rounded rounded-3">
    <div class="">
        <h4>
            <i class="far fa-hospital fs-1 me-2"></i>
            <span class="fw-bold fs-4">` + hospital_name + `</span>
        </h4>
        
        <p class="d-flex justify-content-between">
            <span>Available: <span>`+ beds_abalable + `</span></span>
            <span>Total: <span >`+ beds + `</span></span>
        </p>
    </div>
</li>`
    $("#hospital_list").append(list_item);
}
