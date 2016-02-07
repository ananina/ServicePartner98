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
        var id = $(this).val();
        loadData('one', 'clients', 'id_client', id);
    });

    function loadData(count, table, id_name, id){
        $.ajax({
            type: "POST",
            url: "/ServicePartner98/model/ajax.php",
            dataType: 'json',
            data: {count : count, table : table, id_name : id_name, id: id},
            success: function (data) {
                switch (table){
                    case 'clients': $('#address_client').val(data['address']);
                                    $('#tel_client').val(data['tel']);
                                    break;
                    case 'materials':
                                    for(item in data){
                                        console.log(data[item]);
                                        var idMaterial = data[item]['id_material'];
                                        var material = data[item]['material'];
                                        $('<option>').attr('value', idMaterial).html(material).appendTo('select.selectMaterial:last');
                                    }
                                    $('select.selectMaterial').selectpicker({
                                        liveSearch: true,
                                        title: 'Выберите материал...'
                                    });
                                    /* проверка значения
                                    $('select.selectMaterial').on('changed.bs.select', function (e) {
                                    console.log($(this).val());
                                    });*/
                                    $("input[name=price]").on("change", function(){
                                        var count = $(this).parent().parent().find('input[name=count]').val();
                                        if(count != ''){
                                            var summ = $(this).val() * count;
                                            $(this).parent().parent().find('input[name=summ]').val(summ);
                                        }else{
                                            $(this).parent().parent().find('input[name=summ]').val('');
                                        }
                                    });
                                    $("input[name=count]").on("change", function(){
                                        var price = $(this).parent().parent().find('input[name=price]').val();
                                        if(price != ''){
                                            var summ = $(this).val() * price;
                                            $(this).parent().parent().find('input[name=summ]').val(summ);
                                        }
                                    });
                                    break;
                }
            }
        });
    }

    $("select[name=id_status]").val('1');

    $("#btnAddMaterials").click(function(){
        $('<tr>').appendTo('#tableMaterials');
        $('<td>').appendTo('tr:last');
        $('<select>').attr('class', 'selectMaterial').attr('name', 'material').appendTo('td:last');
        $('<td>').appendTo('tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'price').appendTo('td:last');
        $('<td>').appendTo('tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'count').appendTo('td:last');
        $('<td>').appendTo('tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'summ').attr('disabled', 'disabled').appendTo('td:last');
        loadData('all', 'materials');
    });

});
