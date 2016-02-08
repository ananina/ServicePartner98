$(document).ready(function(){

    //обработка событий на странице repair
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
                                        //console.log(data[item]);
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
                                    $("input[name=materialPrice]").on("change", function(){
                                        var count = $(this).parent().parent().find('input[name=materialCount]').val();
                                        if(count != ''){
                                            var summ = $(this).val() * count;
                                            $(this).parent().parent().find('input[name=materialSumm]').val(summ);
                                        }else{
                                            $(this).parent().parent().find('input[name=materialSumm]').val('');
                                        }
                                    });
                                    $("input[name=materialCount]").on("change", function(){
                                        var price = $(this).parent().parent().find('input[name=materialPrice]').val();
                                        if(price != ''){
                                            var summ = $(this).val() * price;
                                            $(this).parent().parent().find('input[name=materialSumm]').val(summ);
                                        }
                                    });
                                    break;
                    case 'works':
                                    var work_price = [];
                                    for(item in data){
                                        var idWork = data[item]['id_work'];
                                        var work = data[item]['work'];
                                        var price = data[item]['price'];
                                        work_price[idWork] = price;
                                        $('<option>').attr('value', idWork).html(work).appendTo('select.selectWork:last');
                                    }
                                    $('select.selectWork').selectpicker({
                                        liveSearch: true,
                                        title: 'Выберите работу...'
                                    });

                                    $('select.selectWork').on('changed.bs.select', function () {
                                        var id = $(this).val();
                                        $(this).parent().parent().parent().find("input[name=workPrice]").val(work_price[id]);
                                     });
                                    $("input[name=workPrice]").on("change", function(){
                                        var count = $(this).parent().parent().find('input[name=workCount]').val();
                                        if(count != ''){
                                            var summ = $(this).val() * count;
                                            $(this).parent().parent().find('input[name=workSumm]').val(summ);
                                        }else{
                                            $(this).parent().parent().find('input[name=workSumm]').val('');
                                        }
                                    });
                                    $("input[name=workCount]").on("change", function(){
                                        var price = $(this).parent().parent().find('input[name=workPrice]').val();
                                        if(price != ''){
                                            var summ = $(this).val() * price;
                                            $(this).parent().parent().find('input[name=workSumm]').val(summ);
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
        $('<td>').appendTo('#tableMaterials tr:last');
        $('<select>').attr('class', 'selectMaterial').attr('name', 'material').appendTo('#tableMaterials td:last');
        $('<td>').appendTo('#tableMaterials tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'materialPrice').appendTo('#tableMaterials td:last');
        $('<td>').appendTo('#tableMaterials tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'materialCount').appendTo('#tableMaterials td:last');
        $('<td>').appendTo('#tableMaterials tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'materialSumm').attr('disabled', 'disabled').appendTo('#tableMaterials td:last');
        loadData('all', 'materials');
    });

    $("#btnAddWorks").click(function(){
        $('<tr>').appendTo('#tableWorks');
        $('<td>').appendTo('#tableWorks tr:last');
        $('<select>').attr('class', 'selectWork').attr('name', 'work').appendTo('#tableWorks td:last');
        $('<td>').appendTo('#tableWorks tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'workPrice').appendTo('#tableWorks td:last');
        $('<td>').appendTo('#tableWorks tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'workCount').appendTo('#tableWorks td:last');
        $('<td>').appendTo('#tableWorks tr:last');
        $('<input>').attr('class', 'form-control count').attr('type', 'text').attr('name', 'workSumm').attr('disabled', 'disabled').appendTo('#tableWorks td:last');
        loadData('all', 'works');
    });

});
