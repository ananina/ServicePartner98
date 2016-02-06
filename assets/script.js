$(document).ready(function(){

    $('#repair-tab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show')
    });

    $(".date-begin").datepicker({
        format: 'dd.mm.yyyy',
        autoclose: true
    });

    function dateEnd(){
        var dateBegin = $(".dateBegin").val();
        if(dateBegin){
            var date = dateBegin;
        }else{
            var dt = new Date();
            var month = dt.getMonth()+1;
            if (month<10) month='0'+month;
            var day = dt.getDate();
            if (day<10) day='0'+day;
            var year = dt.getFullYear();
            date = day + '.' + month + '.' + year;
        }

        $(".date-end").datepicker({
            format: 'dd.mm.yyyy',
            autoclose: true
        });
        $('.date-end').datepicker('setStartDate', date);
        var dateEnd = $(".dateEnd").val();

        if(dateEnd) {
            if (new Date().getTime(dateBegin) < new Date(dateEnd).getTime()) {
                $('.date-end').datepicker('update', date);
            }
        }
    }

    dateEnd();
    $(".dateBegin").change(function(){
        console.log('да');
        dateEnd();
    });

    $("select[name=id_client]").val('0');
    $("select[name=id_client]").change(function() {
        loadData($(this).val());
    });

    function loadData($id){
        console.log($id);
        $.ajax({
            type: "POST",
            url: "/ServicePartner98/model/ajax.php",
            dataType: 'json',
            data: {id_client: $id},
            success: function (data) {
                console.log(data);
                console.log();
                console.log(data[0]['tel']);
                $('#address_client').val(data[0]['address']);
                $('#tel_client').val(data[0]['tel']);
            }
        });
    }


});
